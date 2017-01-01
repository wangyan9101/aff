import { State, SubState } from './state'

export class MutableState extends State {
  constructor(init_state, app) {
    super();
    this.app = app;
    this.patch_tick = 1;
    this.dirty_tree = {};
    this.next_dirty_tree = {};
    this.state = init_state;
    this.setupState(this.state, []);
  }

  get() {
    return this.state;
  }

  update(...arg) {
    this.state = this.updateState(this.next_dirty_tree, [], this.state, ...arg);
  }

  updateState(dirty_tree, base_path, obj, ...args) {
    if (args.length === 0) {
      return obj;
    } else if (args.length === 1) {
      let ret;
      if (typeof args[0] === 'object' && args[0] !== null && args[0].__is_op) {
        ret = args[0].apply(obj, this);
        if (ret === obj) {
          this.setupPatchTick(ret);
        }
      } else {
        ret = args[0];
      }
      this.setupState(ret, base_path);
      return ret;
    } else {
      if (!obj) {
        obj = {};
      }
      if (typeof obj === 'object' && obj !== null) {
        if (!obj.hasOwnProperty('__aff_tick')) {
          this.setupPatchTick(obj);
        }
        const key = args[0];
        const key_type = typeof key;
        for (const k in obj) {
          if ((key_type === 'number' || key_type === 'string') && k == key) {
            if (!dirty_tree[k]) {
              dirty_tree[k] = {};
            }
            let path = base_path.slice(0);
            path.push(k);
            obj[k] = this.updateState(dirty_tree[k], path, obj[k], ...args.slice(1));
          } else if (key_type === 'function' && key(k)) {
            if (!dirty_tree[k]) {
              dirty_tree[k] = {};
            }
            let path = base_path.slice(0);
            path.push(k);
            obj[k] = this.updateState(dirty_tree[k], path, obj[k], ...args.slice(1));
          }
        }
        if ((key_type === 'string' || key_type === 'number') && !(key in obj)) {
          if (!dirty_tree[key]) {
            dirty_tree[key] = {};
          }
          let path = base_path.slice(0);
          path.push(key);
          obj[key] = this.updateState(dirty_tree[key], path, undefined, ...args.slice(1));
        }
        obj.__aff_tick = this.patch_tick + 1;
        return obj;
      } else {
        throw['bad update path', obj, args];
      }
    }
  }

  beforePatch() {
    this.patch_tick++;
    this.dirty_tree = this.next_dirty_tree;
    this.next_dirty_tree = {};
  }

  setupPatchTick(obj) {
    if (obj.hasOwnProperty('__aff_tick')) {
      obj.__aff_tick = this.patch_tick + 1;
    } else {
      Object.defineProperty(obj, '__aff_tick', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: this.patch_tick + 1,
      });
    }
  }

  argsChanged(arg, last_arg) {
    const arg_type = typeof arg;
    const last_arg_type = typeof last_arg;

    // different type
    if (arg_type !== last_arg_type) {
      return true;
    }

    // trigger update of used keys
    if (
      arg === last_arg
      && typeof arg === 'object'
      && arg != null
      && arg.__aff_use_keys
    ) {
      for (const key in arg.__aff_use_keys) {
        // trigger getter to update __aff_tick
        arg[key];
      }
    }

    // sub state
    if (arg instanceof SubState && last_arg instanceof SubState) {
      // check path and dirty state
      let max_dirty_index = -1;
      let max_same_index = -1;
      let dirty_tree = this.dirty_tree;
      const last_path = last_arg.path;
      for (let index = 0; index < arg.path.length; index++) {
        if (dirty_tree && dirty_tree[arg.path[index]]) {
          dirty_tree = dirty_tree[arg.path[index]];
          max_dirty_index = index;
        }
        if (last_path[index] == arg.path[index]) {
          max_same_index = index;
        }
      }
      if (max_dirty_index == arg.path.length - 1) {
        return true;
      }
      if (max_same_index != arg.path.length - 1) {
        return true;
      }
    } 

    // patch_tick
    else if (
      arg === last_arg 
      && typeof arg === 'object' 
      && arg !== null 
      && arg.__aff_tick === this.patch_tick
    ) {
      return true;
    }

    // array
    else if (Array.isArray(arg) && Array.isArray(last_arg)) {
      // different length
      if (arg.length != last_arg.length) {
        return true;
      }
      // check items
      for (let i = 0; i < arg.length; i++ ){
        if (this.argsChanged(arg[i], last_arg[i])) {
          return true;
        }
      }
    } 

    // deep compare object
    else if (arg_type === 'object') {
      // different keys length
      if (Object.keys(arg).length != Object.keys(last_arg).length) {
        return true;
      }
      for (const key in arg) {
        if (this.argsChanged(arg[key], last_arg[key])) {
          return true;
        }
      }
    }

    // function
    else if (arg_type === 'function') {
      if (arg.name !== last_arg.name) {
        return true;
      }
    }

    // compare
    else if (arg !== last_arg) {
      return true;
    }

    return false;
  }

  setupState(state, base_path) {
    if (typeof state != 'object' || state === null) {
      return
    }
    if (state.__aff_read_only) {
      return
    }

    if (!state.hasOwnProperty('$update')) {
      // set
      const app = this.app;
      Object.defineProperty(state, '$update', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function(...args) {
          app.update(...this.$path, ...args);
          return app.get(this.$path);
        },
      });
      Object.defineProperty(state, '$sub', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function(...args) {
          return app.sub(...this.$path, ...args);
        },
      });
      Object.defineProperty(state, '$path', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: base_path.slice(0),
      });

    } else {
      // update path
      state.$path = base_path.slice(0);
    }

    // recursively
    for (let key in state) {
      let sub_path = base_path.slice(0);
      sub_path.push(key);
      this.setupState(state[key], sub_path);
    }

  }
}

export function readOnly(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  Object.defineProperty(obj, '__aff_read_only', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: true,
  });
  return obj;
}

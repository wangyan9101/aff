import { State, SubState } from './state'
import { $any } from './operations'

export class MutableState extends State {
  constructor(init_state) {
    super();
    this.patch_tick = 1;
    this.dirty_tree = {};
    this.next_dirty_tree = {};
    this.state = init_state;
  }

  get() {
    return this.state;
  }

  update(...arg) {
    this.state = this.update_state(this.next_dirty_tree, this.state, ...arg);
  }

  update_state(dirty_tree, obj, ...args) {
    if (args.length === 0) {
      return obj;
    } else if (args.length === 1) {
      let ret;
      if (typeof args[0] === 'object' && args[0] !== null && args[0].__is_op) {
        ret = args[0].apply(obj, this);
        if (ret === obj) {
          this.setup_patch_tick(ret);
        }
      } else {
        ret = args[0];
      }
      return ret;
    } else {
      if (!obj) {
        obj = {};
      }
      if (typeof obj === 'object' && obj !== null) {
        if (!obj.hasOwnProperty('__aff_tick')) {
          this.setup_patch_tick(obj);
        }
        const key = args[0];
        for (const k in obj) {
          if (k == key || key === $any) {
            if (!dirty_tree[k]) {
              dirty_tree[k] = {};
            }
            obj[k] = this.update_state(dirty_tree[k], obj[k], ...args.slice(1));
          }
        }
        if (key !== $any && !(key in obj)) {
          if (!dirty_tree[key]) {
            dirty_tree[key] = {};
          }
          obj[key] = this.update_state(dirty_tree[key], undefined, ...args.slice(1));
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

  setup_patch_tick(obj) {
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

}

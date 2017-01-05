import { State } from './state'

export class MutableState extends State {
  constructor(init_state, app) {
    super();
    this.app = app;
    this.patch_tick = 1;
    this.state = init_state;
    this.setupState(this.state, [], false);
  }

  get() {
    return this.state;
  }

  update(...arg) {
    this.state = this.updateState([], this.state, ...arg);
  }

  updateState(base_path, obj, ...args) {
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
      let forceSetup = false;
      if (Array.isArray(obj) && Array.isArray(ret)) {
        // re-setup arrays conservatively
        forceSetup = true;
      }
      this.setupState(ret, base_path, forceSetup);
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
            let path = base_path.slice(0);
            path.push(k);
            obj[k] = this.updateState(path, obj[k], ...args.slice(1));
          } else if (key_type === 'function' && key(k)) {
            let path = base_path.slice(0);
            path.push(k);
            obj[k] = this.updateState(path, obj[k], ...args.slice(1));
          }
        }
        if ((key_type === 'string' || key_type === 'number') && !(key in obj)) {
          let path = base_path.slice(0);
          path.push(key);
          obj[key] = this.updateState(path, undefined, ...args.slice(1));
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
        const fromPath = arg.__aff_use_keys[key].slice(0);
        fromPath.pop();
        const tick = this.app.get(fromPath).__aff_tick;
        if (tick == this.patch_tick) {
          arg.__aff_tick = tick;
        }
      }
    }

    // patch_tick
    if (
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

  setupState(state, base_path ,forceSetup) {
    if (typeof state != 'object' || state === null) {
      return
    }
    if (state.__aff_read_only) {
      return
    }

    if (!state.hasOwnProperty('$update') || forceSetup) {
      // set
      const app = this.app;
      Object.defineProperty(state, '$update', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: function(...args) {
          app.update(...this.$path, ...args);
          return app.get(this.$path);
        },
      });
      Object.defineProperty(state, '$path', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: base_path.slice(0),
      });

    } else {
      if (!(state.$path.reduce((acc, cur, i) => 
        acc && cur == base_path[i], true))) {
        throw['cannot change state object path', base_path.slice(0), state.$path];
      }
    }

    // recursively
    for (let key in state) {
      let sub_path = base_path.slice(0);
      sub_path.push(key);
      this.setupState(state[key], sub_path, forceSetup);
    }

  }
}


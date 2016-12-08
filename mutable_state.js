import { State } from './state'

export class MutableState extends State {
  constructor(initState, app) {
    super();
    this.app = app;
    this.patchTick = 1;
    this.state = initState;
    this.setupState(this.state, [], false);
  }

  get() {
    return this.state;
  }

  update(...arg) {
    this.state = this.updateState([], this.state, ...arg);
  }

  updateState(basePath, obj, ...args) {
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
      this.setupState(ret, basePath, forceSetup);
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
        const keyType = typeof key;
        for (const k in obj) {
          if ((keyType === 'number' || keyType === 'string') && k == key) {
            let path = basePath.slice(0);
            path.push(k);
            obj[k] = this.updateState(path, obj[k], ...args.slice(1));
          } else if (keyType === 'function' && key(k)) {
            let path = basePath.slice(0);
            path.push(k);
            obj[k] = this.updateState(path, obj[k], ...args.slice(1));
          }
        }
        if ((keyType === 'string' || keyType === 'number') && !(key in obj)) {
          let path = basePath.slice(0);
          path.push(key);
          obj[key] = this.updateState(path, undefined, ...args.slice(1));
        }
        obj.__aff_tick = this.patchTick + 1;
        return obj;
      } else {
        throw['bad update path', obj, args];
      }
    }
  }

  beforePatch() {
    this.patchTick++;
  }

  setupPatchTick(obj) {
    if (obj.hasOwnProperty('__aff_tick')) {
      obj.__aff_tick = this.patchTick + 1;
    } else {
      Object.defineProperty(obj, '__aff_tick', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: this.patchTick + 1,
      });
    }
  }

  argsChanged(arg, lastArg) {
    const argType = typeof arg;

    // different type
    if (argType !== typeof lastArg) {
      return true;
    }

    // trigger update of used keys
    if (
      arg === lastArg
      && typeof arg === 'object'
      && arg != null
      && arg.__aff_use_keys
      && arg.__aff_tick_update_at != this.patchTick
    ) {
      for (const key in arg.__aff_use_keys) {
        const fromPath = arg.__aff_use_keys[key].slice(0);
        fromPath.pop();
        const tick = this.app.get(fromPath).__aff_tick;
        if (tick == this.patchTick) {
          Object.defineProperty(arg, '__aff_tick', {
            configurable: false,
            enumerable: false,
            writable: true,
            value: tick,
          });
        }
      }
      Object.defineProperty(arg, '__aff_tick_update_at', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: this.patchTick,
      });
    }

    // patchTick
    if (
      arg === lastArg 
      && typeof arg === 'object' 
      && arg !== null 
      && arg.__aff_tick === this.patchTick
    ) {
      return true;
    }

    // array
    else if (Array.isArray(arg) && Array.isArray(lastArg)) {
      // different length
      if (arg.length != lastArg.length) {
        return true;
      }
      // check items
      for (let i = 0; i < arg.length; i++ ){
        if (this.argsChanged(arg[i], lastArg[i])) {
          return true;
        }
      }
    } 

    // deep compare object
    else if (argType === 'object') {
      // different keys length
      if (Object.keys(arg).length != Object.keys(lastArg).length) {
        return true;
      }
      for (const key in arg) {
        if (this.argsChanged(arg[key], lastArg[key])) {
          return true;
        }
      }
    }

    // function
    else if (argType === 'function') {
      if (arg.name !== lastArg.name) {
        return true;
      }
    }

    // compare
    else if (arg !== lastArg) {
      return true;
    }

    return false;
  }

  setupState(state, basePath ,forceSetup) {
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
          app.update(...state.$path, ...args);
          return app.get(state.$path);
        },
      });
      Object.defineProperty(state, '$path', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: basePath.slice(0),
      });

    } else {
      if (!(state.$path.reduce((acc, cur, i) => 
        acc && cur == basePath[i], true))) {
        throw['cannot change state object path', basePath.slice(0), state.$path];
      }
    }

    // recursively
    for (let key in state) {
      let subPath = basePath.slice(0);
      subPath.push(key);
      this.setupState(state[key], subPath, forceSetup);
    }

  }
}


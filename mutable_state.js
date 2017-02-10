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

  updateState(statePath, object, ...args) {
    let obj = object;
    if (args.length === 0) {
      return obj;
    } else if (args.length === 1) {
      let ret;
      if (typeof args[0] === 'object' && args[0] !== null && args[0].__is_op) {
        ret = args[0].apply(obj, this);
        if (ret === obj) {
          this.setupPatchTick(ret);
          ret.__aff_tick = this.patchTick + 1;
        }
      } else {
        ret = args[0];
      }
      let forceSetup = false;
      if (Array.isArray(obj) && Array.isArray(ret)) {
        // re-setup arrays conservatively
        forceSetup = true;
      }
      this.setupState(ret, statePath, forceSetup);
      if (typeof ret === 'object' && ret !== null && !ret.hasOwnProperty('__aff_tick')) {
        this.setupPatchTick(ret);
        ret.__aff_tick = this.patchTick + 1;
      }
      return ret;
    } else {
      if (!obj) {
        obj = {};
      }
      if (typeof obj === 'object' && obj !== null) {
        if (!obj.hasOwnProperty('__aff_tick')) {
          this.setupPatchTick(obj);
          obj.__aff_tick = this.patchTick + 1;
        }
        const updateKey = (key, ...args) => {
          const path = statePath.slice(0);
          path.push(key);
          const value = this.updateState(path, ...args);
          obj[key] = value;
          if (typeof value !== 'object') {
            obj.__aff_sub_tick[key] = this.patchTick + 1;
          }
        }
        const key = args[0];
        const keyType = typeof key;
        for (const k in obj) {
          let match = false;
          if (keyType === 'number' && k == key) {
            match = true;
          } else if (keyType === 'string' && k == key) {
            match = true;
          } else if (keyType === 'function' && key(k)) {
            match = true;
          }
          if (match) {
            updateKey(k, obj[k], ...args.slice(1));
          } 
        }
        let match = false;
        if (keyType === 'string' && !(key in obj)) {
          match = true;
        } else if (keyType === 'number' && !(key in obj)) {
          match = true;
        }
        if (match) {
          updateKey(key, undefined, ...args.slice(1));
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
    Object.defineProperty(obj, '__aff_tick', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: this.patchTick + 1,
    });
    Object.defineProperty(obj, '__aff_sub_tick', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: {},
    });
  }

  argsChanged(arg, lastArg) {
    const argType = typeof arg;

    // different type
    if (argType !== typeof lastArg) {
      return true;
    }

    // trigger update of ref keys
    if (
      arg === lastArg
      && typeof arg === 'object'
      && arg != null
      && arg.__aff_ref_keys
      && arg.__aff_tick_update_at != this.patchTick
    ) {
      for (const key in arg.__aff_ref_keys) {
        const fromPath = arg.__aff_ref_keys[key].slice(0);
        const value = this.app.get(fromPath);
        // get tick
        let tick;
        if (value.__aff_tick) {
          tick = value.__aff_tick;
        } else if (typeof value !== 'object') { 
          // get from parent
          const key = fromPath.pop();
          const parentValue = this.app.get(fromPath);
          if (parentValue.__aff_sub_tick) {
            tick = parentValue.__aff_sub_tick[key];
          }
        }
        if (tick == this.patchTick) {
          if (!arg.hasOwnProperty('__aff_tick')) {
            this.setupPatchTick(arg);
          }
          arg.__aff_tick = tick;
          if (typeof value !== 'object') {
            // save tick in parent
            arg.__aff_sub_tick[key] = tick;
          }
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

  setupState(state, statePath ,forceSetup) {
    if (typeof state != 'object') {
      return
    } else if (state === null) {
      return
    } else if (state.__aff_read_only) {
      return
    }

    let needSetup = false;
    if (!state.hasOwnProperty('$update')) {
      needSetup = true;
    } else if (forceSetup) {
      needSetup = true;
    }
    if (needSetup) {
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
        value: statePath.slice(0),
      });

    } else {
      // no need to setup accessors, check path
      if (this.app.get(statePath) !== state) {
        // setting new state
        if (!(state.$path.reduce((acc, cur, i) => 
          acc && cur == statePath[i], true))) {
          throw['cannot change state object path', statePath.slice(0), state.$path];
        }
      }
    }

    // recursively
    for (const key in state) {
      const subPath = statePath.slice(0);
      subPath.push(key);
      this.setupState(state[key], subPath, forceSetup);
    }

  }
}


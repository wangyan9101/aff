import {object_add_tag, object_has_tag} from './object'

// operations and predictions

export let $inc = { op_inc: true };
export let $dec = { op_dec: true };
export let $any = { predict_any: true };

// update

export function update(obj, ...args) {
  if (args.length == 2) { 
    // the last path node
    let [path, op] = args;
    if (path === $any) {
      // match all path nodes
      for (let key in obj) {
        apply_op(obj, key, op);
      }
    } else {
      // match one path node
      apply_op(obj, path, op);
    }
  } else if (args.length > 2) { 
    // path finding
    let path = args[0];
    if (path === $any) {
      for (let key in obj) {
        update(obj[key], ...args.slice(1));
      }
    } else {
      update(obj[path], ...args.slice(1));
    }
  } else {
    throw['bad path and op to update()', args];
  }
  return obj
}

function apply_op(obj, key, op) {
  if (op === $inc) {
    // self increment
    obj[key]++;
  } else if (op === $dec) {
    // self decrement
    obj[key]--;
  } else {
    // default to set
    obj[key] = op;
  }
}

export function make_updater(obj, after, before) {
  return function(...args) {
    before && before();
    update(obj, ...args);
    after && after();
  }
}

export function make_debug_updater(obj, after, before) {
  return make_updater(obj, () => {
    console.log('%c AFTER  %o', 'background: #AAA; color: white',
      JSON.parse(JSON.stringify(state)));
    after && after();
  }, () => {
    before && before();
    console.log('%c BEFORE %o', 'background: #666; color: white', 
      JSON.parse(JSON.stringify(state)));
    console.log('%c CHANGE %o', 'background: #888; color: white',
      args);
  });
}

// path-copying update

export function copy_update(obj, ...args) {
  if (args.length == 0) {
    // no update
    return obj;
  } else if (args.length == 1) {
    // single op
    return copy_apply_op(obj, args[0]);
  } else {
    if (Array.isArray(obj)) { 
      // copy update array
      let index = args[0];
      let new_obj = [];
      let all_frozen = true;
      if (index === $any) {
        // update all indexes
        for (let i = 0; i < obj.length; i++) {
          new_obj.push(copy_update(obj[i], ...args.slice(1)));
          if (typeof obj[i] === 'object' && !object_has_tag(obj[i], 'frozen')) {
            all_frozen = false;
          }
        }
      } else {
        // only one index
        for (let i = 0; i < obj.length; i++) {
          if (i == index) {
            new_obj.push(copy_update(obj[i], ...args.slice(1)));
          } else {
            new_obj.push(obj[i]);
          }
          if (typeof obj[i] === 'object' && !object_has_tag(obj[i], 'frozen')) {
            all_frozen = false;
          }
        }
      }
      if (all_frozen) {
        object_add_tag(new_obj, 'frozen');
        Object.freeze(new_obj);
      }
      return new_obj;
    } else {
      // copy update object
      let key = args[0];
      let new_obj = {};
      let all_frozen = true;
      if (key === $any) {
        // update all keys
        for (let k in obj) {
          new_obj[k] = copy_update(obj[k], ...args.slice(1));
          if (typeof obj[k] === 'object' && !object_has_tag(obj[k], 'frozen')) {
            all_frozen = false;
          }
        }
      } else {
        // update single key
        let key_updated = false;
        for (let k in obj) {
          if (k === key) {
            new_obj[k] = copy_update(obj[k], ...args.slice(1));
            key_updated = true;
          } else {
            new_obj[k] = obj[k];
          }
          if (typeof obj[k] === 'object' && !object_has_tag(obj[k], 'frozen')) {
            all_frozen = false;
          }
        }
        if (!key_updated) { // insert
          new_obj[key] = args[1];
          if (typeof args[1] === 'object' && !object_has_tag(args[1], 'frozen')) {
            all_frozen = false;
          }
        }
      }
      if (all_frozen) {
        object_add_tag(new_obj, 'frozen');
        Object.freeze(new_obj);
      }
      return new_obj;
    }
  }
}

function copy_apply_op(obj, op) {
  if (op === $inc) {
    return obj + 1;
  } else if (op === $dec) {
    return obj - 1;
  } else {
    // default to return op
    return op;
  }
} 

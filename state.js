import {object_add_tag, object_has_tag} from './object'

// operations and predictions

export let $inc = { __op_inc: true };
export let $dec = { __op_dec: true };
export let $merge = (obj) => ({
  __op_merge: true,
  object: obj,
});
export let $push = (obj) => ({
  __op_push: true,
  object: obj,
});
export let $del_at = (i) => ({
  __op_del_at: true,
  i: i,
});
export let $array_filter = (fn) => ({
  __op_array_filter: true,
  fn: fn,
});

export let $any = { __predict_any: true };

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
          if (k == key) {
            new_obj[k] = copy_update(obj[k], ...args.slice(1));
            key_updated = true;
          } else {
            let desc = Object.getOwnPropertyDescriptor(obj, k);
            let getter = desc.get;
            let setter = desc.set;
            if (getter || setter) {
              Object.defineProperty(new_obj, k, {
                get: getter,
                set: setter,
                enumerable: true,
              });
            } else {
              new_obj[k] = obj[k];
            }
          }
          if (typeof obj[k] === 'object' && !object_has_tag(obj[k], 'frozen')) {
            all_frozen = false;
          }
        }
        if (!key_updated) { // insert
          new_obj[key] = copy_update(undefined, ...args.slice(1));
          if (typeof obj[key] === 'object' && !object_has_tag(obj[key], 'frozen')) {
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
    return (obj || 0) + 1;
  } else if (op === $dec) {
    return obj - 1;
  } else if (op.__op_merge) {
    for (let key in op.object) {
      let o2 = op.object[key];
      if (typeof o2 == 'object' && !Array.isArray(o2)) {
        obj = copy_update(obj, key, $merge(o2));
      } else {
        obj = copy_update(obj, key, o2);
      }
    }
    return obj;
  } else if (op.__op_push) {
    let o2 = [];
    o2.push(...obj);
    o2.push(op.object);
    return o2;
  } else if (op.__op_del_at) {
    let o2 = [];
    for (let i = 0; i < obj.length; i++) {
      if (i != op.i) {
        o2.push(obj[i]);
      }
    }
    return o2;
  } else if (op.__op_array_filter) {
    let o2 = [];
    for (let i = 0; i < obj.length; i++) {
      if (op.fn(obj[i])) {
        o2.push(obj[i]);
      }
    }
    return o2;
  } else {
    // default to return op
    return op;
  }
} 

export function freeze_all(obj) {
  for (let k in obj) {
    if (typeof obj[k] == 'object') {
      freeze_all(obj[k]);
    }
  }
  object_add_tag(obj, 'frozen');
  Object.freeze(obj);
}

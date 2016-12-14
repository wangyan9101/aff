import {object_add_tag, object_has_tag} from './object'

// operations 

export let $inc = {
  __is_op: true,
  op: 'inc',
  apply(obj) {
    return (obj || 0) + 1;
  },
};

export let $dec = {
  __is_op: true,
  op: 'dec',
  apply(obj) {
    return obj - 1;
  },
};

export let $merge = (spec) => ({
  __is_op: true,
  op: 'merge',
  args: [spec],
  apply(obj) {
    if (Array.isArray(spec)) {
      return copy_update(obj, ...spec);
    }
    for (let key in spec) {
      let o2 = spec[key];
      if (typeof o2 == 'object' && !Array.isArray(o2) && !o2.__is_op) {
        obj = copy_update(obj, key, $merge(o2));
      } else {
        obj = copy_update(obj, key, o2);
      }
    }
    return obj;
  },
});

export let $push = (elem) => ({
  __is_op: true,
  op: 'push',
  args: [elem],
  apply(obj) {
    let o2 = [];
    o2.push(...obj);
    o2.push(elem);
    return o2;
  },
});

export let $reduce = (fn, accumulated, what = 'reduce') => ({
  __is_op: true,
  op: what,
  args: [fn, accumulated],
  apply(obj) {
    for (let key in obj) {
      accumulated = fn(accumulated, obj[key], key);
    }
    return accumulated;
  },
});

export let $del_at = (i) => $reduce((acc, cur, index) => {
  if (index != i) {
    acc.push(cur);
  }
  return acc;
}, [], 'del_at');

export let $map = (fn) => $reduce((acc, cur, index) => {
  acc.push(fn(cur));
  return acc;
}, [], 'map');

export let $filter = (fn) => ({
  __is_op: true,
  op: 'filter',
  args: [fn],
  apply(obj) {
    if (typeof obj == 'object') {
      if (Array.isArray(obj)) {
        let o2 = [];
        for (let i = 0; i < obj.length; i++) {
          if (fn(obj[i], i)) {
            o2.push(obj[i]);
          }
        }
        return o2;
      } else {
        let o2 = {};
        for (let k in obj) {
          if (fn(obj[k], k)) {
            o2[k] = obj[k];
          }
        }
        return o2;
      }
    } else {
      return fn(obj);
    }
  },
});

// predictions

export let $any = { __predict_any: true };

// path-copying update

export function copy_update(obj, ...args) {
  if (args.length == 0) {
    // no update
    return obj;
  } else if (args.length == 1) {
    // single op
    if (args[0].__is_op) {
      return freeze_all(args[0].apply(obj));
    } else {
      return freeze_all(args[0]);
    }
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
          if (typeof new_obj[i] === 'object' && !object_has_tag(new_obj[i], 'frozen')) {
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
          if (typeof new_obj[i] === 'object' && !object_has_tag(new_obj[i], 'frozen')) {
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
          if (typeof new_obj[k] === 'object' && !object_has_tag(new_obj[k], 'frozen')) {
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
          if (typeof new_obj[k] === 'object' && !object_has_tag(new_obj[k], 'frozen')) {
            all_frozen = false;
          }
        }
        if (!key_updated) { // insert
          new_obj[key] = copy_update(undefined, ...args.slice(1));
          if (typeof new_obj[key] === 'object' && !object_has_tag(new_obj[key], 'frozen')) {
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

export function freeze_all(obj) {
  if (typeof obj !== 'object' || object_has_tag(obj, 'frozen')) {
    return obj
  }
  for (let k in obj) {
    if (typeof obj[k] == 'object') {
      freeze_all(obj[k]);
    }
  }
  object_add_tag(obj, 'frozen');
  Object.freeze(obj);
  return obj;
}

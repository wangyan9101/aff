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
  }
};

export let $merge = (spec) => ({
  __is_op: true,
  op: 'merge',
  args: [spec],
  apply(obj, app) {
    if (Array.isArray(spec)) {
      return app.update_state(app.dirty_tree, obj, ...spec);
    }
    for (let key in spec) {
      let o2 = spec[key];
      if (typeof o2 == 'object' && !Array.isArray(o2) && !o2.__is_op) {
        obj = app.update_state(app.dirty_tree, obj, key, $merge(o2));
      } else {
        obj = app.update_state(app.dirty_tree, obj, key, o2);
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
    obj.push(elem);
    return obj;
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
          if (fn(obj[k], k) === true) {
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

// utils

export function pick(obj, ...keys) {
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      let new_obj = [];
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (obj[key] !== undefined) {
          new_obj.push(obj[key]);
        }
      }
      return new_obj;
    } else {
      let new_obj = {};
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (obj[key] !== undefined) {
          new_obj[key] = obj[key];
        }
      }
      return new_obj;
    }
  } else {
    throw['not pickable', obj, keys];
  }
}

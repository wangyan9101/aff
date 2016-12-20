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
  apply(obj) {
    if (Array.isArray(spec)) {
      return versioned_update(obj, ...spec);
    }
    for (let key in spec) {
      let o2 = spec[key];
      if (typeof o2 == 'object' && !Array.isArray(o2) && !o2.__is_op) {
        obj = versioned_update(obj, key, $merge(o2));
      } else {
        obj = versioned_update(obj, key, o2);
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

// versioned update

export function versionize(obj) {
  if (typeof obj !== 'object') {
    return
  }
  if (obj.hasOwnProperty('__aff_version')) {
    obj.__aff_version++;
    return
  }
  for (let k in obj) {
    versionize(obj[k]);
  }
  Object.defineProperty(obj, '__aff_version', {
    configurable: false,
    enumerable: false,
    writable: true,
    value: 1,
  });
}

export function versioned_update(obj, ...args) {
  if (args.length === 0) {
    return obj;
  } else if (args.length === 1) {
    let ret;
    if (typeof args[0] === 'object' && args[0].__is_op) {
      ret = args[0].apply(obj);
    } else {
      ret = args[0];
    }
    versionize(ret);
    return ret;
  } else {
    if (!obj) {
      obj = {};
    }
    if (typeof obj === 'object') {
      if (!obj.hasOwnProperty('__aff_version')) {
        versionize(obj);
      }
      let key = args[0];
      for (let k in obj) {
        if (k == key || key === $any) {
          obj[k] = versioned_update(obj[k], ...args.slice(1));
        }
      }
      if (key !== $any && !(key in obj)) {
        obj[key] = versioned_update(undefined, ...args.slice(1));
      }
      obj.__aff_version++;
      return obj;
    } else {
      throw['bad update path', obj, args];
    }
  }
}

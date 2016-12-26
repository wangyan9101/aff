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

export const $any = { __predict_any: true };

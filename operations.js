// operations

export let $func = (fn) => ({
  __is_op: true,
  op: 'func',
  args: [fn],
  apply(obj) {
    return fn(obj);
  },
});

export let $delete = (prop) => ({
  __is_op: true,
  op: 'delete',
  args: [prop],
  apply(obj) {
    delete obj[prop];
    return obj;
  },
});

export let $del = $delete;

// numbers

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

// arrays

let arrayOps = {};

[
  ['push', Array.prototype.push],
  ['unshift', Array.prototype.unshift],
  ['splice', Array.prototype.splice],
  ['fill', Array.prototype.fill],
  ['sort', Array.prototype.sort],
].forEach(info => {
  arrayOps['$' + info[0]] = ((name, method) => {
    return function(...args) {
      return {
        __is_op: true,
        op: name,
        args: args,
        apply(obj) {
          method.apply(obj, args);
          return obj;
        },
      };
    };
  })(...info);
});

[
  ['filter', Array.prototype.filter],
  ['map', Array.prototype.map],
].forEach(info => {
  arrayOps['$' + info[0]] = ((name, method) => {
    return function(...args) {
      return {
        __is_op: true,
        op: name,
        args: args,
        apply(obj) {
          return method.apply(obj, args);
        },
      };
    };
  })(...info);
});

[
  ['pop', Array.prototype.pop],
  ['shift', Array.prototype.shift],
  ['reverse', Array.prototype.reverse],
].forEach(info => {
  arrayOps['$' + info[0]] = ((name, method) => {
    return {
      __is_op: true,
      op: name,
      apply(obj) {
        method.apply(obj);
        return obj;
      },
    };
  })(...info);
});

export let {
  $push,
  $unshift,
  $splice,
  $fill,
  $sort,
  $filter,
  $map,
  $pop,
  $shift,
  $reverse,
} = arrayOps;

// objects

export function $merge(spec) {
  return {
    __is_op: true,
    op: 'merge',
    args: [spec],
    apply(obj) {
      return _merge(obj, spec);
    },
  };
}

function _merge(obj, spec) {
  if (typeof spec === 'object' && spec !== null) {
    if (spec.__is_op) {
      return spec.apply(obj);
    }
    if (typeof obj !== 'object' || obj === null) {
      obj = {};
    }
    for (const key in spec) {
      obj[key] = _merge(obj[key], spec[key]);
    }
  } else {
    return spec;
  }
  return obj;
}

// predictions

export function $any(k) {
  return true;
}

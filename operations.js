// operations 

let $func = (fn) => ({
  __is_op: true,
  op: 'func',
  args: [fn],
  apply(obj) {
    return fn(obj);
  },
});

let $delete = (prop) => ({
  __is_op: true,
  op: 'delete',
  args: [prop],
  apply(obj) {
    delete obj[prop];
    return obj;
  },
});

let $del = $delete;

// numbers

let $inc = {
  __is_op: true,
  op: 'inc',
  apply(obj) {
    return (obj || 0) + 1;
  },
};

let $dec = {
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

// predictions

function $any(k) {
  return true;
}

// export

module.exports = {
  $func,
  $delete,
  $del,
  $inc,
  $dec,
  ...arrayOps,
  $any,
};

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
  return function(...args) {
    console.log('%c BEFORE %o', 'background: #666; color: white', 
      JSON.parse(JSON.stringify(state)));
    console.log('%c CHANGE %o', 'background: #888; color: white',
      args);
    before && before();
    update(obj, ...args);
    after && after();
    console.log('%c AFTER  %o', 'background: #AAA; color: white',
      JSON.parse(JSON.stringify(state)));
  }
}

// path-copying update

export function copy_update(obj, ...args) {
  //TODO
}

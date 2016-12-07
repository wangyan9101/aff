export function make_updater(state, render) {
  return function (...args) {
    //console.log('%c BEFORE %o', 'background: #666; color: white', 
    //  JSON.parse(JSON.stringify(state)));
    //console.log('%c CHANGE %o', 'background: #888; color: white', args);
    _update(state, ...args);
    //console.log('%c AFTER  %o', 'background: #AAA; color: white',
    //  JSON.parse(JSON.stringify(state)));
    render();
  }
}

export let $inc = { op_inc: true };
export let $dec = { op_dec: true };
export let $any = { predict_any: true };

function _update(obj, ...args) {
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
    _update(obj[args[0]], ...args.slice(1));
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


export function equal(a, b) {
  let type_a = typeof a;
  let type_b = typeof b;
  if (type_a !== type_b) {
    return false;
  }
  if (type_a === 'undefined') {
    return true;
  } else if (type_a === 'object') {
    let keys_a = Object.keys(a);
    let keys_b = Object.keys(b);
    if (keys_a.length != keys_b.length) {
      return false;
    }
    for (let key in a) {
      if (!equal(a[key], b[key])) {
        return false;
      }
    }
    return true;
  } else {
    return a === b;
  }
}



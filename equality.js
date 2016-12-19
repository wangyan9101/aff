export function equal(a, b, a_version_info, b_version_info) {
  let type_a = typeof a;
  let type_b = typeof b;
  if (type_a !== type_b) {
    return false;
  }
  if (type_a === 'undefined') {
    return true;
  } else if (type_a === 'object') {
    // versioned objects
    if (a.hasOwnProperty('__aff_version') && b.hasOwnProperty('__aff_version') && a === b) {
      if (!a_version_info || !b_version_info) {
        return false;
      }
      let va = a_version_info;
      if (typeof va === 'object') {
        va = va.version;
      }
      let vb = b_version_info;
      if (typeof vb === 'object') {
        vb = vb.version;
      }
      return va === vb;
    }
    // deep compare
    let keys_a = Object.keys(a);
    let keys_b = Object.keys(b);
    if (keys_a.length != keys_b.length) {
      return false;
    }
    for (let key in a) {
      if (!equal(
          a[key], b[key],
          a_version_info && a_version_info.subs ? a_version_info.subs[key] : undefined,
          b_version_info && b_version_info.subs ? b_version_info.subs[key] : undefined,
        )) {
        return false;
      }
    }
    return true;
  } else if (type_a === 'function') {
    return a.name === b.name;
  } else {
    return a === b;
  }
}


export function pick(obj, ...keys) {
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      const new_obj = [];
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (obj[key] !== undefined) {
          new_obj.push(obj[key]);
        }
      }
      return new_obj;
    } else {
      const new_obj = {};
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
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


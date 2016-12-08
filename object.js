export function object_add_tag(obj, tag) {
  Object.defineProperty(obj, '__tag_' + tag, {
    __proto__: null,
    value: true,
  });
}

export function object_has_tag(obj, tag) {
  return obj['__tag_' + tag] === true;
}

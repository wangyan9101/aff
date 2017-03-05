export class State {
  get() {}
  update() {}
  beforePatch() {}
  argsChanged() {}
}

export function readOnly(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  Object.defineProperty(obj, '__aff_read_only', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: true,
  });
  return obj;
}

export class Reference {
  constructor(name) {
    this.name = name;
  }
}

export function ref(name) {
  return new Reference(name);
}

export class WeakReference extends Reference {
  constructor(name) {
    super(name);
  }
}

export function weakRef(name) {
  return new WeakReference(name);
}

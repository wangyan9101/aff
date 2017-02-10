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

export function Updater(args) {
  this.args = args;
}

export function updater(...args) {
  return new Updater(args);
}

export function StateWrapper(name, func) {
  this.name = name;
  this.func = func;
}

export function withState(name, func) {
  return new StateWrapper(name, func);
}

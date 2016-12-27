export class State {
  init(arg) {}
  get() {}
  update() {}
  beforePatch() {}
  argsChanged() {}
}

export class SubState {
  constructor(app, path) {
    this.app = app;
    this.path = path;
  }

  get() {
    return this.app.get(this.path);
  }

  update(...args) {
    return this.app.update(...this.path, ...args);
  }

  sub(...args) {
    let subpath = args;
    if (subpath.length == 1 && Array.isArray(subpath[0])) {
      subpath = subpath[0];
    }
    return new SubState(this.app, [...this.path, ...subpath]);
  }
}


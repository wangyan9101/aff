import {
  versioned_update, versionize,
} from './state'
import {patch} from './dom'

export class App {
  constructor(...args) {
    this.node = null;
    this.patching = false;
    this.updated = false;
    this.init(...args);
  }

  init(...args) {
    for (let i = 0; i < args.length; i++) {
      let arg = args[i];
      if (arg instanceof HTMLElement) {
        this.element = arg;
      } else if (typeof arg == 'function') {
        this.node_func = arg;
      } else {
        this.state = arg;
        versionize(this.state);
      }
    }
    if (this.element && this.node_func && this.state) {
      this.update('__initialized', true);
    }
  }

  beforeUpdate() {
  }

  afterUpdate() {
  }

  update(...args) {
    this.beforeUpdate(this.state, ...args);
    this.state = versioned_update(this.state, ...args);
    this.afterUpdate(this.state, ...args);
    if (!this.patching) {
      this.patching = true;
      this.updated = false;
      [this.element, this.node] = patch(this.element, this.node_func(this.state, this.update.bind(this)), this.node);
      while (this.updated) {
        // if state is updated when patching, patch again
        this.updated = false;
        [this.element, this.node] = patch(this.element, this.node_func(this.state, this.update.bind(this)), this.node);
      }
      this.patching = false;
    } else {
      // state updated when patching
      this.updated = true;
    }
    return this.state;
  }

  tap(fn) {
    let res = fn(this.state);
    if (res) {
      this.update(...(Array.isArray(res) ? res : [res]));
    }
  }

  html() {
    return this.element.innerHTML;
  }

}


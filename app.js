import {copy_update, freeze_all} from './state'
import {patch} from './dom'

export class App {
  constructor(element, node_func, init_state = {}) {
    this.element = element;
    this.node_func = node_func;
    this.state = init_state;
    freeze_all(this.state);
    this.node = null;
    this.patching = false;
    this.updated = false;
    this.update('__initialized', true);
  }

  beforeUpdate() {
  }

  afterUpdate() {
  }

  update(...args) {
    this.beforeUpdate(this.state, ...args);
    this.state = copy_update(this.state, ...args);
    this.afterUpdate(this.state, ...args);
    if (!this.patching) {
      this.patching = true;
      this.updated = false;
      [this.element, this.node] = patch(this.element, this.node_func(this.state, this.update), this.node);
      while (this.updated) {
        // if state is updated when patching, patch again
        this.updated = false;
        [this.element, this.node] = patch(this.element, this.node_func(this.state, this.update), this.node);
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

export function make_app(element, node_func, init_state) {
  return new App(element, node_func, init_state);
}


import {copy_update, freeze_all} from './state'
import {patch} from './dom'

export function make_app(element, node_func, init_state = {}) {
  let state = init_state;
  freeze_all(state);
  let node;
  let patching;
  let updated;
  function update(...args) {
    state = copy_update(state, ...args);
    if (!patching) {
      patching = true;
      updated = false;
      [element, node] = patch(element, node_func(state, update), node);
      while (updated) {
        // if state is updated when patching, patch again
        updated = false;
        [element, node] = patch(element, node_func(state, update), node);
      }
      patching = false;
    } else {
      // state updated when patching
      updated = true;
    }
    return state;
  }
  function tap(fn) {
    fn(state);
  }
  update('__start', true);
  return {
    update: update,
    tap: tap,
  };
}

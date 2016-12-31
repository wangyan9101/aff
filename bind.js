import { on } from './event'

export function bind_focus(state) {
  const path = state.path.join(':');
  return {
    ['onfocus$' + path]: function() {
      state.update(true);
    },
    ['onblur$' + path]: function() {
      state.update(false);
    },
  };
}

export function bind_enter(state) {
  const path = state.path.join(':');
  return {
    ['onmouseenter$' + path]: function() {
      state.update(true);
    },
    ['onmouseleave$' + path]: function() {
      state.update(false);
    },
  };
}

export function bind_over(state) {
  const path = state.path.join(':');
  return {
    ['onmouseover$' + path]: function() {
      state.update(true);
    },
    ['onmouseout$' + path]: function() {
      state.update(false);
    },
  };
}

export let bind_hover = bind_over;

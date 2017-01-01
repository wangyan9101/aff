import { on } from './event'

export function bindFocus(state) {
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

export function bindEnter(state) {
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

export function bindOver(state) {
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

export let bindHover = bindOver;

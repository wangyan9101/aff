import { on } from './event'

export function bindFocus(state, name) {
  let path = state.$path.slice(0);
  path.push(name);
  path = path.join(':');
  return {
    ['onfocus$' + path]: function() {
      state.$update(name, true);
    },
    ['onblur$' + path]: function() {
      state.$update(name, false);
    },
  };
}

export function bindEnter(state, name) {
  let path = state.$path.slice(0);
  path.push(name);
  path = path.join(':');
  return {
    ['onmouseenter$' + path]: function() {
      state.$update(name, true);
    },
    ['onmouseleave$' + path]: function() {
      state.$update(name, false);
    },
  };
}

export function bindOver(state, name) {
  let path = state.$path.slice(0);
  path.push(name);
  path = path.join(':');
  return {
    ['onmouseover$' + path]: function() {
      state.$update(name, true);
    },
    ['onmouseout$' + path]: function() {
      state.$update(name, false);
    },
  };
}

export let bindHover = bindOver;

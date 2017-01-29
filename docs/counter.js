import { App, label, button, div, on } from 'affjs'

const app = new App(
  document.getElementById('app'),
  {
    n1: 0,
    n2: 0,
  },
  (state) => div(
    Counter(
      state.n1,
      (x) => state.$update('n1', x),
    ),
    Counter(
      state.n2,
      (x) => state.$update('n2', x),
    ),
  ),
);

function Counter(n, update) {
  return div(
    button('+', on('click', () => {
      update(n + 1);
    })),
    button('-', on('click', () => {
      if (n > 0) {
        update(n - 1);
      }
    })),
    label(n),
  );
}

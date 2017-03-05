import { App, h, t, on, weakRef, op } from 'affjs'

const app = new App(
    document.getElementById('app'),
    {
      list: [1, 2, 3, 4, 5, 6, 7, 8],
      Elem: {
        list: weakRef('list'),
      },
    },
    Main,
);

function Main(state) {
  return h.ul(
      state.list.map((v, i) => t(Elem, state.Elem, v, i)),
  );
}

function Elem(state, v, i) {
  return h.li(
      h.span(v),
      h.button('X', on('click', () => {
        state.list.$update(op.splice(i, 1));
      })),
  );
}

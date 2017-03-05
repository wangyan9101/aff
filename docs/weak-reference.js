import { App, weakRef, t, h, on } from 'affjs'

const app = new App(
    document.getElementById('app'),
    {
      foo: 'foo',
      Element: {
        foo: weakRef('foo'),
      },
    },
    Main,
);

function Main(state) {
  return h.div(
      t(Element, state.Element),

      h.button('change foo', on('click', () => {
        state.$update('foo', 'FOO');
      })),

      h.span(state.foo),
  );
}

function Element(state) {
  return h.span(state.foo);
}

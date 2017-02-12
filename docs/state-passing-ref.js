import { App, div, t, ref } from 'affjs'

const app = new App(
  document.getElementById('app'),
  {
    foo: 'FOO',
    OutterWrapper: {
      Wrapper: {
        InnerWrapper: {
          Element: {
            foo: ref('foo'),
          },
        },
      },
    },
  },
  Main,
);

function Main(state) {
  return t(OutterWrapper, state.OutterWrapper);
};

function OutterWrapper(state) {
  return t(Wrapper, state.Wrapper);
};

function Wrapper(state) {
  return t(InnerWrapper, state.InnerWrapper);
};

function InnerWrapper(state) {
  return t(Element, state.Element);
};

function Element(state) {
  return div(state.foo);
}


import { App, div, t } from 'affjs'

const app = new App(
  document.getElementById('app'),
  {
    foo: 'FOO',
  },
  Main,
);

function Main(state) {
  return t(OutterWrapper, {
    foo: state.foo,
  });
};

function OutterWrapper(state) {
  return t(Wrapper, {
    foo: state.foo,
  });
};

function Wrapper(state) {
  return t(InnerWrapper, {
    foo: state.foo,
  });
};

function InnerWrapper(state) {
  return t(Element, {
    foo: state.foo,
  });
};

function Element(state) {
  return div(state.foo);
}


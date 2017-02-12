import { App, div, t, ref } from 'affjs'

const app = new App(
  document.getElementById('app'),

  {
    r: 0,
    g: 0,
    b: 0,
    rgb: '',

    MaintainRGB: {
      r: ref('r'),
      g: ref('g'),
      b: ref('b'),
    },
  },

  Main,
);

function Main(state) {
  return div(
    t(MaintainRGB, state.MaintainRGB, (newVal) => {
      state.$update('rgb', newVal);
    }),

    div(state.rgb),
  );
}

function MaintainRGB(state, update) {
  update(`rgb(${state.r}, ${state.g}, ${state.b})`);
  return null;
}

import { App, div, t, updater } from 'affjs'

const app = new App(
  document.getElementById('app'),

  {
    r: 0,
    g: 0,
    b: 0,
    rgb: '',

    MaintainRGB: {
      $ref: ['r', 'g', 'b'],
      update: updater('rgb'),
    },
  },

  Main,
);

function Main(state) {
  return div(
    t(MaintainRGB, state.MaintainRGB),

    div(state.rgb),
  );
}

function MaintainRGB(state) {
  state.update(`rgb(${state.r}, ${state.g}, ${state.b})`);
  return null;
}

import { App, div, t, updater, ref } from 'affjs'

const app = new App(
  document.getElementById('app'),

  {
    r: 40,
    g: 50,
    b: 60,
    rgb: '',

    MaintainRGB: {
      r: ref('r'),
      g: ref('g'),
      b: ref('b'),
      update: updater('rgb', (updateRGB, r, g, b) => {
        updateRGB(`rgb(${r}, ${g}, ${b})`);
      }),
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
  state.update(state.r, state.g, state.b);
  return null;
}

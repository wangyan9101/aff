import { App, css, div, span, DebugPanel } from 'affjs'

const app = new App(
  document.getElementById('app'),
  // 状态
  {
    foo: 0,
    bar: [1, 2, 3],
    baz: {
      a: 'baz',
      b: 'Baz',
      c: 'BAZ',
    },
  },
  // 根组件
  (state, app) => div(

    // 显示状态
    div('foo: ', state.foo),
    div('bar: ', state.bar.map(num => span(num, css`
      padding: 0 10px;
    `))),
    () => {
      const ret = [
        div('baz: '),
      ];
      for (const key in state.baz) {
        ret.push(div(key, ' = ', state.baz[key]));
      }
      return ret;
    },

    // 引入调试面板
    DebugPanel(app, {
      // 默认是不显示的，配置成显示
      show: true,
      // 默认是占满页面，配置成露出左边
      left: '30%',
    }),
  ),
);

app.update('foo', $inc);
app.update('bar', $map(v => v * 2));
app.update('baz', 'b', 'baZ');

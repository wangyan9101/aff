import { MutableState, App, h, t, wo, op } from '../index'

test('args change', () => {
  let state = new MutableState();
  expect(state.argsChanged({
    a: 'A',
    b: 'B',
  }, {
    a: 'A',
  })).toBe(true);
  expect(state.argsChanged(1, '42')).toBe(true);
  let f = () => {}
  expect(state.argsChanged(f, () => {})).toBe(true);
});

test('function arg', () => {
  const root = document.createElement('div');
  const element = document.createElement('div');
  root.appendChild(element);
  let n = 0;
  const app = new App(
      element,
      {
        dict: {
          foo: 'FOO',
          bar: 'BAR',
          baz: 'BAZ',
        },
        ids: ['foo', 'bar', 'baz'],
        Foo: {
          dict: wo('dict'),
          fn: () => {},
        },
      },
      (state) => h.div(
        state.ids.map(id => t('Foo', (state, id) => {
          n++;
          const v = state.dict[id];
          return h.p(v);
        }, state.Foo, id)),
      ),
  );
  expect(n).toBe(3);
  app.update();
  expect(n).toBe(3);
  expect(root.innerHTML).toBe('<div><p>FOO</p><p>BAR</p><p>BAZ</p></div>');
  app.state.ids.$update(op.shift);
  expect(root.innerHTML).toBe('<div><p>BAR</p><p>BAZ</p></div>');
  expect(n).toBe(5);
  app.state.ids.$update(0, 'foo');
  expect(n).toBe(6);
});

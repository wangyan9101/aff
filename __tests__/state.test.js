import { State, App, wo, h, t } from '../index'

test('cover', () => {
  let state = new State();
  state.get();
  state.update();
  state.beforePatch();
  state.argsChanged();
});

test('parent state', () => {
  return
  const app = new App({
    foo: 42,
    Sub: {
      Sub: {
        Sub: {
          updateFoo: function() {
            const obj = this.$findParent(p => p.hasOwnProperty('foo'));
            obj.foo = 5;
          },
        },
      },
    },
  });
  app.state.Sub.Sub.Sub.updateFoo();
  expect(app.state.foo).toBe(5);
});

test('write only state', () => {
  const root = document.createElement('div');
  const element = document.createElement('div');
  root.appendChild(element);
  let n = 0;
  const app = new App(
      element,
      {
        foo: {
          bar: 5,
        },
        Element: {
          foo: wo('foo'),
        },
      },
      (state) => h.div(
        t('Element', (state) => {
          n++
          return null
        }, state.Element),
      ),
  );
  expect(n).toBe(1);
  expect(app.state.Element.foo.bar).toBe(5)
  app.state.foo.$update('bar', 6);
  expect(app.state.Element.foo.bar).toBe(6);
  app.state.Element.foo.$update('bar', 7);
  expect(app.state.Element.foo.bar).toBe(7);
  expect(app.state.foo.bar).toBe(7);
  app.state.Element.foo = 9;
  expect(app.state.foo).toBe(9);
});

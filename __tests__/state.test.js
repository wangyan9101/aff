import { State, App } from '../index'

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

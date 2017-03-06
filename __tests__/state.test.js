import { State, App, weakRef, h, t, cached, op, wrap } from '../index'

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
          foo: weakRef('foo'),
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
  expect(n).toBe(1);
  expect(app.state.Element.foo.bar).toBe(6);
  app.state.Element.foo.$update('bar', 7);
  expect(app.state.Element.foo.bar).toBe(7);
  expect(app.state.foo.bar).toBe(7);
  app.state.Element.foo = 9;
  expect(app.state.foo).toBe(9);
});

test('cached and wrap', () => {
  const root = document.createElement('div');
  const element = document.createElement('div');
  root.appendChild(element);
  let nCalled = 0;
  let fn;
  const app = new App(
      element,
      {
        users: {
          0: {
            name: 'foo',
          },
          1: {
            name: 'bar',
          },
          2: {
            name: 'baz',
          },
        },
        userIds: [0, 1, 2],

        User: cached(function(userID) {
          const user = this.users[userID];
          return wrap(user, {
            rename: () => {
              user.$update('name', op.func(name => name.toUpperCase()));
            },
          });
        }),
      },

      (state) => h.div(
        state.userIds.map(userID => t('User', (state) => {
          nCalled++;
          if (userID == 0) {
            fn = state.rename;
          }
          return h.div(state.name);
        }, state.User(userID))),
      ),
  );
  expect(nCalled).toBe(3);
  expect(root.innerHTML).toBe('<div><div>foo</div><div>bar</div><div>baz</div></div>');
  fn();
  expect(nCalled).toBe(4);
  expect(root.innerHTML).toBe('<div><div>FOO</div><div>bar</div><div>baz</div></div>');
});

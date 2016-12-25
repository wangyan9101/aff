import { alias } from '../alias'
import { App } from '../app'

test('alias', () => {
  let init_state = {
    foo: 'FOO',
    foo2: alias('foo'),
  };
  let app = new App(init_state);

  // init alias
  expect(app.state.foo).toBe('FOO');
  expect(app.state.foo2).toBe('FOO');
  // update by alias
  app.update('foo', 'foo');
  expect(app.state.foo).toBe('foo');
  expect(app.state.foo2).toBe('foo');
  // update by alias
  app.update('foo2', 'FOO');
  expect(app.state.foo).toBe('FOO');
  expect(app.state.foo2).toBe('FOO');

  app.update('foo3', {
    foo: alias('foo2'),
  });
  // alias in updated value
  expect(app.state.foo3.foo).toBe('FOO');
  // update by alias
  app.update('foo3', 'foo', 'foo');
  expect(app.state.foo3.foo).toBe('foo');
  expect(app.state.foo2).toBe('foo');
  expect(app.state.foo).toBe('foo');

  app.update('foo4', {
    foo: 'FOO',
  });
  app.update('foo5', alias('foo4'));
  expect(app.state.foo5.foo).toBe('FOO');
  // update sub-state by alias
  app.update('foo5', 'foo', 42);
  expect(app.state.foo5.foo).toBe(42);
  expect(app.state.foo4.foo).toBe(42);

  // deep nested alias
  app.update('foo', 'FOO');
  app.update('foo6', {
    a: {
      b: {
        c: {
          d: {
            e: alias('foo'),
          },
        },
      },
    },
  });
  expect(app.state.foo6.a.b.c.d.e).toBe('FOO');
  app.update('foo6', 'a', 'b', 'c', 'd', 'e', 'foo');
  expect(app.state.foo6.a.b.c.d.e).toBe('foo');
  expect(app.state.foo).toBe('foo');
});

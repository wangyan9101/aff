import { App, updater, $del } from '../index'

test('updater', () => {
  const app = new App(
    {
      foo: 'foo',
      updateFoo: updater('foo'),
    },
  );
  app.state.updateFoo('FOO');
  expect(app.state.foo).toBe('FOO');
});

test('bad updater', () => {
  expect(() => {
    const app = new App(
      {
        foo: 'foo',
        updateFoo: updater('bar'),
      },
    );
  }).toThrowError('no state named bar');
});

test('state path change', () => {
  const app = new App({
    foo: {
      foo: 'foo',
      bar: 'bar',
      baz: 'baz',
    },
    C1: {
      $ref: ['foo'],
      C2: {
        updateFoo: updater('foo'),
      },
    },
  });
  app.state.C1.C2.updateFoo($del('foo'));
  expect(app.state.foo.foo).toBe(undefined);
});

test('updater with func', () => {
  const app = new App(
    {
      foo: 1,
      addFoo: updater('foo', (current, update, n) => {
        update(current + n);
      }),
    },
  );
  app.state.addFoo(3);
  expect(app.state.foo).toBe(4);
});


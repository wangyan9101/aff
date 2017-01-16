import { App, updater } from '../index'

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

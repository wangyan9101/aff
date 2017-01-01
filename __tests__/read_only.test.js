import { App, readOnly } from '../index'

test('read only', () => {
  let app = new App(
    readOnly({
      foo: 'foo',
    }),
  );
  expect(app.state.foo).toBe('foo');
  expect(app.state.foo.$update).toBe(undefined);

  app = new App(readOnly(1));
  expect(app.state).toBe(1);
});

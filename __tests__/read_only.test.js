import { App, read_only } from '../index'

test('read only', () => {
  let app = new App(
    read_only({
      foo: 'foo',
    }),
  );
  expect(app.state.foo).toBe('foo');
  expect(app.state.foo.$update).toBe(undefined);

  app = new App(read_only(1));
  expect(app.state).toBe(1);
});

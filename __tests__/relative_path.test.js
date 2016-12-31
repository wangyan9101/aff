import { App, $map } from '../index'
import './__helpers'

test('relative update', () => {
  let app = new App({
    foo: {
      bar: {
        baz: {
          qux: 'QUX', 
        },
      },
    },
  });

  app.state.foo.bar.baz.$update('qux', 'qux');
  expect(app.state.foo.bar.baz.qux).toBe('qux');

  app.state.foo.bar.$update('baz', {
    qux: 'QUX',
  });
  expect(app.state.foo.bar.baz.qux).toBe('QUX');

  app.state.foo.bar.baz.$update('qux', 'qux');
  expect(app.state.foo.bar.baz.qux).toBe('qux');

  app.state.foo.bar.baz.$update('array', [1, 2, 3, 4, 5]);
  expect(app.state.foo.bar.baz.array).toMatchObject([1, 2, 3, 4, 5]);

  app.state.foo.bar.baz.$update('array', $map(v => v * 2));
  expect(app.state.foo.bar.baz.array).toMatchObject([2, 4, 6, 8, 10]);

  app.state.foo.bar.baz.array.$update(0, 99);
  expect(app.state.foo.bar.baz.array[0]).toBe(99);

  let sub = app.state.foo.bar.baz.array.$sub(0);
  sub.update(42);
  expect(app.state.foo.bar.baz.array[0]).toBe(42);

  app.update('bar', app.state.foo.bar);
  app.state.bar.$update('baz', 'qux', 'yes');
  expect(app.state.foo.bar.baz.qux).toBe('yes');

  app.update('foo', 'bar', 'BAR');
  expect(app.state.bar).toMatchObject({
    baz: {
      qux: 'yes',
    },
  });
  app.state.bar.$update('foo');
  expect(app.state.bar).toBe('foo');
  app.update('foo', 'bar', 'BAR');

});

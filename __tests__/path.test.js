import { App, equal } from '../app'
import { $any } from '../state'

test('path', () => {
  let init_state = {
    foo: {
      bar: {
        baz: {
          qux: 'QUX',
        },
      },
    },
  };
  let app = new App(init_state);
  let path = app.path('foo');
  expect(path.get() === init_state.foo).toBe(true);
  path = path.sub('bar');
  expect(path.get() === init_state.foo.bar).toBe(true);
  path = app.path('foo');
  path = path.sub(['bar', 'baz']);
  expect(path.get() === init_state.foo.bar.baz).toBe(true);
  path = app.path('foo', 'bar', 'baz', 'qux');
  expect(path.get() === init_state.foo.bar.baz.qux).toBe(true);
  path.update('qux');
  expect(path.get() === 'qux');
  expect(app.state.foo.bar.baz.qux === 'qux');
  path = app.path(['foo', 'bar', 'baz', 'qux']);
  expect(path.get() === init_state.foo.bar.baz.qux).toBe(true);

  let p1 = app.path('foo', 'bar');
  let p2 = app.path('foo', 'bar');
  expect(equal(p1, p2));

  path = app.path('foo');
  path.update($any, $any, $any, 'FOO');
  expect(app.state.foo.bar.baz.qux).toBe('FOO');
});

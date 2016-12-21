import { App, equal } from '../app'
import { $any } from '../state'
import { t } from '../dom'
import { div } from '../tags'

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

test('path change', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let app = new App(
    element,
    {
      foo: 42,
      bar: {
        baz: {
          qux: 'QUX',
        },
      },
    },
  );
  let main = (state) => {
    return div([
      t('foo', (path) => {
        return div('#foo', path.get());
      }, app.path('foo')),
      t('bar', (path) => {
        return div('#bar', path.get());
      }, app.path('bar', 'baz', 'qux')),
    ]);
  };
  app.init(main);
  expect(root.querySelector('#foo').textContent).toBe('42');
  app.update('foo', 8);
  expect(root.querySelector('#foo').textContent).toBe('8');
  expect(root.querySelector('#bar').textContent).toBe('QUX');
  app.update('bar', 'baz', 'qux', 'qux');
  expect(root.querySelector('#bar').textContent).toBe('qux');
});

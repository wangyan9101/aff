import { App } from '../app'
import { $any } from '../operations'
import { t } from '../index'
import { div } from '../tags'
import { $, css } from '../tagged'
import './__helpers'

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
  let path = app.sub('foo');
  expect(path.get() === init_state.foo).toBe(true);
  path = path.sub('bar');
  expect(path.get() === init_state.foo.bar).toBe(true);
  path = app.sub('foo');
  path = path.sub(['bar', 'baz']);
  expect(path.get() === init_state.foo.bar.baz).toBe(true);
  path = app.sub('foo', 'bar', 'baz', 'qux');
  expect(path.get() === init_state.foo.bar.baz.qux).toBe(true);
  path.update('qux');
  expect(path.get() === 'qux');
  expect(app.state.foo.bar.baz.qux === 'qux');
  path = app.sub(['foo', 'bar', 'baz', 'qux']);
  expect(path.get() === init_state.foo.bar.baz.qux).toBe(true);

  let p1 = app.sub('foo', 'bar');
  let p2 = app.sub('foo', 'bar');
  expect(p1).toMatchObject(p2);

  path = app.sub('foo');
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
        return div($`#foo`, path.get());
      }, app.sub('foo')),
      t('bar', (path) => {
        return div($`#bar`, path.get());
      }, app.sub('bar', 'baz', 'qux')),
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

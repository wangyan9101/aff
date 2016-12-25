import { App, div, $, t } from '../index'

test('use', () => {
  let init_state = {
    foo: 'FOO',
    bar: 'BAR',
    baz: {
      $use: ['foo', 'bar'],
      baz: {
        $use: {
          FOO: 'foo',
          BAR: 'bar',
        },
      },
    },
  };
  let app = new App(init_state);

  // init use
  expect(app.state.baz.foo).toBe('FOO');
  expect(app.state.baz.bar).toBe('BAR');
  expect(app.state.baz.baz.FOO).toBe('FOO');
  expect(app.state.baz.baz.BAR).toBe('BAR');

  // update
  app.update('foo', 'foo');
  app.update('bar', 'bar');
  expect(app.state.baz.foo).toBe('foo');
  expect(app.state.baz.bar).toBe('bar');
  expect(app.state.baz.baz.FOO).toBe('foo');
  expect(app.state.baz.baz.BAR).toBe('bar');

  // detect change
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  app.init((state) => {
    return div(
      t('baz', (state) => div(
        div($`#a`, state.foo),
        div($`#b`, state.bar),
        t('BAZ', (state) => div(
          div($`#c`, state.FOO),
          div($`#d`, state.BAR),
        ), state.baz),
      ), state.baz),
    );
  }, element);
  expect(root.querySelector('#a').textContent).toBe('foo');
  expect(root.querySelector('#b').textContent).toBe('bar');
  expect(root.querySelector('#c').textContent).toBe('foo');
  expect(root.querySelector('#d').textContent).toBe('bar');
  app.update('foo', 'FOO');
  app.update('bar', 'BAR');
  expect(root.querySelector('#a').textContent).toBe('FOO');
  expect(root.querySelector('#b').textContent).toBe('BAR');
  expect(root.querySelector('#c').textContent).toBe('FOO');
  expect(root.querySelector('#d').textContent).toBe('BAR');
  app.update('foo', 'foo');
  app.update('bar', 'bar');
  expect(root.querySelector('#a').textContent).toBe('foo');
  expect(root.querySelector('#b').textContent).toBe('bar');
  expect(root.querySelector('#c').textContent).toBe('foo');
  expect(root.querySelector('#d').textContent).toBe('bar');

  // update by alternate path
  app.update('baz', 'foo', 'FOO');
  app.update('baz', 'bar', 'BAR');
  expect(app.state.foo).toBe('FOO');
  expect(app.state.bar).toBe('BAR');
  expect(root.querySelector('#a').textContent).toBe('FOO');
  expect(root.querySelector('#b').textContent).toBe('BAR');
  expect(root.querySelector('#c').textContent).toBe('FOO');
  expect(root.querySelector('#d').textContent).toBe('BAR');

  app.update('baz', 'baz', 'FOO', 'foo');
  app.update('baz', 'baz', 'BAR', 'bar');
  expect(app.state.foo).toBe('foo');
  expect(app.state.bar).toBe('bar');
  expect(root.querySelector('#a').textContent).toBe('foo');
  expect(root.querySelector('#b').textContent).toBe('bar');
  expect(root.querySelector('#c').textContent).toBe('foo');
  expect(root.querySelector('#d').textContent).toBe('bar');

});

test('use conflict', () => {
  expect(() => {
    new App({
      foo: 'foo',
      bar: {
        $use: ['foo'],
        foo: 42,
      },
    });
  }).toThrowError('use key conflict,foo');
  expect(() => {
    new App({
      foo: 'foo',
      bar: {
        $use: {
          foo: 'foo',
        },
        foo: 42,
      },
    });
  }).toThrowError('use key conflict,foo');
});

test('bad use', () => {
  expect(() => {
    new App({
      foo: {
        $use: 42,
      },
    });
  }).toThrowError('bad use,42');
});

import { alias } from '../alias'
import { App, div, $, t } from '../index'

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

test('nested init state alias', () => {
  let init_state = {
    foo: 'FOO',
    bar: {
      baz: {
        qux: alias('foo'),
      },
    },
  };
  let app = new App(init_state);
  expect(app.state.bar.baz.qux).toBe('FOO');
});

test('alias change', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let app = new App(
    element,
    {
      foo: 'FOO',
      bar: {
        foo: alias('foo'),
        bar: {
          bar: alias('bar', 'foo'),
        },
      },
    },
  );
  app.init((state) => {
    return div(
      div($`#a`, state.foo),
      t('bar', (state) => {
        return div(
          div($`#b`, state.foo), 
          t('baz', (state) => {
            return div($`#c`, state.bar);
          }, state.bar),
        );
      }, state.bar),
    );
  });
  expect(root.querySelector('#a').textContent).toBe('FOO');
  expect(root.querySelector('#b').textContent).toBe('FOO');
  expect(root.querySelector('#c').textContent).toBe('FOO');
  app.update('foo', 'BAR');
  //TODO FIXME
  //expect(root.querySelector('#a').textContent).toBe('BAR');
  //expect(root.querySelector('#b').textContent).toBe('BAR');
  //expect(root.querySelector('#c').textContent).toBe('BAR');
});

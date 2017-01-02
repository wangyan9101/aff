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

  const p1 = app.sub('foo');
  p1.update('FOO');
  expect(app.state.foo).toBe('FOO');
  expect(root.querySelector('#a').textContent).toBe('FOO');
  expect(root.querySelector('#c').textContent).toBe('FOO');

  const p2 = app.sub('baz', 'baz', 'FOO');
  p2.update('foo');
  expect(app.state.foo).toBe('foo');
  expect(root.querySelector('#a').textContent).toBe('foo');
  expect(root.querySelector('#c').textContent).toBe('foo');

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

test('passthrough use', () => {
  let app = new App({
    foo: 'FOO',
    bar1: {
      bar2: {
        foo2: 'foo',
        bar3: {
          bar4: {
            $use: ['foo', 'foo2'],
          },
        },
      },
    },
  });
  expect(app.state.bar1.foo).toBe('FOO');
  expect(app.state.bar1.bar2.foo).toBe('FOO');
  expect(app.state.bar1.bar2.bar3.foo).toBe('FOO');
  expect(app.state.bar1.bar2.bar3.bar4.foo).toBe('FOO');
  expect(app.state.bar1.bar2.bar3.foo2).toBe('foo');
  expect(app.state.bar1.bar2.bar3.bar4.foo2).toBe('foo');
});

test('no state', () => {
  expect(() => {
    let app = new App({
      $use: ['foo'],
    });
  }).toThrowError('no state named foo');
  expect(() => {
    let app = new App({
      bar: {
        $use: ['foo'],
      },
    });
  }).toThrowError('no state named foo');
});

test('loop in $use', () => {
  expect(() => {
    let app = new App({
      foo: {
        $use: ['foo'],
      },
    })
  }).toThrowError('loop in $use,foo,foo');
});

test('loop in $use', () => {
  expect(() => {
    let app = new App({
      foo: {
        foo: {
          $use: ['foo'],
        },
      },
    })
  }).toThrowError('loop in $use,foo,foo,foo');
});

test('update in $use', () => {
  let app = new App({
    foo: 'FOO',
    c1: {
      $use: ['foo'],
      c2: {
        $use: ['foo'],
      },
    },
  });
  expect(app.state.c1.foo).toBe('FOO');
  expect(app.state.c1.c2.foo).toBe('FOO');
  app.state.c1.c2.$update('foo', 'foo');
  expect(app.state.foo).toBe('foo');
  expect(app.state.c1.foo).toBe('foo');
  expect(app.state.c1.c2.foo).toBe('foo');
});

import { App, div, $, t, p } from '../index'

test('ref', () => {
  let init_state = {
    foo: 'FOO',
    bar: 'BAR',
    baz: {
      $ref: ['foo', 'bar'],
      baz: {
        $ref: {
          FOO: 'foo',
          BAR: 'bar',
        },
      },
    },
  };
  let app = new App(init_state);

  // init ref
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

test('ref conflict', () => {
  expect(() => {
    new App({
      foo: 'foo',
      bar: {
        $ref: ['foo'],
        foo: 42,
      },
    });
  }).toThrowError('ref key conflict,foo');
  expect(() => {
    new App({
      foo: 'foo',
      bar: {
        $ref: {
          foo: 'foo',
        },
        foo: 42,
      },
    });
  }).toThrowError('ref key conflict,foo');
});

test('bad ref', () => {
  expect(() => {
    new App({
      foo: {
        $ref: 42,
      },
    });
  }).toThrowError('bad ref,42');
});

test('passthrough ref', () => {
  let app = new App({
    foo: 'FOO',
    bar1: {
      bar2: {
        foo2: 'foo',
        bar3: {
          bar4: {
            $ref: ['foo', 'foo2'],
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
      $ref: ['foo'],
    });
  }).toThrowError('no state named foo');
  expect(() => {
    let app = new App({
      bar: {
        $ref: ['foo'],
      },
    });
  }).toThrowError('no state named foo');
});

test('loop in $ref', () => {
  expect(() => {
    let app = new App({
      foo: {
        $ref: ['foo'],
      },
    })
  }).toThrowError('loop in $ref,foo,foo');
});

test('loop in $ref', () => {
  expect(() => {
    let app = new App({
      foo: {
        foo: {
          $ref: ['foo'],
        },
      },
    })
  }).toThrowError('loop in $ref,foo,foo,foo');
});

test('update in $ref', () => {
  let app = new App({
    foo: 'FOO',
    c1: {
      $ref: ['foo'],
      c2: {
        $ref: ['foo'],
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

test('tick in $ref', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  const app = new App(
    element,
    {
      a: {
        x: 'foo',
        b: {
          y: 'bar',
          c: {
            z: 'baz',
            d: {
              $ref: ['x', 'y', 'z'],
            }
          },
        },
      },
    },
    (state) => div(
      t('foo', (state) => {
        return p($`#p`, state.x);
      }, state.a.b.c.d),
    ),
  );
  expect(root.querySelector('#p').textContent).toBe('foo');
  app.update('a', 'x', 'FOO');
  expect(root.querySelector('#p').textContent).toBe('FOO');
});

test('refs in array', () => {
  const app = new App({
    foo: 'FOO',
    bar: [
      {
        $ref: ['foo'],
      },
    ],
  });
  expect(app.state.bar[0].foo).toBe('FOO');
});

test('array update', () => {
  const root = document.createElement('div');
  const element = document.createElement('div');
  root.appendChild(element);
  const app = new App(
    element,
    {
      array: [1, 2, 3],
      List: {
        $ref: ['array'],
      },
    },
    (state) => {
      return div(
        t('List', (state) => {
          return div(state.array.map(e => div(e)));
        }, state.List),
      );
    },
  );
  app.update('array', [2, 3, 4]);
  expect(root.textContent).toBe('234');
});

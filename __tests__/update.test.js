import {
  ref,
  $map, $inc, $dec, $any, $filter, $reduce, $delete, 
  $push, $func, $unshift, $splice, $fill, $sort,
  $pop, $shift, $reverse,
  $merge,
  consoleLogUpdates,
} from '../index'
import { App } from '../app'
import './__helpers'

test('delete', () => {
  let obj = {
    foo: 'foo',
    bar: 'bar',
  };
  let app = new App(obj);
  app.update($delete('foo'));
  expect(app.state.foo).toBe(undefined);
});

test('push', () => {
  let app = new App([]);
  app.update($push('foo'));
  expect(app.state.length).toBe(1);
  expect(app.state[0]).toBe('foo');
});

test('unshift', () => {
  let app = new App([1]);
  app.update($unshift('foo'));
  expect(app.state.length).toBe(2);
  expect(app.state[0]).toBe('foo');
});

test('bad update path', () => {
  let app = new App(true);
  expect(() => {
    app.update(true, true, true, true);
  }).toThrowError('bad update path,true,true,true,true');
});

test('set path', () => {
  let app = new App({});
  app.update(1, 2, 3, 4, true);
  expect(app.state[1][2][3][4]).toBe(true);
});

test('empty update', () => {
  let app = new App({});
  app.update();
});

test('ops', () => {
  let app = new App({
    foo: [1, 2, 3, 4, 5],
  });
  app.update('foo', $filter(v => v > 2));
  expect(app.state.foo.length).toBe(3);
  expect(app.state.foo[0]).toBe(3);
  expect(app.state.foo[1]).toBe(4);
  expect(app.state.foo[2]).toBe(5);

  app.update('foo', 0, $dec);
  expect(app.state.foo[0]).toBe(2);

  app.update('foo', $map(v => v * 2));
  expect(app.state.foo.length).toBe(3);
  expect(app.state.foo[0]).toBe(4);
  expect(app.state.foo[1]).toBe(8);
  expect(app.state.foo[2]).toBe(10);
});

test('func', () => {
  let app = new App(
    [1, 2, 3, 4, 5],
    consoleLogUpdates,
  );
  app.update($any, $func(x => x + 1));
  expect(app.state).toMatchObject([2, 3, 4, 5, 6]);
});

test('inc', () => {
  let app = new App(0);
  app.update($inc);
  expect(app.state).toBe(1);
  app = new App(false);
  app.update($inc);
  expect(app.state).toBe(1);
});

test('dec', () => {
  let app = new App(9);
  app.update($dec);
  expect(app.state).toBe(8);
});

test('splice', () => {
  let app = new App([1, 2, 3]);
  app.update($splice(1, 1));
  expect(app.state).toMatchObject([1, 3]);
});

test('fill', () => {
  let app = new App([1, 2, 3]);
  app.update($fill(42));
  expect(app.state).toMatchObject([42, 42, 42]);
});

test('sort', () => {
  let app = new App([3, 2, 1]);
  app.update($sort());
  expect(app.state).toMatchObject([1, 2, 3]);
});

test('pop', () => {
  let app = new App([3, 2, 1]);
  app.update($pop);
  expect(app.state).toMatchObject([3, 2]);
});

test('shift', () => {
  let app = new App([3, 2, 1]);
  app.update($shift);
  expect(app.state).toMatchObject([2, 1]);
});

test('reverse', () => {
  let app = new App([3, 2, 1]);
  app.update($reverse);
  expect(app.state).toMatchObject([1, 2, 3]);
});

test('path reset', () => {
  let app = new App(
    [
      { foo: 'foo', },
      { foo: 'Foo', },
      { foo: 'FOO', },
    ],
  );
  app.update($splice(0, 1));
  app.state[0].$update('foo', 'fOO');
  expect(app.state[0].foo).toBe('fOO');
  expect(app.state[1].foo).toBe('FOO');
});

test('ref key tick update', () => {
  const app = new App({
    foo: 'FOO',
    bar: {
      foo: ref('foo'),
    },
  });
  app._state.argsChanged(app.state.bar, app.state.bar);
  app._state.argsChanged(app.state.bar, app.state.bar);
  app.update('foo', 'foo');
  app._state.argsChanged(app.state.bar, app.state.bar);
  app._state.argsChanged(app.state.bar, app.state.bar);
});

test('merge', () => {
  const app = new App({
    foo: {
      bar: {
        baz: 'BAZ',
      },
    },
  });
  app.update($merge({
    foo: {
      bar: {
        baz: 'baz',
      },
    },
  }));
  console.log(app.state);
  expect(app.state.foo.bar.baz).toBe('baz');

  app.update($merge({
    FOO: {
      BAR: {
        BAZ: 'baz',
      },
    },
  }));
  expect(app.state.FOO.BAR.BAZ).toBe('baz');

  app.update($merge({
    Foo: {
      Bar: {
        Baz: $inc,
      },
    },
  }));
  expect(app.state.Foo.Bar.Baz).toBe(1);
});

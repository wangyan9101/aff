import {$map, $inc, $dec, $any, $merge, $filter, $reduce, versioned_update, $del_at, $push} from '../state'
import { App } from '../app'

test('merge', () => {
  let app = new App({
    foo: 1,
    bar: 2,
    baz: {
      qux: [
        0,
      ],
    },
  });
  app.update($merge({
    foo: 42,
    bar: 24,
    baz: {
      qux: {
        0: 42,
      },
    },
    qux: 42,
  }));

  expect(app.state.foo).toBe(42);
  expect(app.state.bar).toBe(24);
  expect(app.state.baz.qux[0]).toBe(42);
  expect(app.state.qux).toBe(42);

  app = new App({});
  app.update($merge({
    foo: [1, 2, 3],
  }));
  expect(Array.isArray(app.state.foo)).toBe(true);

  app = new App({});
  app.update($merge({
    foo: 'FOO',
    bar: 'BAR',
  }));
  expect(app.state.foo).toBe('FOO');
  expect(app.state.bar).toBe('BAR');

  app = new App({
    foo: [1, 2, 3],
    bar: [3, 4, 5],
    baz: [9, 8, 7],
    qux: [2, 4, 6],
  });
  app.update($merge({
    foo: $reduce((acc, cur) => {
      acc.push(cur + 1);
      return acc;
    }, []),
    bar: $map(v => v + 1),
    baz: $filter(v => v < 9),
    qux: $merge([$any, $inc]),
  }));
  expect(app.state.foo[0]).toBe(2);
  expect(app.state.foo[1]).toBe(3);
  expect(app.state.foo[2]).toBe(4);
  expect(app.state.bar[0]).toBe(4);
  expect(app.state.bar[1]).toBe(5);
  expect(app.state.bar[2]).toBe(6);
  expect(app.state.baz[0]).toBe(8);
  expect(app.state.baz[1]).toBe(7);
  expect(app.state.baz[2]).toBe(undefined);
  expect(app.state.qux[0]).toBe(3);
  expect(app.state.qux[1]).toBe(5);
  expect(app.state.qux[2]).toBe(7);
  app.update('foo', 0, $dec);
  expect(app.state.foo[0]).toBe(1);
});

test('filter', () => {
  let obj = {
    foo: 42,
    bar: 90,
  };
  let app = new App(obj);
  app.update('foo', $filter(v => v * 2));
  expect(app.state.foo).toBe(84);
  app.update($filter((v, k) => {
    return k != 'foo';
  }));
  expect(app.state.foo).toBe(undefined);
  expect(app.state.bar).toBe(90);
});

test('del_at', () => {
  let obj = [1, 2, 3, 4, 5];
  let app = new App(obj);
  app.update($del_at(0));
  expect(app.state.length).toBe(4);
});

test('push', () => {
  let app = new App([]);
  app.update($push('foo'));
  expect(app.state.length).toBe(1);
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

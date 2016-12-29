import {$map, $inc, $dec, $any, $filter, $reduce, versioned_update, $del_at, $push, $func} from '../operations'
import { App } from '../app'
import './__helpers'

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
  );
  app.update($any, $func(x => x + 1));
  expect(app.state).toMatchObject([2, 3, 4, 5, 6]);
});

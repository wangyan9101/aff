import {update, $inc, $dec, $any, make_updater} from '../state'

test('update $inc', () => {
  let res;

  res = update({
    a: 3,
  }, 'a', $inc);
  expect(res.a).toBe(4);

  res = update({
    a: {
      b: 9,
    },
  }, 'a', 'b', $inc);
  expect(res.a.b).toBe(10);

  res = update({
    a: {
      b: {
        c: 1,
      },
    },
  }, 'a', 'b', 'c', $inc);
  expect(res.a.b.c).toBe(2);
});

test('update $dec', () => {
  let res;

  res = update({
    a: 3,
  }, 'a', $dec);
  expect(res.a).toBe(2);

  res = update({
    a: {
      b: 9,
    },
  }, 'a', 'b', $dec);
  expect(res.a.b).toBe(8);

  res = update({
    a: {
      b: {
        c: 1,
      },
    },
  }, 'a', 'b', 'c', $dec);
  expect(res.a.b.c).toBe(0);
});

test('update $any', () => {
  let res = update({
    a: 1,
    b: 2,
    c: 3,
    d: 4,
  }, $any, $inc);
  expect(res.a).toBe(2);
  expect(res.b).toBe(3);
  expect(res.c).toBe(4);
  expect(res.d).toBe(5);
});

test('update set', () => {
  let res;

  res = update({
    a: {
      b: {
        c: {
          d: 5,
        },
      },
    },
  }, 'a', 'b', 'c', 'd', 20);
  expect(res.a.b.c.d).toBe(20);
});

test('update any path', () => {
  let res = update({
    a: {
      foo: 1,
    },
    b: {
      foo: 2,
    },
    c: {
      foo: 3,
    },
  }, $any, 'foo', $inc);
  expect(res.a.foo).toBe(2);
  expect(res.b.foo).toBe(3);
  expect(res.c.foo).toBe(4);
});

test('update any path 2', () => {
  let res = update({
    a: {
      foo: 1,
    },
    b: {
      bar: 2,
    },
    c: {
      baz: 3,
    },
  }, $any, $any, $inc);
  expect(res.a.foo).toBe(2);
  expect(res.b.bar).toBe(3);
  expect(res.c.baz).toBe(4);
});

test('updater', () => {
  let state = {
    foo: 42,
  };
  let before;
  let after;
  let update = make_updater(state, () => {
    before = 1;
  }, () => {
    after = 2;
  });
  update('foo', 42);
  expect(before).toBe(1);
  expect(after).toBe(2);
});

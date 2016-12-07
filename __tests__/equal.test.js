import {equal} from '../dom'

test('test equal', () => {
  expect(equal(1, true)).toBe(false);
  expect(equal(1, 1)).toBe(true);
  expect(equal(true, false)).toBe(false);
  expect(equal(undefined, undefined)).toBe(true);
  expect(equal({
    foo: 1,
    bar: 2,
  }, {})).toBe(false);
  expect(equal({
    foo: 1,
    bar: 2,
  }, {
    foo: 1,
    bar: 2,
  })).toBe(true);
  expect(equal({
    foo: 1,
    bar: {
      baz: 'baz',
    },
  }, {
    foo: 1,
    bar: {
      baz: 'baz',
    },
  })).toBe(true);
  expect(equal({
    foo: 1,
    bar: {
      baz: 'baz',
    },
  }, {
    foo: 1,
    bar: {
      baz: 2,
    },
  })).toBe(false);
});

import {equal} from '../equality'
import {versioned_update, versionize} from '../state'

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
  let f1 = () => {};
  expect(equal(f1, f1)).toBe(true);
});

test('versioned equality', () => {
  let obj = { foo: 1 };
  versionize(obj);
  let v1 = obj.__aff_version;
  versioned_update(obj, 'foo', 42);
  let v2 = obj.__aff_version;
  expect(equal(obj, obj, v1, v2)).toBe(false);
  expect(equal(obj, obj, v1, v1)).toBe(true);
  versioned_update(obj, 'foo', 1);
  let v3 = obj.__aff_version;
  expect(equal(obj, obj, v1, v3)).toBe(false);
  expect(equal(obj, obj, v2, v3)).toBe(false);
  expect(equal(obj, obj)).toBe(true);
});

import {versionize, versioned_update, 
  $any, $inc, $dec,
} from '../state'

test('versionize', () => {
  let obj = {};
  versionize(obj);
  expect(obj.__aff_version).toBe(1);
  obj = {
    foo: {},
    bar: 'bar',
    baz: {
      BAZ: {},
      baz: 42,
    },
  };
  versionize(obj);
  expect(obj.__aff_version).toBe(1);
  expect(obj.foo.__aff_version).toBe(1);
  expect(obj.baz.__aff_version).toBe(1);
  expect(obj.baz.BAZ.__aff_version).toBe(1);
});

test('versioned_update', () => {
  expect(versioned_update(42)).toBe(42);
  expect(versioned_update('foo')).toBe('foo');
  expect(versioned_update({}, 42)).toBe(42);
  expect(versioned_update({}, 'foo')).toBe('foo');

  let obj = {
    foo: 42,
    bar: 99,
  };
  expect(versioned_update(obj, 'foo', 9).foo).toBe(9);
  versioned_update(obj, $any, 42);
  expect(obj.foo).toBe(42);
  expect(obj.bar).toBe(42);
  versioned_update(obj, 'foo', $inc);
  expect(obj.foo).toBe(43);
  versioned_update(obj, 'foo', $dec);
  expect(obj.foo).toBe(42);

  obj = {
    foo: [
      {
        baz: {
          qux: 42,
        },
      },
    ],
  };
  versionize(obj);
  versioned_update(obj, 'foo', 0, 'baz', 'qux', 1);
  expect(obj.foo[0].baz.qux).toBe(1);
  expect(obj.foo[0].baz.__aff_version).toBe(2);
  versioned_update(obj, 'foo', 0, 'baz', 'qux', $inc);
  expect(obj.foo[0].baz.qux).toBe(2);
  expect(obj.foo[0].baz.__aff_version).toBe(3);

  obj = {};
  versionize(obj);
  versioned_update(obj, 'foo', $any, 'foo', 42);
  expect(Object.keys(obj.foo).length).toBe(0);
});

import {$map, $inc, $dec, $any, $merge, $filter, $reduce, versioned_update} from '../state'
import {object_has_tag} from '../object'

function test_merge(fn) {
  let obj = {
    foo: 1,
    bar: 2,
    baz: {
      qux: [
        0,
      ],
    },
  };
  let new_obj = fn(obj, $merge({
    foo: 42,
    bar: 24,
    baz: {
      qux: {
        0: 42,
      },
    },
    qux: 42,
  }));
  expect(new_obj.foo).toBe(42);
  expect(new_obj.bar).toBe(24);
  expect(new_obj.baz.qux[0]).toBe(42);
  expect(new_obj.qux).toBe(42);

  obj = {};
  new_obj = fn(obj, $merge({
    foo: [1, 2, 3],
  }));
  expect(Array.isArray(new_obj.foo)).toBe(true);

  obj = {};
  new_obj = fn(obj, $merge({
    foo: 'FOO',
    bar: 'BAR',
  }));
  expect(new_obj.foo).toBe('FOO');
  expect(new_obj.bar).toBe('BAR');

  obj = {
    foo: [1, 2, 3],
    bar: [3, 4, 5],
    baz: [9, 8, 7],
    qux: [2, 4, 6],
  };
  new_obj = fn(obj, $merge({
    foo: $reduce((acc, cur) => {
      acc.push(cur + 1);
      return acc;
    }, []),
    bar: $map(v => v + 1),
    baz: $filter(v => v < 9),
    qux: $merge([$any, $inc]),
  }));
  expect(new_obj.foo[0]).toBe(2);
  expect(new_obj.foo[1]).toBe(3);
  expect(new_obj.foo[2]).toBe(4);
  expect(new_obj.bar[0]).toBe(4);
  expect(new_obj.bar[1]).toBe(5);
  expect(new_obj.bar[2]).toBe(6);
  expect(new_obj.baz[0]).toBe(8);
  expect(new_obj.baz[1]).toBe(7);
  expect(new_obj.baz[2]).toBe(undefined);
  expect(new_obj.qux[0]).toBe(3);
  expect(new_obj.qux[1]).toBe(5);
  expect(new_obj.qux[2]).toBe(7);
}

test('versioned_update merge', () => {
  test_merge(versioned_update);
});


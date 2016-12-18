import { pick } from '../state'

test('pick', () => {
  expect(pick([], 'foo')).toEqual([]);
  expect(pick([1], 'foo')).toEqual([]);
  expect(pick([1, 2], 'foo')).toEqual([]);
  expect(pick([], 0)).toEqual([]);
  expect(pick([1], 0)).toEqual([1]);
  expect(pick([1, 2, 3], 0, 2)).toEqual([1, 3]);
  expect(pick({}, 'foo')).toEqual({});
  expect(pick({}, 'foo', 'bar')).toEqual({});
  expect(pick({baz: false}, 'foo', 'bar')).toEqual({});
  expect(pick({foo: false}, 'foo', 'bar')).toEqual({foo: false});
  expect(pick({foo: false, bar: 'bar'}, 'foo', 'bar')).toEqual({foo: false, bar: 'bar'});
  expect(pick({foo: false, bar: 'bar'}, 'bar')).toEqual({bar: 'bar'});
  expect(pick({foo: false, bar: 'bar'})).toEqual({});
});

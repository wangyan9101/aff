import {update, $inc, $dec, $any, $merge, make_updater, copy_update} from '../state'
import {object_has_tag} from '../object'

test('copy update', () => {
  expect(copy_update(1)).toBe(1);
  expect(copy_update(true)).toBe(true);
  expect(copy_update('foo')).toBe('foo');
  
  expect(copy_update(1, $inc)).toBe(2);
  expect(copy_update(3, $dec)).toBe(2);
  expect(copy_update(3, 42)).toBe(42);

  let array = [1, 2, 3];
  let updated = copy_update(array, 2, 42);
  expect(array !== updated).toBe(true);
  expect(updated[2]).toBe(42);
  updated = copy_update(array, $any, 99);
  expect(updated[0]).toBe(99);
  expect(updated[1]).toBe(99);
  expect(updated[2]).toBe(99);
  expect(updated.length).toBe(3);
  expect(array[0]).toBe(1);
  expect(array[1]).toBe(2);
  expect(array[2]).toBe(3);

  let obj = {
    foo: 'foo',
    bar: 'bar',
    baz: 'baz',
  };
  let new_obj = copy_update(obj, 'foo', 'FOO');
  expect(new_obj.foo).toBe('FOO');
  expect(obj.foo).toBe('foo');
  new_obj = copy_update(obj, $any, 'QUX');
  expect(new_obj.foo).toBe('QUX');
  expect(new_obj.bar).toBe('QUX');
  expect(new_obj.baz).toBe('QUX');
  expect(obj.foo).toBe('foo');
  expect(obj.bar).toBe('bar');
  expect(obj.baz).toBe('baz');

  obj = {
    category_infos: {
      1: {
        name: '快餐',
      },
      2: {
        name: '饮料',
        desc: '买一瓶送一瓶',
        goods: {
          1: {
            sizes: ['大', '中', '小'],
            selected_by_size: {
              ['大']: 1,
              ['中']: 2,
            },
            stocks: 50,
          },
        },
        goods_order: [
          1, 
        ],
      },
      3: {
        name: '包点',
      },
    },
  };
  new_obj = copy_update(obj, 'category_infos', 2, 'goods', 1, 'selected_by_size', '中', $inc);
  expect(new_obj.category_infos[2].goods[1].selected_by_size['中']).toBe(3);

  obj = {}
  new_obj = copy_update(obj, 'foo', $inc);
  expect(new_obj.foo).toBe(1);
});

test('copy update freezing', () => {
  let obj = {
    foo: 'FOO',
  };
  let new_obj = copy_update(obj, 'foo', 'foo');
  expect(new_obj.foo).toBe('foo');
  expect(object_has_tag(new_obj, 'frozen')).toBe(true);
  new_obj = copy_update(obj, 'foo', 'FOO');
  expect(new_obj.foo).toBe('FOO');
  expect(object_has_tag(new_obj, 'frozen')).toBe(true);

  let array = [1, 2, 3];
  let new_array = copy_update(array, 0, 42);
  expect(new_array[0]).toBe(42);
  expect(object_has_tag(new_array, 'frozen')).toBe(true);
});

test('copy_update merge', () => {
  let obj = {
    foo: 1,
    bar: 2,
    baz: {
      qux: [
        0,
      ],
    },
  };
  let new_obj = copy_update(obj, $merge({
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
  new_obj = copy_update(obj, $merge({
    foo: [1, 2, 3],
  }));
  expect(Array.isArray(new_obj.foo)).toBe(true);
});

test('copy update with getter', () => {
  let obj = {
    get foo() {
      return this.bar * 2;
    },
    bar: 99,
  };
  expect(obj.foo).toBe(198);
  let new_obj = copy_update(obj, 'bar', 42);
  expect(new_obj.foo).toBe(84);
  expect(obj.bar).toBe(99);
  expect(obj.foo).toBe(198); // should not change
});

test('copy update extra path', () => {
  let obj = {};
  let new_obj = copy_update(obj, 'foo', $any, 42);
  expect(new_obj.foo !== undefined).toBe(true);
  expect(typeof new_obj.foo === 'object').toBe(true);
  expect(Object.keys(new_obj.foo).length).toBe(0);
});

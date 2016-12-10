import {update, $inc, $dec, $any, $merge, make_updater, copy_update} from '../state'
import {object_has_tag} from '../object'

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
});

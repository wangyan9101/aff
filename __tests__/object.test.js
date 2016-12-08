import {object_add_tag, object_has_tag} from '../object'

test('object tag', () => {
  let o = {};
  object_add_tag(o, 'frozen');
  expect(object_has_tag(o, 'frozen')).toBe(true);
  let n = 0;
  for (let key in o) {
    n++;
  }
  expect(n).toBe(0);
});

import { MutableState } from '../index'

test('args change', () => {
  let state = new MutableState();
  expect(state.args_changed({
    a: 'A',
    b: 'B',
  }, {
    a: 'A',
  })).toBe(true);
  expect(state.args_changed(1, '42')).toBe(true);
  let f = () => {}
  expect(state.args_changed(f, () => {})).toBe(true);
});

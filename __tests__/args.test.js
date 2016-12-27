import { MutableState } from '../index'

test('args change', () => {
  let state = new MutableState();
  expect(state.argsChanged({
    a: 'A',
    b: 'B',
  }, {
    a: 'A',
  })).toBe(true);
  expect(state.argsChanged(1, '42')).toBe(true);
  let f = () => {}
  expect(state.argsChanged(f, () => {})).toBe(true);
});

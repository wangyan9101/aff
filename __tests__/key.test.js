import { t, key, div } from '../index'

test('setting key', () => {
  let thunk = t('Node', () => {}, key`foo`);
  expect(thunk.key).toBe('foo');
  thunk = t(() => {}, key`foo`);
  expect(thunk.key).toBe('foo');
  let node = div(key`foo`);
  expect(node.key).toBe('foo');
});

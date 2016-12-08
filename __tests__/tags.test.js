import {e} from '../dom'
import {div, DIV, Div} from '../tags'

test('e', () => {
  let node = div();
  expect(node.tag).toBe('div');
  node = DIV();
  expect(node.tag).toBe('div');
  node = Div();
  expect(node.tag).toBe('div');
});

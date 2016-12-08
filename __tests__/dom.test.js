import {patch} from '../dom'
import {div, p} from '../tags'

test('dom', () => {
  let root = document.createElement('div');
  let el = document.createElement('div');
  root.appendChild(el);

  let n = 0;
  function get_node() {
    n++;
    return div([
      p('yes ' + n),
    ]);
  }

  let node;

  [el, node] = patch(el, get_node(), node);
  [el, node] = patch(el, get_node(), node);
  [el, node] = patch(el, get_node(), node);

  expect(el.getAttribute('aff-element-serial')).toBe('1');

  //TODO more tests
});

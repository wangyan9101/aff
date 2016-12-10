import {patch, t} from '../dom'
import {div, p, none} from '../tags'

test('dom', () => {
  let root = document.createElement('div');
  let el = document.createElement('div');
  root.appendChild(el);

  let n = 0;
  function get_node() {
    n++;
    return div([
      p('yes ' + n),
      none,
    ]);
  }

  let node;

  [el, node] = patch(el, get_node(), node);
  [el, node] = patch(el, get_node(), node);
  [el, node] = patch(el, get_node(), node);

  expect(el.getAttribute('aff-element-serial')).toBe('1');

  //TODO more tests
});

test('thunk this', () => {
  let _this;
  let thunk = t(function() {
    _this = this;
  });
  let node = thunk.getNode();
  expect(_this === thunk).toBe(true);
});

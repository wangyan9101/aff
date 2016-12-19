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

  expect(el.getAttribute('aff-serial')).toBe('1');

  //TODO more tests
});

test('thunk this', () => {
  let _this;
  let thunk = t(function() {
    _this = this;
    return none;
  });
  let node = thunk.getNode();
  expect(_this === thunk).toBe(true);
});

test('thunk element', () => {
  let f = (state) => div(state.foo);
  let thunk1 = t(f, { foo: 'yes' });
  let element = thunk1.toElement();
  let thunk2 = t(f, { foo: 'no' });
  let new_element, node = patch(element, thunk2, thunk1);
  expect(thunk2.element !== null).toBe(true);
});

test('online', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);

  let called = false;
  patch(element, div({
    online: (elem) => {
      called = true;
      expect(elem.innerHTML).toBe('foobar');
    },
  }, 'foobar'));
  expect(called).toBe(true);
});

import {make_app} from '../app'
import {div} from '../tags'

test('app', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);

  let update;
  function App(state, update) {
    if (!state.foo) {
      state = update('foo', 900);
    }
    return div('#test', [
      state.foo,
    ]);
  }
  update = make_app(
    element,
    App,
  );

  expect(root.querySelector('#test').textContent).toBe('900');
});

import {make_app} from '../app'
import {div} from '../tags'

test('app', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);

  let app = make_app(
    element,
    (state) => {
      return div('#test', [
        state.foo,
      ]);
    },
    {
      foo: 900,
    },
  );
  let update = app.update;

  expect(root.querySelector('#test').textContent).toBe('900');
});

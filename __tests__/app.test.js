import {App} from '../app'
import {div, none} from '../tags'
import { t } from '../dom'

test('app', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);

  let app = new App(
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

  // render
  expect(root.querySelector('#test').textContent).toBe('900');

  // state
  app.update('foo', 42);
  expect(root.querySelector('#test').textContent).toBe('42');
  expect(app.state.foo).toBe(42);
  expect(app.html()).toBe('42');
});

test('app patch again', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);

  let app = new App(
    element,
    {
      n: 0,
      foo: {},
    },
  );

  let Main = (state) => {
    return div([
      t('calculated', ({n}, a2, a3) => {
        expect(a2).toBe('foo');
        expect(a3[0]).toBe(1);
        app.tap((state) => {
          return ['m', state.n + 1];
        });
        return none;
      }, {
        n: state.n
      }, 'foo', [1, 2, 3]),
      div('#n', state.n),
      div('#m', state.m || ''),
      t(() => div(), {
        foo: state.foo,
      }),
    ]);
  };

  app.init(Main);

  expect(root.querySelector('#n').textContent).toBe('0');
  expect(root.querySelector('#m').textContent).toBe('1');
  app.update('n', 2);
  expect(root.querySelector('#n').textContent).toBe('2');
  expect(root.querySelector('#m').textContent).toBe('3');
});

test('app tap', () => {
});

import { App, div, on, button, $ } from '../index'

test('event chain', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let n = 0;
  const app = new App(
    element,
    {},
    (state) => div(
      on('created', () => {
        n++;
      }).on('created', () => {
        n++;
      }),
    ),
  );
  expect(n).toBe(2);
});

test('event chain in app', () => {
  let n = 0;
  let app = new App(
    on('ev:foo', (x) => {
      n += x;
    }).on('ev:bar', (x) => {
      n += x * 2;
    }),
  );
  app.dispatchEvent('ev', 5);
  expect(n).toBe(15);
  app.dispatchEvent('ev', 3);
  expect(n).toBe(24);
});

test('different return value', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let n = 0;
  const app = new App(
    element,
    {},
    (state) => {
      return div(
        button($`#btn`, on('click:1', () => {
          n++
          return true;
        }), on('click:2', () => {
          n++
          return false;
        }), on('click:3', () => {
          n++
          return true;
        }), on('click:4', () => {
          n++
          return false;
        })),
      );
    },
  );

  // should throw exception, but jest cannot catch it.
  const e = root.querySelector('#btn').dispatchEvent(new MouseEvent('click'));
  expect(n).toBe(2);
});

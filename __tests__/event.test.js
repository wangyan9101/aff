import { App, div, on } from '../index'

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

import { t, key, div, App, $unshift, $splice } from '../index'

test('setting key', () => {
  let thunk = t('Node', () => {}, key`foo`);
  expect(thunk.key).toBe('foo');
  thunk = t(() => {}, key`foo`);
  expect(thunk.key).toBe('foo');
  let node = div(key`foo`);
  expect(node.key).toBe('foo');
});

test('keyed update', () => {
  const root = document.createElement('div');
  const element = document.createElement('div');
  root.appendChild(element);
  const app = new App(
    element,
    {
      list: [1, 2, 3],
    },
    (state) => {
      return div(
        state.list.map(v => div(v, key`${v}`)),
      );
    },
  );
  expect(root.textContent).toBe('123');
  app.update('list', $unshift(0));
  expect(root.textContent).toBe('0123');
  app.update('list', $unshift(0));
  expect(root.textContent).toBe('00123');
  app.update('list', $splice(1, 0, 5));
  expect(root.textContent).toBe('050123');
  app.update('list', $splice(1, 1));
  expect(root.textContent).toBe('00123');
  app.update('list', [0, 3, 4]);
  expect(root.textContent).toBe('034');
  app.update('list', [3, 4, 0]);
  expect(root.textContent).toBe('340');
  app.update('list', [4, 0, 1, 2, 3]);
  expect(root.textContent).toBe('40123');
});

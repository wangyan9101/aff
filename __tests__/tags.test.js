import {e, t} from '../dom'
import {div, DIV, Div, P} from '../tags'

test('e', () => {
  let node = div();
  expect(node.tag).toBe('div');
  node = DIV();
  expect(node.tag).toBe('div');
  node = Div();
  expect(node.tag).toBe('div');

  node = div('.foo .bar .baz qux #quux');
  expect(node.class).toBe('foo bar baz');
  expect(node.id).toBe('quux');
  node = div('.foo');
  expect(node.class).toBe('foo');
  node = div('#foo');
  expect(node.id).toBe('foo');

  node = div({
    id: 'foo',
    class: 'bar',
    innerHTML: 'yes',
  });
  expect(node.id).toBe('foo');
  expect(node.class).toBe('bar');
  expect(node.innerHTML).toBe('yes');
  node = div({
    style: {
      fontSize: '20px',
    },
  });
  expect(node.style.fontSize).toBe('20px');
  node = div({
    onclick: () => {},
  });
  expect(typeof node.events['onclick']).toBe('function');
  node = div({
    onclick: () => {},
    onfoot: 42,
  });
  expect(typeof node.events['onfoot']).toBe('undefined');
  node = div({
    href: 'yes',
  });
  expect(node.attributes.href).toBe('yes');

  node = div([
    div(),
    div(),
  ]);
  expect(node.children.length).toBe(2);
  node = Div([
    Div(),
    P(),
  ]);
  expect(node.children[1].tag).toBe('p');
  node = Div([
    [Div()],
    [[P()]],
  ]);
  expect(node.children[1].tag).toBe('p');

  node = div('yes');
  expect(node.children.length).toBe(1);
  node = div(2);
  expect(node.children.length).toBe(1);
});

test('t', () => {
  let Foo = () => {};
  let thunk = t(Foo, 1, 2, 3);
  expect(thunk.name).toBe('Foo');
  expect(thunk.args.length).toBe(3);

  thunk = t('Foo', () => {}, 1, 2, 3);
  expect(thunk.name).toBe('Foo');
  expect(thunk.args.length).toBe(3);

  thunk = e(Foo, 1, 2, 3)
  expect(thunk.name).toBe('Foo');
  expect(thunk.args.length).toBe(3);
});

test('e 2', () => {
  let node;

  node = e('div', '#foo');
  expect(node.id).toBe('foo');
  node = e('div', 'foo');
  expect(node.children.length).toBe(1);
  node = e('a', {
    href: 'yes',
  });
  expect(node.attributes.href).toBe('yes');

  node = e('div', '#foo', [
    P(),
  ]);
  expect(node.id).toBe('foo');
  expect(node.children.length).toBe(1);
  node = e('div', {
    id: 'foo',
  }, [
    P(),
  ]);
  expect(node.id).toBe('foo');
  expect(node.children.length).toBe(1);

  node = e('div', '#foo', {
    class: 'bar',
  }, [
    P(),
  ]);
  expect(node.id).toBe('foo');
  expect(node.class).toBe('bar');
  expect(node.children.length).toBe(1);
});

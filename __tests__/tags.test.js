import {e, t} from '../index'
import {div, DIV, Div, P} from '../tags'
import {$, css} from '../tagged'
import './__helpers'

test('e', () => {
  let node = div();
  expect(node.tag).toBe('div');
  node = DIV();
  expect(node.tag).toBe('div');
  node = Div();
  expect(node.tag).toBe('div');

  let s = '.bar';
  let id = 'quux';
  node = div($`.foo ${s} .baz qux #${id}`);
  expect(node.class).toMatchObject({
    foo: true,
    bar: true,
    baz: true,
  });
  expect(node.id).toBe('quux');
  node = div($`.foo`);
  expect(node.class).toMatchObject({
    foo: true,
  });
  node = div($`#foo`);
  expect(node.id).toBe('foo');

  node = div({
    id: 'foo',
    class: 'bar',
    innerHTML: 'yes',
  });
  expect(node.id).toBe('foo');
  expect(node.class).toMatchObject({
    bar: true,
  });
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
});

test('e 2', () => {
  let node;

  node = e('div', $`#foo`);
  expect(node.id).toBe('foo');
  node = e('div', 'foo');
  expect(node.children.length).toBe(1);
  node = e('a', {
    href: 'yes',
  });
  expect(node.attributes.href).toBe('yes');

  node = e('div', $`#foo`, [
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

  node = e('div', $`#foo`, {
    class: 'bar',
  }, [
    P(),
  ]);
  expect(node.id).toBe('foo');
  expect(node.class).toMatchObject({
    bar: true,
  });
  expect(node.children.length).toBe(1);
});

test('class property', () => {
  let node = e('div', {
    class: 'foo bar baz',
  });
  expect(node.class).toMatchObject({
    foo: true,
    bar: true,
    baz: true,
  });
  node = e('div', {
    class: ['foo', 'bar', 'baz'],
  });
  expect(node.class).toMatchObject({
    foo: true,
    bar: true,
    baz: true,
  });
  node = e('div', {
    class: {
      foo: true,
      bar: true,
      baz: true,
      qux: false,
      quux: false,
    },
  });
  expect(node.class).toMatchObject({
    foo: true,
    bar: true,
    baz: true,
    qux: false,
    quux: false,
  });
});

test('node child', () => {
  let node = e('div', e('div'));
  expect(node.children.length == 1).toBe(true);
  node = e('div', t('foo', () => {}));
  expect(node.children.length == 1).toBe(true);
});

test('css', () => {
  let fontSize = 90;
  let marginTop = 30;
  let node = e('div', css`font-size: ${fontSize}px; margin-top: ${marginTop}px;`);
  expect(node.style).toBe('font-size: 90px; margin-top: 30px;')
});

test('function child', () => {
  let node = e('div', [
    () => {
      return div('FOO');
    },
    () => 'foo',
  ]);
  let elem = node.toElement();
  expect(elem.innerHTML).toBe('<div>FOO</div>foo');
});

test('undefined child', () => {
  expect(() => {
    let node = div(undefined);
  }).toThrowError('bad child,');
  expect(() => {
    let node = div(null);
  }).toThrowError('bad child,');
});

test('empty class', () => {
  div({
    class: '',
  });
  div($``);
});

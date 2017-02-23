import {e, t, h, checkbox, App, on} from '../index'
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
  expect(node.classList).toMatchObject({
    foo: true,
    bar: true,
    baz: true,
  });
  expect(node.id).toBe('quux');
  node = div($`.foo`);
  expect(node.classList).toMatchObject({
    foo: true,
  });
  node = div($`#foo`);
  expect(node.id).toBe('foo');

  node = div({
    id: 'foo',
    classList: 'bar',
    innerHTML: 'yes',
  });
  expect(node.id).toBe('foo');
  expect(node.classList).toMatchObject({
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
    classList: 'bar',
  }, [
    P(),
  ]);
  expect(node.id).toBe('foo');
  expect(node.classList).toMatchObject({
    bar: true,
  });
  expect(node.children.length).toBe(1);
});

test('class property', () => {
  let node = e('div', {
    classList: 'foo bar baz',
  });
  expect(node.classList).toMatchObject({
    foo: true,
    bar: true,
    baz: true,
  });
  node = e('div', {
    classList: ['foo', 'bar', 'baz'],
  });
  expect(node.classList).toMatchObject({
    foo: true,
    bar: true,
    baz: true,
  });
  node = e('div', {
    classList: {
      foo: true,
      bar: true,
      baz: true,
      qux: false,
      quux: false,
    },
  });
  expect(node.classList).toMatchObject({
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
});

test('empty class', () => {
  div({
    classList: '',
  });
  div($``);
});

test('checkbox', () => {
  let elem = div(
    checkbox(),
  ).toElement();
  expect(elem.innerHTML).toBe('<input type="checkbox">');
});

test('event sub type', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let n = 0;
  new App(
    element,
    {},
    () => {
      return div(
        on('click', () => {
          n++;
        }),
        on('click:foo', () => {
          n++;
        }),
        on('click$foo', () => {
          n++;
        }),
        on('click$bar', () => {
          n++;
        }),
        {
          onclick$baz() {
            n++;
          },
        },
        on('created', (elem) => {
          let ev = new MouseEvent('click');
          elem.dispatchEvent(ev);
        }),
      );
    },
  );
  expect(n).toBe(4);
});

test('event unset', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let count = 0;
  let app = new App(
    element,
    0,
    (n) => {
      if (n == 0) {
        return div(
          on('click', () => {
            count++;
          }),
          on('created', (elem) => {
            let ev = new MouseEvent('click');
            elem.dispatchEvent(ev);
          }),
        );
      } else if (n == 1) {
        return div(
          on('patched', (elem) => {
            let ev = new MouseEvent('click');
            elem.dispatchEvent(ev);
          }),
        );
      }
    },
  );
  app.update(1);
  expect(count).toBe(1);
});

test('null arg', () => {
  let node = div(null);
  expect(node.children).toBe(null);
});

test('tag helper', () => {
  const div = h.div();
  expect(div).toMatchObject(e('div'));
});

import {t, e, setAfterThunkCallFunc, css, skip} from '../index'
import {div, p, none} from '../tags'
import {App} from '../app'
import {$inc} from '../operations'
import { $ } from '../tagged'
import { on } from '../index'
import { CommentNode } from '../nodes'

test('thunk this', () => {
  let _this;
  let thunk = t(function() {
    _this = this;
    return none;
  });
  let node = thunk.getNode();
  expect(_this === thunk).toBe(true);
});

test('oncreated', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);

  let called = false;
  let app = new App(
    element,
    {},
    () => div({
      oncreated: (elem) => {
        called = true;
        expect(elem.innerHTML).toBe('foobar');
      },
    }, 'foobar'),
  );
  expect(called).toBe(true);
});

test('undefined thunk', () => {
  let thunk = t(() => {});
  expect(() => {
    thunk.getNode();
  }).toThrowError('constructor of anonymous returned undefined value,[object Object]');

});

test('render error', () => {
  console.warn = jest.genMockFn();
  let thunk = t(() => {
    return {};
  });
  expect(() => {
    thunk.toElement();
  }).toThrowError('thunk function must return a Node,[object Object],[object Object]');
});

test('attr change', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let app = new App(
    element,
    {
      step: 0,
    },
  );
  let Main = (state) => {
    if (state.step == 0) {
      return div();
    } else if (state.step == 1 || state.step == 3) {
      return div({
        foo: false,
      });
    } else if (state.step == 2) {
      return div({
        foo: true,
      });
    }
  }
  app.init(Main);
  let e = app.element;
  expect(root.innerHTML).toBe('<div></div>');
  app.update('step', 1);
  expect(root.innerHTML).toBe('<div></div>');
  expect(app.element === e);
  app.update('step', 2);
  expect(root.innerHTML).toBe('<div foo="true"></div>');
  expect(app.element === e);
  app.update('step', 3);
  expect(root.innerHTML).toBe('<div></div>');
  expect(app.element === e);
});

test('nested thunk', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let app = new App(
    element,
    {
      step: 0,
    },
  );
  let Main = (state) => {
    if (state.step == 0) {
      return div();
    } else if (state.step == 1) {
      return t(() => {
        return t(() => {
          return div($`#foo`);
        });
      });
    }
  }
  app.init(Main);
  let e = app.element;
  expect(root.innerHTML).toBe('<div></div>');
  app.update('step', 1);
  expect(root.innerHTML).toBe('<div id="foo"></div>');
  expect(app.element === e);
});

test('bad argument to e', () => {
  expect(() => {
    e(1, 2, 3, 4, 5);
  }).toThrowError('');
  expect(() => {
    e();
  }).toThrowError('bad tag name,');
  expect(() => {
    t();
  }).toThrowError('no arguments to t');
});

test('click', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let clicked = false;
  let app = new App(
    element,
    {},
    () => {
      return div({
        onclick() {
          clicked = true;
        },
        oncreate(elem) {
          let ev = new MouseEvent('click');
          elem.dispatchEvent(ev);
        },
      });
    },
  );
  expect(clicked).toBe(true);
});

test('click 2', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let clicked = false;
  let app = new App(
    element,
    {},
    () => {
      return div(on('click', () => {
        clicked = true;
      }), on('created', (elem) => {
        let ev = new MouseEvent('click');
        elem.dispatchEvent(ev);
      }));
    },
  );
  expect(clicked).toBe(true);
});

test('bad children', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  function Foo() {}
  expect(() => {
    let app = new App(
      element,
      {},
      () => {
        return div([
          Foo,
        ]);
      },
    );
  }).toThrowError('bad child,');
});

test('bad class', () => {
  expect(() => div({
    classList: false,
  })).toThrowError('bad class,false');
});

test('string style', () => {
  let elem = div({
    style: 'border-top: 5px;',
  }).toElement();
  expect(elem.style.borderTop).toBe('5px');
});

test('children change', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let app = new App(
    element,
    {
      step: 0,
    },
  );
  let Main = (state) => {
    if (state.step == 0) {
      return div([1, 2, 3, 4, 5]);
    } else if (state.step == 1) {
      return div([1, 2, 3]);
    }
  }
  app.init(Main);
  expect(root.textContent).toBe('12345');
  app.update('step', 1);
  expect(root.textContent).toBe('123');
});

test('onpatch', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let app = new App(
    element,
    {
      step: 0,
    },
  );
  let n = 0;
  let Main = (state) => {
    return div([
      t((state) => {
        return div({
          onpatch() {
            n++
          },
        }, state.step);
      }, state),
    ]);
  };
  app.init(Main);
  expect(n).toBe(0);
  app.update('step', $inc);
  expect(n).toBe(1);
  app.update('step', $inc);
  expect(n).toBe(2);
});

test('null dom', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  new App(
    element,
    {},
    (state) => {
      return div([
        t(() => null),
      ]);
    },
  );
  expect(root.innerHTML).toBe('<div><!-- none --></div>');
});

test('func retuning array', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  const app = new App(
    element,
    {},
    (state) => div(
      () => {
        return [
          div(),
          div(),
        ];
      },
    ),
  );
});

test('style change to null', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  const app = new App(
    element,
    {
      n: 0,
    },
    (state) => {
      if (state.n == 0) {
        return div(
          css`
            margin-right: 5px;
          `,
        );
      } else if (state.n == 1) {
        return div();
      }
    },
  );
  expect(root.innerHTML).toBe('<div style="margin-right: 5px;"></div>');
  app.update('n', 1);
  expect(root.innerHTML).toBe('<div style=""></div>');
});

test('text to div', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  const app = new App(
    element,
    {
      n: 0,
    },
    (state) => {
      if (state.n == 0) {
        return div(
          'foo',
        );
      } else if (state.n == 1) {
        return div(
          div(),
        );
      }
    },
  );
  app.update('n', 1);
});

test('skip', () => {
  const node = div(
    div(),
    div(),
    div(),
    skip,
    div(),
    div(),
  );
  expect(node.children.length).toBe(3);
});

test('style merge', () => {
  let node = div(
    css`margin-right: 10px;`,
    css`margin-left: 10px;`,
  );
  expect(node.style).toBe('margin-right: 10px;margin-left: 10px;');
  node = div(
    { style: { marginLeft: '10px' } },
    { style: { marginRight: '5px' } },
    { style: { marginLeft: '3px' } },
  );
  expect(node.style.marginLeft).toBe('3px');
  expect(node.style.marginRight).toBe('5px');
  expect(() => {
    node = div(
      css`margin-left: 5px`,
      { style: { marginLeft: '3px' } },
    );
  }).toThrowError('should not mix-use object-like style and string-like style,[object Object],margin-left: 5px');
});

test('patch comment', () => {
  const root = document.createElement('div');
  const element = document.createElement('div');
  root.appendChild(element);
  const comment1 = new CommentNode();
  comment1.text = 'foo';
  const comment2 = new CommentNode();
  comment2.text = 'bar';
  const app = new App(
    element,
    0,
    (state) => div(
      () => {
        if (state == 0) {
          return div(none, none, none);
        } else if (state == 1) {
          return div('foo', none, none);
        } else if (state == 2) {
          return div();
        } else if (state == 3) {
          return div(comment1);
        } else if (state == 4) {
          return div(comment2);
        }
      },
    ),
  );
  expect(root.innerHTML).toBe('<div><div><!-- none --><!-- none --><!-- none --></div></div>');
  app.update(1);
  expect(root.innerHTML).toBe('<div><div>foo<!-- none --><!-- none --></div></div>');
  app.update(2);
  expect(root.innerHTML).toBe('<div><div></div></div>');
  app.update(3);
  expect(root.innerHTML).toBe('<div><div><!--foo--></div></div>');
  app.update(4);
  expect(root.innerHTML).toBe('<div><div><!--bar--></div></div>');
});

test('boolean child', () => {
  const node = e('p', true);
  const elem = node.toElement();
  expect(elem.innerHTML).toBe('true');
});

test('symbol child', () => {
  const node = e('p', Symbol('foo'));
  const elem = node.toElement();
  expect(elem.innerHTML).toBe('Symbol(foo)');
});

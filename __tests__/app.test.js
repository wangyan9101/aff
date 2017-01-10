import {App} from '../app'
import {div, none, input, style} from '../tags'
import { t, consoleLogUpdates } from '../index'
import { $inc } from '../operations'
import { $, css } from '../tagged'

test('app', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);

  let app = new App(
    consoleLogUpdates,
    element,
    (state) => {
      return div($`#test`, [
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
        app.update('m', app.state.n + 1);
        return none;
      }, {
        n: state.n
      }, 'foo', [1, 2, 3]),
      div($`#n`, state.n),
      div($`#m`, state.m || ''),
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

test('children delete', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let app = new App(
    element,
    {
      ns: [1, 2, 3],
    },
  );
  let Main = (state) => {
    if (state.ns.length == 0) {
      return div();
    }
    return div([
      state.ns.map(n => div(n)),
    ]);
  };
  app.init(Main);
  expect(root.textContent).toBe('123');
  app.update('ns', []);
  expect(app.html()).toBe('');
});

test('children append', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let app = new App(
    element,
    {
      ns: [],
    },
  );
  let Main = (state) => {
    if (state.ns.length == 0) {
      return div();
    }
    return div([
      state.ns.map(n => div(n)),
    ]);
  };
  app.init(Main);
  expect(app.html()).toBe('');
  app.update('ns', [1, 2, 3]);
  expect(root.textContent).toBe('123');
  app.update('ns', [1, 2, 3, 4]);
  expect(root.textContent).toBe('1234');
});

test('children append invalid', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let app = new App(
    element,
    {
      ns: [],
    },
  );
  function Foo() {}
  let Main = (state) => {
    if (state.ns.length == 0) {
      return div();
    }
    return div([
      Foo,
    ]);
  };
  app.init(Main);
  expect(app.html()).toBe('');
  console.warn = jest.genMockFn();
  expect(() => {
    app.update('ns', [1, 2, 3]);
  }).toThrowError('bad child,');
});

test('children append invalid', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let app = new App(
    element,
    {
      step: 0,
    },
  );
  function Foo() {}
  let Main = (state) => {
    if (state.step == 0) {
      return div([1]);
    } else if (state.step == 1) {
      return div([1, Foo]);
    }
  };
  app.init(Main);
  expect(app.html()).toBe('1');
  console.warn = jest.genMockFn();
  expect(() => {
    app.update('step', 1);
  }).toThrowError('bad child,');
});

test('remove event', () => {
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
    if (state.step == 0 || state.step == 2) {
      return div({
        onclick() {},
      });
    } else if (state.step == 1) {
      return div();
    } else if (state.step == 3) {
      return div({
        onfoo() {},
        onbar() {},
      });
    }
  };
  app.init(Main);
  expect(app.html()).toBe('');
  console.warn = jest.genMockFn();
  app.update('step', 1);
  expect(root.textContent).toBe('');
  app.update('step', 2);
  expect(root.textContent).toBe('');
  app.update('step', 3);
});

test('remove attribute', () => {
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
    if (state.step == 0 || state.step == 2) {
      return div({
        foo: 'foo',
      });
    } else if (state.step == 1) {
      return div();
    } else if (state.step == 3) {
      return div({
        bar: 'bar',
      });
    }
  };
  app.init(Main);
  expect(root.innerHTML).toBe('<div foo="foo"></div>');
  app.update('step', 1);
  expect(root.textContent).toBe('');
  app.update('step', 2);
  expect(root.innerHTML).toBe('<div foo="foo"></div>');
  app.update('step', 3);
});

test('change class', () => {
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
      return div($`.foo`);
    } else if (state.step == 1) {
      return div($`.bar`);
    }
  };
  app.init(Main);
  expect(root.innerHTML).toBe('<div class="foo"></div>');
  app.update('step', 1);
  expect(root.innerHTML).toBe('<div class="bar"></div>');
});

test('change style', () => {
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
    if (state.step == 0 || state.step == 2 || state.step == 5) {
      return div({
        style: {
          border: '1px solid red',
        },
      });
    } else if (state.step == 1) {
      return div();
    } else if (state.step == 3) {
      return div({
        style: {
          marginTop: '3px',
        },
      });
    } else if (state.step == 4 || state.step == 6) {
      return div({
        style: `
          margin-top: 5px;
        `,
      });
    } else if (state.step == 7) {
      return div({
        style: `
          border-top: 5px;
        `,
      });
    }
  };
  app.init(Main);
  expect(root.innerHTML).toBe('<div style="border: 1px solid red;"></div>');
  app.update('step', 1);
  expect(root.innerHTML).toBe('<div style=""></div>');
  app.update('step', 2);
  expect(root.innerHTML).toBe('<div style="border: 1px solid red;"></div>');
  app.update('step', 3);
  expect(root.innerHTML).toBe('<div style="margin-top: 3px;"></div>');
  app.update('step', 4);
  expect(root.innerHTML).toBe('<div style="margin-top: 5px;"></div>');
  app.update('step', 5);
  expect(root.innerHTML).toBe('<div style="border: 1px solid red;"></div>');
  app.update('step', 6);
  expect(root.innerHTML).toBe('<div style="margin-top: 5px;"></div>');
  app.update('step', 7);
  expect(root.innerHTML).toBe('<div style="border-top: 5px;"></div>');
});

test('change id', () => {
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
      return div($`#foo`);
    } else if (state.step == 1) {
      return div($`#bar`);
    }
  }
  app.init(Main);
  expect(root.innerHTML).toBe('<div id="foo"></div>');
  app.update('step', 1);
  expect(root.innerHTML).toBe('<div id="bar"></div>');
});

test('change innerHTML', () => {
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
      return div({
        innerHTML: 'foo',
      });
    } else if (state.step == 1) {
      return div({
        innerHTML: 'bar',
      });
    }
  }
  app.init(Main);
  expect(root.innerHTML).toBe('<div>foo</div>');
  app.update('step', 1);
  expect(root.innerHTML).toBe('<div>bar</div>');
});

test('checked', () => {
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
      return input($`#foo`, {
        type: 'checkbox',
        checked: true,
      });
    } else if (state.step == 1) {
      return input($`#foo`, {
        type: 'checkbox',
        checked: false,
      });
    }
  }
  app.init(Main);
  expect(root.querySelector('#foo').checked).toBe(true);
  app.update('step', 1);
  expect(root.querySelector('#foo').checked).toBe(false);
});

test('checked', () => {
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
    if (state.step == 0 || state.step == 3) {
      return input($`#foo`, {
        type: 'checkbox',
        checked: false,
      });
    } else if (state.step == 1) {
      return input($`#foo`, {
        type: 'checkbox',
        checked: true,
      });
    } else if (state.step == 2) {
      return input($`#foo`, {
        type: 'checked',
      });
    }
  }
  app.init(Main);
  expect(root.querySelector('#foo').checked).toBe(false);
  app.update('step', 1);
  expect(root.querySelector('#foo').checked).toBe(true);
  app.update('step', 2);
  expect(root.querySelector('#foo').checked).toBe(false);
  app.update('step', 3);
  expect(root.querySelector('#foo').checked).toBe(false);
});

test('style change', () => {
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
      return style(``);
    } else if (state.step == 1) {
      return style({
        scoped: true,
      });
    }
  }
  app.init(Main);
  expect(root.innerHTML).toBe('<style></style>');
  app.update('step', 1);
  expect(root.innerHTML).toBe('<style scoped="true"></style>');
});

test('infinite update', () => {
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
    return div([
      t('bad', (state) => {
        app.update('step', $inc);
        return none;
      }, state),
    ]);
  };
  expect(() => {
    app.init(Main);
  }).toThrowError('infinite loop in updating,');
});

test('bench update', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let app = new App(
    element,
    {
      step: 0,
    },
    (state) => div(state.step),
  );
  let n = 10000;
  console.time(`update ${n}`);
  for (let i = 0; i < n; i++) {
    app.update('step', $inc);
  }
  console.timeEnd(`update ${n}`);
});

test('test state not change', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let state = {
    foo: {
      foo: 'foo',
    },
    bar: {
      bar: 'bar',
    },
  };
  let app = new App(state, element);
  app.init((state) => {
    return div([
      t('foo', (state) => {
        return div(state.foo);
      }, state.foo),
      t('bar', (state) => {
        return div(state.bar);
      }, state.bar),
    ]);
  });
  app.update('foo', 'foo', 'FOO');
  expect(root.textContent).toBe('FOObar');
});

test('app get state', () => {
  let init_state = {
    foo: {
      bar: {
        baz: {
          qux: 'QUX',
        },
      },
    },
  };
  let app = new App(init_state);
  expect(app.get('foo') === init_state.foo).toBe(true);
  expect(app.get('foo', 'bar') === init_state.foo.bar).toBe(true);
  expect(app.get('foo', 'bar', 'baz') === init_state.foo.bar.baz).toBe(true);
  expect(app.get(['foo']) === init_state.foo).toBe(true);
  expect(app.get(['foo', 'bar']) === init_state.foo.bar).toBe(true);
  expect(app.get(['foo', 'bar', 'baz']) === init_state.foo.bar.baz).toBe(true);
});

test('init state 0', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let app = new App(
    element,
    0,
    (n) => {
      return div(n + 10);
    },
  );
  expect(root.textContent).toBe('10');
});

test('class change', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let app = new App(
    element,
    0,
  );
  app.init((step) => {
    if (step == 0) {
      return div({
        id: 'foo',
        classList: {
          foo: true,
          bar: false,
        },
      });
    } else {
      return div({
        id: 'foo',
        classList: {
          foo: false,
          bar: true,
        },
      });
    }
  });
  expect(root.querySelector('#foo').className).toBe('foo');
  app.update(1);
  expect(root.querySelector('#foo').className).toBe('bar');
});

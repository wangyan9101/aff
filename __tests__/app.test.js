import {App} from '../app'
import {div, none, input, style} from '../tags'
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
  let Main = (state) => {
    if (state.ns.length == 0) {
      return div();
    }
    return div([
      false,
    ]);
  };
  app.init(Main);
  expect(app.html()).toBe('');
  console.warn = jest.genMockFn();
  app.update('ns', [1, 2, 3]);
  expect(root.textContent).toBe('RENDER ERROR: cannot render false');
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
  let Main = (state) => {
    if (state.step == 0) {
      return div([1]);
    } else if (state.step == 1) {
      return div([1, false]);
    }
  };
  app.init(Main);
  expect(app.html()).toBe('1');
  console.warn = jest.genMockFn();
  app.update('step', 1);
  expect(root.textContent).toBe('1RENDER ERROR: cannot render false');
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
  expect(root.innerHTML).toBe('<div aff-serial="21" foo="foo"></div>');
  app.update('step', 1);
  expect(root.textContent).toBe('');
  app.update('step', 2);
  expect(root.innerHTML).toBe('<div aff-serial="21" foo="foo"></div>');
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
      return div('.foo');
    } else if (state.step == 1) {
      return div('.bar');
    }
  };
  app.init(Main);
  expect(root.innerHTML).toBe('<div aff-serial="22" class="foo"></div>');
  app.update('step', 1);
  expect(root.innerHTML).toBe('<div aff-serial="22" class="bar"></div>');
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
    } else if (state.step == 4) {
      return div({
        style: `
          margin-top: 5px;
        `,
      });
    }
  };
  app.init(Main);
  expect(root.innerHTML).toBe('<div aff-serial="23" style="border: 1px solid red;"></div>');
  app.update('step', 1);
  expect(root.innerHTML).toBe('<div aff-serial="23" style=""></div>');
  app.update('step', 2);
  expect(root.innerHTML).toBe('<div aff-serial="23" style="border: 1px solid red;"></div>');
  app.update('step', 3);
  expect(root.innerHTML).toBe('<div aff-serial="23" style="margin-top: 3px;"></div>');
  app.update('step', 4);
  expect(root.innerHTML).toBe('<div aff-serial="23" style="margin-top: 5px;"></div>');
  app.update('step', 5);
  expect(root.innerHTML).toBe('<div aff-serial="23" style="border: 1px solid red;"></div>');
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
      return div('#foo');
    } else if (state.step == 1) {
      return div('#bar');
    }
  }
  app.init(Main);
  expect(root.innerHTML).toBe('<div aff-serial="24" id="foo"></div>');
  app.update('step', 1);
  expect(root.innerHTML).toBe('<div aff-serial="24" id="bar"></div>');
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
  expect(root.innerHTML).toBe('<div aff-serial="25">foo</div>');
  app.update('step', 1);
  expect(root.innerHTML).toBe('<div aff-serial="25">bar</div>');
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
      return input('#foo', {
        type: 'checkbox',
        checked: true,
      });
    } else if (state.step == 1) {
      return input('#foo', {
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
      return input('#foo', {
        type: 'checkbox',
        checked: false,
      });
    } else if (state.step == 1) {
      return input('#foo', {
        type: 'checkbox',
        checked: true,
      });
    } else if (state.step == 2) {
      return input('#foo', {
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
  expect(root.innerHTML).toBe('<style aff-serial="32"></style>');
  app.update('step', 1);
  expect(root.innerHTML).toBe('<style aff-serial="32" scoped="true"></style>');
});

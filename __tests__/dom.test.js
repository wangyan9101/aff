import {t, e, setAfterThunkCallFunc} from '../dom'
import {div, p, none} from '../tags'
import {App} from '../app'
import {$inc} from '../state'
import { $ } from '../tagged'
import { on } from '../index'

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
  let elem = thunk.toElement();
  expect(elem.textContent).toBe('RENDER ERROR: cannot render [object Object]');
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
        oncreated(elem) {
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
  let checked = false;
  let app = new App(
    element,
    {},
    () => {
      return div({
        oncreated(elem) {
          expect(elem.textContent).toBe('RENDER ERROR: cannot render null');
          checked = true;
        },
      }, [
        null,
      ]);
    },
  );
  expect(checked).toBe(true);
});

test('bad class', () => {
  expect(() => div({
    class: false,
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

test('cover setAfterThunkCallFunc', () => {
  setAfterThunkCallFunc(() => {});
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
  expect(root.innerHTML).toBe('<div><div style="display: none;"></div></div>');
});

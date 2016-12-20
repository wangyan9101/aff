import {patch, t, e, setAfterThunkCallFunc} from '../dom'
import {div, p, none} from '../tags'
import {App} from '../app'

test('dom', () => {
  let root = document.createElement('div');
  let el = document.createElement('div');
  root.appendChild(el);

  let n = 0;
  function get_node() {
    n++;
    return div([
      p('yes ' + n),
      none,
    ]);
  }

  let node;

  [el, node] = patch(el, get_node(), node);
  [el, node] = patch(el, get_node(), node);
  [el, node] = patch(el, get_node(), node);

  expect(el.getAttribute('aff-serial')).toBe('1');

  //TODO more tests
});

test('thunk this', () => {
  let _this;
  let thunk = t(function() {
    _this = this;
    return none;
  });
  let node = thunk.getNode();
  expect(_this === thunk).toBe(true);
});

test('thunk element', () => {
  let f = (state) => div(state.foo);
  let thunk1 = t(f, { foo: 'yes' });
  let element = thunk1.toElement();
  let thunk2 = t(f, { foo: 'no' });
  let new_element, node = patch(element, thunk2, thunk1);
  expect(thunk2.element !== null).toBe(true);
});

test('oncreated', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);

  let called = false;
  patch(element, div({
    oncreated: (elem) => {
      called = true;
      expect(elem.innerHTML).toBe('foobar');
    },
  }, 'foobar'));
  expect(called).toBe(true);
});

test('null thunk', () => {
  let thunk = t(() => {});
  expect(() => {
    thunk.getNode();
  }).toThrowError('constructor of anonymous returned null value,[object Object]');

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
  expect(root.innerHTML).toBe('<div aff-serial="7"></div>');
  app.update('step', 1);
  expect(root.innerHTML).toBe('<div aff-serial="7"></div>');
  app.update('step', 2);
  expect(root.innerHTML).toBe('<div aff-serial="7" foo="true"></div>');
  app.update('step', 3);
  expect(root.innerHTML).toBe('<div aff-serial="7"></div>');
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
          return div('#foo');
        });
      });
    }
  }
  app.init(Main);
  expect(root.innerHTML).toBe('<div aff-serial="8"></div>');
  app.update('step', 1);
  expect(root.innerHTML).toBe('<div aff-serial="8" id="foo"></div>');
});

test('bad argument to e', () => {
  expect(() => {
    e(1, 2, 3, 4, 5);
  }).toThrowError('bad arguments to e(),1,2,3,4,5');
  expect(() => {
    e('div', true, []);
  }).toThrowError('bad argument at index 1 to e(),div,true');
  expect(() => {
    e('div', true);
  }).toThrowError('bad argument at index 1 to e(),div,true');
  expect(() => {
    e();
  }).toThrowError('no arguments to e');
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

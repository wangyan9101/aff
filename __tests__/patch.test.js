import { App } from '../app'
import { div, p, none } from '../tags'
import { t, patch } from '../dom'
import {
  setBeforeThunkCallFunc,
} from '../dom'
import { $push } from '../state'

test('thunk func call optimize', () => {
  let n = 0;
  setBeforeThunkCallFunc((thunk) => {
    n++;
  });

  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let init_state = {
    a: 0,
    b: 0,
  };
  let app = new App(element, init_state);
  let Main = (state) => {
    return div([
      t(Foo, {
        a: state.a,
        b: undefined,
      }),
    ]);
  };
  let step = 0;
  let Foo = (state) => {
    if (step == 0) {
      expect(state.a).toBe(0);
    } else {
      expect(state.a).toBe(2);
    }
    step++;
    return div();
  };
  app.init(Main);
  // not related to Foo, should not call Foo 
  app.update('b', -1);
  expect(n).toBe(1);
  // related to Foo
  app.update('a', 2);
  expect(n).toBe(2);
});

test('not patchable', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let app = new App(element);
  console.warn = jest.genMockFn();
  app.patch(element, false);
  expect(root.textContent).toBe('RENDER ERROR: cannot render false');
});

test('update push', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let app = new App(
    element,
    {
      foos: [1, 2, 3],
      bars: [2, 3, 4],
    },
  );
  let Main = (state) => {
    return div([
      t('foos', (foos) => {
        return div(foos.map(foo => div(foo)));
      }, state.foos),
      t('bars', (bars) => {
        return div(bars.map(bar => div(bar)));
      }, state.bars),
    ]);
  };
  app.init(Main);
  app.update('foos', $push(4));
  expect(root.textContent).toBe('1234234');
  app.update('foos', $push(4));
  expect(root.textContent).toBe('12344234');
  app.update('bars', $push(4));
  expect(root.textContent).toBe('123442344');
});

test('thunk name chagne', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let app = new App(
    element,
    {
      step: 0,
    },
  );
  let main = (state) => {
    return div([
      (() => {
        if (state.step == 0) {
          return t('foo', () => div('foo'));
        } else if (state.step == 1) {
          return t('bar', () => div('bar'));
        } else if (state.step == 2) {
          return t('bar', () => div('BAR'), 'bar');
        }
      })(),
    ]);
  };
  app.init(main);
  expect(root.textContent).toBe('foo');
  app.update('step', 1);
  expect(root.textContent).toBe('bar');
  app.update('step', 2);
  expect(root.textContent).toBe('BAR');
});

test('element reuse', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let app = new App(
    element,
    0,
    (step) => {
      if (step % 2 == 0) {
        let list = [];
        for (let i = 0; i < step; i++) {
          list.push(none);
        }
        return div(list);
      } else {
        let list = [];
        for (let i = 0; i < step; i++) {
          list.push(p(i));
        }
        return div(list);
      }
    },
  );
  for (let i = 0; i < 32; i++) {
    app.update(i);
    if (i % 2 == 0) {
      expect(root.textContent).toBe('');
    } else {
      let s = '';
      for (let n = 0; n < i; n++) {
        s += n;
      }
      expect(root.textContent).toBe(s);
    }
  }
});

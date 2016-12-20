import { App } from '../app'
import { div } from '../tags'
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

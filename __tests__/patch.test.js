import { App } from '../app'
import { div } from '../tags'
import { t } from '../dom'
import {
  setBeforeThunkCallFunc,
} from '../dom'

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

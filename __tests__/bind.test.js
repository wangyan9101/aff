import { App, input, bind_focus, div, bind_hover, bind_enter, $ } from '../index'

test('bind focus', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let app = new App(
    element,
    {
      focus: false,
    },
  );
  app.init(
    (state) => {
      return input($`#foo`,
        bind_focus(app.sub('focus')),
      );
    },
  );
  expect(app.state.focus).toBe(false);
  root.querySelector('#foo').focus();
  expect(app.state.focus).toBe(true);
  root.querySelector('#foo').blur();
  expect(app.state.focus).toBe(false);
});

test('bind hover', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let app = new App(
    element,
    {
      hover: false,
    },
  );
  app.init(
    (state) => {
      return div($`#foo`,
        bind_hover(app.sub('hover')),
      );
    },
  );
  let ev = document.createEvent('MouseEvents');
  ev.initMouseEvent('mouseover', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  root.querySelector('#foo').dispatchEvent(ev);
  expect(app.state.hover).toBe(true);
  ev.initMouseEvent('mouseout', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  root.querySelector('#foo').dispatchEvent(ev);
  expect(app.state.hover).toBe(false);
});

test('bind enter', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  let app = new App(
    element,
    {
      enter: false,
    },
  );
  app.init(
    (state) => {
      return div($`#foo`,
        bind_enter(app.sub('enter')),
      );
    },
  );
  let ev = document.createEvent('MouseEvents');
  ev.initMouseEvent('mouseenter', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  root.querySelector('#foo').dispatchEvent(ev);
  expect(app.state.enter).toBe(true);
  ev.initMouseEvent('mouseleave', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  root.querySelector('#foo').dispatchEvent(ev);
  expect(app.state.enter).toBe(false);
});

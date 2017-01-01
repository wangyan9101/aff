import { App, input, bindFocus, div, bindHover, bindEnter, $ } from '../index'

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
        bindFocus(app.sub('focus')),
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
        bindHover(app.sub('hover')),
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
        bindEnter(app.sub('enter')),
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

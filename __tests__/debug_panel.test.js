import { App, div, DebugPanel,
  $inc, $func, $splice,
} from '../index'

test('debug panel', () => {
  let root = document.createElement('div');
  let element = document.createElement('div');
  root.appendChild(element);
  const app = new App(
    element,
    {
      n: 0,
    },
    (state, app) => div(
      DebugPanel(app, {
        show: true,
      }),
    ),
  );

  app.update('__debug_panel', 'selectedTab', 'updates');
  app.update('n', $inc);
  app.update('dict', {
    foo: 'foo',
    bar: 'bar',
  });
  app.update('list', [1, 2, 3]);
  app.update('list', () => true, $func(v => v * 2));
  app.update('list', $splice(0, 1));

  app.update('__debug_panel', 'selectedTab', 'state');
  let elem = root.querySelector('.state-value');
  let ev = document.createEvent('MouseEvents');
  ev.initMouseEvent('mouseenter', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  elem.dispatchEvent(ev);
  ev.initMouseEvent('mouseleave', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  elem.dispatchEvent(ev);

  elem = root.querySelector('.tab-item-index');
  ev.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  elem.dispatchEvent(ev);
  expect(app.state.__debug_panel.selectedTab).toBe('index');

  app.update('__debug_panel', 'show', false);
  app.update('__debug_panel', 'show', true);

  elem = root.querySelector('#close-debug-panel');
  ev.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  elem.dispatchEvent(ev);
  app.update('__debug_panel', 'show', true);

  elem = root.querySelector('#panel-position-TL');
  ev.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  elem.dispatchEvent(ev);

  ev = document.createEvent('KeyboardEvent');
  ev.initKeyboardEvent("keypress", true, true, window, true, false, false, false, 17, 0);
  document.dispatchEvent(ev);
});

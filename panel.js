import { 
  App, css, on, t, $, $func,
  div, p, none, table, tr, td, span,
  logUpdates,
} from './index'

export function DebugPanel(debugState, app) {
  // init
  if (!debugState) {
    app.update('debug', {});
    debugState = app.state.debug;
  }
  if (!debugState.initialized) {
    // hotkey
    document.addEventListener('keypress', (ev) => {
      if (ev.keyCode != 17 || !ev.ctrlKey) {
        return
      }
      debugState.$update('show', $func(v => !v));
    });
    debugState.$update('initialized', true);
    // default states
    if (debugState.selectedTab === undefined) {
      debugState.$update('selectedTab', 'updates');
    }
    if (debugState.updates === undefined) {
      debugState.$update('updates', []);
    }
    // logging
    app.init(logUpdates(debugState.updates));
  }

  if (!debugState.show) {
    return [];
  }

  // styles
  const panelBackgroundColor = '#EEE';
  const panelWidth = '10vw';

  // tabs
  const Tabs = t((debugState) => div(
    css`
      list-style: none;
    `,
    [
      { name: 'index' },
      { name: 'state' },
      { name: 'updates' },
    ].map(info => {
      return div(
        info.name,
        css`
          background-color: ${debugState.selectedTab === info.name ? '#DDD' : 'transparent'};
          padding: 5px;
        `,
        on('click', () => {
          debugState.$update('selectedTab', info.name);
        }),
      );
    }),
  ), debugState);

  // panels
  const panelStyle = `
    background-color: ${panelBackgroundColor};
    position: absolute;
    top: 0;
    bottom: 0;
    min-width: ${panelWidth};
    margin: 0;
    text-align: center;
  `;

  const LeftPanel = div(
    css`
      ${panelStyle}
      left: 0;
    `,
    p('Debug Panel'),
    Tabs,
  );

  const RightPanel = div(
    css`
      ${panelStyle}
      right: 0;
    `,
    t(PointingPath, debugState.pointingPath),
  );

  const MainContent = t((debugState, appState) => div(
    $`#main`,
    css`
      position: absolute;
      top: 0;
      bottom: 0;
      left: ${panelWidth};
      right: ${panelWidth};
      border-left: 1px solid #CCC;
      border-right: 1px solid #CCC;
      overflow: auto;
    `,

    div(debugState.selectedTab, css` 
      text-align: center; 
      border-bottom: 1px solid #CCC;
      font-weight: bold;
      margin-bottom: 3px;
    `),

    () => {
      // scroll to top when switching tab
      const lastTab = debugState.lastTab;
      if (debugState.selectedTab != lastTab) {
        const elem = document.getElementById('main');
        if (elem) {
          elem.scrollTop = 0;
        }
        debugState.$update('lastTab', debugState.selectedTab);
      }
      if (debugState.selectedTab === 'state') {
        return t(AppState, appState, debugState);
      } else if (debugState.selectedTab === 'updates') {
        return t(Updates, debugState.updates, debugState.$path);
      }
      return none;
    },

    div(css`
      height: 10vh;
    `),

  ), debugState, app.state);

  return [

    // ui
    div(
      css`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 1px solid #666;
        background-color: white;
        margin: 1px;
        font-size: 12px;
        z-index: 9999;
      `,

      LeftPanel,
      RightPanel,
      MainContent,
    ),

  ];
}

function AppState(appState, debugState) {
  return div(
    css`
      padding: 0 10px;
    `,
    t(StateNode, appState, [], debugState),
  );
}

function StateNode(appState, path = [], debugState) {
  return t((appState, path) => table(
    css`
      margin: 0 auto;
      min-width: 100%;
      border-collapse: collapse;
      text-align: center;
    `,
    () => {
      const ret = [];
      const keys = Object.keys(appState);
      keys.sort();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (appState[key] === debugState) { // skip debug state
          continue
        }
        let valueNode;
        if (typeof appState[key] === 'object') {
          let subpath = path.slice(0);
          subpath.push(key);
          valueNode = t(StateNode, appState[key], subpath, debugState);
        } else {
          valueNode = appState[key];
        }
        const bindPointingPath = [
          on('mouseenter', () => {
            let pointingPath = path.slice(0);
            pointingPath.push(key);
            debugState.$update('pointingPath', pointingPath);
          }), 
          on('mouseleave', () => {
            debugState.$update('pointingPath', false);
          }),
        ];
        ret.push(tr(
          css`
            border: 1px solid #AAA;
          `,
          bindPointingPath,
          td(key, css`
            background-color: #EEFFEE;
            padding: 0 10px;
            vertical-align: top;
          `, bindPointingPath),
          td(valueNode, css`
            padding: 1px;
          `, bindPointingPath),
        ));
      }
      return ret;
    },
  ), appState, path);
}

function PointingPath(path) {
  if (!path) {
    return none;
  }
  return div(
    'POINTING PATH',
    path.map(key => div(key)),
  );
}

function Updates(updates, debugStatePath) {
  if (!updates) {
    return p('updates logging not enabled');
  } else if (updates.length == 0) {
    return p('no logs');
  }
  return div(
    css`
      padding: 0 10px;
    `,
    () => {
      const ret = [];
      for (let i = updates.length - 1; i >= 0; i--) {
        const log = updates[i];
        const ignore = debugStatePath.reduce((acc, cur, i) => acc && cur == log.args[i], true);
        // ignore debug panel updates
        if (ignore) {
          continue
        }
        ret.push(div(
          css`
            border-bottom: 1px solid #EEE;
            margin-bottom: 1px;
          `,
          span(
            'tick: ', log.tick,
            css`
              padding: 0 10px;
              background-color: #EFE;
            `,
          ),
          log.args.map((path, i) => span(path, css`
            padding: 0 10px;
            background-color: ${i % 2 == 0 ? '#EEE' : 'transparent'};
          `)),
        ));
      }
      return ret;
    },
  );
}

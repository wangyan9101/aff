import { 
  App, css, on, t,
  div, p, none, table, tr, td,
} from './index'

export function DebugPanel(debugState, app) {
  // default states
  if (debugState.selectedTab === undefined) {
    debugState.$update('selectedTab', 'state');
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
    div(debugState.selectedTab, css` text-align: center; `),
    () => {
      if (debugState.selectedTab === 'state') {
        return t(AppState, appState, debugState);
      }
      return none;
    },
    div(css`
      height: 10vh;
    `),
  ), debugState, app.state);

  return [

    div(
      css`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.8);
        border: 1px solid #666;
        margin: 1px;
        font-size: 12px;
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

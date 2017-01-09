import { 
  App, css, on, t,
  div, p, none, table, tr, td,
} from './index'

export function DebugPanel(state, app) {
  // default states
  if (state.selectedTab === undefined) {
    state.$update('selectedTab', 'state');
  }

  // styles
  const panelBackgroundColor = '#EEE';
  const panelWidth = '10vw';

  // tabs
  const Tabs = div(
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
          background-color: ${state.selectedTab === info.name ? '#DDD' : 'transparent'};
          padding: 5px;
        `,
        on('click', () => {
          state.$update('selectedTab', info.name);
        }),
      );
    }),
  );

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
    t(PointingPath, state.pointingPath),
  );

  const MainContent = div(
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
    div(state.selectedTab, css` text-align: center; `),
    () => {
      if (state.selectedTab === 'state') {
        return t(State, app.state, state);
      }
      return none;
    },
    div(css`
      height: 10vh;
    `),
  );

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

function State(state, debugState) {
  return div(
    css`
      padding: 0 10px;
    `,
    t(StateNode, state, [], debugState),
  );
}

function StateNode(state, path = [], debugState) {
  return table(
    css`
      margin: 0 auto;
      min-width: 100%;
      border-collapse: collapse;
      text-align: center;
    `,
    () => {
      const ret = [];
      const keys = Object.keys(state);
      keys.sort();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (state[key] === debugState) { // skip debug state
          continue
        }
        let valueNode;
        if (typeof state[key] === 'object') {
          let subpath = path.slice(0);
          subpath.push(key);
          valueNode = t(StateNode, state[key], subpath, debugState);
        } else {
          valueNode = state[key];
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
            border: 1px solid #666;
          `,
          bindPointingPath,
          td(key, css`
            border: 1px solid #09C;
            padding: 0 10px;
          `, bindPointingPath),
          td(valueNode, css`
            padding: 1px;
          `, bindPointingPath),
        ));
      }
      return ret;
    },
  );
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

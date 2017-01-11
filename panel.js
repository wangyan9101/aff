import { 
  App, css, on, t, $, $func, $push, $merge,
  div, p, none, table, tr, td, span, pre, clear, button,
} from './index'

export function DebugPanel(app, initState) {

  // check state
  let debugState = app.state.__debug_panel;
  if (!debugState) {
    app.update('__debug_panel', {});
    debugState = app.state.__debug_panel;
  }

  // init
  if (!debugState.initialized) {
    // hotkey
    document.addEventListener('keypress', (ev) => {
      if (ev.keyCode != 17 || !ev.ctrlKey) {
        return
      }
      debugState.$update('show', $func(v => !v));
    });

    // updates logging
    let logState = debugState.updates;
    if (!logState) {
      debugState.$update('updates', []);
      logState = debugState.updates;
    }
    app.init(on('afterUpdate: aff logging log updates', (state, ...args) => {
      // to prevent recursive logging
      const ignore = logState.$path.reduce((acc, cur, i) => acc && cur == args[i], true);
      if (!ignore) {
        logState.$update($push({
          args: args,
          tick: state.__aff_tick,
        }));
      }
    }));

    // init state
    if (initState) {
      debugState.$update($merge(initState));
    }
    debugState.$update('initialized', true);

  }

  if (!debugState.show) {
    return [];
  }

  // styles
  const panelBackgroundColor = '#EEE';
  const leftPanelWidth = '10vw';
  const bottomPanelHeight = '1em';

  // tabs
  if (debugState.selectedTab === undefined) {
    debugState.$update('selectedTab', 'updates');
  }
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
        $`.tab-item-${info.name}`,
        info.name,
        css`
          background-color: ${debugState.selectedTab === info.name ? '#DDD' : 'transparent'};
          padding: 5px;
          user-select: none;
          cursor: pointer;
        `,
        on('click', () => {
          debugState.$update('selectedTab', info.name);
        }),
      );
    }),

  ), debugState);

  const LeftPanel = div(
    css`
      background-color: ${panelBackgroundColor};
      position: absolute;
      top: 0;
      bottom: 0;
      min-width: ${leftPanelWidth};
      margin: 0;
      text-align: center;
      left: 0;
    `,

    p(css` font-weight: bold `, 'Debug Panel'),
    Tabs,

    // lower left
    div(
      css`
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
      `,

      PanelPosition(debugState),
      CloseButton(debugState),
    ),
  );

  const BottomPanel = div(
    css`
      background-color: ${panelBackgroundColor};
      position: absolute;
      left: ${leftPanelWidth};
      right: 0;
      bottom: 0;
      height: ${bottomPanelHeight};
      font-size: 1em;
      line-height: 1em;
    `,
    t(PointingPath, debugState.pointingPath),
  );

  const MainContent = t((debugState, appState) => div(
    $`#main`,
    css`
      position: absolute;
      top: 0;
      bottom: 0;
      left: ${leftPanelWidth};
      right: 0;
      top: 0;
      bottom: ${bottomPanelHeight};
      border-left: 1px solid #CCC;
      border-bottom: 1px solid #CCC;
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
        const elem = document.querySelector('#main');
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
        top: ${debugState.top || 0};
        left: ${debugState.left || 0};
        right: ${debugState.right || 0};
        bottom: ${debugState.bottom || 0};
        border: 1px solid #666;
        background-color: white;
        margin: 1px;
        font-size: 12px;
        z-index: 9999;
        color: #333;
      `,

      LeftPanel,
      BottomPanel,
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
          // key
          td(key, css`
            background-color: #EEFFEE;
            padding: 0 10px;
            vertical-align: top;
          `, bindPointingPath),
          // value
          td($`.state-value`, valueNode, css`
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
    'POINTING PATH: ',
    path.map(key => span(key, css`
      padding-left: 5px;
    `)),
  );
}

function Updates(updates, debugStatePath) {
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
              float: right;
            `,
          ),

          log.args.map((arg, i) => span(
            span(
              css`
                padding: 0 10px;
                color: #AAA;
              `,

              () => {
                if (i > 0 && i != log.args.length - 1) {
                  return '.';
                } else if (i == log.args.length - 1) {
                  return '=>';
                } 
                return '';
              },
            ),
            formatArg(arg), 
          )),

          clear,
        ));

      }
      return ret;
    },
  );
}

function formatArg(arg) {
  if (typeof arg === 'object' && arg.__is_op) {
    return [
      span(arg.op, css`
        text-decoration: underline;
      `),
      arg.args ? [
        ': ',
        () => {
          const ret = [];
          for (let i = 0; i < arg.args.length; i++) {
            if (i > 0) {
              ret.push(', ');
            }
            ret.push(formatArg(arg.args[i]));
          }
          return ret;
        },
      ] : [],
    ];

  } else if (Array.isArray(arg)) {
    const ret = [
      '[ ',
    ];
    for (let i = 0; i < arg.length; i++) {
      if (i > 0) {
        ret.push(', ');
      }
      ret.push(formatArg(arg[i]));
    }
    ret.push(' ]');
    return ret;

  } else if (typeof arg === 'object') {
    const ret = [
      '{ ',
    ];
    let i = 0;
    for (const key in arg) {
      if (i > 0) {
        ret.push(', ');
      }
      ret.push([key, ': ', formatArg(arg[key])]);
      i++;
    }
    ret.push(' }');
    return ret;

  } else if (typeof arg === 'function') {
    return arg.toString();
  }

  return arg;
}

// close panel
function CloseButton(debugState) {
  return button(
    css`
      margin: 10px 0;
    `,
    on('click', () => {
      debugState.$update('show', false);
    }),
    'Close',
  );
}

function PanelPosition(debugState) {
  function makeButton(text, left, right, top, bottom) {
    return button(
      css`
        font-size: 10px;
        width: 3em;
      `,
      text,
      on('click', () => {
        debugState.$update($merge({
          left: left,
          right: right,
          top: top,
          bottom: bottom,
        }));
      }),
    );
  }
  const width = debugState.panelWidthPercent || 45;
  const height = debugState.panelHeightPercent || 45;
  return div(
    css`
      margin: 10px 0;
    `,
    div(
      makeButton('TL', 0, (100 - width) + '%', 0, (100 - height) + '%'),
      makeButton('TP', 0, 0, 0, (100 - height) + '%'),
      makeButton('TR', (100 - width) + '%', 0, 0, (100 - height) + '%'),
    ),
    div(
      makeButton('LE', 0, (100 - width) + '%', 0, 0),
      makeButton('MI', 0, 0, 0, 0),
      makeButton('RI', (100 - width) + '%', 0, 0, 0),
    ),
    div(
      makeButton('BL', 0, (100 - width) + '%', (100 - height) + '%', 0),
      makeButton('BO', 0, 0, (100 - height) + '%', 0),
      makeButton('BR', (100 - width) + '%', 0, (100 - height) + '%', 0),
    ),
  );
}

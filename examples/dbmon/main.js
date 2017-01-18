import {
  App, t,
  table, tbody, tr, td, div, span ,
  $, readOnly,
  DebugPanel,
} from '../../index'

function DBMon(state, app) {
  return div(
    table($`.table .table-striped .latest-data`,
      tbody(
        state.databases.map(function(database) {
          return t(DB, database);
        }),
      ),
    ),
    //DebugPanel(app),
  );
}

function DB(database) {
  return tr(
    td($`.dbname`, database.dbname),
    td($`.query-count`,
      span({ classList: database.lastSample.countClassName }, database.lastSample.nbQueries),
    ),
    database.lastSample.topFiveQueries.map(function(query) {
      return t('Query', function(query) {
        return td($`.Query .${query.elapsedClassName}`,
          query.formatElapsed,
          div($`.popover .left`,
            div($`.popover-content`, query.query),
            div($`.arrow`),
          ),
        );
      }, query);
    }),
  );
}

let app = new App(
  document.getElementById('app'),
  DBMon,
  {
    databases: readOnly(ENV.generateData().toArray()),
    debug: {},
  },
);

function load() {
  app.update('databases', readOnly(ENV.generateData().toArray()));
  Monitoring.renderRate.ping();
  setTimeout(load, ENV.timeout);
};

load();


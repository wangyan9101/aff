import {
  App, t,
  table, tbody, tr, td, div, span ,
  $, read_only,
} from '../../index'

function DBMon(databases) {
  return div(
    table($`.table .table-striped .latest-data`,
      tbody(
        databases.map(function(database) {
          return t(DB, database);
        }),
      ),
    ),
  );
}

function DB(database) {
  return tr(
    td($`.dbname`, database.dbname),
    td($`.query-count`,
      span({ class: database.lastSample.countClassName }, database.lastSample.nbQueries),
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
  read_only(ENV.generateData().toArray()),
);

function load() {
  app.update(read_only(ENV.generateData().toArray()));
  Monitoring.renderRate.ping();
  setTimeout(load, ENV.timeout);
};

load();


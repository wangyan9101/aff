import {table, tbody, tr, td, div, span} from './tags'
import {make_patcher, e} from './node'

function DBMon(databases) {
  return div([
    table({ class: 'table table-striped latest-data', }, [
      tbody([
        databases.map(function(database) {
          return e(DB, database);
        }),
      ]),
    ]),
  ]);
};

function DB(database) {
  return tr({}, [
    td({ class: 'dbname' }, database.dbname),
    td({ class: 'query-count' }, [
      span({ class: database.lastSample.countClassName }, 
        database.lastSample.nbQueries),
    ]),
    database.lastSample.topFiveQueries.map(function(query) {
      return e(function(query) {
        return td({ class: 'Query ' + query.elapsedClassName }, [
          query.formatElapsed,
          div({ class: 'popover left' }, [
            div({ class: 'popover-content' }, query.query),
            div('.arrow'),
          ]),
        ]);
      }, query).setName('Query');
    }),
  ]);
}

let patch = make_patcher(
  document.getElementById('app'),
  () => DBMon(ENV.generateData().toArray()),
);

function load() {
  patch();
  Monitoring.renderRate.ping();
  setTimeout(load, ENV.timeout);
};

load();


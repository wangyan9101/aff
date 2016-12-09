import {table, tbody, tr, td, div, span} from '../../tags'
import {e, t} from '../../dom'
import {make_app} from '../../app'

function DBMon(state) {
  return div([
    table({ class: 'table table-striped latest-data', }, [
      tbody([
        state.databases.map(function(database) {
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
      return t('Query', function(query) {
        return td({ class: 'Query ' + query.elapsedClassName }, [
          query.formatElapsed,
          div({ class: 'popover left' }, [
            div({ class: 'popover-content' }, query.query),
            div('.arrow'),
          ]),
        ]);
      }, query);
    }),
  ]);
}

let update = make_app(
  document.getElementById('app'),
  DBMon,
  {
    databases: ENV.generateData().toArray(),
  },
);

function load() {
  update('databases', ENV.generateData().toArray());
  Monitoring.renderRate.ping();
  setTimeout(load, ENV.timeout);
};

load();


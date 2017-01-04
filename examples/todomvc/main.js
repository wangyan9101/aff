import {
  App, t, on, css, $,
  section, header, footer, h1, p, a, div, span,
  input, ul, li, none, button, strong, label, checkbox,
  $any, $push, $splice, $filter,
} from '../../index'

const init_state = JSON.parse(window.localStorage.getItem('todos')) || {
  todos: [
    { completed: false, content: 'foo', },
  ],
  filter: 'All',
};

class Application extends App {
  afterUpdate(state, ...args) {
    window.localStorage.setItem('todos', JSON.stringify(state));
  }
}

const app = new Application(
  document.getElementById('app'),
  init_state,
);

const Header = header($`.header`,
  h1('todos'),
  input($`.new-todo`, {
    placeholder: "What needs to be done?",
    autofocus: 'autofocus',
  }, on('keypress', function(e) {
    if (e.keyCode != 13 || this.element.value.length == 0) {
      return
    }
    app.update('todos', $push({
      completed: false,
      content: this.element.value,
    }));
    this.element.value = '';
  })),
);

const Todo = (todo, i) => li(
  { classList: { completed: todo.completed, editing: todo.editing } },
  div($`.view`,
    checkbox($`.toggle`, {
      checked: todo.completed ? 'checked' : false,
    }, on('click', function() {
      app.update('todos', i, 'completed', this.element.checked);
    })),
    label(todo.content, on('dblclick', () => {
      app.update('todos', i, 'editing', true);
    })),
    button($`.destroy`, on('click', () => {
      app.update('todos', $splice(i, 1));
    })),
  ),
  input($`.edit`, {
    value: todo.content,
  }, on('keypress', function(e) {
    if (e.keyCode == 13) {
      app.updateMulti(
        ['todos', i, 'content', this.element.value],
        ['todos', i, 'editing', false],
      );
    }
  })),
);

const TodoList = (todos, filter) => ul($`.todo-list`, 
  todos.map((todo, i) => {
    if (filter == 'Active' && todo.completed) {
      return none;
    } else if (filter == 'Completed' && !todo.completed) {
      return none;
    }
    return t(Todo, todo, i);
  }),
);

const Footer = (todos, filter) => footer($`.footer`,
  span($`.todo-count`,
    strong(todos.reduce((n, c) => {
      return n + (c.completed ? 0 : 1);
    }, 0)),
    ' item left',
  ),
  ul($`.filters`, [
    ['#/', 'All'],
    ['#/active', 'Active'],
    ['#/completed', 'Completed'],
  ].map(info => li(
    a(info[1], {
      style: `cursor: pointer`,
      classList: filter == info[1] ? 'selected' : '', 
    }, on('click', () => { 
      window.location.hash = info[0];
    })),
  ))),
  todos.reduce((b, c) => b || c.completed, false) ? button({
    classList: 'clear-completed',
    onclick() {
      app.update('todos', $filter(todo => !todo.completed));
    },
  }, 'Clear completed') : none,
);

const Info = footer($`.info`,
  p('Double-click to edit a todo'),
  p('Created by ',
    a({ href: 'http://todomvc.com' }, 'reusee@qq.com'),
  ),
);

const Main = (state) => div(
  section($`.todoapp`,
    Header,
    state.todos.length > 0 ? section($`.main`,
      checkbox($`.toggle-all`, on('click', () => {
        let all_completed = app.state.todos.reduce((b, c) => b && c.completed, true);
        app.update('todos', $any, 'completed', all_completed ? false : true);
      })),
      label({
        for: 'toggle-all',
      }, 'Mark all as complete'),
      t(TodoList, state.todos, state.filter),
    ) : none,
    state.todos.length > 0 ? t(Footer, state.todos, state.filter) : none,
  ),
  Info,
);

app.init(Main);

window.onhashchange = () => {
  let hash = window.location.hash;
  if (hash == '#/active') {
    app.update('filter', 'Active');
  } else if (hash == '#/completed') {
    app.update('filter', 'Completed');
  } else {
    app.update('filter', 'All');
  }
};

window.onhashchange();

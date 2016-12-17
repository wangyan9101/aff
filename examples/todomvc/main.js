import {
  section, header, footer, h1, p, a, div, span,
  input, none, ul, li, button, strong, label,
} from '../../tags'
import { t } from '../../dom'
import { App } from '../../app'
import { $any, $push, $merge, $del_at, $filter } from '../../state'

let init_state = JSON.parse(window.localStorage.getItem('todos')) || {
  todos: [
    {
      completed: false,
      content: 'foo',
    },
  ],
  filter: 'All',
};

let app = new App(
  document.getElementById('app'),
  init_state,
);

function Header() {
  return header('.header', [
    h1('todos'),
    input('.new-todo', {
      placeholder: "What needs to be done?",
      autofocus: 'autofocus',
      onkeypress(e) {
        if (e.keyCode == 13) {
          app.update('todos', $push({
            completed: false,
            content: this.element.value,
          }));
          this.element.value = '';
        }
      },
    }),
  ]);
}

function Main(state) {
  return div([
    section('.todoapp', [
      t(Header),

      state.todos.length > 0 ? section('.main', [
        input('.toggle-all', {
          type: 'checkbox',
          onclick() {
            let all_completed = app.state.todos.reduce((b, c) => b && c.completed, true);
            app.update('todos', $any, 'completed', all_completed ? false : true);
          },
        }),
        label({
          for: 'toggle-all',
        }, 'Mark all as complete'),
        t(TodoList, state.todos, state.filter),
      ]) : none,

      state.todos.length > 0 ? t(Footer, state.todos, state.filter) : none,
    ]),
    Info,
  ]);
}

function TodoList(todos, filter) {
  return ul('.todo-list', todos.map((todo, i) =>  {
    if (filter == 'Active' && todo.completed) {
      return none;
    } else if (filter == 'Completed' && !todo.completed) {
      return none;
    }
    return li({
      class: {
        completed: todo.completed,
        editing: todo.editing,
      },
    }, [
      div('.view', [
        input('.toggle', {
          type: 'checkbox',
          checked: todo.completed ? 'checked' : false,
          onclick() {
            app.update('todos', i, 'completed', this.element.checked);
          },
        }),
        label({
          ondblclick() {
            app.update('todos', i, 'editing', true);
          },
        }, todo.content),
        button('.destroy', {
          onclick() {
            app.update('todos', $del_at(i));
          },
        }),
      ]),
      input('.edit', {
        value: todo.content,
        onkeypress(e) {
          if (e.keyCode == 13) {
            app.update('todos', i, $merge({
              'content': this.element.value,
              'editing': false,
            }));
          }
        },
      }),
    ]);
  }));
}

function Footer(todos, filter) {
  return footer('.footer', [
    span('.todo-count', [
      strong(todos.reduce((n, c) => {
        return n + (c.completed ? 0 : 1);
      }, 0)),
      ' item left',
    ]),
    ul('.filters', [
      ['#/', 'All'],
      ['#/active', 'Active'],
      ['#/completed', 'Completed'],
    ].map(info => li([
      a({
        style: { cursor: 'pointer' },
        class: filter == info[1] ? 'selected' : '',
        onclick() {
          window.location.hash = info[0];
        },
      }, info[1]),
    ]))),
    todos.reduce((b, c) => b || c.completed, false) ? button({
      class: 'clear-completed',
      onclick() {
        app.update('todos', $filter(todo => !todo.completed));
      },
    }, 'Clear completed') : none,
  ]);
}

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

let Info = footer('.info', [
  p('Double-click to edit a todo'),
  p([
    'Created by ',
    a({ href: 'http://todomvc.com' }, 'reusee@qq.com'),
  ]),
]);

class Application extends App {
  constructor(...args) {
    super(...args);
  }

  afterUpdate(state, ...args) {
    window.localStorage.setItem('todos', JSON.stringify(state));
  }
}

app.init(Main);

window.onhashchange();

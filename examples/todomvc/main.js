import {
  section, header, footer, h1, p, a, div, span,
  input, none, ul, li, button, strong, label,
} from '../../tags'
import {e} from '../../dom'
import {make_app} from '../../app'
import {$any, $push, $merge, $del_at, $array_filter} from '../../state'

let init_state = JSON.parse(window.localStorage.getItem('todos')) || {
  todos: [
    {
      completed: false,
      content: 'foo',
    },
  ],
  filter: 'All',
};

function Header() {
  return header('.header', [
    h1('todos'),
    input('.new-todo', {
      placeholder: "What needs to be done?",
      autofocus: 'autofocus',
      onkeypress(e) {
        if (e.keyCode == 13) {
          update('todos', $push({
            completed: false,
            content: this.element.value,
          }));
          this.element.value = '';
        }
      },
    }),
  ]);
}

let toggle_all = () => {
  app.tap((state) => {
    let all_completed = state.todos.reduce((b, c) => b && c.completed, true);
    update('todos', $any, 'completed', all_completed ? false : true);
  });
};

function App(state) {
  console.log(state);
  return div([
    section('.todoapp', [
      e(Header),

      state.todos.length > 0 ? section('.main', [
        input('.toggle-all', {
          type: 'checkbox',
          onclick: toggle_all,
        }),
        label({
          for: 'toggle-all',
        }, 'Mark all as complete'),
        e(TodoList, state.todos, state.filter),
      ]) : none,

      state.todos.length > 0 ? e(Footer, state.todos, state.filter) : none,
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
      class: (todo.completed ? 'completed' : '') + (todo.editing ? ' editing' : ''),
    }, [
      div('.view', [
        input('.toggle', {
          type: 'checkbox',
          checked: todo.completed ? 'checked' : false,
          onclick() {
            update('todos', i, 'completed', this.element.checked);
          },
        }),
        label({
          ondblclick() {
            update('todos', i, 'editing', true);
          },
        }, todo.content),
        button('.destroy', {
          onclick() {
            update('todos', $del_at(i));
          },
        }),
      ]),
      input('.edit', {
        value: todo.content,
        onkeypress(e) {
          if (e.keyCode != 13) {
            return false;
          }
          update('todos', i, $merge({
            'content': this.element.value,
            'editing': false,
          }));
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
        update('todos', $filter(todo => !todo.completed));
      },
    }, 'Clear completed') : none,
  ]);
}

window.onhashchange = () => {
  let hash = window.location.hash;
  if (hash == '#/active') {
    update('filter', 'Active');
  } else if (hash == '#/completed') {
    update('filter', 'Completed');
  } else {
    update('filter', 'All');
  }
};

let Info = footer('.info', [
  p('Double-click to edit a todo'),
  p([
    'Created by ',
    a({ href: 'http://todomvc.com' }, 'reusee@qq.com'),
  ]),
]);

let app = make_app(
  document.getElementById('app'),
  App,
  init_state,
);

function update(...args) {
  app.update(...args);
  app.tap((state) => {
    window.localStorage.setItem('todos', JSON.stringify(state));
  });
}

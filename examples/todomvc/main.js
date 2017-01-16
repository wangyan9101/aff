import {
  App, t, on, css, $, updater,
  section, header, footer, h1, p, a, div, span,
  input, ul, li, none, button, strong, label, checkbox,
  $any, $push, $splice, $filter, $merge,
  DebugPanel,
} from '../../index'

const saved = JSON.parse(window.localStorage.getItem('todomvc'));

const init_state = {
  todos: saved.todos || [],
  filter: saved.filter || 'All',

  Header: {
    updateTodos: updater('todos'),
  },

  TodoList: {
    $ref: ['todos', 'filter'],

    Todo: {
      updateTodos: updater('todos'),
    },
  },

  Footer: {
    $ref: ['todos', 'filter'],
    updateTodos: updater('todos'),
  },
};

const app = new App(
  document.getElementById('app'),
  on('afterUpdate: save to local storage', (state, ...args) => {
    window.localStorage.setItem('todomvc', JSON.stringify({
      todos: state.todos,
      filter: state.filter,
    }));
  }),
  init_state,
);

const Header = (state) => header($`.header`,
  h1('todos'),
  input($`.new-todo`, 
    {
      placeholder: "What needs to be done?",
      autofocus: 'autofocus',
    }, 
    on('keypress', function(e) {
      if (e.keyCode != 13 || this.element.value.length == 0) {
        return
      }
      state.updateTodos($push({
        completed: false,
        content: this.element.value,
      }));
      this.element.value = '';
    }),
  ),
);

const Todo = (state, todo, i) => li(
  { 
    classList: {
      completed: todo.completed,
      editing: todo.editing,
    },
  },
  div($`.view`,
    checkbox($`.toggle`, 
      {
        checked: todo.completed,
      },
      on('click', function() {
        state.updateTodos(i, 'completed', this.element.checked);
      }),
    ),
    label(todo.content, on('dblclick', () => {
      state.updateTodos(i, 'editing', true);
    })),
    button($`.destroy`, on('click', () => {
      state.updateTodos($splice(i, 1));
    })),
  ),
  input($`.edit`, 
    {
      value: todo.content,
    },
    on('keypress', function(e) {
      if (e.keyCode == 13) {
        state.updateTodos(i, $merge({
          content: this.element.value,
          editing: false,
        }));
      }
    }),
  ),
);

const TodoList = (state) => ul($`.todo-list`, 
  state.todos.map((todo, i) => {
    if (state.filter == 'Active' && todo.completed) {
      return none;
    } else if (state.filter == 'Completed' && !todo.completed) {
      return none;
    }
    return t(Todo, state.Todo, todo, i);
  }),
);

const Footer = (state) => footer($`.footer`,
  span($`.todo-count`,
    strong(state.todos.reduce((n, c) => {
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
      classList: state.filter == info[1] ? 'selected' : '', 
    }, on('click', () => { 
      window.location.hash = info[0];
    })),
  ))),
  state.todos.reduce((b, c) => b || c.completed, false) ? button({
    classList: 'clear-completed',
    onclick() {
      state.updateTodos($filter(todo => !todo.completed));
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
    t(Header, state.Header),
    state.todos.length > 0 ? section($`.main`,
      checkbox($`.toggle-all`, on('click', () => {
        let all_completed = state.todos.reduce((b, c) => b && c.completed, true);
        state.$update('todos', $any, 'completed', all_completed ? false : true);
      })),
      label({
        for: 'toggle-all',
      }, 'Mark all as complete'),
      t(TodoList, state.TodoList),
    ) : none,
    state.todos.length > 0 ? t(Footer, state.Footer) : none,
  ),
  Info,
  DebugPanel(app),
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

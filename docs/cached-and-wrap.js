import { App, h, t, op, cached, wrap, css, on } from 'affjs'

const state = {
  users: {
    1: {
      name: 'Foo',
    },
    2: {
      name: 'Bar',
    },
    3: {
      name: 'Baz',
    },
  },
  userIds: [1, 2, 3],

  User: cached(function(userId) {
    const user = this.users[userId];
    return wrap(user, {

      tag: () => {
        user.$update('tagged', op.func(tagged => !tagged));
      },
    });
  }),
};

function Main(state) {
  return h.div(
      state.userIds.map(id => t(User, state.User(id))),
  );
}

function User(state) {
  return h.div(
      h.span(state.name),
      on('click', () => {
        state.tag();
      }),
      css`
        color: ${state.tagged ? 'blue' : 'black'};
        user-select: none;
        cursor: pointer;
      `,
  );
}

const app = new App(
    document.getElementById('app'),
    state,
    Main,
);

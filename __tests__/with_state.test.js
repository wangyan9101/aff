import {
  App, $del, withState,
} from '../index'

test('withState', () => {
  const app = new App(
    {
      counters: {
        foo: 1,
      },
      addFoo: withState('counters', counters => n => {
        counters.$update('foo', counters.foo + 3);
      }),
    },
  );
  app.state.addFoo(3);
  expect(app.state.counters.foo).toBe(4);
});

test('bad name in withState', () => {
  expect(() => {
    const app = new App(
      {
        update: withState('foo', foo => () => {
          foo.$update('foo');
        }),
      }
    );
  }).toThrowError('no state named foo');
});

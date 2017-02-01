import { App, on } from 'affjs'

const app = new App(
  {
    foo: 0,
  },
  on('beforeUpdate', (state, ...args) => {
    console.log('before update', args);
  }),
  on('afterUpdate', (state, ...args) => {
    console.log('after update', args);
  }),
);

app.update('foo', 1);

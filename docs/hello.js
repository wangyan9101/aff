import { App, p } from 'affjs'

new App(
  document.getElementById('app'),
  {},
  () => p('Hello, world!'),
);


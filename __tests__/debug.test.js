import { App, logUpdates, $inc } from '../index'

test('null operator args', () => {
  const app = new App(
    1,
    logUpdates,
  );
  app.update($inc);
});

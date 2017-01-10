import { App, consoleLogUpdates, $inc } from '../index'

test('null operator args', () => {
  const app = new App(
    1,
    consoleLogUpdates,
  );
  app.update($inc);
});

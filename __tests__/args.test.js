import { App } from '../index'

test('args change', () => {
  let app = new App();
  expect(app.args_changed({
    a: 'A',
    b: 'B',
  }, {
    a: 'A',
  })).toBe(true);
  expect(app.args_changed(1, '42')).toBe(true);
  let f = () => {}
  expect(app.args_changed(f, () => {})).toBe(true);
});

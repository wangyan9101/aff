import { t } from '../index'

test('invalid thunk func', () => {
  expect(() => {
    t(false);
  }).toThrowError('invalid thunk func,');
  expect(() => {
    t('invalid', false);
  }).toThrowError('invalid thunk func,');
});

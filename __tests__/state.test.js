import { State } from '../index'

test('cover', () => {
  let state = new State();
  state.get();
  state.update();
  state.beforePatch();
  state.argsChanged();
});

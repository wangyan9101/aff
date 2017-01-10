import { on, $push } from './index'

export function logUpdates(logState) {
  return on('afterUpdate: aff logging log updates', (state, ...args) => {
    // to prevent recursive logging
    const ignore = logState.$path.reduce((acc, cur, i) => acc && cur == args[i], true);
    if (!ignore) {
      logState.$update($push({
        args: args,
        tick: state.__aff_tick,
      }));
    }
  });
}

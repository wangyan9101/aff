import { $any } from './operations'
import { on } from './event'

export const consoleLogUpdates = on('afterUpdate:__log_updates', (state, ...args) => {
  console.log('%cUPDATE', 'background: #555; color: white', 
    args.slice(0, -1).map(arg => formatUpdatePath(arg)).join(' . ') + ' => ',
    formatUpdateArg(args[args.length - 1]),
  );
});

function formatUpdatePath(arg) {
  if (arg === $any) {
    return '$any';
  } 
  return arg;
}

function formatUpdateArg(arg) {
  if (typeof arg === 'object' && arg.__is_op) {
    return [arg.op, ...(arg.args || [])];
  }
  return arg;
}

export function Event(ev_type, fn) {
  this.ev_type = ev_type;
  this.fn = fn;
}

export function on(ev_type, fn) {
  return new Event(ev_type, fn);
}

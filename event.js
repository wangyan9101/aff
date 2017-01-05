class Event {
  constructor(ev_type, fn) {
    this.ev_type = ev_type;
    this.fn = fn;
  }
}

export class Events {
  constructor() {
    this.events = [];
  }

  on(ev_type, fn) {
    this.events.push(new Event(ev_type, fn));
    return this;
  }
}

export function on(ev_type, fn) {
  const events = new Events();
  events.on(ev_type, fn);
  return events;
}

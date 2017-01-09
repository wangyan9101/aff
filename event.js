class Event {
  constructor(type, fn) {
    this.type = type;
    this.fn = fn;
  }
}

export class Events {
  constructor() {
    this.events = [];
  }

  on(type, fn) {
    this.events.push(new Event(type, fn));
    return this;
  }
}

export function on(type, fn) {
  const events = new Events();
  events.on(type, fn);
  return events;
}

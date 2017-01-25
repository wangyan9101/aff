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

export function elementSetEvent(element, type, fn) {
  let events = element.__aff_events;
  if (!events) {
    events = {};
    element.__aff_events = events;
  }
  const parts = type.split(/[$:]/);
  type = parts[0];
  const subtype = parts.slice(1).join(':') || '__default';
  if (!(type in events)) {
    events[type] = {};
    element.addEventListener(type.substr(2), function(ev) {
      if (element.tagName == 'INPUT' && element.type == 'checkbox' && type == 'onclick') {
        ev.preventDefault();
      }
      let ret;
      let lastEvType;
      let lastFn;
      for (const subtype in events[type]) {
        const result = events[type][subtype](ev);
        if (ret === undefined) {
          ret = result;
          lastEvType = type + ':' + subtype;
          lastFn = events[type][subtype];
        } else if (ret !== result) {
          throw[`return value conflict between event handlers: ${type}:${subtype} and ${lastEvType}`,
            events[type][subtype], lastFn];
        }
      }
      return ret;
    });
  }
  events[type][subtype] = fn;
  return type + ':' + subtype;
}

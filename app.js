import { all_tags } from './all_tags'
import { Selector, Css } from './tagged'
import { Events } from './event'
import { MutableState } from './mutable_state'

export class App {
  constructor(...args) {
    this.node = null;
    this.patching = false;
    this.updated = false;
    this.update_count = 0;
    this.element_cache = {};
    for (let i = 0; i < all_tags.length; i++) {
      this.element_cache[all_tags[i]] = [];
    }
    this.events = {};
    this.init(...args);
  }

  init(...args) {
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      if (arg instanceof HTMLElement) {
        this.element = arg;
      } else if (arg instanceof Events) {
        for (let idx = 0; idx < arg.events.length; idx++) {
          this.addEvent(arg.events[idx]);
        }
      } else if (typeof arg == 'function') {
        this.node_func = arg;
      } else {
        this._state = new MutableState(arg, this);
        this.setupUses(this._state.get());
      }
    }
    if (
      this.element !== undefined 
      && this.node_func !== undefined 
      && this._state !== undefined
    ) {
      this.update();
    }
  }

  setupUses(obj, path, scopes) {
    // skip non-object
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
      return
    }

    // default arguments
    path = path || [];
    scopes = scopes || [];

    // parse $use
    let useInfos;
    if ('$use' in obj) {
      const use = obj['$use'];
      if (typeof use === 'object' && use !== null) {
        if (Array.isArray(use)) {
          useInfos = {};
          for (let i = 0; i < use.length; i++) {
            const key = use[i];
            if (key in obj) {
              throw['use key conflict', key];
            }
            useInfos[key] = key;
          }
        } else {
          for (const key in use) {
            if (key in obj) {
              throw['use key conflict', key];
            }
          }
          useInfos = use;
        }
        delete obj['$use'];
      } else {
        throw['bad use', use];
      }
    }

    const app = this;
    function set_user_getter(obj, key, from) {
      const parentPathOfFrom = from.slice(0);
      parentPathOfFrom.pop();
      if (!(key in obj)) {
        Object.defineProperty(obj, key, {
          configurable: false,
          enumerable: true,
          get: function() {
            return app.get(from);
          },
          set: function(v) {
            app.update(...from, v);
          },
        });
      }
      if (!obj.__aff_use_keys) {
        Object.defineProperty(obj, '__aff_use_keys', {
          configurable: false,
          writable: true,
          enumerable: false,
          value: {},
        });
      }
      obj.__aff_use_keys[key] = from;
    }

    // setup
    for (const key in useInfos) {
      const name = useInfos[key];
      // search in scopes
      let found = false;
      for (let i = 0; i < scopes.length; i++) {
        const bindings = scopes[i];
        if (name in bindings) { // found
          found = true;
          let stop_path = bindings[name].slice(0);
          // check loop
          let same_len = 0;
          for (let idx = 0; idx < stop_path.length && idx < path.length; idx++) {
            if (stop_path[idx] == path[idx]) {
              same_len++
            } else {
              break
            }
          }
          if (same_len == stop_path.length || same_len == path.length) {
            throw['loop in $use', path, stop_path];
          }
          stop_path.pop();
          const stop_length = stop_path.length;
          let setup_path = path.slice(0);
          while (setup_path.length > stop_length) {
            //console.log('get', setup_path, key, 'from', bindings[name]);
            set_user_getter(this.get(setup_path), key, bindings[name]);
            setup_path.pop();
          }
        }
      }
      if (!found) {
        throw[`no state named ${name}`];
      }
    }

    // collect bindings
    const bindings = {};
    for (const key in obj) {
      const p = path.slice(0);
      p.push(key);
      bindings[key] = p;
    }
    scopes = scopes.slice(0); // copy
    scopes.push(bindings);

    // recursively
    for (let key in obj) {
      let p = path.slice(0);
      p.push(key);
      this.setupUses(obj[key], p, scopes);
    }

  }

  addEvent(ev) {
    const parts = ev.ev_type.split(/[$:]/);
    const ev_type = parts[0];
    const ev_subtype = parts.slice(1).join(':') || '__default';
    if (!(ev_type in this.events)) {
      this.events[ev_type] = {};
    }
    const events = this.events[ev_type];
    events[ev_subtype] = ev.fn;
  }

  dispatchEvent(ev_type, ...args) {
    for (const sub_type in this.events[ev_type]) {
      this.events[ev_type][sub_type].apply(this, args);
    }
  }

  get state() {
    return this._state.get();
  }

  update(...args) {
    return this.updateMulti(args);
  }

  updateMulti(...args) {
    for (let i = 0; i < args.length; i++) {
      let arg = args[i];
      this.dispatchEvent('before_update', this.state, ...arg);
      this._state.update(...arg);
      this.dispatchEvent('after_update', this.state, ...arg);
    }
    if (!this.element) {
      return this.state;
    }
    if (!this.patching) {
      this.patching = true;
      this.updated = false;
      this.update_count = 0;
      this._state.beforePatch();
      [this.element, this.node] = this.patch(
        this.element, 
        this.node_func(this.state), 
        this.node,
      );
      while (this.updated) {
        if (this.update_count > 4096) { // infinite loop
          throw['infinite loop in updating', args];
        }
        // if state is updated when patching, patch again
        this.updated = false;
        this._state.beforePatch();
        [this.element, this.node] = this.patch(
          this.element,
          this.node_func(this.state),
          this.node,
        );
      }
      this.patching = false;
      this.update_count = 0;
    } else {
      // state updated when patching
      this.updated = true;
      this.update_count++;
    }
    return this.state;
  }

  html() {
    return this.element.innerHTML;
  }

  get(...args) {
    let path = args;
    if (path.length == 1 && Array.isArray(path[0])) {
      path = path[0];
    }
    let obj = this.state;
    for (let i = 0; i < path.length; i++) {
      obj = obj[path[i]];
    }
    return obj;
  }

  // patch last_element to represent node attributes, with diffing last_node
  patch(last_element, node, last_node) {
    // thunk
    let last_thunk;
    if (last_node && last_node instanceof Thunk) {
      last_thunk = last_node;
      last_node = last_thunk.node;
    }
    let thunk;
    if (node instanceof Thunk) {
      thunk = node;
    }

    if (thunk) {
      let should_update = false;
      if (!last_thunk) {
        should_update = true;
      } else if (thunk.name != last_thunk.name) {
        should_update = true;
      } else if (this._state.argsChanged(thunk.args, last_thunk.args)) {
        should_update = true;
      }

      if (last_thunk && !should_update) {
        // reuse node
        thunk.node = last_thunk.node;
        // reuse element
        thunk.element = last_thunk.element;
      }
      node = thunk.getNode();
    }

    // Thunk.getNode may return another Thunk, patch recursively
    if (node instanceof Thunk || last_node instanceof Thunk) {
      return this.patch(last_element, node, last_node);
    }

    // no need to patch if two Nodes is the same object
    // if thunk's node is reuse, will return here
    if (node === last_node) {
      return [last_element, node];
    }

    // not patchable, build a new element
    if (
      // not diffable
      (!last_node)
      // no element
      || (!last_element)
      // different tag, no way to patch
      || (node.tag != last_node.tag)
    ) {
      const element = node.toElement(undefined, this);
      // insert new then remove old
      if (last_element && last_element.parentNode) {
        last_element.parentNode.insertBefore(element, last_element);
        last_element.parentNode.removeChild(last_element);
      }
      // cache last_element
      if (last_node) {
        this.element_cache[last_element.tagName.toLowerCase()].push([last_element, last_node]);
      }

      return [element, node];
    }

    // set element
    node.element = last_element;
    if (thunk) {
      thunk.element = last_element;
    }

    return this.patchNode(last_element, node, last_node);
  }

  patchNode(last_element, node, last_node) {
    // innerHTML
    if (node.innerHTML != last_node.innerHTML) {
      last_element.innerHTML = node.innerHTML;
    }

    // text
    if (node.text != last_node.text) {
      last_element.nodeValue = node.text;
    }

    // id
    if (node.id != last_node.id) {
      last_element.id = node.id;
    }

    // styles
    const style_type = typeof node.style;
    const last_style_type = typeof last_node.style;
    // different type, no diff
    if (style_type !== last_style_type) {
      if (style_type === 'string') {
        last_element.style = node.style;
      } else if (style_type === 'object' && node.style !== null) {
        last_element.style = undefined;
        for (const key in node.style) {
          last_element.style[key] = node.style[key];
        }
      }
    } 
    // diff object
    else if (style_type === 'object') {
      if (node.style !== null) {
        for (const key in node.style) {
          if (!last_node.style || node.style[key] != last_node.style[key]) {
            last_element.style[key] = node.style[key];
          }
        }
      }
      if (last_node.style !== null) {
        for (const key in last_node.style) {
          if (!node.style || !(key in node.style)) {
            last_element.style[key] = '';
          }
        }
      }
    } 
    // string, compare
    else if (style_type === 'string') {
      if (node.style !== last_node.style) {
        last_element.style = node.style;
      }
    }

    // class
    for (const key in node.classList) {
      // should update
      if (!last_node.classList || node.classList[key] != last_node.classList[key]) {
        if (node.classList[key]) {
          last_element.classList.add(key);
        } else {
          last_element.classList.remove(key);
        }
      }
    }
    for (const key in last_node.classList) {
      if (!node.classList || !(key in node.classList)) {
        last_element.classList.remove(key);
      }
    }

    // attributes
    for (const key in node.attributes) {
      if (!last_node.attributes || node.attributes[key] != last_node.attributes[key]) {
        const value = node.attributes[key];
        const valueType = typeof value;
        if (valueType == 'string' || valueType == 'number') {
          last_element.setAttribute(key, value);
          last_element[key] = value
        } else if (valueType == 'boolean') {
          if (value) {
            last_element.setAttribute(key, true);
            last_element[key] = true;
          } else {
            last_element.removeAttribute(key);
            last_element[key] = false;
          }
        }
      }
    }
    for (const key in last_node.attributes) {
      if (!node.attributes || !(key in node.attributes)) {
        last_element.removeAttribute(key);
        last_element[key] = undefined;
      }
    }

    // events
    const event_keys = {};
    for (const key in node.events) {
      let k = elementSetEvent(last_element, key, node.events[key].bind(node));
      event_keys[k] = true;
    }
    if (last_element.__aff_events) {
      for (const ev_type in last_element.__aff_events) {
        for (const ev_subtype in last_element.__aff_events[ev_type]) {
          if (!(ev_type + ':' + ev_subtype in event_keys)) {
            delete last_element.__aff_events[ev_type][ev_subtype];
          }
        }
      }
    }

    // children
    const child_elements = last_element.childNodes;
    const child_len = node.children ? node.children.length : 0;
    const last_child_len = last_node && last_node.children ? last_node.children.length : 0;
    for (let i = 0; i < child_len; i++) {
      const [elem, _] = this.patch(
        child_elements[i], 
        node.children[i], 
        last_node && last_node.children ? last_node.children[i] : undefined,
      );
      if (!child_elements[i]) {
        last_element.appendChild(elem);
      }
    }
    for (let i = child_len; i < last_child_len; i++) {
      last_element.removeChild(last_element.childNodes[child_len]);
    }

    if (node.hooks && node.hooks.patched) {
      node.hooks.patched.forEach(fn => fn(last_element));
    }

    return [last_element, node];
  }
}

class Thunk {
  constructor() {
    this.func = null;
    this.args = null;
    this.node = undefined;
    this.element = null;
    this.name = null;
  }

  toElement(_name, app) {
    if (!this.element) {
      const node = this.getNode();
      if (!node || !node.toElement) {
        this.element = warning(`RENDER ERROR: cannot render ${node}`).toElement();
        console.warn('cannot render', node);
      } else {
        this.element = node.toElement(this.name, app);
      }
    }
    return this.element;
  }

  getNode() {
    if (!this.node) {
      beforeThunkCallFunc(this);
      this.node = this.func.apply(this, this.args);
      afterThunkCallFunc(this);
      if (this.node === null) {
        this.node = e('div', { style: { display: 'none' }});
      }
      if (!this.node) {
        throw['constructor of ' + (this.name || 'anonymous') + ' returned undefined value', this];
      }
    }
    return this.node;
  }

}

// thunk helper
export function t(...args) {
  if (args.length == 0) {
    throw['no arguments to t()'];
  }
  const thunk = new Thunk();
  switch (typeof args[0]) {
  case 'string': // named thunk
    thunk.name = args[0];
    thunk.func = args[1];
    thunk.args = args.slice(2);
    break
  case 'function':
    thunk.func = args[0];
    thunk.args = args.slice(1);
    thunk.name = thunk.func.name;
    break
  }
  if (!thunk.func) {
    throw['invalid thunk func', thunk.func];
  }
  return thunk
}

// element helper
export function e(tag, ...args) {
  if (typeof tag !== 'string') {
    throw['bad tag name', tag];
  }
  const node = new Node();
  node.tag = tag;
  _e(node, ...args);
  return node;
}

function _e(node, ...args) {
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg instanceof Node || arg instanceof Thunk) {
      node.setChildren(arg);
    } else if (arg instanceof Selector) {
      node.setSelector(arg.str);
    } else if (arg instanceof Css) {
      node.setProperties({
        style: arg.str,
      });
    } else if (arg instanceof Events) {
      for (let idx = 0; idx < arg.events.length; idx++) {
        const ev = arg.events[idx];
        node.setProperties({
          ['on' + ev.ev_type]: ev.fn,
        });
      }
    } else if (typeof arg === 'object' && arg !== null) {
      if (Array.isArray(arg)) {
        // flatten
        _e(node, ...arg);
      } else {
        node.setProperties(arg);
      }
    } else if (typeof arg === 'function') {
      _e(node, arg());
    } else {
      node.setChildren(arg);
    }
  }
  return node;
}

let beforeThunkCallFunc = (thunk) => {};
let afterThunkCallFunc = (thunk) => {};
export const setBeforeThunkCallFunc = (fn) => {
  beforeThunkCallFunc = fn;
}
export const setAfterThunkCallFunc = (fn) => {
  afterThunkCallFunc = fn;
}

class Node {
  constructor() {
    this.tag = null;
    this.id = null;
    this.style = null;
    this.classList = null;
    this.children = null;
    this.attributes = null;
    this.events = null;
    this.text = null;
    this.innerHTML = null;
    this.element = null;
    this.hooks = null;
  }

  setSelector(selector) {
    const parts = selector.match(/[.#][A-Za-z][A-Za-z0-9_:-]*/g);
    if (parts) {
      for (let i = 0, l = parts.length; i < l; i++) {
        const part = parts[i];
        if (part.charAt(0) == '#') {
          this.id = part.substring(1);
        } else if (part.charAt(0) == '.') {
          this.classList = this.classList || {};
          this.classList[part.substring(1)] = true;
        }
      }
    }
  }

  setProperties(properties) {
    for (const key in properties) {
      if (key == 'id' || key == 'innerHTML') {
        // id, innerHTML
        this[key] = properties[key];
      } else if (key == 'classList') {
        this.classList = this.classList || {};
        const property = properties.classList;
        if (typeof property == 'string') {
          const parts = property.match(/[A-Za-z][A-Za-z0-9_:-]*/g);
          if (parts) {
            for (let i = 0, l = parts.length; i < l; i++) {
              const part = parts[i];
              this.classList[part] = true;
            }
          }
        } else if (typeof property == 'object' && property !== null) {
          if (Array.isArray(property)) {
            for (let i = 0; i < property.length; i++) {
              this.classList[property[i]] = true;
            }
          } else {
            for (const k in property) {
              this.classList[k] = property[k];
            }
          }
        } else {
          throw['bad class', property];
        }
      } else if (key == 'style') {
        // styles
        this.style = properties.style;
      } else if (/^on/.test(key) && typeof properties[key] === 'function') {
        if (key == 'oncreated' || key == 'oncreate') {
          this.hooks = this.hooks || {};
          this.hooks.created = this.hooks.created || [];
          this.hooks.created.push(properties[key]);
        } else if (key == 'onpatch' || key == 'onpatched') {
          this.hooks = this.hooks || {};
          this.hooks.patched = this.hooks.patched || [];
          this.hooks.patched.push(properties[key]);
        } else {
          // events
          this.events = this.events || {};
          this.events[key] = properties[key];
        }
      } else {
        this.attributes = this.attributes || {};
        this.attributes[key] = properties[key];
      }
    }
  }

  setChildren(children) {
    this.children = this.children || [];
    const type = typeof children;
    if (type === 'object' && children !== null) {
      this.children.push(children);
    } else if (type === 'boolean' || type === 'number' || type === 'string' || type === 'symbol') {
      const child = new Node();
      child.text = children.toString();
      this.children.push(child);
    } else {
      throw['bad child', children];
    }
  }

  toElement(name, app) {
    let element;
    if (this.text !== null) {
      element = document.createTextNode(this.text);
    } else {
      // use cached element
      if (app && app.element_cache[this.tag] && app.element_cache[this.tag].length > 0) {
        let [element, last_node] = app.element_cache[this.tag].pop();
        let node;
        [element, node] = app.patchNode(element, this, last_node);
        this.element = element;
        if (this.hooks && this.hooks.created) {
          this.hooks.created.forEach(fn => fn(element));
        }
        return element;
      }
      element = document.createElement(this.tag);
    }
    if (this.innerHTML !== null) {
      element.innerHTML = this.innerHTML;
    }
    if (this.id !== null) {
      element.id = this.id;
    }
    if (this.style !== null) {
      if (typeof this.style == 'object' && this.style !== null) {
        for (const key in this.style) {
          element.style[key] = this.style[key];
        }
      } else {
        element.style = this.style;
      }
    }
    if (this.classList !== null) {
      let className = '';
      for (let k in this.classList) {
        if (this.classList[k]) {
          className = className + k + ' ';
        }
      }
      element.className = className.trim();
    }
    if (this.children !== null) {
      const childFragment = document.createDocumentFragment();
      for (let i = 0, l = this.children.length; i < l; i++) {
        childFragment.appendChild(this.children[i].toElement(undefined, app));
      }
      element.appendChild(childFragment);
    }
    if (this.attributes !== null) {
      for (const key in this.attributes) {
        const value = this.attributes[key];
        const valueType = typeof value;
        if (valueType == 'string' || valueType == 'number') {
          element.setAttribute(key, value);
          element[key] = value;
        } else if (valueType == 'boolean') {
          if (value) {
            element.setAttribute(key, true);
            element[key] = true;
          } else {
            element.removeAttribute(key);
            element[key] = false;
          }
        }
      }
    }
    if (this.events !== null) {
      for (const key in this.events) {
        // set event callback, bind current Node to callback
        // constructor must not be arrow function to get proper 'this'
        elementSetEvent(element, key, this.events[key].bind(this));
      }
    }
    this.element = element;
    if (this.hooks && this.hooks.created) {
      this.hooks.created.forEach(fn => fn(element));
    }
    return element;
  }

}

const warning = (text) => e('div', {
  style: {
    backgroundColor: 'yellow',
    color: 'red',
    fontWeight: 'bold',
  },
}, text);

function elementSetEvent(element, ev_type, fn) {
  let events = element.__aff_events;
  if (!events) {
    events = {};
    element.__aff_events = events;
  }
  const parts = ev_type.split(/[$:]/);
  ev_type = parts[0];
  const ev_subtype = parts.slice(1).join(':') || '__default';
  if (!(ev_type in events)) {
    events[ev_type] = {};
    element.addEventListener(ev_type.substr(2), function(ev) {
      let ret;
      for (const ev_subtype in events[ev_type]) {
        ret = events[ev_type][ev_subtype](ev);
      }
      return ret;
    });
  }
  events[ev_type][ev_subtype] = fn;
  return ev_type + ':' + ev_subtype;
}

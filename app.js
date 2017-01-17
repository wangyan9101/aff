import { allTags } from './all_tags'
import { Selector, Css, Key } from './tagged'
import { Events } from './event'
import { MutableState } from './mutable_state'
import { Updater } from './state'

export class App {
  constructor(...args) {
    this.node = null;
    this.patching = false;
    this.updated = false;
    this.updateCount = 0;
    this.elementCache = {};
    for (let i = 0; i < allTags.length; i++) {
      this.elementCache[allTags[i]] = [];
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
        this.nodeFunc = arg;
      } else {
        this._state = new MutableState(arg, this);
        this.setupState(this._state.get());
      }
    }
    if (
      this.element !== undefined 
      && this.nodeFunc !== undefined 
      && this._state !== undefined
    ) {
      this.update();
    }
  }

  setupState(obj, path, scopes) {
    // skip non-object
    if (typeof obj !== 'object' || obj === null) {
      return
    }

    // default arguments
    path = path || [];
    scopes = scopes || [];

    // array
    if (Array.isArray(obj)) {
      // setup items
      for (let i = 0; i < obj.length; i++) {
        let p = path.slice(0);
        p.push(i);
        this.setupState(obj[i], p, scopes);
      }
      return
    }

    // parse $ref
    let refInfos;
    let ref;
    if ('$ref' in obj) {
      ref = obj['$ref'];
    } else if ('$use' in obj) {
      ref = obj['$use'];
    }
    if (ref) {
      if (typeof ref === 'object' && ref !== null) {
        if (Array.isArray(ref)) {
          refInfos = {};
          for (let i = 0; i < ref.length; i++) {
            const key = ref[i];
            if (key in obj) {
              throw['ref key conflict', key];
            }
            refInfos[key] = key;
          }
        } else {
          for (const key in ref) {
            if (key in obj) {
              throw['ref key conflict', key];
            }
          }
          refInfos = ref;
        }
        delete obj['$ref'];
      } else {
        throw['bad ref', ref];
      }
    }

    const app = this;
    function setGetter(obj, key, from) {
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
      if (!obj.__aff_ref_keys) {
        Object.defineProperty(obj, '__aff_ref_keys', {
          configurable: false,
          writable: true,
          enumerable: false,
          value: {},
        });
      }
      obj.__aff_ref_keys[key] = from;
    }

    // setup
    for (const key in refInfos) {
      const name = refInfos[key];
      // search in scopes
      let found = false;
      for (let i = 0; i < scopes.length; i++) {
        const bindings = scopes[i];
        if (name in bindings) { // found
          found = true;
          let stopPath = bindings[name].slice(0);
          // check loop
          let sameLen = 0;
          for (let idx = 0; idx < stopPath.length && idx < path.length; idx++) {
            if (stopPath[idx] == path[idx]) {
              sameLen++
            } else {
              break
            }
          }
          if (sameLen == stopPath.length || sameLen == path.length) {
            throw['loop in $ref', path, stopPath];
          }
          // setup getter and setter
          stopPath.pop();
          const stopLen = stopPath.length;
          let setupPath = path.slice(0);
          while (setupPath.length > stopLen) {
            setGetter(this.get(setupPath), key, bindings[name]);
            setupPath.pop();
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

    for (let key in obj) {
      const subState = obj[key];

      // setup updater
      if (subState instanceof Updater) {
        const name = subState.args[0];
        const updateArgs = subState.args.slice(1);
        // search update path
        let found = false;
        for (let i = 0; i < scopes.length; i++) {
          const bindings = scopes[i];
          if (name in bindings) { // found
            found = true;
            const updatePath = bindings[name].slice(0);
            obj[key] = function(...args) {
              app.update(...updatePath, ...updateArgs, ...args);
            }
            break
          }
        }
        if (!found) {
          throw[`no state named ${name}`];
        }

      // setup sub state
      } else {
        let p = path.slice(0);
        p.push(key);
        this.setupState(subState, p, scopes);
      }
    }
  }

  addEvent(ev) {
    const parts = ev.type.split(/[$:]/);
    const type = parts[0];
    const subtype = parts.slice(1).join(':') || '__default';
    if (!(type in this.events)) {
      this.events[type] = {};
    }
    const events = this.events[type];
    events[subtype] = ev.fn;
  }

  dispatchEvent(type, ...args) {
    for (const subtype in this.events[type]) {
      this.events[type][subtype].apply(this, args);
    }
  }

  get state() {
    return this._state.get();
  }

  update(...args) {
    return this.updateMulti(args);
  }

  updateMulti(...args) {
    if (this._state === undefined) {
      throw['state not set'];
    }
    for (let i = 0; i < args.length; i++) {
      let arg = args[i];
      this.dispatchEvent('beforeUpdate', this.state, ...arg);
      this._state.update(...arg);
      this.dispatchEvent('afterUpdate', this.state, ...arg);
    }
    if (!this.element || !this.nodeFunc) {
      return
    }
    if (!this.patching) {
      this.patching = true;
      this.updated = false;
      this.updateCount = 0;
      this._state.beforePatch();
      const result = this.patch(
        this.element, 
        this.nodeFunc(this.state, this), 
        this.node,
      );
      this.element = result[0];
      this.node = result[1];
      while (this.updated) {
        if (this.updateCount > 4096) { // infinite loop
          throw['infinite loop in updating', args];
        }
        // if state is updated when patching, patch again
        this.updated = false;
        this._state.beforePatch();
        const result = this.patch(
          this.element,
          this.nodeFunc(this.state, this),
          this.node,
        );
        this.element = result[0];
        this.node = result[1];
      }
      this.patching = false;
      this.updateCount = 0;
    } else {
      // state updated when patching
      this.updated = true;
      this.updateCount++;
    }
    return
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

  // patch lastElement to represent node attributes, with diffing lastNode
  patch(lastElement, node, lastNode) {
    // thunk
    let lastThunk;
    if (lastNode && lastNode instanceof Thunk) {
      lastThunk = lastNode;
      lastNode = lastThunk.node;
    }
    let thunk;
    if (node instanceof Thunk) {
      thunk = node;
    }

    if (thunk) {
      let shouldUpdate = false;
      if (!lastThunk) {
        shouldUpdate = true;
      } else if (thunk.name != lastThunk.name) {
        shouldUpdate = true;
      } else if (this._state.argsChanged(thunk.args, lastThunk.args)) {
        shouldUpdate = true;
      }

      if (lastThunk && !shouldUpdate) {
        // reuse node
        thunk.node = lastThunk.node;
        // reuse element
        thunk.element = lastThunk.element;
      }
      node = thunk.getNode();
    }

    // Thunk.getNode may return another Thunk, patch recursively
    if (node instanceof Thunk) {
      return this.patch(lastElement, node, lastNode);
    }

    // no need to patch if two Nodes is the same object
    // if thunk's node is reuse, will return here
    if (node === lastNode) {
      return [lastElement, node];
    }

    // not patchable, build a new element
    if (
      // not diffable
      (!lastNode)
      // no element
      || (!lastElement)
      // different tag, no way to patch
      || (node.tag != lastNode.tag)
    ) {
      const element = node.toElement(null, this);
      // insert new then remove old
      if (lastElement && lastElement.parentNode) {
        lastElement.parentNode.insertBefore(element, lastElement);
        lastElement.parentNode.removeChild(lastElement);
      }
      // cache lastElement
      if (lastNode && lastElement.tagName) {
        this.cacheElement(lastElement, lastNode);
      }

      return [element, node];
    }

    // set element
    node.element = lastElement;
    if (thunk) {
      thunk.element = lastElement;
    }

    return this.patchNode(lastElement, node, lastNode);
  }

  patchNode(lastElement, node, lastNode) {
    // innerHTML
    if (node.innerHTML != lastNode.innerHTML) {
      lastElement.innerHTML = node.innerHTML;
    }

    // text
    if (node.text != lastNode.text) {
      lastElement.nodeValue = node.text;
    }

    // id
    if (node.id != lastNode.id) {
      lastElement.id = node.id;
    }

    // styles
    const styleType = typeof node.style;
    const lastStyleType = typeof lastNode.style;
    // different type, no diff
    if (styleType !== lastStyleType) {
      lastElement.style = undefined;
      if (styleType === 'string') {
        lastElement.style = node.style;
      } else if (styleType === 'object' && node.style !== null) {
        for (const key in node.style) {
          lastElement.style[key] = node.style[key];
        }
      }
    } 
    // diff object
    else if (styleType === 'object') {
      if (node.style !== null) {
        for (const key in node.style) {
          if (!lastNode.style || node.style[key] != lastNode.style[key]) {
            lastElement.style[key] = node.style[key];
          }
        }
      }
      if (lastNode.style !== null) {
        for (const key in lastNode.style) {
          if (!node.style || !(key in node.style)) {
            lastElement.style[key] = '';
          }
        }
      }
    } 
    // string, compare
    else if (styleType === 'string') {
      if (node.style !== lastNode.style) {
        lastElement.style = node.style;
      }
    }

    // class
    for (const key in node.classList) {
      // should update
      if (!lastNode.classList || node.classList[key] != lastNode.classList[key]) {
        if (node.classList[key]) {
          lastElement.classList.add(key);
        } else {
          lastElement.classList.remove(key);
        }
      }
    }
    for (const key in lastNode.classList) {
      if (!node.classList || !(key in node.classList)) {
        lastElement.classList.remove(key);
      }
    }

    // attributes
    for (const key in node.attributes) {
      if (!lastNode.attributes || node.attributes[key] != lastNode.attributes[key]) {
        const value = node.attributes[key];
        const valueType = typeof value;
        if (valueType == 'string' || valueType == 'number') {
          lastElement.setAttribute(key, value);
          lastElement[key] = value
        } else if (valueType == 'boolean') {
          const set = () => {
            if (value) {
              lastElement.setAttribute(key, true);
              lastElement[key] = true;
            } else {
              lastElement.removeAttribute(key);
              lastElement[key] = false;
            }
          };
          if (lastElement.tagName === 'INPUT' && lastElement.type == 'checkbox') {
            setTimeout(set, 0);
          } else {
            set();
          }
        }
      }
    }
    for (const key in lastNode.attributes) {
      if (!node.attributes || !(key in node.attributes)) {
        lastElement.removeAttribute(key);
        lastElement[key] = undefined;
      }
    }

    // events
    const eventKeys = {};
    for (const key in node.events) {
      let k = elementSetEvent(lastElement, key, node.events[key].bind(node));
      eventKeys[k] = true;
    }
    if (lastElement.__aff_events) {
      for (const type in lastElement.__aff_events) {
        for (const subtype in lastElement.__aff_events[type]) {
          if (!(type + ':' + subtype in eventKeys)) {
            delete lastElement.__aff_events[type][subtype];
          }
        }
      }
    }

    // children
    let childElements = lastElement.childNodes;
    const childLen = node.children ? node.children.length : 0;
    for (let i = 0; i < childLen; i++) {
      const child = node.children[i];
      if (
        child.key 
        && lastNode 
        && lastNode.children 
        && lastNode.children[i] 
        && lastNode.children[i].key != child.key
      ) { // keyed
        // search for same key
        let found = false;
        for (let offset = 0; offset < 10; offset++) {
          if (lastNode.children[i + offset] && lastNode.children[i + offset].key == child.key) {
            found = true;
            // found same key, delete some
            for (let n = 0; n < offset; n++) {
              //TODO recycle deleted
              lastElement.removeChild(childElements[i]);
              lastNode.children.splice(i, 1);
            }
            childElements = lastElement.childNodes;
            // patch
            const result = this.patch(
              childElements[i],
              child,
              lastNode.children[i],
            );
            break
          }
        }
        if (!found) {
          // insert new
          const elem = child.toElement();
          lastElement.insertBefore(elem, childElements[i]);
          childElements = lastElement.childNodes;
          lastNode.children.splice(i, 0, null);
        }
      } else {
        // not keyed
        const result = this.patch(
          childElements[i], 
          child,
          lastNode && lastNode.children ? lastNode.children[i] : null,
        );
        const elem = result[0];
        if (!childElements[i]) {
          lastElement.appendChild(elem);
        }
      }
    }
    const lastChildLen = lastNode && lastNode.children ? lastNode.children.length : 0;
    for (let i = childLen; i < lastChildLen; i++) {
      this.cacheElement(lastElement.childNodes[childLen], lastNode.children[i]);
      lastElement.removeChild(lastElement.childNodes[childLen]);
    }

    // hook
    if (node.hooks && node.hooks.patched) {
      node.hooks.patched.forEach(fn => fn(lastElement));
    }

    return [lastElement, node];
  }

  cacheElement(element, node) {
    if (element instanceof Text) {
      return
    }
    this.elementCache[element.tagName.toLowerCase()].push([element, node]);
  }
}

class Thunk {
  constructor() {
    this.func = null;
    this.args = null;
    this.node = undefined;
    this.element = null;
    this.name = null;
    this.key = null;
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
      //TODO remove this
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
    thunk.args = [];
    for (let i = 2; i < args.length; i++) {
      const arg = args[i];
      if (arg instanceof Key) {
        thunk.key = arg.str;
      } else {
        thunk.args.push(arg);
      }
    }
    break
  case 'function':
    thunk.func = args[0];
    thunk.name = thunk.func.name;
    thunk.args = [];
    for (let i = 1; i < args.length; i++) {
      const arg = args[i];
      if (arg instanceof Key) {
        thunk.key = arg.str;
      } else {
        thunk.args.push(arg);
      }
    }
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

export const skip = { skipFollowingArguments: true };

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
          ['on' + ev.type]: ev.fn,
        });
      }
    } else if (arg instanceof Key) {
      node.key = arg.str;
    } else if (arg === skip) {
      break
    } else if (typeof arg === 'object' && arg !== null) {
      if (Array.isArray(arg)) {
        // flatten
        _e(node, ...arg);
      } else {
        node.setProperties(arg);
      }
    } else if (arg === null) {
      // do nothing
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
    this.key = null;
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
        if (this.style === null) {
          this.style = properties.style;
        } else {
          const style = properties.style;
          const styleType = typeof style;
          const currentType = typeof this.style;
          if (styleType != currentType) {
            throw['should not mix-use object-like style and string-like style', style, this.style];
          }
          if (styleType === 'string') {
            this.style += style;
          } else if (styleType === 'object') {
            for (const key in style) {
              this.style[key] = style[key];
            }
          }
        }
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
      throw['bad child', children, this];
    }
  }

  toElement(name, app) {
    let element;
    if (this.text !== null) {
      element = document.createTextNode(this.text);
    } else {
      // use cached element
      if (app && app.elementCache[this.tag] && app.elementCache[this.tag].length > 0) {
        let result = app.elementCache[this.tag].pop();
        let element = result[0];
        const lastNode = result[1];
        let node;
        result = app.patchNode(element, this, lastNode);
        element = result[0];
        node = result[1];
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
        childFragment.appendChild(this.children[i].toElement(null, app));
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

function elementSetEvent(element, type, fn) {
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

import { elementSetEvent } from './event'
import { Selector, Css, Key } from './tagged'
import { Events } from './event'

export class Node {
  constructor() {
    this.element = null;
  }
}

export class ElementNode extends Node {
  constructor() {
    super();
    this.tag = null; // for element
    this.id = null;
    this.style = null;
    this.classList = null;
    this.children = null;
    this.attributes = null;
    this.events = null;
    this.innerHTML = null;
    this.hooks = null;
    this.key = null;
  }

  toElement(app) {
    let element;
    // use cached element
    if (app && app.elementCache[this.tag] && app.elementCache[this.tag].length > 0) {
      if (app) {
        app.counters.nodeCacheHit++;
      }
      let result = app.elementCache[this.tag].shift();
      let element = result[0];
      const lastNode = result[1];
      result = app.patchNode(element, this, lastNode);
      element = result[0];
      this.element = element;
      if (this.hooks && this.hooks.created) {
        this.hooks.created.forEach(fn => fn(element));
      }
      return element;
    }
    element = document.createElement(this.tag);
    if (app) {
      app.counters.nativeNodeCreate++;
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
        childFragment.appendChild(this.children[i].toElement(app));
      }
      element.appendChild(childFragment);
    }
    if (this.attributes !== null) {
      for (const key in this.attributes) {
        const value = this.attributes[key];
        const valueType = typeof value;
        let isStringOrNumber = false;
        if (valueType === 'string') {
          isStringOrNumber = true;
        } else if (valueType === 'number') {
          isStringOrNumber = true;
        }
        if (isStringOrNumber) {
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

  setSelector(selector) {
    const parts = selector.match(/[.#][A-Za-z][A-Za-z0-9_:-]*/g);
    if (parts) {
      for (let i = 0, l = parts.length; i < l; i++) {
        const part = parts[i];
        if (part.charAt(0) == '#') {
          this.id = part.substring(1);
        } else if (part.charAt(0) == '.') {
          if (!this.classList) {
            this.classList = {};
          }
          this.classList[part.substring(1)] = true;
        }
      }
    }
  }

  setProperties(properties) {
    for (const key in properties) {
      let sameKey = false;
      if (key === 'id') {
        sameKey = true;
      } else if (key === 'innerHTML') {
        sameKey = true;
      }
      if (sameKey) {
        // id, innerHTML
        this[key] = properties[key];
      } else if (key == 'classList') {
        if (!this.classList) {
          this.classList = {};
        }
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
        let isCreatedHook = false;
        let isPatchHook = false;
        if (key === 'oncreated') {
          isCreatedHook = true;
        } else if (key === 'oncreate') {
          isCreatedHook = true;
        } else if (key === 'onpatch') {
          isPatchHook = true;
        } else if (key === 'onpatched') {
          isPatchHook = true;
        }
        if (isCreatedHook) {
          if (!this.hooks) {
            this.hooks = {};
          }
          if (!this.hooks.created) {
            this.hooks.created = [];
          }
          this.hooks.created.push(properties[key]);
        } else if (isPatchHook) {
          if (!this.hooks) {
            this.hooks = {};
          }
          if (!this.hooks.patched) {
            this.hooks.patched = [];
          }
          this.hooks.patched.push(properties[key]);
        } else {
          // events
          if (!this.events) {
            this.events = {};
          }
          this.events[key] = properties[key];
        }
      } else {
        if (!this.attributes) {
          this.attributes = {};
        }
        this.attributes[key] = properties[key];
      }
    }
  }

  setChildren(children) {
    if (!this.children) {
      this.children = [];
    }
    const type = typeof children;
    let isText = false;
    if (type === 'boolean') {
      isText = true;
    } else if (type === 'number') {
      isText = true;
    } else if (type === 'string') {
      isText = true;
    } else if (type === 'symbol') {
      isText = true;
    }
    if (type === 'object' && children !== null) {
      this.children.push(children);
    } else if (isText) {
      const child = new TextNode();
      child.text = children.toString();
      this.children.push(child);
    } else {
      throw['bad child', children, this];
    }
  }
  
}

export class TextNode extends Node {
  constructor() {
    super();
    this.text = null;
  }

  toElement(app) {
    if (app && app.textNodeCache.length > 0) {
      if (app) {
        app.counters.nodeCacheHit++;
      }
      let result = app.textNodeCache.shift();
      let element = result[0];
      const lastNode = result[1];
      result = app.patchNode(element, this, lastNode);
      element = result[0];
      this.element = element;
      return element;
    }
    if (app) {
      app.counters.nativeNodeCreate++;
    }
    return document.createTextNode(this.text);
  }
}

export class CommentNode extends Node {
  constructor() {
    super();
    this.text = null;
  }

  toElement(app) {
    if (app && app.commentNodeCache.length > 0) {
      if (app) {
        app.counters.nodeCacheHit++;
      }
      let result = app.commentNodeCache.shift();
      let element = result[0];
      const lastNode = result[1];
      result = app.patchNode(element, this, lastNode);
      element = result[0];
      this.element = element;
      return element;
    }
    if (app) {
      app.counters.nativeNodeCreate++;
    }
    return document.createComment(this.text);
  }
}

export class Thunk extends Node {
  constructor() {
    super();
    this.func = null;
    this.args = null;
    this.node = undefined;
    this.name = null;
    this.key = null;
  }

  toElement(app) {
    if (!this.element) {
      const node = this.getNode(app);
      if (node instanceof Node) {
        this.element = node.toElement(app);
      } else {
        throw['thunk function must return a Node', this, node];
      }
    }
    return this.element;
  }

  getNode(app) {
    if (!this.node) {
      this.node = this.func.apply(this, this.args);
      if (app) {
        app.counters.thunkFuncCall++;
      }
      if (this.node === null) {
        this.node = new CommentNode();
        this.node.text = ' none ';
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
  const node = new ElementNode();
  node.tag = tag;
  _e(node, ...args);
  return node;
}

export const skip = { skipFollowingArguments: true };

function _e(node, ...args) {
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg instanceof Node) {
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


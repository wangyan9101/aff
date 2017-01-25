import { elementSetEvent } from './event'

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

  toElement(name, app) {
    let element;
    // use cached element
    if (app && app.elementCache[this.tag] && app.elementCache[this.tag].length > 0) {
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

  toElement(name, app) {
    if (app && app.textNodeCache.length > 0) {
      let result = app.textNodeCache.shift();
      let element = result[0];
      const lastNode = result[1];
      result = app.patchNode(element, this, lastNode);
      element = result[0];
      this.element = element;
      return element;
    }
    return document.createTextNode(this.text);
  }
}

export class CommentNode extends Node {
  constructor() {
    super();
    this.text = null;
  }

  toElement(name, app) {
    if (app && app.commentNodeCache.length > 0) {
      let result = app.commentNodeCache.shift();
      let element = result[0];
      const lastNode = result[1];
      result = app.patchNode(element, this, lastNode);
      element = result[0];
      this.element = element;
      return element;
    }
    return document.createComment(this.text);
  }
}

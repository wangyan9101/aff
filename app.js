import { allTags } from './all_tags'
import { Events } from './event'
import { MutableState } from './mutable_state'
import { Updater, Reference, ReadOnlyReference, WriteOnlyReference } from './state'
import { Node, ElementNode, CommentNode, TextNode, Thunk } from './nodes'
import { elementSetEvent } from './event'

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
    this.textNodeCache = [];
    this.commentNodeCache = [];
    this.counters = {
      thunkFuncCall: 0,
      nativeNodeCreate: 0,
      nodeCacheHit: 0,
    };
    this.jobs = [];
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

  setupState(obj, path = [], scopes = []) {
    // skip non-object
    if (typeof obj !== 'object') {
      return
    } else if (obj === null) {
      return
    }

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

    const app = this;
    const keys = Object.getOwnPropertyNames(obj);
    const bindings = {};
    const updaterKeys = [];
    const subStateKeys = [];
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      const p = path.slice(0);
      p.push(key);
      bindings[key] = p;

      const subState = obj[key];
      if (subState instanceof Reference) {
        const name = subState.name;
        // search in scopes
        let found = false;
        for (let i = scopes.length - 1; i >= 0; i--) {
          const bindings = scopes[i];
          if (!(name in bindings)) {
            continue
          }
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
          if (sameLen == stopPath.length) {
            throw['loop in reference', path, stopPath];
          } 
          // setup getter and setter
          if (subState instanceof WriteOnlyReference) {
            // write only reference, do not set through
            const from = bindings[name];
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
          } else {
            stopPath.pop();
            const stopLen = stopPath.length;
            let setupPath = path.slice(0);
            while (setupPath.length > stopLen) {
              const obj = this.get(setupPath);
              const from = bindings[name];
              const parentPathOfFrom = from.slice(0);
              parentPathOfFrom.pop();
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
              if (!obj.__aff_ref_keys) {
                Object.defineProperty(obj, '__aff_ref_keys', {
                  configurable: false,
                  writable: true,
                  enumerable: false,
                  value: {},
                });
              }
              obj.__aff_ref_keys[key] = from;
              setupPath.pop();
            }
          }
          break // stop searching
        }
        if (!found) {
          throw[`no state named ${name}`];
        }
      } 

      else if (subState instanceof Updater) {
        updaterKeys.push(key);
      }

      else {
        subStateKeys.push(key);
      }

    }

    scopes = scopes.slice(0); // copy
    scopes.push(bindings);

    for (let i = 0; i < updaterKeys.length; i++) {
      const key = updaterKeys[i];
      const subState = obj[key];
      const name = subState.name;
      const func = subState.func;
      // search update path
      let found = false;
      for (let i = scopes.length - 1; i >= 0; i--) {
        const bindings = scopes[i];
        if (name in bindings) { // found
          found = true;
          const updatePath = bindings[name].slice(0);
          if (func) { 
            obj[key] = function(...args) {
              func(
                (...updateArgs) => app.update(...updatePath, ...updateArgs),
                ...args,
              );
            }
          } else {
            obj[key] = function(...args) {
              app.update(...updatePath, ...args);
            }
          }
          break
        }
      }
      if (!found) {
        throw[`no state named ${name}`];
      }
    }

    for (let i = 0; i < subStateKeys.length; i++) {
      const key = subStateKeys[i];
      const subState = obj[key];
      let p = path.slice(0);
      p.push(key);
      this.setupState(subState, p, scopes);
    }

  }

  addEvent(ev) {
    const parts = ev.type.split(/[$:]/);
    const type = parts[0];
    let subtype = parts.slice(1).join(':');
    if (!subtype) {
      subtype = '__default';
    }
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
    if (!this.element) {
      return
    } else if (!this.nodeFunc) {
      return
    }
    if (!this.patching) {
      this.patching = true;
      this.updated = false;
      this.updateCount = 0;
      this._state.beforePatch();
      if (!this.node) {
        // first render
        this.node = this.nodeFunc(this.state, this);
        const elem = this.node.toElement(this);
        if (this.element.parentNode) {
          this.element.parentNode.insertBefore(elem, this.element);
          this.element.parentNode.removeChild(this.element);
        }
        this.element = elem;
      } else {
        const result = this.patch(
          this.element, 
          this.nodeFunc(this.state, this), 
          this.node,
        );
        this.element = result[0];
        this.node = result[1];
      }
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
      if (this.jobs.length > 0) {
        for (let i = this.jobs.length - 1; i >= 0; i--) {
          this.jobs[i]();
        }
        this.jobs = [];
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
    if (!lastElement) {
      throw['bad last element'];
    }
    if (!lastNode) {
      throw['bad last node'];
    }

    // thunk
    let lastThunk;
    if (lastNode instanceof Thunk) {
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
      node = thunk.getNode(this);
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

    // check if patchable
    let patchable = true;
    if (node.constructor != lastNode.constructor) {
      patchable = false;
    } else if (node instanceof ElementNode  && (node.tag != lastNode.tag)) {
      patchable = false;
    }
    if (!patchable) {
      const element = node.toElement(this);
      // insert new then remove old
      if (lastElement.parentNode) {
        lastElement.parentNode.insertBefore(element, lastElement);
        lastElement.parentNode.removeChild(lastElement);
      }
      // cache lastElement
      this.cacheNode(lastElement, lastNode);

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
    // text and comment node
    let isTextOrComment = false;
    if (node instanceof TextNode) {
      isTextOrComment = true;
    } else if (node instanceof CommentNode) {
      isTextOrComment = true;
    }
    if (isTextOrComment) {
      if (node.text != lastNode.text) {
        lastElement.nodeValue = node.text;
      }
      return [lastElement, node];
    }

    // children
    let childElements = lastElement.childNodes;
    const childLen = node.children ? node.children.length : 0;
    for (let i = 0; i < childLen; i++) {
      const child = node.children[i];
      if (
        child.key 
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
              const elem = lastElement.removeChild(childElements[i]);
              this.cacheNode(elem, lastNode.children[i]);
              lastNode.children.splice(i, 1);
            }
            childElements = lastElement.childNodes;
            // patch
            this.patch(
              childElements[i],
              child,
              lastNode.children[i],
            );
            break
          }
        }
        if (!found) {
          // insert new
          const elem = child.toElement(this);
          lastElement.insertBefore(elem, childElements[i]);
          childElements = lastElement.childNodes;
          lastNode.children.splice(i, 0, null);
        }
      } else {
        // not keyed
        if (!childElements[i]) {
          const elem = child.toElement(this);
          lastElement.appendChild(elem);
        } else {
          this.patch(
            childElements[i], 
            child,
            lastNode.children[i],
          );
        }
      }
    }
    const lastChildLen = lastNode.children ? lastNode.children.length : 0;
    for (let i = childLen; i < lastChildLen; i++) {
      const elem = lastElement.removeChild(lastElement.childNodes[childLen]);
      this.cacheNode(elem, lastNode.children[i]);
    }

    this.jobs.push(function() {

    // innerHTML
    if (node.innerHTML != lastNode.innerHTML) {
      lastElement.innerHTML = node.innerHTML;
    }

    // attributes
    for (const key in node.attributes) {
      let updateAttr = false;
      if (!lastNode.attributes) {
        updateAttr = true;
      } else if (node.attributes[key] != lastNode.attributes[key]) {
        updateAttr = true;
      }
      if (updateAttr) {
        const value = node.attributes[key];
        const valueType = typeof value;
        let isStringOrNumber = false;
        if (valueType === 'string') {
          isStringOrNumber = true;
        } else if (valueType === 'number') {
          isStringOrNumber = true;
        }
        if (isStringOrNumber) {
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
      let removeAttr = false;
      if (!node.attributes) {
        removeAttr = true;
      } else if (!(key in node.attributes)) {
        removeAttr = true;
      }
      if (removeAttr) {
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

    // id
    if (node.id != lastNode.id) {
      lastElement.id = node.id;
    }

    // class
    for (const key in node.classList) {
      // should update
      let updateClass = false;
      if (!lastNode.classList) {
        updateClass = true;
      } else if (node.classList[key] != lastNode.classList[key]) {
        updateClass = true;
      }
      if (updateClass) {
        if (node.classList[key]) {
          lastElement.classList.add(key);
        } else {
          lastElement.classList.remove(key);
        }
      }
    }
    for (const key in lastNode.classList) {
      let deleteClass = false;
      if (!node.classList) {
        deleteClass = true;
      } else if (!(key in node.classList)) {
        deleteClass = true;
      }
      if (deleteClass) {
        lastElement.classList.remove(key);
      }
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
          let updateStyle = false;
          if (!lastNode.style) {
            updateStyle = true;
          } else if (node.style[key] != lastNode.style[key]) {
            updateStyle = true;
          }
          if (updateStyle) {
            lastElement.style[key] = node.style[key];
          }
        }
      }
      if (lastNode.style !== null) {
        for (const key in lastNode.style) {
          let clearStyle = false;
          if (!node.style) {
            clearStyle = true;
          } else if (!(key in node.style)) {
            clearStyle = true;
          }
          if (clearStyle) {
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

    // hook
    if (node.hooks && node.hooks.patched) {
      node.hooks.patched.forEach(fn => fn(lastElement));
    }

    }) // push job

    return [lastElement, node];
  }

  cacheNode(element, node) {
    if (node instanceof TextNode) {
      this.textNodeCache.push([element, node]);
    } else if (node instanceof CommentNode) {
      this.commentNodeCache.push([element, node]);
    } else if (node instanceof ElementNode) {
      this.elementCache[element.tagName.toLowerCase()].push([element, node]);
    } else if (node instanceof Thunk) {
      while (node instanceof Thunk) {
        node = node.getNode(this);
        this.cacheNode(element, node);
      }
    }
  }

}


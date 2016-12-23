import { $any } from './state'
import { all_tags } from './all_tags'

export class App {
  constructor(...args) {
    this.node = null;
    this.patching = false;
    this.patch_tick = 1;
    this.dirty_tree = {};
    this.next_dirty_tree = {};
    this.updated = false;
    this.update_count = 0;
    this.element_cache = {};
    for (let i = 0; i < all_tags.length; i++) {
      this.element_cache[all_tags[i]] = [];
    }
    this.init(...args);
  }

  init(...args) {
    for (let i = 0; i < args.length; i++) {
      let arg = args[i];
      if (arg instanceof HTMLElement) {
        this.element = arg;
      } else if (typeof arg == 'function') {
        this.node_func = arg;
      } else {
        this.state = arg;
      }
    }
    if (this.element !== undefined && this.node_func !== undefined && this.state !== undefined) {
      this.update();
    }
  }

  beforeUpdate() {
  }

  afterUpdate() {
  }

  update(...args) {
    this.beforeUpdate(this.state, ...args);
    this.state = this.update_state(this.next_dirty_tree, this.state, ...args);
    this.afterUpdate(this.state, ...args);
    if (!this.element) {
      return this.state;
    }
    if (!this.patching) {
      this.patching = true;
      this.updated = false;
      this.update_count = 0;
      this.patch_tick++;
      this.dirty_tree = this.next_dirty_tree;
      this.next_dirty_tree = {};
      [this.element, this.node] = this.patch(this.element, this.node_func(this.state), this.node);
      while (this.updated) {
        if (this.update_count > 4096) { // infinite loop
          throw['infinite loop in updating', args];
        }
        // if state is updated when patching, patch again
        this.updated = false;
        this.patch_tick++;
        this.dirty_tree = this.next_dirty_tree;
        this.next_dirty_tree = {};
        [this.element, this.node] = this.patch(this.element, this.node_func(this.state), this.node);
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

  tap(fn) {
    let res = fn(this.state);
    if (res) {
      this.update(...(Array.isArray(res) ? res : [res]));
    }
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

  sub(...args) {
    let path = args;
    if (path.length == 1 && Array.isArray(path[0])) {
      path = path[0];
    }
    return new SubState(this, path);
  }

  update_state(dirty_tree, obj, ...args) {
    if (args.length === 0) {
      return obj;
    } else if (args.length === 1) {
      let ret;
      if (typeof args[0] === 'object' && args[0].__is_op) {
        ret = args[0].apply(obj, this);
        if (ret === obj) {
          this.setup_state_object(ret);
        }
      } else {
        ret = args[0];
      }
      return ret;
    } else {
      if (!obj) {
        obj = {};
      }
      if (typeof obj === 'object') {
        if (!obj.hasOwnProperty('__aff_tick')) {
          this.setup_state_object(obj);
        }
        let key = args[0];
        for (let k in obj) {
          if (k == key || key === $any) {
            if (!dirty_tree[k]) {
              dirty_tree[k] = {};
            }
            obj[k] = this.update_state(dirty_tree[k], obj[k], ...args.slice(1));
          }
        }
        if (key !== $any && !(key in obj)) {
          if (!dirty_tree[key]) {
            dirty_tree[key] = {};
          }
          obj[key] = this.update_state(dirty_tree[key], undefined, ...args.slice(1));
        }
        obj.__aff_tick = this.patch_tick + 1;
        return obj;
      } else {
        throw['bad update path', obj, args];
      }
    }
  }

  setup_state_object(obj) {
    if (obj.hasOwnProperty('__aff_tick')) {
      obj.__aff_tick = this.patch_tick + 1;
      return
    }
    Object.defineProperty(obj, '__aff_tick', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: this.patch_tick + 1,
    });
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

    let should_update = false;
    if (!thunk || !last_thunk) {
      should_update = true;
    } else if (thunk.name != last_thunk.name) {
      should_update = true;
    } else if (thunk.args.length != last_thunk.args.length) {
      should_update = true;
    } else {
      for (let i = 0; i < thunk.args.length; i++) {
        let arg = thunk.args[i];
        let last_arg = last_thunk.args[i];
        if (arg instanceof SubState && last_arg instanceof SubState) {
          let max_dirty_index = -1;
          let max_same_index = -1;
          let dirty_tree = this.dirty_tree;
          let last_path = last_arg.path;
          for (let index = 0; index < arg.path.length; index++) {
            if (dirty_tree && dirty_tree[arg.path[index]]) {
              dirty_tree = dirty_tree[arg.path[index]];
              max_dirty_index = index;
            }
            if (last_path[index] == arg.path[index]) {
              max_same_index = index;
            }
          }
          if (max_dirty_index == arg.path.length - 1) {
            should_update = true;
            break
          }
          if (max_same_index != arg.path.length - 1) {
            should_update = true;
            break
          }
        } else if (arg === last_arg && typeof arg === 'object' && arg.__aff_tick === this.patch_tick) {
          should_update = true;
          break
        } else if (!equal(arg, last_arg)) {
          should_update = true;
          break
        }
      }
    }

    if (thunk) {
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
      // different tag, no way to patch
      || (node.tag != last_node.tag)
    ) {
      let element;
      if (!node || !node.toElement) {
        element = warning(`RENDER ERROR: cannot render ${node}`).toElement();
        console.warn('cannot render', node);
      } else {
        element = node.toElement(undefined, this);
      }
      // insert new then remove old
      if (last_element.parentNode) {
        last_element.parentNode.insertBefore(element, last_element);
        last_element.parentNode.removeChild(last_element);
      }
      // cache last_element
      if (last_node) {
        this.element_cache[last_element.tagName.toLowerCase()].push([last_element, last_node]);
      }

      return [element, node];
    }

    return this.patch_node(last_element, node, last_node, thunk);
  }

  patch_node(last_element, node, last_node, thunk) {
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
    let style_type = typeof node.style;
    let last_style_type = typeof last_node.style;
    if (style_type != last_style_type || style_type == 'string') {
      // not diffable
      if (style_type == 'object') {
        // remove all existing style
        last_element.style = null;
        // reset
        for (let key in node.style) {
          last_element.style[key] = node.style[key];
        }
      } else {
        // set string style
        if (node.style != last_node.style) {
          last_element.style = node.style;
        }
      }
    } else {
      if (node.style && last_node.style) {
        // common styles
        for (let key in node.style) {
          if (node.style[key] != last_node.style[key]) {
            last_element.style[key] = node.style[key];
          }
        }
        // delete styles exist in old Node but not in new
        if (typeof last_node.style === 'object') {
          for (let key in last_node.style) {
            if (!(key in node.style)) {
              last_element.style[key] = '';
            }
          }
        }
      } else if (node.style) {
        // new Node only
        for (let key in node.style) {
          last_element.style[key] = node.style[key];
        }
      } else if (last_node.style) {
        // no style in new Node, delete all
        last_element.style = undefined;
      }
    }

    // class
    if (node.class != last_node.class) {
      last_element.className = node.class;
    }

    // attributes
    if (node.attributes && last_node.attributes) {
      // update common attributes
      for (let key in node.attributes) {
        if (node.attributes[key] != last_node.attributes[key]) {
          let value = node.attributes[key];
          let valueType = typeof value;
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
      // delete non-exist attributes
      for (let key in last_node.attributes) {
        if (!(key in node.attributes)) {
          last_element.removeAttribute(key);
          last_element[key] = undefined;
        }
      }
    } else if (node.attributes) {
      // set new attributes only
      for (let key in node.attributes) {
        let value = node.attributes[key];
        let valueType = typeof value;
        if (valueType == 'string' || valueType == 'number') {
          last_element.setAttribute(key, value);
          last_element[key] = value;
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
    } else if (last_node.attributes) {
      // no attributes in new Node, delete all
      for (let key in last_node.attributes) {
        last_element.removeAttribute(key);
        last_element[key] = undefined;
      }
    }
    
    // events
    // not implementing global event proxy
    if (node.events && last_node.events) {
      for (let key in node.events) {
        // set events, bind current node to callback function
        // to enable referencing current node
        element_set_listener(last_element, key, node.events[key].bind(node));
      }
      let serial = last_element.__element_serial;
      for (let key in element_events[serial]) {
        if (!(key in node.events)) {
          element_events[serial][key] = false;
        }
      }
    } else if (node.events) {
      for (let key in node.events) {
        // set events, bind current node to callback function
        element_set_listener(last_element, key, node.events[key].bind(node));
      }
    } else if (last_node.events) {
      let serial = last_element.__element_serial;
      for (let key in element_events[serial]) {
        element_events[serial][key] = false;
      }
    }

    // children
    if (node.children && last_node.children) {
      // patch common amount of children
      let common_length = Math.min(node.children.length, last_node.children.length);
      let child_elements = last_element.childNodes;
      for (let i = 0; i < common_length; i++) {
        // recursive patch
        this.patch(child_elements[i], node.children[i], last_node.children[i]);
      }
      // insert new children
      for (let i = common_length, l = node.children.length; i < l; i++) {
        if (!node.children[i] || !node.children[i].toElement) {
          last_element.appendChild(warning(`RENDER ERROR: cannot render ${node.children[i]}`).toElement());
          console.warn('cannot render', node.children[i]);
        } else {
          last_element.appendChild(node.children[i].toElement(undefined, this));
        }
      }
      // delete
      for (let i = common_length, l = last_node.children.length; i < l; i++) {
        last_element.removeChild(last_element.childNodes[common_length]);
      }
    } else if (node.children) {
      // insert only
      for (let i = 0, l = node.children.length; i < l; i++) {
        if (!node.children[i] || !node.children[i].toElement) {
          last_element.appendChild(warning(`RENDER ERROR: cannot render ${node.children[i]}`).toElement());
          console.warn('cannot render', node.children[i]);
        } else {
          last_element.appendChild(node.children[i].toElement(undefined, this));
        }
      }
    } else if (last_node.children) {
      // delete only
      while (last_element.firstChild) {
        last_element.removeChild(last_element.firstChild);
      }
    }

    // set element
    node.element = last_element;
    if (thunk) {
      thunk.element = last_element;
    }

    if (node.hooks && node.hooks.patched) {
      node.hooks.patched.forEach(fn => fn(last_element));
    }

    return [last_element, node];
  }
}

class SubState {
  constructor(app, path) {
    this.app = app;
    this.path = path;
  }

  get() {
    return this.app.get(this.path);
  }

  update(...args) {
    return this.app.update(...this.path, ...args);
  }

  sub(...args) {
    let subpath = args;
    if (subpath.length == 1 && Array.isArray(subpath[0])) {
      subpath = subpath[0];
    }
    return new SubState(this.app, [...this.path, ...subpath]);
  }
}

class Thunk {
  constructor() {
    this.func = null;
    this.args = null;
    this.node = null;
    this.element = null;
    this.name = null;
  }

  toElement(_name, app) {
    if (!this.element) {
      let node = this.getNode();
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
      if (!this.node) {
        throw['constructor of ' + (this.name || 'anonymous') + ' returned null value', this];
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

  let thunk = new Thunk();

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

  return thunk
}

// element helper
export function e(...args) {
  if (args.length === 0) {
    throw['no arguments to e()'];
  }

  // Thunk
  if (typeof args[0] === 'function') {
    let thunk = new Thunk();
    thunk.func = args[0];
    thunk.args = args.slice(1);
    // set thunk name from function, may be undefined
    thunk.name = thunk.func.name; 
    return thunk;
  }

  let node = new Node();

  let arg1, arg2;

  switch (args.length) {
  case 1:
    // tag only, eg. e('hr')
    node.tag = args[0];

    break

  case 2:
    // two args, first the tag, second a selector or children or properties
    // eg. e('div', '#main .block')
    // or e('div', 'Hello, world')
    // or e('div', [ e('p', 'Hello, world') ])
    // or e('div', { id: 'main' })
    node.tag = args[0];
    arg1 = args[1];

    switch (typeof arg1) {
    case 'string':
      if (arg1[0] == '#' || arg1[0] == '.') { // selector
        node.set_selector(arg1);
      } else { // text node
        node.set_children(arg1);
      }
      break

    case 'number':
      node.set_children(arg1);
      break

    case 'object':
      if (Array.isArray(arg1) || (arg1 instanceof Node) || (arg1 instanceof Thunk)) { // children
        node.set_children(arg1);
      } else { // properties
        node.set_properties(arg1);
      }
      break

    default:
      throw['bad argument at index 1 to e()', args];
    }

    break

  case 3:
    // three args, first the tag, second a selector or properties, third children or properties
    // eg. e('div', '#main', [ e('p', 'Hello') ])
    // or e('div', { id: 'main' }, [])
    node.tag = args[0];

    arg1 = args[1];
    switch (typeof arg1) {
    case 'string':
      node.set_selector(arg1);
      break
    case 'object':
      node.set_properties(arg1);
      break
    default:
      throw['bad argument at index 1 to e()', args];
    }

    arg2 = args[2];
    if (typeof arg2 == 'object' && !Array.isArray(arg2) && !(arg2 instanceof Node) && !(arg2 instanceof Thunk)) {
      node.set_properties(arg2);
    } else {
      node.set_children(arg2);
    }

    break

  case 4:
    // four arguments. first tag, second selector, third properties, forth children
    // eg e('div', '#main', { class: 'foo' }, [ e('div') ])
    node.tag = args[0];
    node.set_selector(args[1]);
    node.set_properties(args[2]);
    node.set_children(args[3]);

    break

  default:
    throw['bad arguments to e()', args];
  }

  return node;
}

let beforeThunkCallFunc = (thunk) => {};
let afterThunkCallFunc = (thunk) => {};
export let setBeforeThunkCallFunc = (fn) => {
  beforeThunkCallFunc = fn;
}
export let setAfterThunkCallFunc = (fn) => {
  afterThunkCallFunc = fn;
}

class Node {
  constructor() {
    this.tag = null;
    this.id = null;
    this.style = null;
    this.class = null;
    this.children = null;
    this.attributes = null;
    this.events = null;
    this.text = null;
    this.innerHTML = null;
    this.element = null;
    this.hooks = null;
  }

  set_selector(selector) {
    let classes = [];
    let parts = selector.match(/[.#][A-Za-z][A-Za-z0-9_:-]*/g);
    for (let i = 0, l = parts.length; i < l; i++) {
      let part = parts[i];
      if (part.charAt(0) == '#') {
        this.id = part.substring(1);
      } else if (part.charAt(0) == '.') {
        classes.push(part.substring(1));
      }
    }
    let cls = classes.join(' ');
    if (cls.length > 0) {
      this.class = cls;
    }
  }

  set_properties(properties) {
    for (let key in properties) {
      if (key == 'id' || key == 'innerHTML') {
        // id, innerHTML
        this[key] = properties[key];
      } else if (key == 'class') {
        let property = properties.class;
        if (typeof property == 'string') {
          this.class = property;
        } else if (typeof property == 'object') {
          if (Array.isArray(property)) {
            this.class = property.join(' ');
          } else {
            let classes = [];
            for (let k in property) {
              let v = property[k];
              if (v) {
                classes.push(k);
              }
            }
            this.class = classes.join(' ');
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
        //if (
        //  (this.tag == 'input' && key == 'checked' && !properties[key])
        //  || (this.tag == 'input' && key == 'disabled' && !properties[key])
        //  || (this.tag == 'button' && key == 'disabled' && !properties[key])
        //) {
        //  continue
        //}
        // attributes
        this.attributes = this.attributes || {};
        this.attributes[key] = properties[key];
      }
    }
  }

  set_children(children) {
    this.children = this.children || [];
    if (Array.isArray(children)) {
      // flatten
      for (let i = 0, l = children.length; i < l; i++) {
        this.set_children(children[i]);
      }
    } else if (typeof children === 'string' || typeof children === 'number') {
      let child = new Node();
      child.text = children;
      this.children.push(child);
    } else {
      this.children.push(children);
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
        return app.patch_node(element, this, last_node)[0];
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
      if (typeof this.style == 'object') {
        for (let key in this.style) {
          element.style[key] = this.style[key];
        }
      } else {
        element.style = this.style;
      }
    }
    if (this.class !== null) {
      element.className = this.class;
    }
    if (this.children !== null) {
      for (let i = 0, l = this.children.length; i < l; i++) {
        if (!this.children[i] || !this.children[i].toElement) {
          element.appendChild(warning(`RENDER ERROR: cannot render ${this.children[i]}`).toElement());
          console.warn('cannot render', this.children[i]);
        } else {
          element.appendChild(this.children[i].toElement(undefined, app));
        }
      }
    }
    if (this.attributes !== null) {
      for (let key in this.attributes) {
        let value = this.attributes[key];
        let valueType = typeof value;
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
      for (let key in this.events) {
        // set event callback, bind current Node to callback
        // constructor must not be arrow function to get proper 'this'
        element_set_listener(element, key, this.events[key].bind(this));
      }
    }
    this.element = element;
    if (this.hooks && this.hooks.created) {
      this.hooks.created.forEach(fn => fn(element));
    }
    return element;
  }

}

let warning = (text) => e('div', {
  style: {
    backgroundColor: 'yellow',
    color: 'red',
    fontWeight: 'bold',
  },
}, text);

let element_events = {};
let element_set_listener = (() => {
  let next_element_serial = 1;
  return function(element, ev_type, fn) {
    let serial = element.__element_serial;
    if (!serial) {
      serial = next_element_serial;
      next_element_serial++;
      element.__element_serial = serial;
    }
    let event_set = element_events[serial];
    if (!event_set) {
      event_set = {};
      element_events[serial] = event_set;
    }
    if (!(ev_type in event_set)) {
      element.addEventListener(ev_type.substr(2), function(ev) {
        return element_events[serial][ev_type](ev);
      });
    }
    event_set[ev_type] = fn;
  }
})();

export function equal(a, b) {
  if (a === b) {
    return true;
  }
  let type_a = typeof a;
  let type_b = typeof b;
  if (type_a !== type_b) {
    return false;
  }
  if (type_a === 'object') {
    if (a instanceof SubState && b instanceof SubState) {
      return equal(a.get(), b.get());
    }
    // deep compare
    let keys_a = Object.keys(a);
    let keys_b = Object.keys(b);
    if (keys_a.length != keys_b.length) {
      return false;
    }
    for (let key in a) {
      if (!equal(a[key], b[key])) {
        return false;
      }
    }
    return true;
  } else if (type_a === 'function') {
    return a.name === b.name;
  }
  return false;
}

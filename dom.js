import {equal} from './equality'

let element_serial = 1;

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
      if (key == 'id' || key == 'class' || key == 'innerHTML') {
        // id, class, innerHTML
        this[key] = properties[key];
      } else if (key == 'style') {
        // styles
        this.style = properties.style;
      } else if (/^on/.test(key) && typeof properties[key] === 'function') {
        // events
        this.events = this.events || {};
        this.events[key] = properties[key];
      } else {
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

  toElement() {
    let element;
    if (this.text !== null) {
      element = document.createTextNode(this.text);
    } else {
      element = document.createElement(this.tag);
      element.setAttribute('aff-element-serial', element_serial);
      element_serial++;
    }
    if (this.innerHTML !== null) {
      element.innerHTML = this.innerHTML;
    }
    if (this.id !== null) {
      element.id = this.id;
    }
    if (this.style !== null) {
      for (let key in this.style) {
        element.style[key] = this.style[key];
      }
    }
    if (this.class !== null) {
      element.className = this.class;
    }
    if (this.children !== null) {
      for (let i = 0, l = this.children.length; i < l; i++) {
        element.appendChild(this.children[i].toElement());
      }
    }
    if (this.attributes !== null) {
      for (let key in this.attributes) {
        let value = this.attributes[key];
        if (value !== undefined && value !== null) {
          element.setAttribute(key, value);
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
    return element;
  }

}

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

// thunk helper
export function t(...args) {
  if (args.length === 0) {
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

  let arg1;

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
      if (Array.isArray(arg1)) { // children
        node.set_children(arg1);
      } else { // properties
        node.set_properties(arg1);
      }
      break

    default:
      throw['bad argument at index 1 to e()', args];
      break
    }

    break

  case 3:
    // three args, first the tag, second a selector or properties, third children
    // eg. e('div', '#main', [ e('p', 'Hello') ])
    // or e('div', { id: 'main' }, [])
    node.tag = args[0];
    node.set_children(args[2]);
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
      break
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
    break
  }

  return node;
}

// patch last_element to represent node attributes, with diffing last_node
export function patch(last_element, node, last_node) {
  // thunk
  let last_thunk;
  if (last_node && last_node instanceof Thunk) {
    last_thunk = last_node;
    last_node = last_thunk.node;
  }
  let thunk;
  if (node instanceof Thunk) {
    thunk = node;
    if (
      last_thunk 
      && thunk.name == last_thunk.name 
      && equal(thunk.args, last_thunk.args)
    ) {
      // reuse node
      thunk.node = last_thunk.node;
      // reuse element
      thunk.element = last_thunk.element;
    }
    // get node of thunk
    node = thunk.getNode();
  }

  // Thunk.getNode may return another Thunk, patch recursively
  if (node instanceof Thunk || last_node instanceof Thunk) {
    return patch(last_element, node, last_node);
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
    let element = node.toElement();
    // insert new then remove old
    last_element.parentNode.insertBefore(element, last_element);
    last_element.parentNode.removeChild(last_element);

    return [element, node];
  }

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
  if (node.style && last_node.style) {
    // common styles
    for (let key in node.style) {
      if (node.style[key] != last_node.style[key]) {
        last_element.style[key] = node.style[key];
      }
    }
    // delete styles exist in old Node but not in new
    for (let key in last_node.style) {
      if (!(key in node.style)) {
        last_element.style[key] = null;
      }
    }
  } else if (node.style) {
    // new Node only
    for (let key in node.style) {
      last_element.style[key] = node.style[key];
    }
  } else if (last_node.style) {
    // no style in new Node, delete all
    for (let key in last_node.style) {
      last_element.style[key] = null;
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
        if (value !== undefined && value !== null) {
          last_element.setAttribute(key, value);
        }
      }
    }
    // delete non-exist attributes
    for (let key in last_node.attributes) {
      if (!(key in node.attributes)) {
        last_element.removeAttribute(key);
      }
    }
  } else if (node.attributes) {
    // set new attributes only
    for (let key in node.attributes) {
      let value = node.attributes[key];
      if (value !== undefined && value !== null) {
        last_element.setAttribute(key, value);
      }
    }
  } else if (last_node.attributes) {
    // no attributes in new Node, delete all
    for (let key in last_node.attributes) {
      last_element.removeAttribute(key);
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
      patch(child_elements[i], node.children[i], last_node.children[i]);
    }
    // insert new children
    for (let i = common_length, l = node.children.length; i < l; i++) {
      last_element.appendChild(node.children[i].toElement());
    }
    // delete
    for (let i = common_length, l = last_node.children.length; i < l; i++) {
      last_element.removeChild(last_element.childNodes[common_length]);
    }
  } else if (node.children) {
    // insert only
    for (let i = 0, l = node.children.length; i < l; i++) {
      last_element.appendChild(node.children[i].toElement());
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

  return [last_element, node];
}

export function make_patcher(initial_element, node_constructor) {
  let element = initial_element;
  let node;
  return function() {
    [element, node] = patch(
      element,
      node_constructor(),
      node,
    );
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

  toElement() {
    if (!this.element) {
      this.element = this.getNode().toElement();
    }
    return this.element;
  }

  getNode() {
    if (!this.node) {
      this.node = this.func.apply(this, this.args);
    }
    return this.node;
  }

}

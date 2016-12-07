// Node 对象缓存
let node_cache = [];

// 获取新的 Node 对象，如果缓存里有则返回，如果没有则 new 一个
function new_node() {
  let node = node_cache.pop();
  if (node) {
    return node;
  }
  return new Node();
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
  }

  recycle() {
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
    node_cache.push(this);
  }

  set_tag(tag) {
    this.tag = tag;
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
        // 样式
        this.style = properties.style;
      } else if (/^on/.test(key) && typeof properties[key] === 'function') {
        // 事件
        this.events = this.events || {};
        this.events[key] = properties[key];
      } else {
        // 其他属性
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
      let child = new_node();
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
        // 设置事件回调，bind 当前 Node 到回调函数
        // 这样就能在回调函数里用 this.element 等获得渲染出来的元素
        // 当然，需要用 this 时，Node 的构造函数必须用 function 定义，不能用箭头函数
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

export function e(...args) {
  // Thunk
  if (typeof args[0] === 'function') {
    let thunk = new Thunk();
    thunk.func = args[0];
    thunk.args = args.slice(1);
    thunk.name = thunk.func.name; // 可能是匿名的，不影响逻辑
    return thunk;
  }

  let node = new_node();

  let arg1;

  switch (args.length) {
  case 1:
    // 只有一个 tag 参数，例如 e('hr')
    node.set_tag(args[0]);

    break

  case 2:
    // 两个参数，第一个为 tag，第二个可为选择器、子结点、属性等
    // 例 e('div', '#main .block')
    // 或 e('div', 'Hello, world')
    // 或 e('div', [ e('p', 'Hello, world') ])
    // 或 e('div', { id: 'main' })
    node.set_tag(args[0]);
    arg1 = args[1];

    switch (typeof arg1) {
    case 'string':
      if (arg1[0] == '#' || arg1[0] == '.') { // 选择器
        node.set_selector(arg1);
      } else { // 文本结点
        node.set_children(arg1);
      }
      break

    case 'number':
      node.set_children(arg1);
      break

    case 'object':
      if (Array.isArray(arg1)) { // 子结点
        node.set_children(arg1);
      } else { // 属性
        node.set_properties(arg1);
      }
      break

    default:
      throw['bad argument at index 1 to e()', args];
      break
    }

    break

  case 3:
    // 三个参数，第一个为 tag，第二个可为选择器、属性，第三个为子结点
    // 例 e('div', '#main', [ e('p', 'Hello') ])
    // 或 e('div', { id: 'main' }, [])
    node.set_tag(args[0]);
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
    // 四个参数，第一个为 tag，第二个为选择器，第三个为属性，第四个为子结点
    // 例 e('div', '#main', { class: 'foo' }, [ e('div') ])
    node.set_tag(args[0]);
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

// 将 last_element 修改为 node 所对应的结构
// last_node 是和 last_element 当前结构对应的 Node
export function patch(last_element, node, last_node) {
  // thunk
  let last_thunk;
  if (last_node && last_node instanceof Thunk) {
    last_thunk = last_node;
    last_node = last_thunk.node;
  }
  if (node instanceof Thunk) {
    let thunk = node;
    // 检查是否能复用 last_thunk 的 node
    if (last_thunk) {
      if (thunk.name == last_thunk.name) { // 同名组件，可能可以用
        // 检查参数
        if (equal(thunk.args, last_thunk.args)) { // 可以复用
          // 复用 last_thunk 的 node
          thunk.node = last_thunk.node;
          // 有 node 就可能有 element，也复用之
          thunk.element = last_thunk.element;
        }
      }
    } 
    // 不管是否能复用，都取 thunk 的 node
    node = thunk.getNode();
  }

  // 如果两个 Node 是同一个，没必要修改，直接返回
  // 如果 thunk 的 node 重用了，会在这里返回
  if (node === last_node) {
    return [last_element, node];
  }

  // 下面是一些没法修改 last_element 的情况，只能新建一个元素
  if (
    // 前一个 Node 不存在，没法比较差异
    (!last_node)
    // 不同的 tag，因为元素并不能改变 tag，所以只能新建一个
    || (node.tag != last_node.tag)
  ) {
    // 创建新的元素
    let element = node.toElement();
    // 插入新的，删掉旧的
    last_element.parentNode.insertBefore(element, last_element);
    last_element.parentNode.removeChild(last_element);

    // 循环利用 last_node 
    if (last_node) {
      last_node.recycle();
    }

    return [element, node];
  }

  // innerHTML 属性
  if (node.innerHTML != last_node.innerHTML) {
    last_element.innerHTML = node.innerHTML;
  }

  // 文本元素
  if (node.text != last_node.text) {
    last_element.nodeValue = node.text;
  }

  // 元素 id
  if (node.id != last_node.id) {
    last_element.id = node.id;
  }

  // 样式
  if (node.style && last_node.style) {
    // 比较共同的样式，有差异就更新
    for (let key in node.style) {
      if (node.style[key] != last_node.style[key]) {
        last_element.style[key] = node.style[key];
      }
    }
    // 删掉在旧 Node 里存在，但不存在于新 Node 里的样式
    for (let key in last_node.style) {
      if (!(key in node.style)) {
        last_element.style[key] = null;
      }
    }
  } else if (node.style) {
    // 只有新 Node 有样式，直接设置
    for (let key in node.style) {
      last_element.style[key] = node.style[key];
    }
  } else if (last_node.style) {
    // 新 Node 没有样式，删掉旧 Node 里有的样式
    for (let key in last_node.style) {
      last_element.style[key] = null;
    }
  }

  // 元素 class
  if (node.class != last_node.class) {
    last_element.className = node.class;
  }

  // 元素属性
  if (node.attributes && last_node.attributes) {
    // 和样式的处理方式类似，有不同的就更新
    for (let key in node.attributes) {
      if (node.attributes[key] != last_node.attributes[key]) {
        let value = node.attributes[key];
        if (value !== undefined && value !== null) {
          last_element.setAttribute(key, value);
        }
      }
    }
    // 新 Node 没有的属性，就删除
    for (let key in last_node.attributes) {
      if (!(key in node.attributes)) {
        last_element.removeAttribute(key);
      }
    }
  } else if (node.attributes) {
    // 只有新 Node 有属性，直接设置
    for (let key in node.attributes) {
      let value = node.attributes[key];
      if (value !== undefined && value !== null) {
        last_element.setAttribute(key, value);
      }
    }
  } else if (last_node.attributes) {
    // 新 Node 没有属性，删除旧 Node 里有的
    for (let key in last_node.attributes) {
      last_element.removeAttribute(key);
    }
  }
  
  // 事件
  // 事件代理没有实现成在顶级元素统一处理，元素各自 addEventListener 的
  if (node.events && last_node.events) {
    for (let key in node.events) {
      // 设置事件，绑定当前 node 到回调函数
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
      // 设置事件，绑定当前 node 到回调函数
      element_set_listener(last_element, key, node.events[key].bind(node));
    }
  } else if (last_node.events) {
    let serial = last_element.__element_serial;
    for (let key in element_events[serial]) {
      element_events[serial][key] = false;
    }
  }

  // 子元素
  if (node.children && last_node.children) {
    // 新旧 Node 的子 Node 的数量可能不一样，先处理共有的数目
    let common_length = Math.min(node.children.length, last_node.children.length);
    let child_elements = last_element.childNodes;
    for (let i = 0; i < common_length; i++) {
      // 递归调用 patch 函数，传入子元素和子 Node
      patch(child_elements[i], node.children[i], last_node.children[i]);
    }
    // 如果新 Node 的子 Node 比较多，插入
    for (let i = common_length, l = node.children.length; i < l; i++) {
      last_element.appendChild(node.children[i].toElement());
    }
    // 如果旧 Node 的子 Node 比较多，删除
    for (let i = common_length, l = last_node.children.length; i < l; i++) {
      last_element.removeChild(last_element.childNodes[common_length]);
    }
  } else if (node.children) {
    // 只有新 Node 有子 Node
    for (let i = 0, l = node.children.length; i < l; i++) {
      last_element.appendChild(node.children[i].toElement());
    }
  } else if (last_node.children) {
    // 新 Node 没有子 Node，删掉所有子元素
    while (last_element.firstChild) {
      last_element.removeChild(last_element.firstChild);
    }
  }

  // 回收利用 last_node 
  last_node.recycle();

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

function equal(a, b) {
  let type_a = typeof a;
  let type_b = typeof b;
  if (type_a !== type_b) {
    return false;
  }
  if (type_a === 'undefined') {
    return true;
  } else if (type_a === 'object') {
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
  } else {
    return a === b;
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
      this.node = this.func.apply(undefined, this.args);
    }
    return this.node;
  }

  setName(name) {
    this.name = name;
    return this;
  }
}

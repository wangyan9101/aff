(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("affjs", [], factory);
	else if(typeof exports === 'object')
		exports["affjs"] = factory();
	else
		root["affjs"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _dom = __webpack_require__(1);
	
	var dom = _interopRequireWildcard(_dom);
	
	var _state = __webpack_require__(4);
	
	var state = _interopRequireWildcard(_state);
	
	var _tags = __webpack_require__(5);
	
	var tags = _interopRequireWildcard(_tags);
	
	var _app = __webpack_require__(6);
	
	var app = _interopRequireWildcard(_app);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	module.exports = {
	  dom: dom,
	  state: state,
	  tags: tags,
	  app: app
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.t = t;
	exports.e = e;
	exports.patch = patch;
	
	var _equality = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var element_serial = 1;
	
	var Node = function () {
	  function Node() {
	    _classCallCheck(this, Node);
	
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
	
	  _createClass(Node, [{
	    key: 'set_selector',
	    value: function set_selector(selector) {
	      var classes = [];
	      var parts = selector.match(/[.#][A-Za-z][A-Za-z0-9_:-]*/g);
	      for (var i = 0, l = parts.length; i < l; i++) {
	        var part = parts[i];
	        if (part.charAt(0) == '#') {
	          this.id = part.substring(1);
	        } else if (part.charAt(0) == '.') {
	          classes.push(part.substring(1));
	        }
	      }
	      var cls = classes.join(' ');
	      if (cls.length > 0) {
	        this.class = cls;
	      }
	    }
	  }, {
	    key: 'set_properties',
	    value: function set_properties(properties) {
	      for (var key in properties) {
	        if (key == 'id' || key == 'innerHTML') {
	          // id, innerHTML
	          this[key] = properties[key];
	        } else if (key == 'class') {
	          var property = properties.class;
	          if (typeof property == 'string') {
	            this.class = property;
	          } else if ((typeof property === 'undefined' ? 'undefined' : _typeof(property)) == 'object') {
	            if (Array.isArray(property)) {
	              this.class = property.join(' ');
	            } else {
	              var classes = [];
	              for (var k in property) {
	                var v = property[k];
	                if (v) {
	                  classes.push(k);
	                }
	              }
	              this.class = classes.join(' ');
	            }
	          } else {
	            throw ['bad class', property];
	          }
	        } else if (key == 'style') {
	          // styles
	          this.style = properties.style;
	        } else if (/^on/.test(key) && typeof properties[key] === 'function') {
	          // events
	          this.events = this.events || {};
	          this.events[key] = properties[key];
	        } else {
	          if (this.tag == 'input' && key == 'checked' && !properties[key] || this.tag == 'input' && key == 'disabled' && !properties[key] || this.tag == 'button' && key == 'disabled' && !properties[key]) {
	            continue;
	          }
	          // attributes
	          this.attributes = this.attributes || {};
	          this.attributes[key] = properties[key];
	        }
	      }
	    }
	  }, {
	    key: 'set_children',
	    value: function set_children(children) {
	      this.children = this.children || [];
	      if (Array.isArray(children)) {
	        // flatten
	        for (var i = 0, l = children.length; i < l; i++) {
	          this.set_children(children[i]);
	        }
	      } else if (typeof children === 'string' || typeof children === 'number') {
	        var child = new Node();
	        child.text = children;
	        this.children.push(child);
	      } else {
	        this.children.push(children);
	      }
	    }
	  }, {
	    key: 'toElement',
	    value: function toElement() {
	      var element = void 0;
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
	        for (var key in this.style) {
	          element.style[key] = this.style[key];
	        }
	      }
	      if (this.class !== null) {
	        element.className = this.class;
	      }
	      if (this.children !== null) {
	        for (var i = 0, l = this.children.length; i < l; i++) {
	          if (!this.children[i].toElement) {
	            element.appendChild(empty_node.toElement());
	          } else {
	            element.appendChild(this.children[i].toElement());
	          }
	        }
	      }
	      if (this.attributes !== null) {
	        for (var _key in this.attributes) {
	          var value = this.attributes[_key];
	          if (value !== undefined && value !== null) {
	            element.setAttribute(_key, value);
	          }
	        }
	      }
	      if (this.events !== null) {
	        for (var _key2 in this.events) {
	          // set event callback, bind current Node to callback
	          // constructor must not be arrow function to get proper 'this'
	          element_set_listener(element, _key2, this.events[_key2].bind(this));
	        }
	      }
	      this.element = element;
	      return element;
	    }
	  }]);
	
	  return Node;
	}();
	
	var empty_node = e('div', {
	  style: {
	    backgroundColor: 'yellow',
	    color: 'red',
	    fontWeight: 'bold'
	  }
	}, 'EMPTY NODE, FIX ME');
	
	var element_events = {};
	var element_set_listener = function () {
	  var next_element_serial = 1;
	  return function (element, ev_type, fn) {
	    var serial = element.__element_serial;
	    if (!serial) {
	      serial = next_element_serial;
	      next_element_serial++;
	      element.__element_serial = serial;
	    }
	    var event_set = element_events[serial];
	    if (!event_set) {
	      event_set = {};
	      element_events[serial] = event_set;
	    }
	    if (!(ev_type in event_set)) {
	      element.addEventListener(ev_type.substr(2), function (ev) {
	        return element_events[serial][ev_type](ev);
	      });
	    }
	    event_set[ev_type] = fn;
	  };
	}();
	
	// thunk helper
	function t() {
	  for (var _len = arguments.length, args = Array(_len), _key3 = 0; _key3 < _len; _key3++) {
	    args[_key3] = arguments[_key3];
	  }
	
	  if (args.length === 0) {
	    throw ['no arguments to t()'];
	  }
	
	  var thunk = new Thunk();
	
	  switch (_typeof(args[0])) {
	    case 'string':
	      // named thunk
	      thunk.name = args[0];
	      thunk.func = args[1];
	      thunk.args = args.slice(2);
	      break;
	
	    case 'function':
	      thunk.func = args[0];
	      thunk.args = args.slice(1);
	      thunk.name = thunk.func.name;
	      break;
	  }
	
	  return thunk;
	}
	
	// element helper
	function e() {
	  for (var _len2 = arguments.length, args = Array(_len2), _key4 = 0; _key4 < _len2; _key4++) {
	    args[_key4] = arguments[_key4];
	  }
	
	  if (args.length === 0) {
	    throw ['no arguments to e()'];
	  }
	
	  // Thunk
	  if (typeof args[0] === 'function') {
	    var thunk = new Thunk();
	    thunk.func = args[0];
	    thunk.args = args.slice(1);
	    // set thunk name from function, may be undefined
	    thunk.name = thunk.func.name;
	    return thunk;
	  }
	
	  var node = new Node();
	
	  var arg1 = void 0,
	      arg2 = void 0;
	
	  switch (args.length) {
	    case 1:
	      // tag only, eg. e('hr')
	      node.tag = args[0];
	
	      break;
	
	    case 2:
	      // two args, first the tag, second a selector or children or properties
	      // eg. e('div', '#main .block')
	      // or e('div', 'Hello, world')
	      // or e('div', [ e('p', 'Hello, world') ])
	      // or e('div', { id: 'main' })
	      node.tag = args[0];
	      arg1 = args[1];
	
	      switch (typeof arg1 === 'undefined' ? 'undefined' : _typeof(arg1)) {
	        case 'string':
	          if (arg1[0] == '#' || arg1[0] == '.') {
	            // selector
	            node.set_selector(arg1);
	          } else {
	            // text node
	            node.set_children(arg1);
	          }
	          break;
	
	        case 'number':
	          node.set_children(arg1);
	          break;
	
	        case 'object':
	          if (Array.isArray(arg1) || arg1 instanceof Node || arg1 instanceof Thunk) {
	            // children
	            node.set_children(arg1);
	          } else {
	            // properties
	            node.set_properties(arg1);
	          }
	          break;
	
	        default:
	          throw ['bad argument at index 1 to e()', args];
	          break;
	      }
	
	      break;
	
	    case 3:
	      // three args, first the tag, second a selector or properties, third children or properties
	      // eg. e('div', '#main', [ e('p', 'Hello') ])
	      // or e('div', { id: 'main' }, [])
	      node.tag = args[0];
	
	      arg1 = args[1];
	      switch (typeof arg1 === 'undefined' ? 'undefined' : _typeof(arg1)) {
	        case 'string':
	          node.set_selector(arg1);
	          break;
	        case 'object':
	          node.set_properties(arg1);
	          break;
	        default:
	          throw ['bad argument at index 1 to e()', args];
	          break;
	      }
	
	      arg2 = args[2];
	      if ((typeof arg2 === 'undefined' ? 'undefined' : _typeof(arg2)) == 'object' && !Array.isArray(arg2) && !(arg2 instanceof Node) && !(arg2 instanceof Thunk)) {
	        node.set_properties(arg2);
	      } else {
	        node.set_children(arg2);
	      }
	
	      break;
	
	    case 4:
	      // four arguments. first tag, second selector, third properties, forth children
	      // eg e('div', '#main', { class: 'foo' }, [ e('div') ])
	      node.tag = args[0];
	      node.set_selector(args[1]);
	      node.set_properties(args[2]);
	      node.set_children(args[3]);
	
	      break;
	
	    default:
	      throw ['bad arguments to e()', args];
	      break;
	  }
	
	  return node;
	}
	
	// patch last_element to represent node attributes, with diffing last_node
	function patch(last_element, node, last_node) {
	  // thunk
	  var last_thunk = void 0;
	  if (last_node && last_node instanceof Thunk) {
	    last_thunk = last_node;
	    last_node = last_thunk.node;
	  }
	  var thunk = void 0;
	  if (node instanceof Thunk) {
	    thunk = node;
	    if (last_thunk && thunk.name == last_thunk.name && (0, _equality.equal)(thunk.args, last_thunk.args)) {
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
	  !last_node ||
	  // different tag, no way to patch
	  node.tag != last_node.tag
	  // hacks for input / button with checked / disabled changed
	  || node.tag == 'input' && node.attributes && last_node.attributes && node.attributes['checked'] != last_node.attributes['checked'] || node.tag == 'input' && node.attributes && last_node.attributes && node.attributes['disabled'] != last_node.attributes['disabled'] || node.tag == 'button' && node.attributes && last_node.attributes && node.attributes['disabled'] != last_node.attributes['disabled']) {
	    var element = node.toElement();
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
	    for (var key in node.style) {
	      if (node.style[key] != last_node.style[key]) {
	        last_element.style[key] = node.style[key];
	      }
	    }
	    // delete styles exist in old Node but not in new
	    for (var _key5 in last_node.style) {
	      if (!(_key5 in node.style)) {
	        last_element.style[_key5] = null;
	      }
	    }
	  } else if (node.style) {
	    // new Node only
	    for (var _key6 in node.style) {
	      last_element.style[_key6] = node.style[_key6];
	    }
	  } else if (last_node.style) {
	    // no style in new Node, delete all
	    for (var _key7 in last_node.style) {
	      last_element.style[_key7] = null;
	    }
	  }
	
	  // class
	  if (node.class != last_node.class) {
	    last_element.className = node.class;
	  }
	
	  // attributes
	  if (node.attributes && last_node.attributes) {
	    // update common attributes
	    for (var _key8 in node.attributes) {
	      if (node.attributes[_key8] != last_node.attributes[_key8]) {
	        var value = node.attributes[_key8];
	        if (value !== undefined && value !== null) {
	          last_element.setAttribute(_key8, value);
	        }
	      }
	    }
	    // delete non-exist attributes
	    for (var _key9 in last_node.attributes) {
	      if (!(_key9 in node.attributes)) {
	        last_element.removeAttribute(_key9);
	      }
	    }
	  } else if (node.attributes) {
	    // set new attributes only
	    for (var _key10 in node.attributes) {
	      var _value = node.attributes[_key10];
	      if (_value !== undefined && _value !== null) {
	        last_element.setAttribute(_key10, _value);
	      }
	    }
	  } else if (last_node.attributes) {
	    // no attributes in new Node, delete all
	    for (var _key11 in last_node.attributes) {
	      last_element.removeAttribute(_key11);
	    }
	  }
	
	  // events
	  // not implementing global event proxy
	  if (node.events && last_node.events) {
	    for (var _key12 in node.events) {
	      // set events, bind current node to callback function
	      // to enable referencing current node
	      element_set_listener(last_element, _key12, node.events[_key12].bind(node));
	    }
	    var serial = last_element.__element_serial;
	    for (var _key13 in element_events[serial]) {
	      if (!(_key13 in node.events)) {
	        element_events[serial][_key13] = false;
	      }
	    }
	  } else if (node.events) {
	    for (var _key14 in node.events) {
	      // set events, bind current node to callback function
	      element_set_listener(last_element, _key14, node.events[_key14].bind(node));
	    }
	  } else if (last_node.events) {
	    var _serial = last_element.__element_serial;
	    for (var _key15 in element_events[_serial]) {
	      element_events[_serial][_key15] = false;
	    }
	  }
	
	  // children
	  if (node.children && last_node.children) {
	    // patch common amount of children
	    var common_length = Math.min(node.children.length, last_node.children.length);
	    var child_elements = last_element.childNodes;
	    for (var i = 0; i < common_length; i++) {
	      // recursive patch
	      patch(child_elements[i], node.children[i], last_node.children[i]);
	    }
	    // insert new children
	    for (var _i = common_length, l = node.children.length; _i < l; _i++) {
	      last_element.appendChild(node.children[_i].toElement());
	    }
	    // delete
	    for (var _i2 = common_length, _l = last_node.children.length; _i2 < _l; _i2++) {
	      last_element.removeChild(last_element.childNodes[common_length]);
	    }
	  } else if (node.children) {
	    // insert only
	    for (var _i3 = 0, _l2 = node.children.length; _i3 < _l2; _i3++) {
	      last_element.appendChild(node.children[_i3].toElement());
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
	
	var Thunk = function () {
	  function Thunk() {
	    _classCallCheck(this, Thunk);
	
	    this.func = null;
	    this.args = null;
	    this.node = null;
	    this.element = null;
	    this.name = null;
	  }
	
	  _createClass(Thunk, [{
	    key: 'toElement',
	    value: function toElement() {
	      if (!this.element) {
	        this.element = this.getNode().toElement();
	      }
	      return this.element;
	    }
	  }, {
	    key: 'getNode',
	    value: function getNode() {
	      if (!this.node) {
	        this.node = this.func.apply(this, this.args);
	        if (!this.node) {
	          throw ['constructor of ' + (this.name || 'anonymous') + ' returned null value', this];
	        }
	      }
	      return this.node;
	    }
	  }]);

	  return Thunk;
	}();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.equal = equal;
	
	var _object = __webpack_require__(3);
	
	function equal(a, b) {
	  var type_a = typeof a === 'undefined' ? 'undefined' : _typeof(a);
	  var type_b = typeof b === 'undefined' ? 'undefined' : _typeof(b);
	  if (type_a !== type_b) {
	    return false;
	  }
	  if (type_a === 'undefined') {
	    return true;
	  } else if (type_a === 'object') {
	    // frozen objects, compare by reference
	    if ((0, _object.object_has_tag)(a, 'frozen') && (0, _object.object_has_tag)(b, 'frozen')) {
	      return a === b;
	    }
	    var keys_a = Object.keys(a);
	    var keys_b = Object.keys(b);
	    if (keys_a.length != keys_b.length) {
	      return false;
	    }
	    for (var key in a) {
	      if (!equal(a[key], b[key])) {
	        return false;
	      }
	    }
	    return true;
	  } else {
	    return a === b;
	  }
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.object_add_tag = object_add_tag;
	exports.object_has_tag = object_has_tag;
	function object_add_tag(obj, tag) {
	  Object.defineProperty(obj, '__tag_' + tag, {
	    __proto__: null,
	    value: true
	  });
	}
	
	function object_has_tag(obj, tag) {
	  return obj['__tag_' + tag] === true;
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.$any = exports.$filter = exports.$map = exports.$del_at = exports.$reduce = exports.$push = exports.$merge = exports.$dec = exports.$inc = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.copy_update = copy_update;
	exports.freeze_all = freeze_all;
	
	var _object = __webpack_require__(3);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	// operations 
	
	var $inc = exports.$inc = {
	  __is_op: true,
	  op: 'inc',
	  apply: function apply(obj) {
	    return (obj || 0) + 1;
	  }
	};
	
	var $dec = exports.$dec = {
	  __is_op: true,
	  op: 'dec',
	  apply: function apply(obj) {
	    return obj - 1;
	  }
	};
	
	var $merge = exports.$merge = function $merge(spec) {
	  return {
	    __is_op: true,
	    op: 'merge',
	    args: [spec],
	    apply: function apply(obj) {
	      if (Array.isArray(spec)) {
	        return copy_update.apply(undefined, [obj].concat(_toConsumableArray(spec)));
	      }
	      for (var key in spec) {
	        var o2 = spec[key];
	        if ((typeof o2 === 'undefined' ? 'undefined' : _typeof(o2)) == 'object' && !Array.isArray(o2) && !o2.__is_op) {
	          obj = copy_update(obj, key, $merge(o2));
	        } else {
	          obj = copy_update(obj, key, o2);
	        }
	      }
	      return obj;
	    }
	  };
	};
	
	var $push = exports.$push = function $push(elem) {
	  return {
	    __is_op: true,
	    op: 'push',
	    args: [elem],
	    apply: function apply(obj) {
	      var o2 = [];
	      o2.push.apply(o2, _toConsumableArray(obj));
	      o2.push(elem);
	      return o2;
	    }
	  };
	};
	
	var $reduce = exports.$reduce = function $reduce(fn, accumulated) {
	  var what = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'reduce';
	  return {
	    __is_op: true,
	    op: what,
	    args: [fn, accumulated],
	    apply: function apply(obj) {
	      for (var key in obj) {
	        accumulated = fn(accumulated, obj[key], key);
	      }
	      return accumulated;
	    }
	  };
	};
	
	var $del_at = exports.$del_at = function $del_at(i) {
	  return $reduce(function (acc, cur, index) {
	    if (index != i) {
	      acc.push(cur);
	    }
	    return acc;
	  }, [], 'del_at');
	};
	
	var $map = exports.$map = function $map(fn) {
	  return $reduce(function (acc, cur, index) {
	    acc.push(fn(cur));
	    return acc;
	  }, [], 'map');
	};
	
	var $filter = exports.$filter = function $filter(fn) {
	  return {
	    __is_op: true,
	    op: 'filter',
	    args: [fn],
	    apply: function apply(obj) {
	      if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) == 'object') {
	        if (Array.isArray(obj)) {
	          var o2 = [];
	          for (var i = 0; i < obj.length; i++) {
	            if (fn(obj[i], i)) {
	              o2.push(obj[i]);
	            }
	          }
	          return o2;
	        } else {
	          var _o = {};
	          for (var k in obj) {
	            if (fn(obj[k], k)) {
	              _o[k] = obj[k];
	            }
	          }
	          return _o;
	        }
	      } else {
	        return fn(obj);
	      }
	    }
	  };
	};
	
	// predictions
	
	var $any = exports.$any = { __predict_any: true };
	
	// path-copying update
	
	function copy_update(obj) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }
	
	  if (args.length == 0) {
	    // no update
	    return obj;
	  } else if (args.length == 1) {
	    // single op
	    if (args[0].__is_op) {
	      return freeze_all(args[0].apply(obj));
	    } else {
	      return freeze_all(args[0]);
	    }
	  } else {
	    if (Array.isArray(obj)) {
	      // copy update array
	      var index = args[0];
	      var new_obj = [];
	      var all_frozen = true;
	      if (index === $any) {
	        // update all indexes
	        for (var i = 0; i < obj.length; i++) {
	          new_obj.push(copy_update.apply(undefined, [obj[i]].concat(_toConsumableArray(args.slice(1)))));
	          if (_typeof(new_obj[i]) === 'object' && !(0, _object.object_has_tag)(new_obj[i], 'frozen')) {
	            all_frozen = false;
	          }
	        }
	      } else {
	        // only one index
	        for (var _i = 0; _i < obj.length; _i++) {
	          if (_i == index) {
	            new_obj.push(copy_update.apply(undefined, [obj[_i]].concat(_toConsumableArray(args.slice(1)))));
	          } else {
	            new_obj.push(obj[_i]);
	          }
	          if (_typeof(new_obj[_i]) === 'object' && !(0, _object.object_has_tag)(new_obj[_i], 'frozen')) {
	            all_frozen = false;
	          }
	        }
	      }
	      if (all_frozen) {
	        (0, _object.object_add_tag)(new_obj, 'frozen');
	        Object.freeze(new_obj);
	      }
	      return new_obj;
	    } else {
	      // copy update object
	      var key = args[0];
	      var _new_obj = {};
	      var _all_frozen = true;
	      if (key === $any) {
	        // update all keys
	        for (var k in obj) {
	          _new_obj[k] = copy_update.apply(undefined, [obj[k]].concat(_toConsumableArray(args.slice(1))));
	          if (_typeof(_new_obj[k]) === 'object' && !(0, _object.object_has_tag)(_new_obj[k], 'frozen')) {
	            _all_frozen = false;
	          }
	        }
	      } else {
	        // update single key
	        var key_updated = false;
	        for (var _k in obj) {
	          if (_k == key) {
	            _new_obj[_k] = copy_update.apply(undefined, [obj[_k]].concat(_toConsumableArray(args.slice(1))));
	            key_updated = true;
	          } else {
	            var desc = Object.getOwnPropertyDescriptor(obj, _k);
	            var getter = desc.get;
	            var setter = desc.set;
	            if (getter || setter) {
	              Object.defineProperty(_new_obj, _k, {
	                get: getter,
	                set: setter,
	                enumerable: true
	              });
	            } else {
	              _new_obj[_k] = obj[_k];
	            }
	          }
	          if (_typeof(_new_obj[_k]) === 'object' && !(0, _object.object_has_tag)(_new_obj[_k], 'frozen')) {
	            _all_frozen = false;
	          }
	        }
	        if (!key_updated) {
	          // insert
	          _new_obj[key] = copy_update.apply(undefined, [undefined].concat(_toConsumableArray(args.slice(1))));
	          if (_typeof(_new_obj[key]) === 'object' && !(0, _object.object_has_tag)(_new_obj[key], 'frozen')) {
	            _all_frozen = false;
	          }
	        }
	      }
	      if (_all_frozen) {
	        (0, _object.object_add_tag)(_new_obj, 'frozen');
	        Object.freeze(_new_obj);
	      }
	      return _new_obj;
	    }
	  }
	}
	
	function freeze_all(obj) {
	  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || (0, _object.object_has_tag)(obj, 'frozen')) {
	    return obj;
	  }
	  for (var k in obj) {
	    if (_typeof(obj[k]) == 'object') {
	      freeze_all(obj[k]);
	    }
	  }
	  (0, _object.object_add_tag)(obj, 'frozen');
	  Object.freeze(obj);
	  return obj;
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _dom = __webpack_require__(1);
	
	var helpers = ['a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b', 'base', 'basefont', 'bdi', 'bdo', 'bgsound', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'command', 'content', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset', 'head', 'header', 'hgroup', 'hr', 'html', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'i', 'iframe', 'image', 'img', 'input', 'ins', 'isindex', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'listing', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'multicol', 'nav', 'nobr', 'noembed', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'plaintext', 'pre', 'progress', 'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr', 'xmp'].reduce(function (helpers, tag) {
	  helpers[tag] = function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _dom.e.apply(undefined, [tag].concat(args));
	  };
	  helpers[tag.charAt(0).toUpperCase() + tag.slice(1)] = helpers[tag];
	  helpers[tag.toUpperCase()] = helpers[tag];
	  return helpers;
	}, {});
	
	module.exports = _extends({}, helpers, {
	
	  none: (0, _dom.e)('div', {
	    style: {
	      display: 'none'
	    }
	  }),
	
	  clear: (0, _dom.e)('div', {
	    style: {
	      clear: 'both'
	    }
	  })
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.App = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.make_app = make_app;
	
	var _state = __webpack_require__(4);
	
	var _dom = __webpack_require__(1);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var App = exports.App = function () {
	  function App(element, node_func) {
	    var init_state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	    _classCallCheck(this, App);
	
	    this.element = element;
	    this.node_func = node_func;
	    this.state = init_state;
	    (0, _state.freeze_all)(this.state);
	    this.node = null;
	    this.patching = false;
	    this.updated = false;
	    this.update('__start', true);
	  }
	
	  _createClass(App, [{
	    key: 'beforeUpdate',
	    value: function beforeUpdate() {}
	  }, {
	    key: 'afterUpdate',
	    value: function afterUpdate() {}
	  }, {
	    key: 'update',
	    value: function update() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      this.beforeUpdate.apply(this, [this.state].concat(args));
	      this.state = _state.copy_update.apply(undefined, [this.state].concat(args));
	      this.afterUpdate.apply(this, [this.state].concat(args));
	      if (!this.patching) {
	        this.patching = true;
	        this.updated = false;
	
	        var _patch = (0, _dom.patch)(this.element, this.node_func(this.state, this.update), this.node);
	
	        var _patch2 = _slicedToArray(_patch, 2);
	
	        this.element = _patch2[0];
	        this.node = _patch2[1];
	
	        while (this.updated) {
	          // if state is updated when patching, patch again
	          this.updated = false;
	
	          var _patch3 = (0, _dom.patch)(this.element, this.node_func(this.state, this.update), this.node);
	
	          var _patch4 = _slicedToArray(_patch3, 2);
	
	          this.element = _patch4[0];
	          this.node = _patch4[1];
	        }
	        this.patching = false;
	      } else {
	        // state updated when patching
	        this.updated = true;
	      }
	      return this.state;
	    }
	  }, {
	    key: 'tap',
	    value: function tap(fn) {
	      var res = fn(this.state);
	      if (res) {
	        this.update.apply(this, _toConsumableArray(Array.isArray(res) ? res : [res]));
	      }
	    }
	  }, {
	    key: 'html',
	    value: function html() {
	      return this.element.innerHTML;
	    }
	  }]);
	
	  return App;
	}();
	
	function make_app(element, node_func, init_state) {
	  return new App(element, node_func, init_state);
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=affjs.js.map
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
	
	var _state = __webpack_require__(3);
	
	var state = _interopRequireWildcard(_state);
	
	var _tags = __webpack_require__(4);
	
	var tags = _interopRequireWildcard(_tags);
	
	var _app = __webpack_require__(2);
	
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
	exports.setBeforeThunkCallFunc = exports.setAfterThunkCallFunc = exports.e = exports.t = undefined;
	
	var _app = __webpack_require__(2);
	
	var t = exports.t = _app.t;
	var e = exports.e = _app.e;
	var setAfterThunkCallFunc = exports.setAfterThunkCallFunc = _app.setAfterThunkCallFunc;
	var setBeforeThunkCallFunc = exports.setBeforeThunkCallFunc = _app.setBeforeThunkCallFunc;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.setAfterThunkCallFunc = exports.setBeforeThunkCallFunc = exports.App = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.t = t;
	exports.e = e;
	exports.equal = equal;
	
	var _state = __webpack_require__(3);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var App = exports.App = function () {
	  function App() {
	    _classCallCheck(this, App);
	
	    this.node = null;
	    this.patching = false;
	    this.patch_tick = 1;
	    this.dirty_tree = {};
	    this.next_dirty_tree = {};
	    this.updated = false;
	    this.update_count = 0;
	    this.init.apply(this, arguments);
	  }
	
	  _createClass(App, [{
	    key: 'init',
	    value: function init() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      for (var i = 0; i < args.length; i++) {
	        var arg = args[i];
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
	  }, {
	    key: 'beforeUpdate',
	    value: function beforeUpdate() {}
	  }, {
	    key: 'afterUpdate',
	    value: function afterUpdate() {}
	  }, {
	    key: 'update',
	    value: function update() {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }
	
	      this.beforeUpdate.apply(this, [this.state].concat(args));
	      this.state = this.update_state.apply(this, [this.next_dirty_tree, this.state].concat(args));
	      this.afterUpdate.apply(this, [this.state].concat(args));
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
	
	        var _patch = this.patch(this.element, this.node_func(this.state), this.node);
	
	        var _patch2 = _slicedToArray(_patch, 2);
	
	        this.element = _patch2[0];
	        this.node = _patch2[1];
	
	        while (this.updated) {
	          if (this.update_count > 4096) {
	            // infinite loop
	            throw ['infinite loop in updating', args];
	          }
	          // if state is updated when patching, patch again
	          this.updated = false;
	          this.patch_tick++;
	          this.dirty_tree = this.next_dirty_tree;
	          this.next_dirty_tree = {};
	
	          var _patch3 = this.patch(this.element, this.node_func(this.state), this.node);
	
	          var _patch4 = _slicedToArray(_patch3, 2);
	
	          this.element = _patch4[0];
	          this.node = _patch4[1];
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
	  }, {
	    key: 'get',
	    value: function get() {
	      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }
	
	      var path = args;
	      if (path.length == 1 && Array.isArray(path[0])) {
	        path = path[0];
	      }
	      var obj = this.state;
	      for (var i = 0; i < path.length; i++) {
	        obj = obj[path[i]];
	      }
	      return obj;
	    }
	  }, {
	    key: 'path',
	    value: function path() {
	      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	        args[_key4] = arguments[_key4];
	      }
	
	      var path = args;
	      if (path.length == 1 && Array.isArray(path[0])) {
	        path = path[0];
	      }
	      return new Path(this, path);
	    }
	  }, {
	    key: 'update_state',
	    value: function update_state(dirty_tree, obj) {
	      for (var _len5 = arguments.length, args = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
	        args[_key5 - 2] = arguments[_key5];
	      }
	
	      if (args.length === 0) {
	        return obj;
	      } else if (args.length === 1) {
	        var ret = void 0;
	        if (_typeof(args[0]) === 'object' && args[0].__is_op) {
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
	        if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
	          if (!obj.hasOwnProperty('__aff_tick')) {
	            this.setup_state_object(obj);
	          }
	          var key = args[0];
	          for (var k in obj) {
	            if (k == key || key === _state.$any) {
	              if (!dirty_tree[k]) {
	                dirty_tree[k] = {};
	              }
	              obj[k] = this.update_state.apply(this, [dirty_tree[k], obj[k]].concat(_toConsumableArray(args.slice(1))));
	            }
	          }
	          if (key !== _state.$any && !(key in obj)) {
	            if (!dirty_tree[key]) {
	              dirty_tree[key] = {};
	            }
	            obj[key] = this.update_state.apply(this, [dirty_tree[key], undefined].concat(_toConsumableArray(args.slice(1))));
	          }
	          obj.__aff_tick = this.patch_tick + 1;
	          return obj;
	        } else {
	          throw ['bad update path', obj, args];
	        }
	      }
	    }
	  }, {
	    key: 'setup_state_object',
	    value: function setup_state_object(obj) {
	      if (obj.hasOwnProperty('__aff_tick')) {
	        obj.__aff_tick = this.patch_tick + 1;
	        return;
	      }
	      Object.defineProperty(obj, '__aff_tick', {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: this.patch_tick + 1
	      });
	    }
	
	    // patch last_element to represent node attributes, with diffing last_node
	
	  }, {
	    key: 'patch',
	    value: function patch(last_element, node, last_node) {
	      // thunk
	      var last_thunk = void 0;
	      if (last_node && last_node instanceof Thunk) {
	        last_thunk = last_node;
	        last_node = last_thunk.node;
	      }
	      var thunk = void 0;
	      if (node instanceof Thunk) {
	        thunk = node;
	      }
	
	      var should_update = false;
	      if (!thunk || !last_thunk) {
	        should_update = true;
	      } else if (thunk.name != last_thunk.name) {
	        should_update = true;
	      } else if (thunk.args.length != last_thunk.args.length) {
	        should_update = true;
	      } else {
	        for (var i = 0; i < thunk.args.length; i++) {
	          var arg = thunk.args[i];
	          var last_arg = last_thunk.args[i];
	          if (arg instanceof Path) {
	            var path_index = 0;
	            var obj = this.dirty_tree;
	            while (path_index < arg.path.length && obj && obj[arg.path[path_index]]) {
	              obj = obj[arg.path[path_index]];
	              path_index++;
	            }
	            if (path_index == arg.path.length) {
	              // dirty
	              should_update = true;
	              break;
	            }
	          } else if (arg === last_arg && (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg.__aff_tick === this.patch_tick) {
	            should_update = true;
	            break;
	          } else if (!equal(arg, last_arg)) {
	            should_update = true;
	            break;
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
	      !last_node ||
	      // different tag, no way to patch
	      node.tag != last_node.tag
	      // hacks for input / button with checked / disabled changed
	      || node.tag == 'input' && node.attributes && last_node.attributes && node.attributes['checked'] != last_node.attributes['checked'] || node.tag == 'input' && node.attributes && last_node.attributes && node.attributes['disabled'] != last_node.attributes['disabled'] || node.tag == 'button' && node.attributes && last_node.attributes && node.attributes['disabled'] != last_node.attributes['disabled']) {
	        var element = void 0;
	        if (!node || !node.toElement) {
	          element = warning('RENDER ERROR: cannot render ' + node).toElement();
	          console.warn('cannot render', node);
	        } else {
	          element = node.toElement();
	        }
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
	      var style_type = _typeof(node.style);
	      var last_style_type = _typeof(last_node.style);
	      if (style_type != last_style_type || style_type == 'string') {
	        // not diffable
	        if (style_type == 'object') {
	          // remove all existing style
	          last_element.style = null;
	          // reset
	          for (var key in node.style) {
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
	          for (var _key6 in node.style) {
	            if (node.style[_key6] != last_node.style[_key6]) {
	              last_element.style[_key6] = node.style[_key6];
	            }
	          }
	          // delete styles exist in old Node but not in new
	          if (_typeof(last_node.style) === 'object') {
	            for (var _key7 in last_node.style) {
	              if (!(_key7 in node.style)) {
	                last_element.style[_key7] = '';
	              }
	            }
	          }
	        } else if (node.style) {
	          // new Node only
	          for (var _key8 in node.style) {
	            last_element.style[_key8] = node.style[_key8];
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
	        for (var _key9 in node.attributes) {
	          if (node.attributes[_key9] != last_node.attributes[_key9]) {
	            var value = node.attributes[_key9];
	            var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	            if (valueType == 'string' || valueType == 'number') {
	              last_element.setAttribute(_key9, value);
	            } else if (valueType == 'boolean') {
	              if (value) {
	                last_element.setAttribute(_key9, true);
	              } else {
	                last_element.removeAttribute(_key9);
	              }
	            }
	          }
	        }
	        // delete non-exist attributes
	        for (var _key10 in last_node.attributes) {
	          if (!(_key10 in node.attributes)) {
	            last_element.removeAttribute(_key10);
	          }
	        }
	      } else if (node.attributes) {
	        // set new attributes only
	        for (var _key11 in node.attributes) {
	          var _value = node.attributes[_key11];
	          var _valueType = typeof _value === 'undefined' ? 'undefined' : _typeof(_value);
	          if (_valueType == 'string' || _valueType == 'number') {
	            last_element.setAttribute(_key11, _value);
	          } else if (_valueType == 'boolean') {
	            if (_value) {
	              last_element.setAttribute(_key11, true);
	            } else {
	              last_element.removeAttribute(_key11);
	            }
	          }
	        }
	      } else if (last_node.attributes) {
	        // no attributes in new Node, delete all
	        for (var _key12 in last_node.attributes) {
	          last_element.removeAttribute(_key12);
	        }
	      }
	
	      // events
	      // not implementing global event proxy
	      if (node.events && last_node.events) {
	        for (var _key13 in node.events) {
	          // set events, bind current node to callback function
	          // to enable referencing current node
	          element_set_listener(last_element, _key13, node.events[_key13].bind(node));
	        }
	        var serial = last_element.__element_serial;
	        for (var _key14 in element_events[serial]) {
	          if (!(_key14 in node.events)) {
	            element_events[serial][_key14] = false;
	          }
	        }
	      } else if (node.events) {
	        for (var _key15 in node.events) {
	          // set events, bind current node to callback function
	          element_set_listener(last_element, _key15, node.events[_key15].bind(node));
	        }
	      } else if (last_node.events) {
	        var _serial = last_element.__element_serial;
	        for (var _key16 in element_events[_serial]) {
	          element_events[_serial][_key16] = false;
	        }
	      }
	
	      // children
	      if (node.children && last_node.children) {
	        // patch common amount of children
	        var common_length = Math.min(node.children.length, last_node.children.length);
	        var child_elements = last_element.childNodes;
	        for (var _i = 0; _i < common_length; _i++) {
	          // recursive patch
	          this.patch(child_elements[_i], node.children[_i], last_node.children[_i]);
	        }
	        // insert new children
	        for (var _i2 = common_length, l = node.children.length; _i2 < l; _i2++) {
	          if (!node.children[_i2] || !node.children[_i2].toElement) {
	            last_element.appendChild(warning('RENDER ERROR: cannot render ' + node.children[_i2]).toElement());
	            console.warn('cannot render', node.children[_i2]);
	          } else {
	            last_element.appendChild(node.children[_i2].toElement());
	          }
	        }
	        // delete
	        for (var _i3 = common_length, _l = last_node.children.length; _i3 < _l; _i3++) {
	          last_element.removeChild(last_element.childNodes[common_length]);
	        }
	      } else if (node.children) {
	        // insert only
	        for (var _i4 = 0, _l2 = node.children.length; _i4 < _l2; _i4++) {
	          if (!node.children[_i4] || !node.children[_i4].toElement) {
	            last_element.appendChild(warning('RENDER ERROR: cannot render ' + node.children[_i4]).toElement());
	            console.warn('cannot render', node.children[_i4]);
	          } else {
	            last_element.appendChild(node.children[_i4].toElement());
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
	        node.hooks.patched.forEach(function (fn) {
	          return fn(last_element);
	        });
	      }
	
	      return [last_element, node];
	    }
	  }]);
	
	  return App;
	}();
	
	var Path = function () {
	  function Path(app, path) {
	    _classCallCheck(this, Path);
	
	    this.app = app;
	    this.path = path;
	  }
	
	  _createClass(Path, [{
	    key: 'get',
	    value: function get() {
	      return this.app.get(this.path);
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      var _app;
	
	      for (var _len6 = arguments.length, args = Array(_len6), _key17 = 0; _key17 < _len6; _key17++) {
	        args[_key17] = arguments[_key17];
	      }
	
	      return (_app = this.app).update.apply(_app, _toConsumableArray(this.path).concat(args));
	    }
	  }, {
	    key: 'sub',
	    value: function sub() {
	      for (var _len7 = arguments.length, args = Array(_len7), _key18 = 0; _key18 < _len7; _key18++) {
	        args[_key18] = arguments[_key18];
	      }
	
	      var subpath = args;
	      if (subpath.length == 1 && Array.isArray(subpath[0])) {
	        subpath = subpath[0];
	      }
	      return new Path(this.app, [].concat(_toConsumableArray(this.path), _toConsumableArray(subpath)));
	    }
	  }]);
	
	  return Path;
	}();
	
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
	        var node = this.getNode();
	        if (!node || !node.toElement) {
	          this.element = warning('RENDER ERROR: cannot render ' + node).toElement();
	          console.warn('cannot render', node);
	        } else {
	          this.element = node.toElement(this.name);
	        }
	      }
	      return this.element;
	    }
	  }, {
	    key: 'getNode',
	    value: function getNode() {
	      if (!this.node) {
	        beforeThunkCallFunc(this);
	        this.node = this.func.apply(this, this.args);
	        afterThunkCallFunc(this);
	        if (!this.node) {
	          throw ['constructor of ' + (this.name || 'anonymous') + ' returned null value', this];
	        }
	      }
	      return this.node;
	    }
	  }]);
	
	  return Thunk;
	}();
	
	// thunk helper
	
	
	function t() {
	  for (var _len8 = arguments.length, args = Array(_len8), _key19 = 0; _key19 < _len8; _key19++) {
	    args[_key19] = arguments[_key19];
	  }
	
	  if (args.length == 0) {
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
	  for (var _len9 = arguments.length, args = Array(_len9), _key20 = 0; _key20 < _len9; _key20++) {
	    args[_key20] = arguments[_key20];
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
	  }
	
	  return node;
	}
	
	var beforeThunkCallFunc = function beforeThunkCallFunc(thunk) {};
	var afterThunkCallFunc = function afterThunkCallFunc(thunk) {};
	var setBeforeThunkCallFunc = exports.setBeforeThunkCallFunc = function setBeforeThunkCallFunc(fn) {
	  beforeThunkCallFunc = fn;
	};
	var setAfterThunkCallFunc = exports.setAfterThunkCallFunc = function setAfterThunkCallFunc(fn) {
	  afterThunkCallFunc = fn;
	};
	
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
	    this.hooks = null;
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
	    value: function toElement(name) {
	      var element = void 0;
	      if (this.text !== null) {
	        element = document.createTextNode(this.text);
	      } else {
	        element = document.createElement(this.tag);
	        element.setAttribute('aff-serial', element_serial);
	        if (name) {
	          element.setAttribute('aff-name', name);
	        }
	        element_serial++;
	      }
	      if (this.innerHTML !== null) {
	        element.innerHTML = this.innerHTML;
	      }
	      if (this.id !== null) {
	        element.id = this.id;
	      }
	      if (this.style !== null) {
	        if (_typeof(this.style) == 'object') {
	          for (var key in this.style) {
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
	        for (var i = 0, l = this.children.length; i < l; i++) {
	          if (!this.children[i] || !this.children[i].toElement) {
	            element.appendChild(warning('RENDER ERROR: cannot render ' + this.children[i]).toElement());
	            console.warn('cannot render', this.children[i]);
	          } else {
	            element.appendChild(this.children[i].toElement());
	          }
	        }
	      }
	      if (this.attributes !== null) {
	        for (var _key21 in this.attributes) {
	          var value = this.attributes[_key21];
	          var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	          if (valueType == 'string' || valueType == 'number') {
	            element.setAttribute(_key21, value);
	          } else if (valueType == 'boolean') {
	            if (value) {
	              element.setAttribute(_key21, true);
	            } else {
	              element.removeAttribute(_key21);
	            }
	          }
	        }
	      }
	      if (this.events !== null) {
	        for (var _key22 in this.events) {
	          // set event callback, bind current Node to callback
	          // constructor must not be arrow function to get proper 'this'
	          element_set_listener(element, _key22, this.events[_key22].bind(this));
	        }
	      }
	      this.element = element;
	      if (this.hooks && this.hooks.created) {
	        this.hooks.created.forEach(function (fn) {
	          return fn(element);
	        });
	      }
	      return element;
	    }
	  }]);
	
	  return Node;
	}();
	
	var warning = function warning(text) {
	  return e('div', {
	    style: {
	      backgroundColor: 'yellow',
	      color: 'red',
	      fontWeight: 'bold'
	    }
	  }, text);
	};
	
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
	
	function equal(a, b) {
	  if (a === b) {
	    return true;
	  }
	  var type_a = typeof a === 'undefined' ? 'undefined' : _typeof(a);
	  var type_b = typeof b === 'undefined' ? 'undefined' : _typeof(b);
	  if (type_a !== type_b) {
	    return false;
	  }
	  if (type_a === 'object') {
	    if (a instanceof Path && b instanceof Path) {
	      return equal(a.get(), b.get());
	    }
	    // deep compare
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
	  } else if (type_a === 'function') {
	    return a.name === b.name;
	  }
	  return false;
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.pick = pick;
	
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
	    apply: function apply(obj, app) {
	      if (Array.isArray(spec)) {
	        return app.update_state.apply(app, [app.dirty_tree, obj].concat(_toConsumableArray(spec)));
	      }
	      for (var key in spec) {
	        var o2 = spec[key];
	        if ((typeof o2 === 'undefined' ? 'undefined' : _typeof(o2)) == 'object' && !Array.isArray(o2) && !o2.__is_op) {
	          obj = app.update_state(app.dirty_tree, obj, key, $merge(o2));
	        } else {
	          obj = app.update_state(app.dirty_tree, obj, key, o2);
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
	      obj.push(elem);
	      return obj;
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
	            if (fn(obj[k], k) === true) {
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
	
	// utils
	
	function pick(obj) {
	  for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    keys[_key - 1] = arguments[_key];
	  }
	
	  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
	    if (Array.isArray(obj)) {
	      var new_obj = [];
	      for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        if (obj[key] !== undefined) {
	          new_obj.push(obj[key]);
	        }
	      }
	      return new_obj;
	    } else {
	      var _new_obj = {};
	      for (var _i = 0; _i < keys.length; _i++) {
	        var _key2 = keys[_i];
	        if (obj[_key2] !== undefined) {
	          _new_obj[_key2] = obj[_key2];
	        }
	      }
	      return _new_obj;
	    }
	  } else {
	    throw ['not pickable', obj, keys];
	  }
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _app = __webpack_require__(2);
	
	var helpers = ['a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b', 'base', 'basefont', 'bdi', 'bdo', 'bgsound', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'command', 'content', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset', 'head', 'header', 'hgroup', 'hr', 'html', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'i', 'iframe', 'image', 'img', 'input', 'ins', 'isindex', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'listing', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'multicol', 'nav', 'nobr', 'noembed', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'plaintext', 'pre', 'progress', 'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr', 'xmp'].reduce(function (helpers, tag) {
	  helpers[tag] = function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _app.e.apply(undefined, [tag].concat(args));
	  };
	  helpers[tag.charAt(0).toUpperCase() + tag.slice(1)] = helpers[tag];
	  helpers[tag.toUpperCase()] = helpers[tag];
	  return helpers;
	}, {});
	
	module.exports = _extends({}, helpers, {
	
	  none: (0, _app.e)('div', {
	    style: {
	      display: 'none'
	    }
	  }),
	
	  clear: (0, _app.e)('div', {
	    style: {
	      clear: 'both'
	    }
	  })
	});

/***/ }
/******/ ])
});
;
//# sourceMappingURL=affjs.js.map
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
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _app = __webpack_require__(1);
	
	Object.keys(_app).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _app[key];
	    }
	  });
	});
	
	var _operations = __webpack_require__(7);
	
	Object.keys(_operations).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _operations[key];
	    }
	  });
	});
	
	var _tags = __webpack_require__(8);
	
	Object.keys(_tags).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _tags[key];
	    }
	  });
	});
	
	var _tagged = __webpack_require__(3);
	
	Object.keys(_tagged).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _tagged[key];
	    }
	  });
	});
	
	var _event = __webpack_require__(4);
	
	Object.keys(_event).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _event[key];
	    }
	  });
	});
	
	var _mutable_state = __webpack_require__(5);
	
	Object.keys(_mutable_state).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _mutable_state[key];
	    }
	  });
	});
	
	var _state = __webpack_require__(6);
	
	Object.keys(_state).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _state[key];
	    }
	  });
	});
	
	var _bind = __webpack_require__(9);
	
	Object.keys(_bind).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _bind[key];
	    }
	  });
	});
	
	var _debug = __webpack_require__(10);
	
	Object.keys(_debug).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _debug[key];
	    }
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.setAfterThunkCallFunc = exports.setBeforeThunkCallFunc = exports.App = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.t = t;
	exports.e = e;
	
	var _all_tags = __webpack_require__(2);
	
	var _tagged = __webpack_require__(3);
	
	var _event = __webpack_require__(4);
	
	var _mutable_state = __webpack_require__(5);
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var App = exports.App = function () {
	  function App() {
	    _classCallCheck(this, App);
	
	    this.node = null;
	    this.patching = false;
	    this.updated = false;
	    this.update_count = 0;
	    this.element_cache = {};
	    for (var i = 0; i < _all_tags.all_tags.length; i++) {
	      this.element_cache[_all_tags.all_tags[i]] = [];
	    }
	    this.events = {};
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
	        } else if (arg instanceof _event.Event) {
	          this.addEvent(arg);
	        } else if (typeof arg == 'function') {
	          this.node_func = arg;
	        } else {
	          this._state = new _mutable_state.MutableState(arg, this);
	          this.setupUses(this._state.get());
	        }
	      }
	      if (this.element !== undefined && this.node_func !== undefined && this._state !== undefined) {
	        this.update();
	      }
	    }
	  }, {
	    key: 'setupUses',
	    value: function setupUses(obj, path, scopes) {
	      // skip non-object
	      if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null || Array.isArray(obj)) {
	        return;
	      }
	
	      // default arguments
	      path = path || [];
	      scopes = scopes || [];
	
	      // parse $use
	      var useInfos = void 0;
	      if ('$use' in obj) {
	        var use = obj['$use'];
	        if ((typeof use === 'undefined' ? 'undefined' : _typeof(use)) === 'object' && use !== null) {
	          if (Array.isArray(use)) {
	            useInfos = {};
	            for (var i = 0; i < use.length; i++) {
	              var key = use[i];
	              if (key in obj) {
	                throw ['use key conflict', key];
	              }
	              useInfos[key] = key;
	            }
	          } else {
	            for (var _key2 in use) {
	              if (_key2 in obj) {
	                throw ['use key conflict', _key2];
	              }
	            }
	            useInfos = use;
	          }
	          delete obj['$use'];
	        } else {
	          throw ['bad use', use];
	        }
	      }
	
	      var app = this;
	      function set_user_getter(obj, key, from) {
	        var parentPathOfFrom = from.slice(0);
	        parentPathOfFrom.pop();
	        if (!(key in obj)) {
	          Object.defineProperty(obj, key, {
	            configurable: false,
	            enumerable: true,
	            get: function get() {
	              return app.get(from);
	            },
	            set: function set(v) {
	              app.update.apply(app, _toConsumableArray(from).concat([v]));
	            }
	          });
	        }
	        if (!obj.__aff_use_keys) {
	          Object.defineProperty(obj, '__aff_use_keys', {
	            configurable: false,
	            writable: true,
	            enumerable: false,
	            value: {}
	          });
	        }
	        obj.__aff_use_keys[key] = from;
	      }
	
	      // setup
	      for (var _key3 in useInfos) {
	        var name = useInfos[_key3];
	        // search in scopes
	        var found = false;
	        for (var _i = 0; _i < scopes.length; _i++) {
	          var _bindings = scopes[_i];
	          if (name in _bindings) {
	            // found
	            found = true;
	            var stop_path = _bindings[name].slice(0);
	            // check loop
	            var same_len = 0;
	            for (var idx = 0; idx < stop_path.length && idx < path.length; idx++) {
	              if (stop_path[idx] == path[idx]) {
	                same_len++;
	              } else {
	                break;
	              }
	            }
	            if (same_len == stop_path.length || same_len == path.length) {
	              throw ['loop in $use', path, stop_path];
	            }
	            stop_path.pop();
	            var stop_length = stop_path.length;
	            var setup_path = path.slice(0);
	            while (setup_path.length > stop_length) {
	              //console.log('get', setup_path, key, 'from', bindings[name]);
	              set_user_getter(this.get(setup_path), _key3, _bindings[name]);
	              setup_path.pop();
	            }
	          }
	        }
	        if (!found) {
	          throw ['no state named ' + name];
	        }
	      }
	
	      // collect bindings
	      var bindings = {};
	      for (var _key4 in obj) {
	        var p = path.slice(0);
	        p.push(_key4);
	        bindings[_key4] = p;
	      }
	      scopes = scopes.slice(0); // copy
	      scopes.push(bindings);
	
	      // recursively
	      for (var _key5 in obj) {
	        var _p = path.slice(0);
	        _p.push(_key5);
	        this.setupUses(obj[_key5], _p, scopes);
	      }
	    }
	  }, {
	    key: 'addEvent',
	    value: function addEvent(ev) {
	      var parts = ev.ev_type.split(/[$:]/);
	      var ev_type = parts[0];
	      var ev_subtype = parts.slice(1).join(':') || '__default';
	      if (!(ev_type in this.events)) {
	        this.events[ev_type] = {};
	      }
	      var events = this.events[ev_type];
	      events[ev_subtype] = ev.fn;
	    }
	  }, {
	    key: 'dispatchEvent',
	    value: function dispatchEvent(ev_type) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key6 = 1; _key6 < _len2; _key6++) {
	        args[_key6 - 1] = arguments[_key6];
	      }
	
	      for (var sub_type in this.events[ev_type]) {
	        this.events[ev_type][sub_type].apply(this, args);
	      }
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      for (var _len3 = arguments.length, args = Array(_len3), _key7 = 0; _key7 < _len3; _key7++) {
	        args[_key7] = arguments[_key7];
	      }
	
	      return this.updateMulti(args);
	    }
	  }, {
	    key: 'updateMulti',
	    value: function updateMulti() {
	      for (var _len4 = arguments.length, args = Array(_len4), _key8 = 0; _key8 < _len4; _key8++) {
	        args[_key8] = arguments[_key8];
	      }
	
	      for (var i = 0; i < args.length; i++) {
	        var _state;
	
	        var arg = args[i];
	        this.dispatchEvent.apply(this, ['before_update', this.state].concat(_toConsumableArray(arg)));
	        (_state = this._state).update.apply(_state, _toConsumableArray(arg));
	        this.dispatchEvent.apply(this, ['after_update', this.state].concat(_toConsumableArray(arg)));
	      }
	      if (!this.element) {
	        return this.state;
	      }
	      if (!this.patching) {
	        this.patching = true;
	        this.updated = false;
	        this.update_count = 0;
	        this._state.beforePatch();
	
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
	          this._state.beforePatch();
	
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
	    key: 'html',
	    value: function html() {
	      return this.element.innerHTML;
	    }
	  }, {
	    key: 'get',
	    value: function get() {
	      for (var _len5 = arguments.length, args = Array(_len5), _key9 = 0; _key9 < _len5; _key9++) {
	        args[_key9] = arguments[_key9];
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
	
	      if (thunk) {
	        var should_update = false;
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
	      !last_node ||
	      // no element
	      !last_element
	      // different tag, no way to patch
	      || node.tag != last_node.tag) {
	        var element = void 0;
	        if (!node || !node.toElement) {
	          element = warning('RENDER ERROR: cannot render ' + node).toElement();
	          console.warn('cannot render', node);
	        } else {
	          element = node.toElement(undefined, this);
	        }
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
	  }, {
	    key: 'patchNode',
	    value: function patchNode(last_element, node, last_node) {
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
	      // different type, no diff
	      if (style_type !== last_style_type) {
	        if (style_type === 'string') {
	          last_element.style = node.style;
	        } else if (style_type === 'object' && node.style !== null) {
	          last_element.style = undefined;
	          for (var key in node.style) {
	            last_element.style[key] = node.style[key];
	          }
	        }
	      }
	      // diff object
	      else if (style_type === 'object') {
	          if (node.style !== null) {
	            for (var _key10 in node.style) {
	              if (!last_node.style || node.style[_key10] != last_node.style[_key10]) {
	                last_element.style[_key10] = node.style[_key10];
	              }
	            }
	          }
	          if (last_node.style !== null) {
	            for (var _key11 in last_node.style) {
	              if (!node.style || !(_key11 in node.style)) {
	                last_element.style[_key11] = '';
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
	      for (var _key12 in node.classList) {
	        // should update
	        if (!last_node.classList || node.classList[_key12] != last_node.classList[_key12]) {
	          if (node.classList[_key12]) {
	            last_element.classList.add(_key12);
	          } else {
	            last_element.classList.remove(_key12);
	          }
	        }
	      }
	      for (var _key13 in last_node.classList) {
	        if (!node.classList || !(_key13 in node.classList)) {
	          last_element.classList.remove(_key13);
	        }
	      }
	
	      // attributes
	      for (var _key14 in node.attributes) {
	        if (!last_node.attributes || node.attributes[_key14] != last_node.attributes[_key14]) {
	          var value = node.attributes[_key14];
	          var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	          if (valueType == 'string' || valueType == 'number') {
	            last_element.setAttribute(_key14, value);
	            last_element[_key14] = value;
	          } else if (valueType == 'boolean') {
	            if (value) {
	              last_element.setAttribute(_key14, true);
	              last_element[_key14] = true;
	            } else {
	              last_element.removeAttribute(_key14);
	              last_element[_key14] = false;
	            }
	          }
	        }
	      }
	      for (var _key15 in last_node.attributes) {
	        if (!node.attributes || !(_key15 in node.attributes)) {
	          last_element.removeAttribute(_key15);
	          last_element[_key15] = undefined;
	        }
	      }
	
	      // events
	      var event_keys = {};
	      for (var _key16 in node.events) {
	        var k = elementSetEvent(last_element, _key16, node.events[_key16].bind(node));
	        event_keys[k] = true;
	      }
	      if (last_element.__aff_events) {
	        for (var ev_type in last_element.__aff_events) {
	          for (var ev_subtype in last_element.__aff_events[ev_type]) {
	            if (!(ev_type + ':' + ev_subtype in event_keys)) {
	              delete last_element.__aff_events[ev_type][ev_subtype];
	            }
	          }
	        }
	      }
	
	      // children
	      var child_elements = last_element.childNodes;
	      var child_len = node.children ? node.children.length : 0;
	      var last_child_len = last_node && last_node.children ? last_node.children.length : 0;
	      for (var i = 0; i < child_len; i++) {
	        var _patch5 = this.patch(child_elements[i], node.children[i], last_node && last_node.children ? last_node.children[i] : undefined),
	            _patch6 = _slicedToArray(_patch5, 2),
	            elem = _patch6[0],
	            _ = _patch6[1];
	
	        if (!child_elements[i]) {
	          last_element.appendChild(elem);
	        }
	      }
	      for (var _i2 = child_len; _i2 < last_child_len; _i2++) {
	        last_element.removeChild(last_element.childNodes[child_len]);
	      }
	
	      if (node.hooks && node.hooks.patched) {
	        node.hooks.patched.forEach(function (fn) {
	          return fn(last_element);
	        });
	      }
	
	      return [last_element, node];
	    }
	  }, {
	    key: 'state',
	    get: function get() {
	      return this._state.get();
	    }
	  }]);
	
	  return App;
	}();
	
	var Thunk = function () {
	  function Thunk() {
	    _classCallCheck(this, Thunk);
	
	    this.func = null;
	    this.args = null;
	    this.node = undefined;
	    this.element = null;
	    this.name = null;
	  }
	
	  _createClass(Thunk, [{
	    key: 'toElement',
	    value: function toElement(_name, app) {
	      if (!this.element) {
	        var node = this.getNode();
	        if (!node || !node.toElement) {
	          this.element = warning('RENDER ERROR: cannot render ' + node).toElement();
	          console.warn('cannot render', node);
	        } else {
	          this.element = node.toElement(this.name, app);
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
	        if (this.node === null) {
	          this.node = e('div', { style: { display: 'none' } });
	        }
	        if (!this.node) {
	          throw ['constructor of ' + (this.name || 'anonymous') + ' returned undefined value', this];
	        }
	      }
	      return this.node;
	    }
	  }]);
	
	  return Thunk;
	}();
	
	// thunk helper
	
	
	function t() {
	  for (var _len6 = arguments.length, args = Array(_len6), _key17 = 0; _key17 < _len6; _key17++) {
	    args[_key17] = arguments[_key17];
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
	  if (!thunk.func) {
	    throw ['invalid thunk func', thunk.func];
	  }
	  return thunk;
	}
	
	// element helper
	function e(tag) {
	  if (typeof tag !== 'string') {
	    throw ['bad tag name', tag];
	  }
	  var node = new Node();
	  node.tag = tag;
	
	  for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key18 = 1; _key18 < _len7; _key18++) {
	    args[_key18 - 1] = arguments[_key18];
	  }
	
	  for (var i = 0; i < args.length; i++) {
	    var arg = args[i];
	    if (arg instanceof Node || arg instanceof Thunk) {
	      node.setChildren(arg);
	    } else if (arg instanceof _tagged.Selector) {
	      node.setSelector(arg.str);
	    } else if (arg instanceof _tagged.Css) {
	      node.setProperties({
	        style: arg.str
	      });
	    } else if (arg instanceof _event.Event) {
	      node.setProperties(_defineProperty({}, 'on' + arg.ev_type, arg.fn));
	    } else if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null) {
	      if (Array.isArray(arg)) {
	        node.setChildren(arg);
	      } else {
	        node.setProperties(arg);
	      }
	    } else {
	      node.setChildren(arg);
	    }
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
	
	var Node = function () {
	  function Node() {
	    _classCallCheck(this, Node);
	
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
	
	  _createClass(Node, [{
	    key: 'setSelector',
	    value: function setSelector(selector) {
	      var parts = selector.match(/[.#][A-Za-z][A-Za-z0-9_:-]*/g);
	      if (parts) {
	        for (var i = 0, l = parts.length; i < l; i++) {
	          var part = parts[i];
	          if (part.charAt(0) == '#') {
	            this.id = part.substring(1);
	          } else if (part.charAt(0) == '.') {
	            this.classList = this.classList || {};
	            this.classList[part.substring(1)] = true;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'setProperties',
	    value: function setProperties(properties) {
	      for (var key in properties) {
	        if (key == 'id' || key == 'innerHTML') {
	          // id, innerHTML
	          this[key] = properties[key];
	        } else if (key == 'classList') {
	          this.classList = this.classList || {};
	          var property = properties.classList;
	          if (typeof property == 'string') {
	            var parts = property.match(/[A-Za-z][A-Za-z0-9_:-]*/g);
	            if (parts) {
	              for (var i = 0, l = parts.length; i < l; i++) {
	                var part = parts[i];
	                this.classList[part] = true;
	              }
	            }
	          } else if ((typeof property === 'undefined' ? 'undefined' : _typeof(property)) == 'object' && property !== null) {
	            if (Array.isArray(property)) {
	              for (var _i3 = 0; _i3 < property.length; _i3++) {
	                this.classList[property[_i3]] = true;
	              }
	            } else {
	              for (var k in property) {
	                this.classList[k] = property[k];
	              }
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
	          this.attributes = this.attributes || {};
	          this.attributes[key] = properties[key];
	        }
	      }
	    }
	  }, {
	    key: 'setChildren',
	    value: function setChildren(children) {
	      this.children = this.children || [];
	      var type = typeof children === 'undefined' ? 'undefined' : _typeof(children);
	      if (type === 'object' && children !== null) {
	        if (Array.isArray(children)) {
	          // flatten
	          for (var i = 0, l = children.length; i < l; i++) {
	            this.setChildren(children[i]);
	          }
	        } else {
	          this.children.push(children);
	        }
	      } else if (type === 'boolean' || type === 'number' || type === 'string' || type === 'symbol') {
	        var child = new Node();
	        child.text = children.toString();
	        this.children.push(child);
	      } else if (type === 'function') {
	        this.setChildren(children());
	      } else {
	        throw ['bad child', children];
	      }
	    }
	  }, {
	    key: 'toElement',
	    value: function toElement(name, app) {
	      var _this = this;
	
	      var element = void 0;
	      if (this.text !== null) {
	        element = document.createTextNode(this.text);
	      } else {
	        // use cached element
	        if (app && app.element_cache[this.tag] && app.element_cache[this.tag].length > 0) {
	          var _ret = function () {
	            var _app$element_cache$ta = app.element_cache[_this.tag].pop(),
	                _app$element_cache$ta2 = _slicedToArray(_app$element_cache$ta, 2),
	                element = _app$element_cache$ta2[0],
	                last_node = _app$element_cache$ta2[1];
	
	            var node = void 0;
	
	            var _app$patchNode = app.patchNode(element, _this, last_node);
	
	            var _app$patchNode2 = _slicedToArray(_app$patchNode, 2);
	
	            element = _app$patchNode2[0];
	            node = _app$patchNode2[1];
	
	            _this.element = element;
	            if (_this.hooks && _this.hooks.created) {
	              _this.hooks.created.forEach(function (fn) {
	                return fn(element);
	              });
	            }
	            return {
	              v: element
	            };
	          }();
	
	          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
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
	        if (_typeof(this.style) == 'object' && this.style !== null) {
	          for (var key in this.style) {
	            element.style[key] = this.style[key];
	          }
	        } else {
	          element.style = this.style;
	        }
	      }
	      if (this.classList !== null) {
	        var className = '';
	        for (var k in this.classList) {
	          if (this.classList[k]) {
	            className = className + k + ' ';
	          }
	        }
	        element.className = className.trim();
	      }
	      if (this.children !== null) {
	        var childFragment = document.createDocumentFragment();
	        for (var i = 0, l = this.children.length; i < l; i++) {
	          if (!this.children[i] || !this.children[i].toElement) {
	            childFragment.appendChild(warning('RENDER ERROR: cannot render ' + this.children[i]).toElement());
	            console.warn('cannot render', this.children[i]);
	          } else {
	            childFragment.appendChild(this.children[i].toElement(undefined, app));
	          }
	        }
	        element.appendChild(childFragment);
	      }
	      if (this.attributes !== null) {
	        for (var _key19 in this.attributes) {
	          var value = this.attributes[_key19];
	          var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	          if (valueType == 'string' || valueType == 'number') {
	            element.setAttribute(_key19, value);
	            element[_key19] = value;
	          } else if (valueType == 'boolean') {
	            if (value) {
	              element.setAttribute(_key19, true);
	              element[_key19] = true;
	            } else {
	              element.removeAttribute(_key19);
	              element[_key19] = false;
	            }
	          }
	        }
	      }
	      if (this.events !== null) {
	        for (var _key20 in this.events) {
	          // set event callback, bind current Node to callback
	          // constructor must not be arrow function to get proper 'this'
	          elementSetEvent(element, _key20, this.events[_key20].bind(this));
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
	
	function elementSetEvent(element, ev_type, fn) {
	  var events = element.__aff_events;
	  if (!events) {
	    events = {};
	    element.__aff_events = events;
	  }
	  var parts = ev_type.split(/[$:]/);
	  ev_type = parts[0];
	  var ev_subtype = parts.slice(1).join(':') || '__default';
	  if (!(ev_type in events)) {
	    events[ev_type] = {};
	    element.addEventListener(ev_type.substr(2), function (ev) {
	      var ret = void 0;
	      for (var _ev_subtype in events[ev_type]) {
	        ret = events[ev_type][_ev_subtype](ev);
	      }
	      return ret;
	    });
	  }
	  events[ev_type][ev_subtype] = fn;
	  return ev_type + ':' + ev_subtype;
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var all_tags = exports.all_tags = [
	
	// html
	'a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b', 'base', 'basefont', 'bdi', 'bdo', 'bgsound', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'command', 'content', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset', 'head', 'header', 'hgroup', 'hr', 'html', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'i', 'iframe', 'image', 'img', 'input', 'ins', 'isindex', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'listing', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'multicol', 'nav', 'nobr', 'noembed', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'plaintext', 'pre', 'progress', 'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr', 'xmp',
	
	// svg
	'a', 'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor', 'animateMotion', 'animateTransform', 'audio', 'canvas', 'circle', 'clipPath', 'color-profile', 'cursor', 'defs', 'desc', 'discard', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignObject', 'g', 'glyph', 'glyphRef', 'hatch', 'hatchpath', 'hkern', 'iframe', 'image', 'line', 'linearGradient', 'marker', 'mask', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'metadata', 'missing-glyph', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'script', 'set', 'solidcolor', 'stop', 'style', 'svg', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref', 'tspan', 'unknown', 'use', 'video', 'view', 'vkern'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Selector = Selector;
	exports.Css = Css;
	function Selector(str) {
	  this.str = str;
	}
	
	function Css(str) {
	  this.str = str;
	}
	
	function makeTagger(constructor) {
	  function tag(strings) {
	    var str = '';
	
	    for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      values[_key - 1] = arguments[_key];
	    }
	
	    for (var i = 0; i < strings.length; i++) {
	      str += strings[i];
	      if (values[i] !== undefined) {
	        str += values[i];
	      }
	    }
	    return new constructor(str);
	  }
	  return tag;
	}
	
	var $ = exports.$ = makeTagger(Selector);
	var css = exports.css = makeTagger(Css);

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Event = Event;
	exports.on = on;
	function Event(ev_type, fn) {
	  this.ev_type = ev_type;
	  this.fn = fn;
	}
	
	function on(ev_type, fn) {
	  return new Event(ev_type, fn);
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MutableState = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _state = __webpack_require__(6);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MutableState = exports.MutableState = function (_State) {
	  _inherits(MutableState, _State);
	
	  function MutableState(init_state, app) {
	    _classCallCheck(this, MutableState);
	
	    var _this = _possibleConstructorReturn(this, (MutableState.__proto__ || Object.getPrototypeOf(MutableState)).call(this));
	
	    _this.app = app;
	    _this.patch_tick = 1;
	    _this.state = init_state;
	    _this.setupState(_this.state, []);
	    return _this;
	  }
	
	  _createClass(MutableState, [{
	    key: 'get',
	    value: function get() {
	      return this.state;
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
	        arg[_key] = arguments[_key];
	      }
	
	      this.state = this.updateState.apply(this, [[], this.state].concat(arg));
	    }
	  }, {
	    key: 'updateState',
	    value: function updateState(base_path, obj) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }
	
	      if (args.length === 0) {
	        return obj;
	      } else if (args.length === 1) {
	        var ret = void 0;
	        if (_typeof(args[0]) === 'object' && args[0] !== null && args[0].__is_op) {
	          ret = args[0].apply(obj, this);
	          if (ret === obj) {
	            this.setupPatchTick(ret);
	          }
	        } else {
	          ret = args[0];
	        }
	        this.setupState(ret, base_path);
	        return ret;
	      } else {
	        if (!obj) {
	          obj = {};
	        }
	        if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null) {
	          if (!obj.hasOwnProperty('__aff_tick')) {
	            this.setupPatchTick(obj);
	          }
	          var key = args[0];
	          var key_type = typeof key === 'undefined' ? 'undefined' : _typeof(key);
	          for (var k in obj) {
	            if ((key_type === 'number' || key_type === 'string') && k == key) {
	              var path = base_path.slice(0);
	              path.push(k);
	              obj[k] = this.updateState.apply(this, [path, obj[k]].concat(_toConsumableArray(args.slice(1))));
	            } else if (key_type === 'function' && key(k)) {
	              var _path = base_path.slice(0);
	              _path.push(k);
	              obj[k] = this.updateState.apply(this, [_path, obj[k]].concat(_toConsumableArray(args.slice(1))));
	            }
	          }
	          if ((key_type === 'string' || key_type === 'number') && !(key in obj)) {
	            var _path2 = base_path.slice(0);
	            _path2.push(key);
	            obj[key] = this.updateState.apply(this, [_path2, undefined].concat(_toConsumableArray(args.slice(1))));
	          }
	          obj.__aff_tick = this.patch_tick + 1;
	          return obj;
	        } else {
	          throw ['bad update path', obj, args];
	        }
	      }
	    }
	  }, {
	    key: 'beforePatch',
	    value: function beforePatch() {
	      this.patch_tick++;
	    }
	  }, {
	    key: 'setupPatchTick',
	    value: function setupPatchTick(obj) {
	      if (obj.hasOwnProperty('__aff_tick')) {
	        obj.__aff_tick = this.patch_tick + 1;
	      } else {
	        Object.defineProperty(obj, '__aff_tick', {
	          configurable: false,
	          enumerable: false,
	          writable: true,
	          value: this.patch_tick + 1
	        });
	      }
	    }
	  }, {
	    key: 'argsChanged',
	    value: function argsChanged(arg, last_arg) {
	      var arg_type = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);
	      var last_arg_type = typeof last_arg === 'undefined' ? 'undefined' : _typeof(last_arg);
	
	      // different type
	      if (arg_type !== last_arg_type) {
	        return true;
	      }
	
	      // trigger update of used keys
	      if (arg === last_arg && (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg != null && arg.__aff_use_keys) {
	        for (var key in arg.__aff_use_keys) {
	          var fromPath = arg.__aff_use_keys[key].slice(0);
	          fromPath.pop();
	          var tick = this.app.get(fromPath).__aff_tick;
	          if (tick == this.patch_tick) {
	            arg.__aff_tick = tick;
	          }
	        }
	      }
	
	      // patch_tick
	      if (arg === last_arg && (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null && arg.__aff_tick === this.patch_tick) {
	        return true;
	      }
	
	      // array
	      else if (Array.isArray(arg) && Array.isArray(last_arg)) {
	          // different length
	          if (arg.length != last_arg.length) {
	            return true;
	          }
	          // check items
	          for (var i = 0; i < arg.length; i++) {
	            if (this.argsChanged(arg[i], last_arg[i])) {
	              return true;
	            }
	          }
	        }
	
	        // deep compare object
	        else if (arg_type === 'object') {
	            // different keys length
	            if (Object.keys(arg).length != Object.keys(last_arg).length) {
	              return true;
	            }
	            for (var _key3 in arg) {
	              if (this.argsChanged(arg[_key3], last_arg[_key3])) {
	                return true;
	              }
	            }
	          }
	
	          // function
	          else if (arg_type === 'function') {
	              if (arg.name !== last_arg.name) {
	                return true;
	              }
	            }
	
	            // compare
	            else if (arg !== last_arg) {
	                return true;
	              }
	
	      return false;
	    }
	  }, {
	    key: 'setupState',
	    value: function setupState(state, base_path) {
	      var _this2 = this;
	
	      if ((typeof state === 'undefined' ? 'undefined' : _typeof(state)) != 'object' || state === null) {
	        return;
	      }
	      if (state.__aff_read_only) {
	        return;
	      }
	
	      if (!state.hasOwnProperty('$update')) {
	        (function () {
	          // set
	          var app = _this2.app;
	          Object.defineProperty(state, '$update', {
	            configurable: false,
	            enumerable: false,
	            writable: false,
	            value: function value() {
	              for (var _len3 = arguments.length, args = Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
	                args[_key4] = arguments[_key4];
	              }
	
	              app.update.apply(app, _toConsumableArray(this.$path).concat(args));
	              return app.get(this.$path);
	            }
	          });
	          Object.defineProperty(state, '$path', {
	            configurable: false,
	            enumerable: false,
	            writable: false,
	            value: base_path.slice(0)
	          });
	        })();
	      } else {
	        if (!state.$path.reduce(function (acc, cur, i) {
	          return acc && cur == base_path[i];
	        }, true)) {
	          throw ['cannot change state object path', base_path.slice(0), state.$path];
	        }
	      }
	
	      // recursively
	      for (var key in state) {
	        var sub_path = base_path.slice(0);
	        sub_path.push(key);
	        this.setupState(state[key], sub_path);
	      }
	    }
	  }]);

	  return MutableState;
	}(_state.State);

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.readOnly = readOnly;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var State = exports.State = function () {
	  function State() {
	    _classCallCheck(this, State);
	  }
	
	  _createClass(State, [{
	    key: 'get',
	    value: function get() {}
	  }, {
	    key: 'update',
	    value: function update() {}
	  }, {
	    key: 'beforePatch',
	    value: function beforePatch() {}
	  }, {
	    key: 'argsChanged',
	    value: function argsChanged() {}
	  }]);
	
	  return State;
	}();
	
	function readOnly(obj) {
	  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null) {
	    return obj;
	  }
	  Object.defineProperty(obj, '__aff_read_only', {
	    configurable: false,
	    enumerable: false,
	    writable: false,
	    value: true
	  });
	  return obj;
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	// operations 
	
	function make_argumented_method_op(name, method) {
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return {
	      __is_op: true,
	      op: name,
	      args: args,
	      apply: function apply(obj) {
	        method.apply(obj, args);
	        return obj;
	      }
	    };
	  };
	}
	
	function make_argumented_method_op_new_value(name, method) {
	  return function () {
	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }
	
	    return {
	      __is_op: true,
	      op: name,
	      args: args,
	      apply: function apply(obj) {
	        return method.apply(obj, args);
	      }
	    };
	  };
	}
	
	function make_method_op(name, method) {
	  return {
	    __is_op: true,
	    op: name,
	    apply: function apply(obj) {
	      method.apply(obj);
	      return obj;
	    }
	  };
	}
	
	var $func = function $func(fn) {
	  return {
	    __is_op: true,
	    op: 'func',
	    args: [fn],
	    apply: function apply(obj) {
	      return fn(obj);
	    }
	  };
	};
	
	var $delete = function $delete(prop) {
	  return {
	    __is_op: true,
	    op: 'delete',
	    args: [prop],
	    apply: function apply(obj) {
	      delete obj[prop];
	      return obj;
	    }
	  };
	};
	
	var $del = $delete;
	
	// numbers
	
	var $inc = {
	  __is_op: true,
	  op: 'inc',
	  apply: function apply(obj) {
	    return (obj || 0) + 1;
	  }
	};
	
	var $dec = {
	  __is_op: true,
	  op: 'dec',
	  apply: function apply(obj) {
	    return obj - 1;
	  }
	};
	
	// arrays
	
	var array_ops = {};
	
	[['push', Array.prototype.push], ['unshift', Array.prototype.unshift], ['splice', Array.prototype.splice], ['fill', Array.prototype.fill], ['sort', Array.prototype.sort]].forEach(function (info) {
	  array_ops['$' + info[0]] = make_argumented_method_op.apply(undefined, _toConsumableArray(info));
	});
	
	[['filter', Array.prototype.filter], ['map', Array.prototype.map]].forEach(function (info) {
	  array_ops['$' + info[0]] = make_argumented_method_op_new_value.apply(undefined, _toConsumableArray(info));
	});
	
	[['pop', Array.prototype.pop], ['shift', Array.prototype.shift], ['reverse', Array.prototype.reverse]].forEach(function (info) {
	  array_ops['$' + info[0]] = make_method_op.apply(undefined, _toConsumableArray(info));
	});
	
	// predictions
	
	function $any(k) {
	  return true;
	}
	
	// export
	
	module.exports = _extends({
	  $func: $func,
	  $delete: $delete,
	  $del: $del,
	  $inc: $inc,
	  $dec: $dec
	}, array_ops, {
	  $any: $any
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _app = __webpack_require__(1);
	
	var _all_tags = __webpack_require__(2);
	
	var helpers = _all_tags.all_tags.reduce(function (helpers, tag) {
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
	
	var checkbox = function checkbox() {
	  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
	  }
	
	  return _app.e.apply(undefined, ['input', {
	    type: 'checkbox'
	  }].concat(args));
	};
	
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
	  }),
	
	  checkbox: checkbox,
	  Checkbox: checkbox,
	  CHECKBOX: checkbox
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.bindHover = undefined;
	exports.bindFocus = bindFocus;
	exports.bindEnter = bindEnter;
	exports.bindOver = bindOver;
	
	var _event = __webpack_require__(4);
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function bindFocus(state, name) {
	  var _ref;
	
	  var path = state.$path.slice(0);
	  path.push(name);
	  path = path.join(':');
	  return _ref = {}, _defineProperty(_ref, 'onfocus$' + path, function () {
	    state.$update(name, true);
	  }), _defineProperty(_ref, 'onblur$' + path, function () {
	    state.$update(name, false);
	  }), _ref;
	}
	
	function bindEnter(state, name) {
	  var _ref2;
	
	  var path = state.$path.slice(0);
	  path.push(name);
	  path = path.join(':');
	  return _ref2 = {}, _defineProperty(_ref2, 'onmouseenter$' + path, function () {
	    state.$update(name, true);
	  }), _defineProperty(_ref2, 'onmouseleave$' + path, function () {
	    state.$update(name, false);
	  }), _ref2;
	}
	
	function bindOver(state, name) {
	  var _ref3;
	
	  var path = state.$path.slice(0);
	  path.push(name);
	  path = path.join(':');
	  return _ref3 = {}, _defineProperty(_ref3, 'onmouseover$' + path, function () {
	    state.$update(name, true);
	  }), _defineProperty(_ref3, 'onmouseout$' + path, function () {
	    state.$update(name, false);
	  }), _ref3;
	}
	
	var bindHover = exports.bindHover = bindOver;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.logUpdates = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _operations = __webpack_require__(7);
	
	var _event = __webpack_require__(4);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var logUpdates = exports.logUpdates = (0, _event.on)('after_update:__log_updates', function (state) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }
	
	  console.log('%cUPDATE', 'background: #555; color: white', args.slice(0, -1).map(function (arg) {
	    return formatUpdatePath(arg);
	  }).join(' . ') + ' => ', formatUpdateArg(args[args.length - 1]));
	});
	
	function formatUpdatePath(arg) {
	  if (arg === _operations.$any) {
	    return '$any';
	  }
	  return arg;
	}
	
	function formatUpdateArg(arg) {
	  if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg.__is_op) {
	    return [arg.op].concat(_toConsumableArray(arg.args));
	  }
	  return arg;
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=affjs.js.map
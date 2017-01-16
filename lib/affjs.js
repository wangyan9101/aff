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
	
	var _panel = __webpack_require__(11);
	
	Object.keys(_panel).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _panel[key];
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
	exports.setAfterThunkCallFunc = exports.setBeforeThunkCallFunc = exports.skip = exports.App = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.t = t;
	exports.e = e;
	
	var _all_tags = __webpack_require__(2);
	
	var _tagged = __webpack_require__(3);
	
	var _event = __webpack_require__(4);
	
	var _mutable_state = __webpack_require__(5);
	
	var _state2 = __webpack_require__(6);
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var App = exports.App = function () {
	  function App() {
	    _classCallCheck(this, App);
	
	    this.node = null;
	    this.patching = false;
	    this.updated = false;
	    this.updateCount = 0;
	    this.elementCache = {};
	    for (var i = 0; i < _all_tags.allTags.length; i++) {
	      this.elementCache[_all_tags.allTags[i]] = [];
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
	        } else if (arg instanceof _event.Events) {
	          for (var idx = 0; idx < arg.events.length; idx++) {
	            this.addEvent(arg.events[idx]);
	          }
	        } else if (typeof arg == 'function') {
	          this.nodeFunc = arg;
	        } else {
	          this._state = new _mutable_state.MutableState(arg, this);
	          this.setupState(this._state.get());
	        }
	      }
	      if (this.element !== undefined && this.nodeFunc !== undefined && this._state !== undefined) {
	        this.update();
	      }
	    }
	  }, {
	    key: 'setupState',
	    value: function setupState(obj, path, scopes) {
	      // skip non-object
	      if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null) {
	        return;
	      }
	
	      // default arguments
	      path = path || [];
	      scopes = scopes || [];
	
	      // array
	      if (Array.isArray(obj)) {
	        // setup items
	        for (var i = 0; i < obj.length; i++) {
	          var p = path.slice(0);
	          p.push(i);
	          this.setupState(obj[i], p, scopes);
	        }
	        return;
	      }
	
	      // parse $ref
	      var refInfos = void 0;
	      var ref = void 0;
	      if ('$ref' in obj) {
	        ref = obj['$ref'];
	      } else if ('$use' in obj) {
	        ref = obj['$use'];
	      }
	      if (ref) {
	        if ((typeof ref === 'undefined' ? 'undefined' : _typeof(ref)) === 'object' && ref !== null) {
	          if (Array.isArray(ref)) {
	            refInfos = {};
	            for (var _i = 0; _i < ref.length; _i++) {
	              var key = ref[_i];
	              if (key in obj) {
	                throw ['ref key conflict', key];
	              }
	              refInfos[key] = key;
	            }
	          } else {
	            for (var _key2 in ref) {
	              if (_key2 in obj) {
	                throw ['ref key conflict', _key2];
	              }
	            }
	            refInfos = ref;
	          }
	          delete obj['$ref'];
	        } else {
	          throw ['bad ref', ref];
	        }
	      }
	
	      var app = this;
	      function setGetter(obj, key, from) {
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
	        if (!obj.__aff_ref_keys) {
	          Object.defineProperty(obj, '__aff_ref_keys', {
	            configurable: false,
	            writable: true,
	            enumerable: false,
	            value: {}
	          });
	        }
	        obj.__aff_ref_keys[key] = from;
	      }
	
	      // setup
	      for (var _key3 in refInfos) {
	        var name = refInfos[_key3];
	        // search in scopes
	        var found = false;
	        for (var _i2 = 0; _i2 < scopes.length; _i2++) {
	          var _bindings = scopes[_i2];
	          if (name in _bindings) {
	            // found
	            found = true;
	            var stopPath = _bindings[name].slice(0);
	            // check loop
	            var sameLen = 0;
	            for (var idx = 0; idx < stopPath.length && idx < path.length; idx++) {
	              if (stopPath[idx] == path[idx]) {
	                sameLen++;
	              } else {
	                break;
	              }
	            }
	            if (sameLen == stopPath.length || sameLen == path.length) {
	              throw ['loop in $ref', path, stopPath];
	            }
	            // setup getter and setter
	            stopPath.pop();
	            var stopLen = stopPath.length;
	            var setupPath = path.slice(0);
	            while (setupPath.length > stopLen) {
	              setGetter(this.get(setupPath), _key3, _bindings[name]);
	              setupPath.pop();
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
	        var _p = path.slice(0);
	        _p.push(_key4);
	        bindings[_key4] = _p;
	      }
	      scopes = scopes.slice(0); // copy
	      scopes.push(bindings);
	
	      for (var _key5 in obj) {
	        var subState = obj[_key5];
	
	        // setup updater
	        if (subState instanceof _state2.Updater) {
	          (function () {
	            var name = subState.args[0];
	            var updateArgs = subState.args.slice(1);
	            // search update path
	            var found = false;
	            for (var _i3 = 0; _i3 < scopes.length; _i3++) {
	              var _bindings2 = scopes[_i3];
	              if (name in _bindings2) {
	                var _ret2 = function () {
	                  // found
	                  found = true;
	                  var updatePath = _bindings2[name].slice(0);
	                  obj[_key5] = function () {
	                    for (var _len2 = arguments.length, args = Array(_len2), _key6 = 0; _key6 < _len2; _key6++) {
	                      args[_key6] = arguments[_key6];
	                    }
	
	                    app.update.apply(app, _toConsumableArray(updatePath).concat(_toConsumableArray(updateArgs), args));
	                  };
	                  return 'break';
	                }();
	
	                if (_ret2 === 'break') break;
	              }
	            }
	            if (!found) {
	              throw ['no state named ' + name];
	            }
	
	            // setup sub state
	          })();
	        } else {
	          var _p2 = path.slice(0);
	          _p2.push(_key5);
	          this.setupState(subState, _p2, scopes);
	        }
	      }
	    }
	  }, {
	    key: 'addEvent',
	    value: function addEvent(ev) {
	      var parts = ev.type.split(/[$:]/);
	      var type = parts[0];
	      var subtype = parts.slice(1).join(':') || '__default';
	      if (!(type in this.events)) {
	        this.events[type] = {};
	      }
	      var events = this.events[type];
	      events[subtype] = ev.fn;
	    }
	  }, {
	    key: 'dispatchEvent',
	    value: function dispatchEvent(type) {
	      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key7 = 1; _key7 < _len3; _key7++) {
	        args[_key7 - 1] = arguments[_key7];
	      }
	
	      for (var subtype in this.events[type]) {
	        this.events[type][subtype].apply(this, args);
	      }
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      for (var _len4 = arguments.length, args = Array(_len4), _key8 = 0; _key8 < _len4; _key8++) {
	        args[_key8] = arguments[_key8];
	      }
	
	      return this.updateMulti(args);
	    }
	  }, {
	    key: 'updateMulti',
	    value: function updateMulti() {
	      if (this._state === undefined) {
	        throw ['state not set'];
	      }
	
	      for (var _len5 = arguments.length, args = Array(_len5), _key9 = 0; _key9 < _len5; _key9++) {
	        args[_key9] = arguments[_key9];
	      }
	
	      for (var i = 0; i < args.length; i++) {
	        var _state;
	
	        var arg = args[i];
	        this.dispatchEvent.apply(this, ['beforeUpdate', this.state].concat(_toConsumableArray(arg)));
	        (_state = this._state).update.apply(_state, _toConsumableArray(arg));
	        this.dispatchEvent.apply(this, ['afterUpdate', this.state].concat(_toConsumableArray(arg)));
	      }
	      if (!this.element || !this.nodeFunc) {
	        return;
	      }
	      if (!this.patching) {
	        this.patching = true;
	        this.updated = false;
	        this.updateCount = 0;
	        this._state.beforePatch();
	        var result = this.patch(this.element, this.nodeFunc(this.state, this), this.node);
	        this.element = result[0];
	        this.node = result[1];
	        while (this.updated) {
	          if (this.updateCount > 4096) {
	            // infinite loop
	            throw ['infinite loop in updating', args];
	          }
	          // if state is updated when patching, patch again
	          this.updated = false;
	          this._state.beforePatch();
	          var _result = this.patch(this.element, this.nodeFunc(this.state, this), this.node);
	          this.element = _result[0];
	          this.node = _result[1];
	        }
	        this.patching = false;
	        this.updateCount = 0;
	      } else {
	        // state updated when patching
	        this.updated = true;
	        this.updateCount++;
	      }
	      return;
	    }
	  }, {
	    key: 'html',
	    value: function html() {
	      return this.element.innerHTML;
	    }
	  }, {
	    key: 'get',
	    value: function get() {
	      for (var _len6 = arguments.length, args = Array(_len6), _key10 = 0; _key10 < _len6; _key10++) {
	        args[_key10] = arguments[_key10];
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
	
	    // patch lastElement to represent node attributes, with diffing lastNode
	
	  }, {
	    key: 'patch',
	    value: function patch(lastElement, node, lastNode) {
	      // thunk
	      var lastThunk = void 0;
	      if (lastNode && lastNode instanceof Thunk) {
	        lastThunk = lastNode;
	        lastNode = lastThunk.node;
	      }
	      var thunk = void 0;
	      if (node instanceof Thunk) {
	        thunk = node;
	      }
	
	      if (thunk) {
	        var shouldUpdate = false;
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
	      !lastNode ||
	      // no element
	      !lastElement
	      // different tag, no way to patch
	      || node.tag != lastNode.tag) {
	        var element = node.toElement(null, this);
	        // insert new then remove old
	        if (lastElement && lastElement.parentNode) {
	          lastElement.parentNode.insertBefore(element, lastElement);
	          lastElement.parentNode.removeChild(lastElement);
	        }
	        // cache lastElement
	        if (lastNode && lastElement.tagName) {
	          this.elementCache[lastElement.tagName.toLowerCase()].push([lastElement, lastNode]);
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
	  }, {
	    key: 'patchNode',
	    value: function patchNode(lastElement, node, lastNode) {
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
	      var styleType = _typeof(node.style);
	      var lastStyleType = _typeof(lastNode.style);
	      // different type, no diff
	      if (styleType !== lastStyleType) {
	        lastElement.style = undefined;
	        if (styleType === 'string') {
	          lastElement.style = node.style;
	        } else if (styleType === 'object' && node.style !== null) {
	          for (var key in node.style) {
	            lastElement.style[key] = node.style[key];
	          }
	        }
	      }
	      // diff object
	      else if (styleType === 'object') {
	          if (node.style !== null) {
	            for (var _key11 in node.style) {
	              if (!lastNode.style || node.style[_key11] != lastNode.style[_key11]) {
	                lastElement.style[_key11] = node.style[_key11];
	              }
	            }
	          }
	          if (lastNode.style !== null) {
	            for (var _key12 in lastNode.style) {
	              if (!node.style || !(_key12 in node.style)) {
	                lastElement.style[_key12] = '';
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
	      for (var _key13 in node.classList) {
	        // should update
	        if (!lastNode.classList || node.classList[_key13] != lastNode.classList[_key13]) {
	          if (node.classList[_key13]) {
	            lastElement.classList.add(_key13);
	          } else {
	            lastElement.classList.remove(_key13);
	          }
	        }
	      }
	      for (var _key14 in lastNode.classList) {
	        if (!node.classList || !(_key14 in node.classList)) {
	          lastElement.classList.remove(_key14);
	        }
	      }
	
	      // attributes
	
	      var _loop = function _loop(_key15) {
	        if (!lastNode.attributes || node.attributes[_key15] != lastNode.attributes[_key15]) {
	          (function () {
	            var value = node.attributes[_key15];
	            var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	            if (valueType == 'string' || valueType == 'number') {
	              lastElement.setAttribute(_key15, value);
	              lastElement[_key15] = value;
	            } else if (valueType == 'boolean') {
	              var set = function set() {
	                if (value) {
	                  lastElement.setAttribute(_key15, true);
	                  lastElement[_key15] = true;
	                } else {
	                  lastElement.removeAttribute(_key15);
	                  lastElement[_key15] = false;
	                }
	              };
	              if (lastElement.tagName === 'INPUT' && lastElement.type == 'checkbox') {
	                setTimeout(set, 0);
	              } else {
	                set();
	              }
	            }
	          })();
	        }
	      };
	
	      for (var _key15 in node.attributes) {
	        _loop(_key15);
	      }
	      for (var _key16 in lastNode.attributes) {
	        if (!node.attributes || !(_key16 in node.attributes)) {
	          lastElement.removeAttribute(_key16);
	          lastElement[_key16] = undefined;
	        }
	      }
	
	      // events
	      var eventKeys = {};
	      for (var _key17 in node.events) {
	        var k = elementSetEvent(lastElement, _key17, node.events[_key17].bind(node));
	        eventKeys[k] = true;
	      }
	      if (lastElement.__aff_events) {
	        for (var type in lastElement.__aff_events) {
	          for (var subtype in lastElement.__aff_events[type]) {
	            if (!(type + ':' + subtype in eventKeys)) {
	              delete lastElement.__aff_events[type][subtype];
	            }
	          }
	        }
	      }
	
	      // children
	      var childElements = lastElement.childNodes;
	      var childLen = node.children ? node.children.length : 0;
	      var lastChildLen = lastNode && lastNode.children ? lastNode.children.length : 0;
	      for (var i = 0; i < childLen; i++) {
	        var result = this.patch(childElements[i], node.children[i], lastNode && lastNode.children ? lastNode.children[i] : null);
	        var elem = result[0];
	        if (!childElements[i]) {
	          lastElement.appendChild(elem);
	        }
	      }
	      for (var _i4 = childLen; _i4 < lastChildLen; _i4++) {
	        lastElement.removeChild(lastElement.childNodes[childLen]);
	      }
	
	      if (node.hooks && node.hooks.patched) {
	        node.hooks.patched.forEach(function (fn) {
	          return fn(lastElement);
	        });
	      }
	
	      return [lastElement, node];
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
	        //TODO remove this
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
	  for (var _len7 = arguments.length, args = Array(_len7), _key18 = 0; _key18 < _len7; _key18++) {
	    args[_key18] = arguments[_key18];
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
	
	  for (var _len8 = arguments.length, args = Array(_len8 > 1 ? _len8 - 1 : 0), _key19 = 1; _key19 < _len8; _key19++) {
	    args[_key19 - 1] = arguments[_key19];
	  }
	
	  _e.apply(undefined, [node].concat(args));
	  return node;
	}
	
	var skip = exports.skip = { skipFollowingArguments: true };
	
	function _e(node) {
	  for (var _len9 = arguments.length, args = Array(_len9 > 1 ? _len9 - 1 : 0), _key20 = 1; _key20 < _len9; _key20++) {
	    args[_key20 - 1] = arguments[_key20];
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
	    } else if (arg instanceof _event.Events) {
	      for (var idx = 0; idx < arg.events.length; idx++) {
	        var ev = arg.events[idx];
	        node.setProperties(_defineProperty({}, 'on' + ev.type, ev.fn));
	      }
	    } else if (arg === skip) {
	      break;
	    } else if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null) {
	      if (Array.isArray(arg)) {
	        // flatten
	        _e.apply(undefined, [node].concat(_toConsumableArray(arg)));
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
	              for (var _i5 = 0; _i5 < property.length; _i5++) {
	                this.classList[property[_i5]] = true;
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
	          if (this.style === null) {
	            this.style = properties.style;
	          } else {
	            var style = properties.style;
	            var styleType = typeof style === 'undefined' ? 'undefined' : _typeof(style);
	            var currentType = _typeof(this.style);
	            if (styleType != currentType) {
	              throw ['should not mix-use object-like style and string-like style', style, this.style];
	            }
	            if (styleType === 'string') {
	              this.style += style;
	            } else if (styleType === 'object') {
	              for (var _key21 in style) {
	                this.style[_key21] = style[_key21];
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
	  }, {
	    key: 'setChildren',
	    value: function setChildren(children) {
	      this.children = this.children || [];
	      var type = typeof children === 'undefined' ? 'undefined' : _typeof(children);
	      if (type === 'object' && children !== null) {
	        this.children.push(children);
	      } else if (type === 'boolean' || type === 'number' || type === 'string' || type === 'symbol') {
	        var child = new Node();
	        child.text = children.toString();
	        this.children.push(child);
	      } else {
	        throw ['bad child', children, this];
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
	        if (app && app.elementCache[this.tag] && app.elementCache[this.tag].length > 0) {
	          var _ret5 = function () {
	            var result = app.elementCache[_this.tag].pop();
	            var element = result[0];
	            var lastNode = result[1];
	            var node = void 0;
	            result = app.patchNode(element, _this, lastNode);
	            element = result[0];
	            node = result[1];
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
	
	          if ((typeof _ret5 === 'undefined' ? 'undefined' : _typeof(_ret5)) === "object") return _ret5.v;
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
	          childFragment.appendChild(this.children[i].toElement(null, app));
	        }
	        element.appendChild(childFragment);
	      }
	      if (this.attributes !== null) {
	        for (var _key22 in this.attributes) {
	          var value = this.attributes[_key22];
	          var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	          if (valueType == 'string' || valueType == 'number') {
	            element.setAttribute(_key22, value);
	            element[_key22] = value;
	          } else if (valueType == 'boolean') {
	            if (value) {
	              element.setAttribute(_key22, true);
	              element[_key22] = true;
	            } else {
	              element.removeAttribute(_key22);
	              element[_key22] = false;
	            }
	          }
	        }
	      }
	      if (this.events !== null) {
	        for (var _key23 in this.events) {
	          // set event callback, bind current Node to callback
	          // constructor must not be arrow function to get proper 'this'
	          elementSetEvent(element, _key23, this.events[_key23].bind(this));
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
	
	function elementSetEvent(element, type, fn) {
	  var events = element.__aff_events;
	  if (!events) {
	    events = {};
	    element.__aff_events = events;
	  }
	  var parts = type.split(/[$:]/);
	  type = parts[0];
	  var subtype = parts.slice(1).join(':') || '__default';
	  if (!(type in events)) {
	    events[type] = {};
	    element.addEventListener(type.substr(2), function (ev) {
	      if (element.tagName == 'INPUT' && element.type == 'checkbox' && type == 'onclick') {
	        ev.preventDefault();
	      }
	      var ret = void 0;
	      var lastEvType = void 0;
	      var lastFn = void 0;
	      for (var _subtype in events[type]) {
	        var result = events[type][_subtype](ev);
	        if (ret === undefined) {
	          ret = result;
	          lastEvType = type + ':' + _subtype;
	          lastFn = events[type][_subtype];
	        } else if (ret !== result) {
	          throw ['return value conflict between event handlers: ' + type + ':' + _subtype + ' and ' + lastEvType, events[type][_subtype], lastFn];
	        }
	      }
	      return ret;
	    });
	  }
	  events[type][subtype] = fn;
	  return type + ':' + subtype;
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var allTags = exports.allTags = [
	
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.on = on;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Event = function Event(type, fn) {
	  _classCallCheck(this, Event);
	
	  this.type = type;
	  this.fn = fn;
	};
	
	var Events = exports.Events = function () {
	  function Events() {
	    _classCallCheck(this, Events);
	
	    this.events = [];
	  }
	
	  _createClass(Events, [{
	    key: "on",
	    value: function on(type, fn) {
	      this.events.push(new Event(type, fn));
	      return this;
	    }
	  }]);
	
	  return Events;
	}();
	
	function on(type, fn) {
	  var events = new Events();
	  events.on(type, fn);
	  return events;
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
	
	  function MutableState(initState, app) {
	    _classCallCheck(this, MutableState);
	
	    var _this = _possibleConstructorReturn(this, (MutableState.__proto__ || Object.getPrototypeOf(MutableState)).call(this));
	
	    _this.app = app;
	    _this.patchTick = 1;
	    _this.state = initState;
	    _this.setupState(_this.state, [], false);
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
	    value: function updateState(basePath, obj) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }
	
	      var _this2 = this;
	
	      if (args.length === 0) {
	        return obj;
	      } else if (args.length === 1) {
	        var ret = void 0;
	        if (_typeof(args[0]) === 'object' && args[0] !== null && args[0].__is_op) {
	          ret = args[0].apply(obj, this);
	          if (ret === obj) {
	            this.setupPatchTick(ret);
	            ret.__aff_tick = this.patchTick + 1;
	          }
	        } else {
	          ret = args[0];
	        }
	        var forceSetup = false;
	        if (Array.isArray(obj) && Array.isArray(ret)) {
	          // re-setup arrays conservatively
	          forceSetup = true;
	        }
	        this.setupState(ret, basePath, forceSetup);
	        if ((typeof ret === 'undefined' ? 'undefined' : _typeof(ret)) === 'object' && ret !== null && !ret.hasOwnProperty('__aff_tick')) {
	          this.setupPatchTick(ret);
	          ret.__aff_tick = this.patchTick + 1;
	        }
	        return ret;
	      } else {
	        if (!obj) {
	          obj = {};
	        }
	        if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null) {
	          if (!obj.hasOwnProperty('__aff_tick')) {
	            this.setupPatchTick(obj);
	            obj.__aff_tick = this.patchTick + 1;
	          }
	          var updateKey = function updateKey(key) {
	            for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	              args[_key3 - 1] = arguments[_key3];
	            }
	
	            var path = basePath.slice(0);
	            path.push(key);
	            var value = _this2.updateState.apply(_this2, [path].concat(args));
	            obj[key] = value;
	            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
	              obj.__aff_sub_tick[key] = _this2.patchTick + 1;
	            }
	          };
	          var key = args[0];
	          var keyType = typeof key === 'undefined' ? 'undefined' : _typeof(key);
	          for (var k in obj) {
	            if ((keyType === 'number' || keyType === 'string') && k == key || keyType === 'function' && key(k)) {
	              updateKey.apply(undefined, [k, obj[k]].concat(_toConsumableArray(args.slice(1))));
	            }
	          }
	          if ((keyType === 'string' || keyType === 'number') && !(key in obj)) {
	            updateKey.apply(undefined, [key, undefined].concat(_toConsumableArray(args.slice(1))));
	          }
	          obj.__aff_tick = this.patchTick + 1;
	          return obj;
	        } else {
	          throw ['bad update path', obj, args];
	        }
	      }
	    }
	  }, {
	    key: 'beforePatch',
	    value: function beforePatch() {
	      this.patchTick++;
	    }
	  }, {
	    key: 'setupPatchTick',
	    value: function setupPatchTick(obj) {
	      Object.defineProperty(obj, '__aff_tick', {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: this.patchTick + 1
	      });
	      Object.defineProperty(obj, '__aff_sub_tick', {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: {}
	      });
	    }
	  }, {
	    key: 'argsChanged',
	    value: function argsChanged(arg, lastArg) {
	      var argType = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);
	
	      // different type
	      if (argType !== (typeof lastArg === 'undefined' ? 'undefined' : _typeof(lastArg))) {
	        return true;
	      }
	
	      // trigger update of ref keys
	      if (arg === lastArg && (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg != null && arg.__aff_ref_keys && arg.__aff_tick_update_at != this.patchTick) {
	        for (var key in arg.__aff_ref_keys) {
	          var fromPath = arg.__aff_ref_keys[key].slice(0);
	          var value = this.app.get(fromPath);
	          // get tick
	          var tick = void 0;
	          if (value.__aff_tick) {
	            tick = value.__aff_tick;
	          } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
	            // get from parent
	            var _key4 = fromPath.pop();
	            var parentValue = this.app.get(fromPath);
	            if (parentValue.__aff_sub_tick) {
	              tick = parentValue.__aff_sub_tick[_key4];
	            }
	          }
	          if (tick == this.patchTick) {
	            if (!arg.hasOwnProperty('__aff_tick')) {
	              this.setupPatchTick(arg);
	            }
	            arg.__aff_tick = tick;
	            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
	              // save tick in parent
	              arg.__aff_sub_tick[key] = tick;
	            }
	          }
	        }
	        Object.defineProperty(arg, '__aff_tick_update_at', {
	          configurable: false,
	          enumerable: false,
	          writable: true,
	          value: this.patchTick
	        });
	      }
	
	      // patchTick
	      if (arg === lastArg && (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null && arg.__aff_tick === this.patchTick) {
	        return true;
	      }
	
	      // array
	      else if (Array.isArray(arg) && Array.isArray(lastArg)) {
	          // different length
	          if (arg.length != lastArg.length) {
	            return true;
	          }
	          // check items
	          for (var i = 0; i < arg.length; i++) {
	            if (this.argsChanged(arg[i], lastArg[i])) {
	              return true;
	            }
	          }
	        }
	
	        // deep compare object
	        else if (argType === 'object') {
	            // different keys length
	            if (Object.keys(arg).length != Object.keys(lastArg).length) {
	              return true;
	            }
	            for (var _key5 in arg) {
	              if (this.argsChanged(arg[_key5], lastArg[_key5])) {
	                return true;
	              }
	            }
	          }
	
	          // function
	          else if (argType === 'function') {
	              if (arg.name !== lastArg.name) {
	                return true;
	              }
	            }
	
	            // compare
	            else if (arg !== lastArg) {
	                return true;
	              }
	
	      return false;
	    }
	  }, {
	    key: 'setupState',
	    value: function setupState(state, basePath, forceSetup) {
	      var _this3 = this;
	
	      if ((typeof state === 'undefined' ? 'undefined' : _typeof(state)) != 'object' || state === null) {
	        return;
	      }
	      if (state.__aff_read_only) {
	        return;
	      }
	
	      if (!state.hasOwnProperty('$update') || forceSetup) {
	        (function () {
	          // set
	          var app = _this3.app;
	          Object.defineProperty(state, '$update', {
	            configurable: false,
	            enumerable: false,
	            writable: true,
	            value: function value() {
	              for (var _len4 = arguments.length, args = Array(_len4), _key6 = 0; _key6 < _len4; _key6++) {
	                args[_key6] = arguments[_key6];
	              }
	
	              app.update.apply(app, _toConsumableArray(state.$path).concat(args));
	              return app.get(state.$path);
	            }
	          });
	          Object.defineProperty(state, '$path', {
	            configurable: false,
	            enumerable: false,
	            writable: true,
	            value: basePath.slice(0)
	          });
	        })();
	      } else {
	        if (!state.$path.reduce(function (acc, cur, i) {
	          return acc && cur == basePath[i];
	        }, true)) {
	          throw ['cannot change state object path', basePath.slice(0), state.$path];
	        }
	      }
	
	      // recursively
	      for (var key in state) {
	        var subPath = basePath.slice(0);
	        subPath.push(key);
	        this.setupState(state[key], subPath, forceSetup);
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
	exports.Updater = Updater;
	exports.updater = updater;
	
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
	
	function Updater(args) {
	  this.args = args;
	}
	
	function updater() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	
	  return new Updater(args);
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	// operations 
	
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
	
	var arrayOps = {};
	
	[['push', Array.prototype.push], ['unshift', Array.prototype.unshift], ['splice', Array.prototype.splice], ['fill', Array.prototype.fill], ['sort', Array.prototype.sort]].forEach(function (info) {
	  arrayOps['$' + info[0]] = function (name, method) {
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
	  }.apply(undefined, _toConsumableArray(info));
	});
	
	[['filter', Array.prototype.filter], ['map', Array.prototype.map]].forEach(function (info) {
	  arrayOps['$' + info[0]] = function (name, method) {
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
	  }.apply(undefined, _toConsumableArray(info));
	});
	
	[['pop', Array.prototype.pop], ['shift', Array.prototype.shift], ['reverse', Array.prototype.reverse]].forEach(function (info) {
	  arrayOps['$' + info[0]] = function (name, method) {
	    return {
	      __is_op: true,
	      op: name,
	      apply: function apply(obj) {
	        method.apply(obj);
	        return obj;
	      }
	    };
	  }.apply(undefined, _toConsumableArray(info));
	});
	
	// objects
	
	function $merge(spec) {
	  return {
	    __is_op: true,
	    op: 'merge',
	    args: [spec],
	    apply: function apply(obj) {
	      return _merge(obj, spec);
	    }
	  };
	}
	
	function _merge(obj, spec) {
	  if ((typeof spec === 'undefined' ? 'undefined' : _typeof(spec)) === 'object' && spec !== null) {
	    if (spec.__is_op) {
	      return spec.apply(obj);
	    }
	    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null) {
	      obj = {};
	    }
	    for (var key in spec) {
	      obj[key] = _merge(obj[key], spec[key]);
	    }
	  } else {
	    return spec;
	  }
	  return obj;
	}
	
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
	}, arrayOps, {
	  $merge: $merge,
	  $any: $any
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _app = __webpack_require__(1);
	
	var _all_tags = __webpack_require__(2);
	
	var helpers = _all_tags.allTags.reduce(function (helpers, tag) {
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
	exports.consoleLogUpdates = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _operations = __webpack_require__(7);
	
	var _event = __webpack_require__(4);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var consoleLogUpdates = exports.consoleLogUpdates = (0, _event.on)('afterUpdate:__log_updates', function (state) {
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
	    return [arg.op].concat(_toConsumableArray(arg.args || []));
	  }
	  return arg;
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _templateObject = _taggedTemplateLiteral(['\n      list-style: none;\n    '], ['\n      list-style: none;\n    ']),
	    _templateObject2 = _taggedTemplateLiteral(['.tab-item-', ''], ['.tab-item-', '']),
	    _templateObject3 = _taggedTemplateLiteral(['\n          background-color: ', ';\n          padding: 5px;\n          user-select: none;\n          cursor: pointer;\n        '], ['\n          background-color: ', ';\n          padding: 5px;\n          user-select: none;\n          cursor: pointer;\n        ']),
	    _templateObject4 = _taggedTemplateLiteral(['\n      background-color: ', ';\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      min-width: ', ';\n      margin: 0;\n      text-align: center;\n      left: 0;\n    '], ['\n      background-color: ', ';\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      min-width: ', ';\n      margin: 0;\n      text-align: center;\n      left: 0;\n    ']),
	    _templateObject5 = _taggedTemplateLiteral([' font-weight: bold '], [' font-weight: bold ']),
	    _templateObject6 = _taggedTemplateLiteral(['\n        position: absolute;\n        left: 0;\n        right: 0;\n        bottom: 0;\n      '], ['\n        position: absolute;\n        left: 0;\n        right: 0;\n        bottom: 0;\n      ']),
	    _templateObject7 = _taggedTemplateLiteral(['\n      background-color: ', ';\n      position: absolute;\n      left: ', ';\n      right: 0;\n      bottom: 0;\n      height: ', ';\n      font-size: 1em;\n      line-height: 1em;\n    '], ['\n      background-color: ', ';\n      position: absolute;\n      left: ', ';\n      right: 0;\n      bottom: 0;\n      height: ', ';\n      font-size: 1em;\n      line-height: 1em;\n    ']),
	    _templateObject8 = _taggedTemplateLiteral(['#main'], ['#main']),
	    _templateObject9 = _taggedTemplateLiteral(['\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      left: ', ';\n      right: 0;\n      top: 0;\n      bottom: ', ';\n      border-left: 1px solid #CCC;\n      border-bottom: 1px solid #CCC;\n      overflow: auto;\n    '], ['\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      left: ', ';\n      right: 0;\n      top: 0;\n      bottom: ', ';\n      border-left: 1px solid #CCC;\n      border-bottom: 1px solid #CCC;\n      overflow: auto;\n    ']),
	    _templateObject10 = _taggedTemplateLiteral([' \n      text-align: center; \n      border-bottom: 1px solid #CCC;\n      font-weight: bold;\n      margin-bottom: 3px;\n    '], [' \n      text-align: center; \n      border-bottom: 1px solid #CCC;\n      font-weight: bold;\n      margin-bottom: 3px;\n    ']),
	    _templateObject11 = _taggedTemplateLiteral(['\n      height: 10vh;\n    '], ['\n      height: 10vh;\n    ']),
	    _templateObject12 = _taggedTemplateLiteral(['\n        position: fixed;\n        top: ', ';\n        left: ', ';\n        right: ', ';\n        bottom: ', ';\n        border: 1px solid #666;\n        background-color: white;\n        margin: 1px;\n        font-size: 12px;\n        z-index: 9999;\n        color: #333;\n      '], ['\n        position: fixed;\n        top: ', ';\n        left: ', ';\n        right: ', ';\n        bottom: ', ';\n        border: 1px solid #666;\n        background-color: white;\n        margin: 1px;\n        font-size: 12px;\n        z-index: 9999;\n        color: #333;\n      ']),
	    _templateObject13 = _taggedTemplateLiteral(['\n      padding: 0 10px;\n    '], ['\n      padding: 0 10px;\n    ']),
	    _templateObject14 = _taggedTemplateLiteral(['\n      margin: 0 auto;\n      min-width: 100%;\n      border-collapse: collapse;\n      text-align: center;\n    '], ['\n      margin: 0 auto;\n      min-width: 100%;\n      border-collapse: collapse;\n      text-align: center;\n    ']),
	    _templateObject15 = _taggedTemplateLiteral(['\n            border: 1px solid #AAA;\n          '], ['\n            border: 1px solid #AAA;\n          ']),
	    _templateObject16 = _taggedTemplateLiteral(['\n            background-color: #EEFFEE;\n            padding: 0 10px;\n            vertical-align: top;\n          '], ['\n            background-color: #EEFFEE;\n            padding: 0 10px;\n            vertical-align: top;\n          ']),
	    _templateObject17 = _taggedTemplateLiteral(['.state-value'], ['.state-value']),
	    _templateObject18 = _taggedTemplateLiteral(['\n            padding: 1px;\n          '], ['\n            padding: 1px;\n          ']),
	    _templateObject19 = _taggedTemplateLiteral(['\n      padding-left: 5px;\n    '], ['\n      padding-left: 5px;\n    ']),
	    _templateObject20 = _taggedTemplateLiteral(['\n            border-bottom: 1px solid #EEE;\n            margin-bottom: 1px;\n          '], ['\n            border-bottom: 1px solid #EEE;\n            margin-bottom: 1px;\n          ']),
	    _templateObject21 = _taggedTemplateLiteral(['\n              padding: 0 10px;\n              background-color: #EFE;\n              float: right;\n            '], ['\n              padding: 0 10px;\n              background-color: #EFE;\n              float: right;\n            ']),
	    _templateObject22 = _taggedTemplateLiteral(['\n                padding: 0 10px;\n                color: #AAA;\n              '], ['\n                padding: 0 10px;\n                color: #AAA;\n              ']),
	    _templateObject23 = _taggedTemplateLiteral(['\n        text-decoration: underline;\n      '], ['\n        text-decoration: underline;\n      ']),
	    _templateObject24 = _taggedTemplateLiteral(['#close-debug-panel'], ['#close-debug-panel']),
	    _templateObject25 = _taggedTemplateLiteral(['\n      margin: 10px 0;\n    '], ['\n      margin: 10px 0;\n    ']),
	    _templateObject26 = _taggedTemplateLiteral(['#panel-position-', ''], ['#panel-position-', '']),
	    _templateObject27 = _taggedTemplateLiteral(['\n        font-size: 10px;\n        width: 3em;\n      '], ['\n        font-size: 10px;\n        width: 3em;\n      ']);
	
	exports.DebugPanel = DebugPanel;
	
	var _app = __webpack_require__(1);
	
	var _tagged = __webpack_require__(3);
	
	var _event = __webpack_require__(4);
	
	var _operations = __webpack_require__(7);
	
	var _tags = __webpack_require__(8);
	
	var _state = __webpack_require__(6);
	
	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
	
	function DebugPanel(app, initState) {
	
	  // check state
	  var debugState = app.state.__debug_panel;
	  if (!debugState) {
	    app.update('__debug_panel', {});
	    debugState = app.state.__debug_panel;
	  }
	
	  // init
	  if (!debugState.initialized) {
	    (function () {
	      // hotkey
	      document.addEventListener('keypress', function (ev) {
	        if (ev.keyCode != 17 || !ev.ctrlKey) {
	          return;
	        }
	        debugState.$update('show', (0, _operations.$func)(function (v) {
	          return !v;
	        }));
	      });
	
	      // updates logging
	      var logState = debugState.updates;
	      if (!logState) {
	        debugState.$update('updates', []);
	        logState = debugState.updates;
	      }
	      app.init((0, _event.on)('afterUpdate: aff logging log updates', function (state) {
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }
	
	        // to prevent recursive logging
	        var ignore = logState.$path.reduce(function (acc, cur, i) {
	          return acc && cur == args[i];
	        }, true);
	        if (!ignore) {
	          logState.$update((0, _operations.$push)({
	            args: (0, _state.readOnly)(args),
	            tick: state.__aff_tick
	          }));
	        }
	      }));
	
	      // init state
	      if (initState) {
	        debugState.$update((0, _operations.$merge)(initState));
	      }
	      debugState.$update('initialized', true);
	    })();
	  }
	
	  if (!debugState.show) {
	    return [];
	  }
	
	  // styles
	  var panelBackgroundColor = '#EEE';
	  var leftPanelWidth = '10vw';
	  var bottomPanelHeight = '1em';
	
	  // tabs
	  if (debugState.selectedTab === undefined) {
	    debugState.$update('selectedTab', 'state');
	  }
	  var Tabs = (0, _app.t)(function (debugState) {
	    return (0, _tags.div)((0, _tagged.css)(_templateObject), [{ name: 'index' }, { name: 'state' }, { name: 'updates' }].map(function (info) {
	      return (0, _tags.div)((0, _tagged.$)(_templateObject2, info.name), info.name, (0, _tagged.css)(_templateObject3, debugState.selectedTab === info.name ? '#DDD' : 'transparent'), (0, _event.on)('click', function () {
	        debugState.$update('selectedTab', info.name);
	      }));
	    }));
	  }, debugState);
	
	  var LeftPanel = (0, _tags.div)((0, _tagged.css)(_templateObject4, panelBackgroundColor, leftPanelWidth), (0, _tags.p)((0, _tagged.css)(_templateObject5), 'Debug Panel'), Tabs,
	
	  // lower left
	  (0, _tags.div)((0, _tagged.css)(_templateObject6), PanelPosition(debugState), CloseButton(debugState)));
	
	  var BottomPanel = (0, _tags.div)((0, _tagged.css)(_templateObject7, panelBackgroundColor, leftPanelWidth, bottomPanelHeight), (0, _app.t)(PointingPath, debugState.pointingPath));
	
	  var MainContent = (0, _app.t)(function (debugState, appState) {
	    return (0, _tags.div)((0, _tagged.$)(_templateObject8), (0, _tagged.css)(_templateObject9, leftPanelWidth, bottomPanelHeight), (0, _tags.div)(debugState.selectedTab, (0, _tagged.css)(_templateObject10)), function () {
	      // scroll to top when switching tab
	      var lastTab = debugState.lastTab;
	      if (debugState.selectedTab != lastTab) {
	        var elem = document.querySelector('#main');
	        if (elem) {
	          elem.scrollTop = 0;
	        }
	        debugState.$update('lastTab', debugState.selectedTab);
	      }
	
	      if (debugState.selectedTab === 'state') {
	        return (0, _app.t)(AppState, appState, debugState);
	      } else if (debugState.selectedTab === 'updates') {
	        return (0, _app.t)(Updates, debugState.updates, debugState.$path);
	      }
	
	      return _tags.none;
	    }, (0, _tags.div)((0, _tagged.css)(_templateObject11)));
	  }, debugState, app.state);
	
	  return [
	
	  // ui
	  (0, _tags.div)((0, _tagged.css)(_templateObject12, debugState.top || 0, debugState.left || 0, debugState.right || 0, debugState.bottom || 0), LeftPanel, BottomPanel, MainContent)];
	}
	
	function AppState(appState, debugState) {
	  return (0, _tags.div)((0, _tagged.css)(_templateObject13), (0, _app.t)(StateNode, appState, [], debugState));
	}
	
	function StateNode(appState) {
	  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	  var debugState = arguments[2];
	
	  return (0, _app.t)(function (appState, path) {
	    return (0, _tags.table)((0, _tagged.css)(_templateObject14), function () {
	      var ret = [];
	      var keys = Object.keys(appState);
	      keys.sort(function (a, b) {
	        return a > b;
	      });
	
	      var _loop = function _loop(i) {
	        var key = keys[i];
	        if (appState[key] === debugState) {
	          // skip debug state
	          return 'continue';
	        }
	        var valueNode = void 0;
	        if (_typeof(appState[key]) === 'object') {
	          var subpath = path.slice(0);
	          subpath.push(key);
	          valueNode = (0, _app.t)(StateNode, appState[key], subpath, debugState);
	        } else {
	          valueNode = appState[key].toString();
	        }
	
	        var bindPointingPath = [(0, _event.on)('mouseenter', function () {
	          var pointingPath = path.slice(0);
	          pointingPath.push(key);
	          debugState.$update('pointingPath', pointingPath);
	        }), (0, _event.on)('mouseleave', function () {
	          debugState.$update('pointingPath', false);
	        })];
	
	        ret.push((0, _tags.tr)((0, _tagged.css)(_templateObject15), bindPointingPath,
	        // key
	        (0, _tags.td)(key, (0, _tagged.css)(_templateObject16), bindPointingPath),
	        // value
	        (0, _tags.td)((0, _tagged.$)(_templateObject17), valueNode, (0, _tagged.css)(_templateObject18), bindPointingPath)));
	      };
	
	      for (var i = 0; i < keys.length; i++) {
	        var _ret2 = _loop(i);
	
	        if (_ret2 === 'continue') continue;
	      }
	      return ret;
	    });
	  }, appState, path);
	}
	
	function PointingPath(path) {
	  if (!path) {
	    return _tags.none;
	  }
	  return (0, _tags.div)('POINTING PATH: ', path.map(function (key) {
	    return (0, _tags.span)(key, (0, _tagged.css)(_templateObject19));
	  }));
	}
	
	function Updates(updates, debugStatePath) {
	  return (0, _tags.div)((0, _tagged.css)(_templateObject13), function () {
	    var ret = [];
	
	    var _loop2 = function _loop2(i) {
	      var log = updates[i];
	      var ignore = debugStatePath.reduce(function (acc, cur, i) {
	        return acc && cur == log.args[i];
	      }, true);
	      // ignore debug panel updates
	      if (ignore) {
	        return 'continue';
	      }
	
	      ret.push((0, _tags.div)((0, _tagged.css)(_templateObject20), (0, _tags.span)('tick: ', log.tick, (0, _tagged.css)(_templateObject21)), log.args.map(function (arg, i) {
	        return (0, _tags.span)((0, _tags.span)((0, _tagged.css)(_templateObject22), function () {
	          if (i > 0 && i != log.args.length - 1) {
	            return '.';
	          } else if (i == log.args.length - 1) {
	            return '=>';
	          }
	          return '';
	        }), formatArg(arg));
	      }), _tags.clear));
	    };
	
	    for (var i = updates.length - 1; i >= 0; i--) {
	      var _ret3 = _loop2(i);
	
	      if (_ret3 === 'continue') continue;
	    }
	    return ret;
	  });
	}
	
	function formatArg(arg) {
	  if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg.__is_op) {
	    return [(0, _tags.span)(arg.op, (0, _tagged.css)(_templateObject23)), arg.args ? [': ', function () {
	      var ret = [];
	      for (var i = 0; i < arg.args.length; i++) {
	        if (i > 0) {
	          ret.push(', ');
	        }
	        ret.push(formatArg(arg.args[i]));
	      }
	      return ret;
	    }] : []];
	  } else if (Array.isArray(arg)) {
	    var ret = ['[ '];
	    for (var i = 0; i < arg.length; i++) {
	      if (i > 0) {
	        ret.push(', ');
	      }
	      ret.push(formatArg(arg[i]));
	    }
	    ret.push(' ]');
	    return ret;
	  } else if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object') {
	    var _ret4 = ['{ '];
	    var _i = 0;
	    for (var _key2 in arg) {
	      if (_i > 0) {
	        _ret4.push(', ');
	      }
	      _ret4.push([_key2, ': ', formatArg(arg[_key2])]);
	      _i++;
	    }
	    _ret4.push(' }');
	    return _ret4;
	  } else if (typeof arg === 'function') {
	    return arg.toString();
	  }
	
	  return arg;
	}
	
	// close panel
	function CloseButton(debugState) {
	  return (0, _tags.button)((0, _tagged.$)(_templateObject24), (0, _tagged.css)(_templateObject25), (0, _event.on)('click', function () {
	    debugState.$update('show', false);
	  }), 'Close');
	}
	
	function PanelPosition(debugState) {
	  function makeButton(text, left, right, top, bottom) {
	    return (0, _tags.button)((0, _tagged.$)(_templateObject26, text), (0, _tagged.css)(_templateObject27), text, (0, _event.on)('click', function () {
	      debugState.$update((0, _operations.$merge)({
	        left: left,
	        right: right,
	        top: top,
	        bottom: bottom
	      }));
	    }));
	  }
	
	  var width = debugState.panelWidthPercent || 45;
	  var height = debugState.panelHeightPercent || 45;
	
	  return (0, _tags.div)((0, _tagged.css)(_templateObject25), (0, _tags.div)(makeButton('TL', 0, 100 - width + '%', 0, 100 - height + '%'), makeButton('TP', 0, 0, 0, 100 - height + '%'), makeButton('TR', 100 - width + '%', 0, 0, 100 - height + '%')), (0, _tags.div)(makeButton('LE', 0, 100 - width + '%', 0, 0), makeButton('MI', 0, 0, 0, 0), makeButton('RI', 100 - width + '%', 0, 0, 0)), (0, _tags.div)(makeButton('BL', 0, 100 - width + '%', 100 - height + '%', 0), makeButton('BO', 0, 0, 100 - height + '%', 0), makeButton('BR', 100 - width + '%', 0, 100 - height + '%', 0)));
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=affjs.js.map
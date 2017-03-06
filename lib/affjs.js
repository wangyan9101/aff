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
	
	var _operations = __webpack_require__(8);
	
	Object.keys(_operations).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _operations[key];
	    }
	  });
	});
	
	var _tags = __webpack_require__(9);
	
	Object.keys(_tags).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _tags[key];
	    }
	  });
	});
	
	var _tagged = __webpack_require__(7);
	
	Object.keys(_tagged).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _tagged[key];
	    }
	  });
	});
	
	var _event = __webpack_require__(3);
	
	Object.keys(_event).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _event[key];
	    }
	  });
	});
	
	var _mutable_state = __webpack_require__(4);
	
	Object.keys(_mutable_state).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _mutable_state[key];
	    }
	  });
	});
	
	var _state = __webpack_require__(5);
	
	Object.keys(_state).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _state[key];
	    }
	  });
	});
	
	var _panel = __webpack_require__(10);
	
	Object.keys(_panel).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _panel[key];
	    }
	  });
	});
	
	var _nodes = __webpack_require__(6);
	
	Object.keys(_nodes).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _nodes[key];
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
	exports.App = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _all_tags = __webpack_require__(2);
	
	var _event = __webpack_require__(3);
	
	var _mutable_state = __webpack_require__(4);
	
	var _state2 = __webpack_require__(5);
	
	var _nodes = __webpack_require__(6);
	
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
	    this.textNodeCache = [];
	    this.commentNodeCache = [];
	    this.counters = {
	      thunkFuncCall: 0,
	      nativeNodeCreate: 0,
	      nodeCacheHit: 0
	    };
	    this.jobs = [];
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
	    value: function setupState(obj) {
	      var _this = this;
	
	      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	      var scopes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	
	      // skip non-object
	      if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
	        return;
	      } else if (obj === null) {
	        return;
	      }
	
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
	
	      var app = this;
	      var keys = Object.getOwnPropertyNames(obj);
	      var bindings = {};
	      var subStateKeys = [];
	      for (var _i = 0; _i < keys.length; _i++) {
	        var key = keys[_i];
	
	        var _p = path.slice(0);
	        _p.push(key);
	        bindings[key] = _p;
	
	        var subState = obj[key];
	        if (subState instanceof _state2.Reference) {
	          var name = subState.name;
	          // search in scopes
	          var found = false;
	          for (var _i2 = scopes.length - 1; _i2 >= 0; _i2--) {
	            var _bindings = scopes[_i2];
	            if (!(name in _bindings)) {
	              continue;
	            }
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
	            if (sameLen == stopPath.length) {
	              throw ['loop in reference', path, stopPath];
	            }
	            // setup getter and setter
	            if (subState instanceof _state2.WeakReference) {
	              (function () {
	                var from = _bindings[name];
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
	                if (!obj.__aff_wo_ref_keys) {
	                  Object.defineProperty(obj, '__aff_wo_ref_keys', {
	                    configurable: false,
	                    writable: true,
	                    enumerable: false,
	                    value: {}
	                  });
	                }
	                obj.__aff_wo_ref_keys[key] = true;
	              })();
	            } else {
	              stopPath.pop();
	              var stopLen = stopPath.length;
	              var setupPath = path.slice(0);
	
	              var _loop = function _loop() {
	                var obj = _this.get(setupPath);
	                var from = _bindings[name];
	                var parentPathOfFrom = from.slice(0);
	                parentPathOfFrom.pop();
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
	                if (!obj.__aff_ref_keys) {
	                  Object.defineProperty(obj, '__aff_ref_keys', {
	                    configurable: false,
	                    writable: true,
	                    enumerable: false,
	                    value: {}
	                  });
	                }
	                obj.__aff_ref_keys[key] = from;
	                setupPath.pop();
	              };
	
	              while (setupPath.length > stopLen) {
	                _loop();
	              }
	            }
	            break; // stop searching
	          }
	          if (!found) {
	            throw ['no state named ' + name];
	          }
	        } else {
	          subStateKeys.push(key);
	        }
	      }
	
	      scopes = scopes.slice(0); // copy
	      scopes.push(bindings);
	
	      for (var _i3 = 0; _i3 < subStateKeys.length; _i3++) {
	        var _key2 = subStateKeys[_i3];
	        var _subState = obj[_key2];
	        var _p2 = path.slice(0);
	        _p2.push(_key2);
	        this.setupState(_subState, _p2, scopes);
	      }
	    }
	  }, {
	    key: 'addEvent',
	    value: function addEvent(ev) {
	      var parts = ev.type.split(/[$:]/);
	      var type = parts[0];
	      var subtype = parts.slice(1).join(':');
	      if (!subtype) {
	        subtype = '__default';
	      }
	      if (!(type in this.events)) {
	        this.events[type] = {};
	      }
	      var events = this.events[type];
	      events[subtype] = ev.fn;
	    }
	  }, {
	    key: 'dispatchEvent',
	    value: function dispatchEvent(type) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key3 = 1; _key3 < _len2; _key3++) {
	        args[_key3 - 1] = arguments[_key3];
	      }
	
	      for (var subtype in this.events[type]) {
	        this.events[type][subtype].apply(this, args);
	      }
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      for (var _len3 = arguments.length, args = Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
	        args[_key4] = arguments[_key4];
	      }
	
	      return this.updateMulti(args);
	    }
	  }, {
	    key: 'updateMulti',
	    value: function updateMulti() {
	      if (this._state === undefined) {
	        throw ['state not set'];
	      }
	
	      for (var _len4 = arguments.length, args = Array(_len4), _key5 = 0; _key5 < _len4; _key5++) {
	        args[_key5] = arguments[_key5];
	      }
	
	      for (var i = 0; i < args.length; i++) {
	        var _state;
	
	        var arg = args[i];
	        this.dispatchEvent.apply(this, ['beforeUpdate', this.state].concat(_toConsumableArray(arg)));
	        (_state = this._state).update.apply(_state, _toConsumableArray(arg));
	        this.dispatchEvent.apply(this, ['afterUpdate', this.state].concat(_toConsumableArray(arg)));
	      }
	      if (!this.element) {
	        return;
	      } else if (!this.nodeFunc) {
	        return;
	      }
	      if (!this.patching) {
	        this.patching = true;
	        this.updated = false;
	        this.updateCount = 0;
	        this._state.beforePatch();
	        if (!this.node) {
	          // first render
	          this.node = this.nodeFunc(this.state, this);
	          var elem = this.node.toElement(this);
	          if (this.element.parentNode) {
	            this.element.parentNode.insertBefore(elem, this.element);
	            this.element.parentNode.removeChild(this.element);
	          }
	          this.element = elem;
	        } else {
	          var result = this.patch(this.element, this.nodeFunc(this.state, this), this.node);
	          this.element = result[0];
	          this.node = result[1];
	        }
	        while (this.updated) {
	          if (this.updateCount > 128) {
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
	        if (this.jobs.length > 0) {
	          for (var _i4 = this.jobs.length - 1; _i4 >= 0; _i4--) {
	            this.jobs[_i4]();
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
	      for (var _len5 = arguments.length, args = Array(_len5), _key6 = 0; _key6 < _len5; _key6++) {
	        args[_key6] = arguments[_key6];
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
	      if (!lastElement) {
	        throw ['bad last element'];
	      }
	      if (!lastNode) {
	        throw ['bad last node'];
	      }
	
	      // thunk
	      var lastThunk = void 0;
	      if (lastNode instanceof _nodes.Thunk) {
	        lastThunk = lastNode;
	        lastNode = lastThunk.node;
	      }
	      var thunk = void 0;
	      if (node instanceof _nodes.Thunk) {
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
	        node = thunk.getNode(this);
	      }
	
	      // Thunk.getNode may return another Thunk, patch recursively
	      if (node instanceof _nodes.Thunk) {
	        return this.patch(lastElement, node, lastNode);
	      }
	
	      // no need to patch if two Nodes is the same object
	      // if thunk's node is reuse, will return here
	      if (node === lastNode) {
	        return [lastElement, node];
	      }
	
	      // check if patchable
	      var patchable = true;
	      if (node.constructor != lastNode.constructor) {
	        patchable = false;
	      } else if (node instanceof _nodes.ElementNode && node.tag != lastNode.tag) {
	        patchable = false;
	      }
	      if (!patchable) {
	        var element = node.toElement(this);
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
	  }, {
	    key: 'patchNode',
	    value: function patchNode(lastElement, node, lastNode) {
	      // text and comment node
	      var isTextOrComment = false;
	      if (node instanceof _nodes.TextNode) {
	        isTextOrComment = true;
	      } else if (node instanceof _nodes.CommentNode) {
	        isTextOrComment = true;
	      }
	      if (isTextOrComment) {
	        if (node.text != lastNode.text) {
	          lastElement.nodeValue = node.text;
	        }
	        return [lastElement, node];
	      }
	
	      // children
	      var childElements = lastElement.childNodes;
	      var childLen = node.children ? node.children.length : 0;
	      for (var i = 0; i < childLen; i++) {
	        var child = node.children[i];
	        if (child.key && lastNode.children && lastNode.children[i] && lastNode.children[i].key != child.key) {
	          // keyed
	          // search for same key
	          var found = false;
	          for (var offset = 0; offset < 10; offset++) {
	            if (lastNode.children[i + offset] && lastNode.children[i + offset].key == child.key) {
	              found = true;
	              // found same key, delete some
	              for (var n = 0; n < offset; n++) {
	                var elem = lastElement.removeChild(childElements[i]);
	                this.cacheNode(elem, lastNode.children[i]);
	                lastNode.children.splice(i, 1);
	              }
	              childElements = lastElement.childNodes;
	              // patch
	              this.patch(childElements[i], child, lastNode.children[i]);
	              break;
	            }
	          }
	          if (!found) {
	            // insert new
	            var _elem = child.toElement(this);
	            lastElement.insertBefore(_elem, childElements[i]);
	            childElements = lastElement.childNodes;
	            lastNode.children.splice(i, 0, null);
	          }
	        } else {
	          // not keyed
	          if (!childElements[i]) {
	            var _elem2 = child.toElement(this);
	            lastElement.appendChild(_elem2);
	          } else {
	            this.patch(childElements[i], child, lastNode.children[i]);
	          }
	        }
	      }
	      var lastChildLen = lastNode.children ? lastNode.children.length : 0;
	      for (var _i5 = childLen; _i5 < lastChildLen; _i5++) {
	        var _elem3 = lastElement.removeChild(lastElement.childNodes[childLen]);
	        this.cacheNode(_elem3, lastNode.children[_i5]);
	      }
	
	      this.jobs.push(function () {
	
	        // innerHTML
	        if (node.innerHTML != lastNode.innerHTML) {
	          lastElement.innerHTML = node.innerHTML;
	        }
	
	        // attributes
	
	        var _loop2 = function _loop2(key) {
	          var updateAttr = false;
	          if (!lastNode.attributes) {
	            updateAttr = true;
	          } else if (node.attributes[key] != lastNode.attributes[key]) {
	            updateAttr = true;
	          }
	          if (updateAttr) {
	            (function () {
	              var value = node.attributes[key];
	              var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	              var isStringOrNumber = false;
	              if (valueType === 'string') {
	                isStringOrNumber = true;
	              } else if (valueType === 'number') {
	                isStringOrNumber = true;
	              }
	              if (isStringOrNumber) {
	                lastElement.setAttribute(key, value);
	                lastElement[key] = value;
	              } else if (valueType == 'boolean') {
	                var set = function set() {
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
	            })();
	          }
	        };
	
	        for (var key in node.attributes) {
	          _loop2(key);
	        }
	        for (var key in lastNode.attributes) {
	          var removeAttr = false;
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
	        var eventKeys = {};
	        for (var _key7 in node.events) {
	          var k = (0, _event.elementSetEvent)(lastElement, _key7, node.events[_key7].bind(node));
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
	
	        // id
	        if (node.id != lastNode.id) {
	          lastElement.id = node.id;
	        }
	
	        // class
	        for (var _key8 in node.classList) {
	          // should update
	          var updateClass = false;
	          if (!lastNode.classList) {
	            updateClass = true;
	          } else if (node.classList[_key8] != lastNode.classList[_key8]) {
	            updateClass = true;
	          }
	          if (updateClass) {
	            if (node.classList[_key8]) {
	              lastElement.classList.add(_key8);
	            } else {
	              lastElement.classList.remove(_key8);
	            }
	          }
	        }
	        for (var _key9 in lastNode.classList) {
	          var deleteClass = false;
	          if (!node.classList) {
	            deleteClass = true;
	          } else if (!(_key9 in node.classList)) {
	            deleteClass = true;
	          }
	          if (deleteClass) {
	            lastElement.classList.remove(_key9);
	          }
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
	            for (var _key10 in node.style) {
	              lastElement.style[_key10] = node.style[_key10];
	            }
	          }
	        }
	        // diff object
	        else if (styleType === 'object') {
	            if (node.style !== null) {
	              for (var _key11 in node.style) {
	                var updateStyle = false;
	                if (!lastNode.style) {
	                  updateStyle = true;
	                } else if (node.style[_key11] != lastNode.style[_key11]) {
	                  updateStyle = true;
	                }
	                if (updateStyle) {
	                  lastElement.style[_key11] = node.style[_key11];
	                }
	              }
	            }
	            if (lastNode.style !== null) {
	              for (var _key12 in lastNode.style) {
	                var clearStyle = false;
	                if (!node.style) {
	                  clearStyle = true;
	                } else if (!(_key12 in node.style)) {
	                  clearStyle = true;
	                }
	                if (clearStyle) {
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
	
	        // hook
	        if (node.hooks && node.hooks.patched) {
	          node.hooks.patched.forEach(function (fn) {
	            return fn(lastElement);
	          });
	        }
	      }); // push job
	
	      return [lastElement, node];
	    }
	  }, {
	    key: 'cacheNode',
	    value: function cacheNode(element, node) {
	      if (node instanceof _nodes.TextNode) {
	        this.textNodeCache.push([element, node]);
	      } else if (node instanceof _nodes.CommentNode) {
	        this.commentNodeCache.push([element, node]);
	      } else if (node instanceof _nodes.ElementNode) {
	        this.elementCache[element.tagName.toLowerCase()].push([element, node]);
	      } else if (node instanceof _nodes.Thunk) {
	        while (node instanceof _nodes.Thunk) {
	          node = node.getNode(this);
	          this.cacheNode(element, node);
	        }
	      }
	    }
	  }, {
	    key: 'state',
	    get: function get() {
	      return this._state.get();
	    }
	  }]);

	  return App;
	}();

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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.on = on;
	exports.elementSetEvent = elementSetEvent;
	
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
	    key: 'on',
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MutableState = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _state = __webpack_require__(5);
	
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
	    value: function updateState(statePath, object) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }
	
	      var _this2 = this;
	
	      var obj = object;
	      if (args.length === 0) {
	        return obj;
	      } else if (args.length === 1) {
	        var ret = void 0;
	        if (_typeof(args[0]) === 'object' && args[0] !== null && args[0].__is_op) {
	          ret = args[0].apply(obj, this);
	          if ((typeof ret === 'undefined' ? 'undefined' : _typeof(ret)) === 'object' && ret !== null && ret === obj) {
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
	        this.setupState(ret, statePath, forceSetup);
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
	
	            var path = statePath.slice(0);
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
	            var _match = false;
	            if (keyType === 'number' && k == key) {
	              _match = true;
	            } else if (keyType === 'string' && k == key) {
	              _match = true;
	            } else if (keyType === 'function' && key(k)) {
	              _match = true;
	            }
	            if (_match) {
	              updateKey.apply(undefined, [k, obj[k]].concat(_toConsumableArray(args.slice(1))));
	            }
	          }
	          var match = false;
	          if (keyType === 'string' && !(key in obj)) {
	            match = true;
	          } else if (keyType === 'number' && !(key in obj)) {
	            match = true;
	          }
	          if (match) {
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
	              if (arg.__aff_wo_ref_keys && arg.__aff_wo_ref_keys[_key5]) {
	                continue;
	              }
	              if (this.argsChanged(arg[_key5], lastArg[_key5])) {
	                return true;
	              }
	            }
	          }
	
	          // function
	          //else if (argType === 'function') {
	          //  if (arg.name !== lastArg.name) {
	          //    return true;
	          //  }
	          //}
	
	          // compare
	          else if (arg !== lastArg) {
	              return true;
	            }
	
	      return false;
	    }
	  }, {
	    key: 'setupState',
	    value: function setupState(state, statePath, forceSetup) {
	      var _this3 = this;
	
	      if ((typeof state === 'undefined' ? 'undefined' : _typeof(state)) != 'object') {
	        return;
	      } else if (state === null) {
	        return;
	      } else if (state.__aff_read_only) {
	        return;
	      }
	
	      var needSetup = false;
	      if (!state.hasOwnProperty('$update')) {
	        needSetup = true;
	      } else if (forceSetup) {
	        needSetup = true;
	      }
	      if (needSetup) {
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
	            }
	          });
	          Object.defineProperty(state, '$updateMulti', {
	            configurable: false,
	            enumerable: false,
	            writable: true,
	            value: function value() {
	              for (var _len5 = arguments.length, args = Array(_len5), _key7 = 0; _key7 < _len5; _key7++) {
	                args[_key7] = arguments[_key7];
	              }
	
	              var expanded = args.map(function (arg) {
	                return [].concat(_toConsumableArray(state.$path), _toConsumableArray(arg));
	              });
	              app.updateMulti.apply(app, _toConsumableArray(expanded));
	            }
	          });
	          Object.defineProperty(state, '$path', {
	            configurable: false,
	            enumerable: false,
	            writable: true,
	            value: statePath.slice(0)
	          });
	        })();
	      } else {
	        // no need to setup accessors, check path
	        if (this.app.get(statePath) !== state) {
	          // setting new state
	          if (!state.$path.reduce(function (acc, cur, i) {
	            return acc && cur == statePath[i];
	          }, true)) {
	            throw ['cannot change state object path', statePath.slice(0), state.$path];
	          }
	        }
	      }
	
	      // recursively
	      for (var key in state) {
	        var subPath = statePath.slice(0);
	        subPath.push(key);
	        this.setupState(state[key], subPath, forceSetup);
	      }
	    }
	  }]);

	  return MutableState;
	}(_state.State);

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.readOnly = readOnly;
	exports.ref = ref;
	exports.weakRef = weakRef;
	exports.cached = cached;
	exports.wrap = wrap;
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
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
	
	var Reference = exports.Reference = function Reference(name) {
	  _classCallCheck(this, Reference);
	
	  this.name = name;
	};
	
	function ref(name) {
	  return new Reference(name);
	}
	
	var WeakReference = exports.WeakReference = function (_Reference) {
	  _inherits(WeakReference, _Reference);
	
	  function WeakReference(name) {
	    _classCallCheck(this, WeakReference);
	
	    return _possibleConstructorReturn(this, (WeakReference.__proto__ || Object.getPrototypeOf(WeakReference)).call(this, name));
	  }
	
	  return WeakReference;
	}(Reference);
	
	function weakRef(name) {
	  return new WeakReference(name);
	}
	
	function cached(fn) {
	  var results = {};
	  return function (arg) {
	    if (!(arg in results)) {
	      results[arg] = fn.call(this, arg);
	    }
	    return results[arg];
	  };
	};
	
	function wrap(obj, props) {
	  var wrapped = Object.create(obj);
	  for (var key in props) {
	    wrapped[key] = props[key];
	  }
	  return wrapped;
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.skip = exports.Thunk = exports.CommentNode = exports.TextNode = exports.ElementNode = exports.Node = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.t = t;
	exports.e = e;
	
	var _event = __webpack_require__(3);
	
	var _tagged = __webpack_require__(7);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Node = exports.Node = function Node() {
	  _classCallCheck(this, Node);
	
	  this.element = null;
	};
	
	var ElementNode = exports.ElementNode = function (_Node) {
	  _inherits(ElementNode, _Node);
	
	  function ElementNode() {
	    _classCallCheck(this, ElementNode);
	
	    var _this = _possibleConstructorReturn(this, (ElementNode.__proto__ || Object.getPrototypeOf(ElementNode)).call(this));
	
	    _this.tag = null; // for element
	    _this.id = null;
	    _this.style = null;
	    _this.classList = null;
	    _this.children = null;
	    _this.attributes = null;
	    _this.events = null;
	    _this.innerHTML = null;
	    _this.hooks = null;
	    _this.key = null;
	    return _this;
	  }
	
	  _createClass(ElementNode, [{
	    key: 'toElement',
	    value: function toElement(app) {
	      var _this2 = this;
	
	      var element = void 0;
	      // use cached element
	      if (app && app.elementCache[this.tag] && app.elementCache[this.tag].length > 0) {
	        var _ret = function () {
	          if (app) {
	            app.counters.nodeCacheHit++;
	          }
	          var result = app.elementCache[_this2.tag].shift();
	          var element = result[0];
	          var lastNode = result[1];
	          result = app.patchNode(element, _this2, lastNode);
	          element = result[0];
	          _this2.element = element;
	          if (_this2.hooks && _this2.hooks.created) {
	            _this2.hooks.created.forEach(function (fn) {
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
	          childFragment.appendChild(this.children[i].toElement(app));
	        }
	        element.appendChild(childFragment);
	      }
	      if (this.attributes !== null) {
	        for (var _key in this.attributes) {
	          var value = this.attributes[_key];
	          var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	          var isStringOrNumber = false;
	          if (valueType === 'string') {
	            isStringOrNumber = true;
	          } else if (valueType === 'number') {
	            isStringOrNumber = true;
	          }
	          if (isStringOrNumber) {
	            element.setAttribute(_key, value);
	            element[_key] = value;
	          } else if (valueType == 'boolean') {
	            if (value) {
	              element.setAttribute(_key, true);
	              element[_key] = true;
	            } else {
	              element.removeAttribute(_key);
	              element[_key] = false;
	            }
	          }
	        }
	      }
	      if (this.events !== null) {
	        for (var _key2 in this.events) {
	          // set event callback, bind current Node to callback
	          // constructor must not be arrow function to get proper 'this'
	          (0, _event.elementSetEvent)(element, _key2, this.events[_key2].bind(this));
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
	  }, {
	    key: 'setSelector',
	    value: function setSelector(selector) {
	      var parts = selector.match(/[.#][A-Za-z][A-Za-z0-9_:-]*/g);
	      if (parts) {
	        for (var i = 0, l = parts.length; i < l; i++) {
	          var part = parts[i];
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
	  }, {
	    key: 'setProperties',
	    value: function setProperties(properties) {
	      for (var key in properties) {
	        var sameKey = false;
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
	              for (var _i = 0; _i < property.length; _i++) {
	                this.classList[property[_i]] = true;
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
	              for (var _key3 in style) {
	                this.style[_key3] = style[_key3];
	              }
	            }
	          }
	        } else if (/^on/.test(key) && typeof properties[key] === 'function') {
	          var isCreatedHook = false;
	          var isPatchHook = false;
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
	  }, {
	    key: 'setChildren',
	    value: function setChildren(children) {
	      if (!this.children) {
	        this.children = [];
	      }
	      var type = typeof children === 'undefined' ? 'undefined' : _typeof(children);
	      var isText = false;
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
	        var child = new TextNode();
	        child.text = children.toString();
	        this.children.push(child);
	      } else {
	        throw ['bad child', children, this];
	      }
	    }
	  }]);
	
	  return ElementNode;
	}(Node);
	
	var TextNode = exports.TextNode = function (_Node2) {
	  _inherits(TextNode, _Node2);
	
	  function TextNode() {
	    _classCallCheck(this, TextNode);
	
	    var _this3 = _possibleConstructorReturn(this, (TextNode.__proto__ || Object.getPrototypeOf(TextNode)).call(this));
	
	    _this3.text = null;
	    return _this3;
	  }
	
	  _createClass(TextNode, [{
	    key: 'toElement',
	    value: function toElement(app) {
	      if (app && app.textNodeCache.length > 0) {
	        if (app) {
	          app.counters.nodeCacheHit++;
	        }
	        var result = app.textNodeCache.shift();
	        var element = result[0];
	        var lastNode = result[1];
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
	  }]);
	
	  return TextNode;
	}(Node);
	
	var CommentNode = exports.CommentNode = function (_Node3) {
	  _inherits(CommentNode, _Node3);
	
	  function CommentNode() {
	    _classCallCheck(this, CommentNode);
	
	    var _this4 = _possibleConstructorReturn(this, (CommentNode.__proto__ || Object.getPrototypeOf(CommentNode)).call(this));
	
	    _this4.text = null;
	    return _this4;
	  }
	
	  _createClass(CommentNode, [{
	    key: 'toElement',
	    value: function toElement(app) {
	      if (app && app.commentNodeCache.length > 0) {
	        if (app) {
	          app.counters.nodeCacheHit++;
	        }
	        var result = app.commentNodeCache.shift();
	        var element = result[0];
	        var lastNode = result[1];
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
	  }]);
	
	  return CommentNode;
	}(Node);
	
	var Thunk = exports.Thunk = function (_Node4) {
	  _inherits(Thunk, _Node4);
	
	  function Thunk() {
	    _classCallCheck(this, Thunk);
	
	    var _this5 = _possibleConstructorReturn(this, (Thunk.__proto__ || Object.getPrototypeOf(Thunk)).call(this));
	
	    _this5.func = null;
	    _this5.args = null;
	    _this5.node = undefined;
	    _this5.name = null;
	    _this5.key = null;
	    return _this5;
	  }
	
	  _createClass(Thunk, [{
	    key: 'toElement',
	    value: function toElement(app) {
	      if (!this.element) {
	        var node = this.getNode(app);
	        if (node instanceof Node) {
	          this.element = node.toElement(app);
	        } else {
	          throw ['thunk function must return a Node', this, node];
	        }
	      }
	      return this.element;
	    }
	  }, {
	    key: 'getNode',
	    value: function getNode(app) {
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
	          throw ['constructor of ' + (this.name || 'anonymous') + ' returned undefined value', this];
	        }
	      }
	      return this.node;
	    }
	  }]);
	
	  return Thunk;
	}(Node);
	
	// thunk helper
	
	
	function t() {
	  for (var _len = arguments.length, args = Array(_len), _key4 = 0; _key4 < _len; _key4++) {
	    args[_key4] = arguments[_key4];
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
	      thunk.args = [];
	      for (var i = 2; i < args.length; i++) {
	        var arg = args[i];
	        if (arg instanceof _tagged.Key) {
	          thunk.key = arg.str;
	        } else {
	          thunk.args.push(arg);
	        }
	      }
	      break;
	    case 'function':
	      thunk.func = args[0];
	      thunk.name = thunk.func.name;
	      thunk.args = [];
	      for (var _i2 = 1; _i2 < args.length; _i2++) {
	        var _arg = args[_i2];
	        if (_arg instanceof _tagged.Key) {
	          thunk.key = _arg.str;
	        } else {
	          thunk.args.push(_arg);
	        }
	      }
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
	  var node = new ElementNode();
	  node.tag = tag;
	
	  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key5 = 1; _key5 < _len2; _key5++) {
	    args[_key5 - 1] = arguments[_key5];
	  }
	
	  _e.apply(undefined, [node].concat(args));
	  return node;
	}
	
	var skip = exports.skip = { skipFollowingArguments: true };
	
	function _e(node) {
	  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key6 = 1; _key6 < _len3; _key6++) {
	    args[_key6 - 1] = arguments[_key6];
	  }
	
	  for (var i = 0; i < args.length; i++) {
	    var arg = args[i];
	    if (arg instanceof Node) {
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
	    } else if (arg instanceof _tagged.Key) {
	      node.key = arg.str;
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

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Selector = Selector;
	exports.Css = Css;
	exports.Key = Key;
	function Selector(str) {
	  this.str = str;
	}
	
	function Css(str) {
	  this.str = str;
	}
	
	function Key(str) {
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
	var key = exports.key = makeTagger(Key);

/***/ },
/* 8 */
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
	
	var allOperations = _extends({
	  $func: $func,
	  $delete: $delete,
	  $del: $del,
	  $inc: $inc,
	  $dec: $dec
	}, arrayOps, {
	  $merge: $merge,
	  $any: $any
	});
	
	var op = {};
	
	for (var key in allOperations) {
	  op[key.slice(1)] = allOperations[key];
	}
	
	// export
	
	module.exports = _extends({}, allOperations, {
	  op: op
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _templateObject = _taggedTemplateLiteral(['\n  clear: both;\n'], ['\n  clear: both;\n']);
	
	var _nodes = __webpack_require__(6);
	
	var _all_tags = __webpack_require__(2);
	
	var _tagged = __webpack_require__(7);
	
	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
	
	var helpers = _all_tags.allTags.reduce(function (helpers, tag) {
	  helpers[tag] = function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _nodes.e.apply(undefined, [tag].concat(args));
	  };
	  helpers[tag.charAt(0).toUpperCase() + tag.slice(1)] = helpers[tag];
	  helpers[tag.toUpperCase()] = helpers[tag];
	  return helpers;
	}, {});
	
	var checkbox = function checkbox() {
	  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
	  }
	
	  return _nodes.e.apply(undefined, ['input', {
	    type: 'checkbox'
	  }].concat(args));
	};
	
	var none = new _nodes.CommentNode();
	none.text = ' none ';
	
	var clear = (0, _nodes.e)('div', (0, _tagged.css)(_templateObject));
	
	helpers = _extends({}, helpers, {
	  none: none,
	  None: none,
	  NONE: none,
	
	  clear: clear,
	  Clear: clear,
	  CLEAR: clear,
	
	  checkbox: checkbox,
	  Checkbox: checkbox,
	  CHECKBOX: checkbox
	});
	
	module.exports = _extends({}, helpers, {
	  h: helpers
	});

/***/ },
/* 10 */
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
	    _templateObject20 = _taggedTemplateLiteral(['#clear-updates'], ['#clear-updates']),
	    _templateObject21 = _taggedTemplateLiteral(['', ''], ['', '']),
	    _templateObject22 = _taggedTemplateLiteral(['\n      border-bottom: 1px solid #EEE;\n      margin-bottom: 1px;\n    '], ['\n      border-bottom: 1px solid #EEE;\n      margin-bottom: 1px;\n    ']),
	    _templateObject23 = _taggedTemplateLiteral(['\n        padding: 0 10px;\n        background-color: #EFE;\n        float: right;\n      '], ['\n        padding: 0 10px;\n        background-color: #EFE;\n        float: right;\n      ']),
	    _templateObject24 = _taggedTemplateLiteral(['\n        float: left;\n      '], ['\n        float: left;\n      ']),
	    _templateObject25 = _taggedTemplateLiteral(['\n          padding: 0 10px;\n          color: #AAA;\n        '], ['\n          padding: 0 10px;\n          color: #AAA;\n        ']),
	    _templateObject26 = _taggedTemplateLiteral(['\n        text-decoration: underline;\n      '], ['\n        text-decoration: underline;\n      ']),
	    _templateObject27 = _taggedTemplateLiteral(['#close-debug-panel'], ['#close-debug-panel']),
	    _templateObject28 = _taggedTemplateLiteral(['\n      margin: 10px 0;\n    '], ['\n      margin: 10px 0;\n    ']),
	    _templateObject29 = _taggedTemplateLiteral(['#panel-position-', ''], ['#panel-position-', '']),
	    _templateObject30 = _taggedTemplateLiteral(['\n        font-size: 10px;\n        width: 3em;\n      '], ['\n        font-size: 10px;\n        width: 3em;\n      ']);
	
	exports.DebugPanel = DebugPanel;
	
	var _app = __webpack_require__(1);
	
	var _nodes = __webpack_require__(6);
	
	var _tagged = __webpack_require__(7);
	
	var _event = __webpack_require__(3);
	
	var _operations = __webpack_require__(8);
	
	var _tags = __webpack_require__(9);
	
	var _state = __webpack_require__(5);
	
	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
	
	var logSerial = 0;
	
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
	            tick: state.__aff_tick,
	            key: logSerial
	          }));
	          logSerial++;
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
	  var Tabs = (0, _nodes.t)(function (debugState) {
	    return (0, _tags.div)((0, _tagged.css)(_templateObject), [{ name: 'index' }, { name: 'state' }, { name: 'updates' }].map(function (info) {
	      return (0, _tags.div)((0, _tagged.$)(_templateObject2, info.name), info.name, (0, _tagged.css)(_templateObject3, debugState.selectedTab === info.name ? '#DDD' : 'transparent'), (0, _event.on)('click', function () {
	        debugState.$update('selectedTab', info.name);
	      }));
	    }));
	  }, debugState);
	
	  var LeftPanel = (0, _tags.div)((0, _tagged.css)(_templateObject4, panelBackgroundColor, leftPanelWidth), (0, _tags.p)((0, _tagged.css)(_templateObject5), 'Debug Panel'), Tabs,
	
	  // lower left
	  (0, _tags.div)((0, _tagged.css)(_templateObject6), PanelPosition(debugState), CloseButton(debugState)));
	
	  var BottomPanel = (0, _tags.div)((0, _tagged.css)(_templateObject7, panelBackgroundColor, leftPanelWidth, bottomPanelHeight), (0, _nodes.t)(PointingPath, debugState.pointingPath));
	
	  var MainContent = (0, _nodes.t)(function (debugState, appState) {
	    return (0, _tags.div)((0, _tagged.$)(_templateObject8), (0, _tagged.css)(_templateObject9, leftPanelWidth, bottomPanelHeight), (0, _tags.div)(debugState.selectedTab, (0, _tagged.css)(_templateObject10)), function () {
	      // scroll to top when switching tab
	      var lastTab = debugState.lastTab;
	      if (debugState.selectedTab != lastTab) {
	        var elem = document.querySelector('#main') || window;
	        elem.scrollTop = 0;
	        debugState.$update('lastTab', debugState.selectedTab);
	      }
	
	      if (debugState.selectedTab === 'state') {
	        return (0, _nodes.t)(AppState, appState, debugState);
	      } else if (debugState.selectedTab === 'updates') {
	        return (0, _nodes.t)(Updates, debugState.updates, debugState.$path);
	      }
	
	      return _tags.none;
	    }, (0, _tags.div)((0, _tagged.css)(_templateObject11)));
	  }, debugState, app.state);
	
	  return [
	
	  // ui
	  (0, _tags.div)((0, _tagged.css)(_templateObject12, debugState.top || 0, debugState.left || 0, debugState.right || 0, debugState.bottom || 0), LeftPanel, BottomPanel, MainContent)];
	}
	
	function AppState(appState, debugState) {
	  return (0, _tags.div)((0, _tagged.css)(_templateObject13), (0, _nodes.t)(StateNode, appState, [], debugState));
	}
	
	function StateNode(appState) {
	  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	  var debugState = arguments[2];
	
	  return (0, _nodes.t)(function (appState, path) {
	    return (0, _tags.table)((0, _tagged.css)(_templateObject14), function () {
	      var ret = [];
	      var keys = Object.keys(appState);
	      keys.sort(function (a, b) {
	        return a > b;
	      });
	      var isArray = Array.isArray(appState);
	
	      var _loop = function _loop(i) {
	        var key = keys[i];
	        if (appState[key] === debugState) {
	          // skip debug state
	          return 'continue';
	        }
	        if (key.charAt(0) >= 'A' && key.charAt(0) <= 'Z') {
	          // skip component state
	          return 'continue';
	        }
	        var valueNode = void 0;
	        if (_typeof(appState[key]) === 'object') {
	          var subpath = path.slice(0);
	          subpath.push(key);
	          valueNode = (0, _nodes.t)(StateNode, appState[key], subpath, debugState);
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
	        isArray ? null : (0, _tags.td)(key, (0, _tagged.css)(_templateObject16), bindPointingPath),
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
	  return (0, _tags.div)((0, _tagged.css)(_templateObject13), (0, _tags.button)((0, _tagged.$)(_templateObject20), 'Clear', (0, _event.on)('click', function () {
	    updates.$update([]);
	  })), function () {
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
	
	      ret.push((0, _nodes.t)(UpdateLogEntry, (0, _tagged.key)(_templateObject21, log.key), log));
	    };
	
	    for (var i = updates.length - 1; i >= 0; i--) {
	      var _ret3 = _loop2(i);
	
	      if (_ret3 === 'continue') continue;
	    }
	    return ret;
	  });
	}
	
	function UpdateLogEntry(log) {
	  return (0, _tags.div)((0, _tagged.css)(_templateObject22), (0, _tagged.key)(_templateObject21, log.key), (0, _tags.span)('tick: ', log.tick, (0, _tagged.css)(_templateObject23)), log.args.map(function (arg, i) {
	    return (0, _tags.span)((0, _tagged.css)(_templateObject24), (0, _tags.span)((0, _tagged.css)(_templateObject25), function () {
	      if (i > 0 && i != log.args.length - 1) {
	        return '.';
	      } else if (i == log.args.length - 1) {
	        return '=>';
	      }
	      return '';
	    }), formatArg(arg));
	  }), _tags.clear);
	}
	
	function formatArg(arg) {
	  if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg.__is_op) {
	    return [(0, _tags.span)(arg.op, (0, _tagged.css)(_templateObject26)), arg.args ? [': ', function () {
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
	  return (0, _tags.button)((0, _tagged.$)(_templateObject27), (0, _tagged.css)(_templateObject28), (0, _event.on)('click', function () {
	    debugState.$update('show', false);
	  }), 'Close');
	}
	
	function PanelPosition(debugState) {
	  function makeButton(text, left, right, top, bottom) {
	    return (0, _tags.button)((0, _tagged.$)(_templateObject29, text), (0, _tagged.css)(_templateObject30), text, (0, _event.on)('click', function () {
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
	
	  return (0, _tags.div)((0, _tagged.css)(_templateObject28), (0, _tags.div)(makeButton('TL', 0, 100 - width + '%', 0, 100 - height + '%'), makeButton('TP', 0, 0, 0, 100 - height + '%'), makeButton('TR', 100 - width + '%', 0, 0, 100 - height + '%')), (0, _tags.div)(makeButton('LE', 0, 100 - width + '%', 0, 0), makeButton('MI', 0, 0, 0, 0), makeButton('RI', 100 - width + '%', 0, 0, 0)), (0, _tags.div)(makeButton('BL', 0, 100 - width + '%', 100 - height + '%', 0), makeButton('BO', 0, 0, 100 - height + '%', 0), makeButton('BR', 100 - width + '%', 0, 100 - height + '%', 0)));
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=affjs.js.map
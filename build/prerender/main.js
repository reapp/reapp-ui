module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var Application = __webpack_require__(3);
	var html = __webpack_require__(6);

	module.exports = function(scriptUrl, styleUrl, commonsUrl) {
	  var application = React.renderComponentToString(Application(null));
	  return html
	    .replace("STYLE_URL", styleUrl)
	    .replace("SCRIPT_URL", scriptUrl)
	    .replace("COMMONS_URL", commonsUrl)
	    .replace("CONTENT", application);
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("react");

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React  = __webpack_require__(1);
	var Reactor = __webpack_require__(7).inject(React);
	var Routes = __webpack_require__(4);
	var Layout = __webpack_require__(5);

	var Agave = __webpack_require__(8);
	Agave.enable('r');

	var App = Reactor.createClass({

	  routes: Routes,

	  updatePageData: function(data) {
	    console.log('got new stuff', data);
	  },

	  render: function(Page, state) {
	    // var head = this.state.head;
	    // var title = head ? head.title || '' : '';
	    var title = "";

	    return (
	      Layout({onClick: this.navigate, title: title}, 
	        Page({className: "page"})
	      )
	    );
	  }

	});

	module.exports = App;

	// Reactor.browserStart(App);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {

	  '/': __webpack_require__(9),

	  '404': __webpack_require__(10)

	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(1);

	if (typeof window !== 'undefined') {
	  window.GSS_CONFIG = {
	    worker: "/bower/gss/dist/worker.js"
	  };
	}

	module.exports = React.createClass({displayName: 'exports',

	  render: function() {
	    return (
	      React.DOM.html(null, 
	        React.DOM.head(null, 
	          React.DOM.meta({charSet: "utf-8"}), 
	          React.DOM.meta({'http-equiv': "X-UA-Compatible", content: "IE=edge"}), 
	          React.DOM.meta({name: "description", content: ""}), 
	          React.DOM.meta({name: "viewport", content: "width=device-width, initial-scale=1"}), 
	          React.DOM.title(null, this.props.title), 
	          React.DOM.link({rel: "stylesheet", href: "/assets/css/app.css", type: "text/css", media: "all"}), 
	          React.DOM.link({rel: "stylesheet", type: "text/gss", href: "/assets/gss/styles.gss"}), 
	          React.DOM.script({type: "text/javascript", src: "/bower/scroller/src/Animate.js"}), 
	          React.DOM.script({type: "text/javascript", src: "/bower/scroller/src/EasyScroller.js"}), 
	          React.DOM.script({type: "text/javascript", src: "/bower/scroller/src/Scroller.js"}), 
	          React.DOM.script({src: "/bower/gss/dist/gss.js"})
	        ), 
	        React.DOM.body({onClick: this.props.onClick}, 
	          this.props.children
	        )
	      )
	    );
	  }

	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <link rel=\"stylesheet\" href=\"STYLE_URL\">\n</head>\n<body>\n  CONTENT\n  <script src=\"SCRIPT_URL\"></script>\n</body>\n</html>";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var ReactAsync = __webpack_require__(13);
	var ReactMount = __webpack_require__(11);
	var Router     = __webpack_require__(14);
	var PushState  = __webpack_require__(15);
	var isBrowser  = (typeof window !== 'undefined');

	// Allow full page rendering
	ReactMount.allowFullPageRender = true;

	/*
	 * Reactor should be used at the top level to start an app
	 *   Reactor.createClass() works like a normal React component
	 *   but also has logic to handle Reactor pages.
	 *
	 *   Use Reactor.browserStart() to start your app in the browser.
	 */

	var Reactor = {

	  start: function(app) {
	    ReactAsync.renderComponentToStringWithAsyncState(app);
	  },

	  browserStart: function(App) {
	    if (!isBrowser) return;

	    // Globalize React
	    window.React = React;

	    // Attach first render to window.onload
	    window.onload = function() {
	      var reactApp = React.createClass(App);
	      Reactor.activePage = React.renderComponent(reactApp(), document);
	    };
	  },

	  page: {

	    createClass: function(spec) {
	      var newSpec = {};
	      newSpec.statics = spec.statics || {};
	      newSpec.statics.head = {};
	      newSpec.statics.head.title = spec.title;
	      newSpec.statics.getProps = spec.getProps;
	      newSpec.render = function() {
	        var html = spec.render.call(this);
	        return html;
	      };
	      newSpec = Reactor._mergeObject(spec, newSpec, {
	        except: ['render', 'title', 'getProps']
	      });
	      return React.createClass(newSpec);
	    }

	  },

	  createClass: function(spec) {
	    if (spec.routes)
	      Router.setRoutes(spec.routes);

	    var reactorSpec = {
	      mixins: [
	        Router,
	        PushState,
	        ReactAsync.Mixin
	      ],

	      statics: spec.statics,
	      routes: spec.routes,

	      shouldComponentUpdate: function() {
	        this.shouldUpdate;
	      },

	      getInitialStateAsync: function(cb) {
	        this.setRoute(this.props.path);
	        this.getStateFromPage(cb);
	      },

	      routerPageChange: function(cb) {
	        this.getStateFromPage(function(err, data) {
	          cb(this.setState(err ? {error: err} : data));
	        }.bind(this));
	      },

	      getStateFromPage: function(cb) {
	        var page = this.route.page;

	        if (!page.getProps)
	          return cb(null, null);

	        var params = this.route.params;
	        var props = {
	          root: this.rootUrl(),
	          params: params,
	          head: {}
	        };

	        var callback = function(err, data) {
	          props.data = data;
	          props.err = err;
	          setHeadProperties(page, props, data);
	          cb(err, props);
	        };

	        var setHeadProperties = function(page, props, data) {
	          for (var key in page.head) {
	            var prop = page.head[key];
	            props.head[key] = (typeof prop == 'function') ?
	              prop(data, params) :
	              prop;
	          }
	        };

	        page.getProps(callback, props);
	      },

	      render: function() {
	        return spec.render.call(this, this.route.page, this.state);
	      }
	    };

	    return React.createClass(
	      Reactor._mergeObject(spec, reactorSpec, {
	        except: ['render', 'getInitialState']
	      })
	    );
	  },

	  /*
	   *  Reactor.inject takes React as its parameter and adds a few methods to React
	   *    isBrowser: Helper method to detect if running in browser
	   */
	  inject: function(react) {
	    // TODO: Invariant to check for React
	    React = react;
	    react.isBrowser = isBrowser;
	    return this;
	  },

	  _each: function(obj, fn) {
	    var result = "";
	    for (var key in obj) {
	      result += fn(key, obj[key]);
	    }
	    return result;
	  },

	  _mergeObject: function(from, to, opts) {
	    var result = to,
	        except = opts.except || [];

	    for (var key in from) {
	      if (from.hasOwnProperty(key) && except.indexOf(key) === -1) {
	        result[key] = from[key];
	      }
	    }

	    return result;
	  }

	};

	module.exports = Reactor;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// Agave.JS
	// I'm a UMD module (works in RequireJS and CommonJS-like environments)
	// See https://github.com/umdjs
	(function (global, factory) {
	  if (true) {
	    // Node. Does not work with strict CommonJS, but
	    // only CommonJS-like enviroments that support module.exports,
	    // like Node.
	    module.exports = factory(global);
	  } else if (typeof define === 'function' && define.amd) {
	    // AMD. Register as an anonymous module.
	    define(factory);
	  } else {
	    // Browser globals (global is window)
	    global.returnExports = factory();
	  }
	}(this, function(global) {

	  var enabledPrefixes = {}; // Only allow agave to be enabled once per prefix

	  // Extend objects with Agave methods, using the prefix provided.
	  var enable = function(prefix){
	    // 'this' would be 'window' in browser enviroments.
	    // Must come before strict mode, otherwise requirejs breaks.

	    var global = this;

	    "use strict";

	    prefix = prefix || '';

	    if ( enabledPrefixes[prefix] ) {
	      return;
	    }

	    var SECONDS = 1000;
	    var MINUTES = 60 * SECONDS;
	    var HOURS = 60 * MINUTES;
	    var DAYS = 24 * HOURS;
	    var WEEKS = 7 * DAYS;

	    // object.getKeys() returns an array of keys
	    var getKeys = function(){
	      return Object.keys(this);
	    };

	    // object.getSize() returns the number of properties in the object
	    var getSize = function() {
	      return Object.keys(this).length;
	    };

	    // string.reverse()
	    var reverse = function() {
	      return this.split("").reverse().join("");
	    };

	    // string.leftStrip(stripChars) returns the string with the leading chars removed
	    var leftStrip = function(stripChars) {
	      var result = this;
	      while ( true ) {
	        // Note result could be zero characters
	        if ( ! stripChars[prefix+'contains'](result.charAt(0)) || ! result) {
	          return result;
	        } else {
	          result = result.slice(1);
	        }
	      }
	    };

	    // string.rightStrip(stripChars) returns the string with the trailing chars removed
	    var rightStrip = function(stripChars) {
	      return this[prefix+'reverse']()[prefix+'leftStrip'](stripChars)[prefix+'reverse']();
	    };

	    // string.strip(stripChars) returns the string with the leading and trailing chars removed
	    var strip = function(stripChars) {
	      return this[prefix+'leftStrip'](stripChars)[prefix+'rightStrip'](stripChars);
	    };

	    // object.getPath - get the value of the nested keys provided in the object.
	    // If any are missing, return undefined. Used for checking JSON results.
	    var getPath = function(pathItems) {
	      var currentObject = this;
	      var delim = '/';
	      var result;
	      var stillChecking = true;
	      // Handle Unix style paths
	      if ( typeof(pathItems) === 'string' ) {
	        pathItems = pathItems[prefix+'strip'](delim).split(delim);
	      }
	      pathItems.forEach( function(pathItem) {
	        if ( stillChecking ) {
	          if ( ( currentObject === null ) || ( ! currentObject.hasOwnProperty(pathItem) ) ) {
	            result = undefined;
	            stillChecking = false;
	          } else {
	            result = currentObject[pathItem];
	            currentObject = currentObject[pathItem];
	          }
	        }
	      });
	      return result;
	    };

	    // object.extent(object) adds the keys/values from the newObject provided
	    var objectExtend = function(newObject) {
	      for ( var key in newObject ) {
	        this[key] = newObject[key];
	      }
	      return this;
	    };

	    // array.findItem(testFunction) returns the first item that matches the testFunction
	    var findItem = function(testFunction){
	      var lastIndex;
	      var found = this.some(function(item, index) {
	        lastIndex = index;
	        return testFunction(item);
	      });
	      if ( found ) {
	        return this[lastIndex];
	      } else {
	        return null;
	      }
	    };

	    // Run after it hasn't been invoked for 'wait' ms.
	    // Useful to stop repeated calls to a function overlapping each other (sometimes called 'bouncing')
	    var throttle = function(wait, immediate) {
	      var timeoutID;
	      var originalFunction = this;
	      return function() {
	        var context = this;
	        var delayedFunction = function() {
	          timeoutID = null;
	          if ( ! immediate ) {
	            originalFunction.apply(context, arguments);
	          }
	        };
	        var callNow = immediate && ! timeoutID;
	        clearTimeout(timeoutID);
	        timeoutID = setTimeout(delayedFunction, wait);
	        if (callNow) {
	          originalFunction.apply(context, arguments);
	        }
	      };
	    };

	    // Run repeatedly
	    var functionRepeat = function(first, second, third){
	      var args, interval, leadingEdge;
	      if ( arguments.length === 2 ) {
	        args = [];
	        interval = first;
	        leadingEdge = second;
	      } else {
	        args = first;
	        interval = second;
	        leadingEdge = third;
	      }
	      if ( leadingEdge ) {
	        this.apply(null, args);
	      }
	      return setInterval(function(){
	        this.apply(null, args);
	      }.bind(this), interval)
	    }

	    // string.endsWith(suffix) returns true if string ends with the suffix
	    var endsWith = function(suffix) {
	      return this.indexOf(suffix, this.length - suffix.length) !== -1;
	    };

	    // string.endsWith(prefix) returns true if string ends with the prefix
	    var startsWith = function(prefix){
	      return this.slice(0, prefix.length) === prefix;
	    };

	    // array.contains(item) returns true if an array contains an item
	    // string.contains(substring) returns true if a string contains a substring
	    var contains = function(item){
	      return ( this.indexOf(item) >= 0 );
	    };

	    // Extend an array with another array.
	    // Cleverness alert: since .apply() accepts an array of args, we use the newArray as all the args to push()
	    var arrayExtend = function(newArray) {
	      Array.prototype.push.apply(this, newArray);
	      return this;
	    };

	    // string.repeat() repeat a string 'times' times. Borrowed from ES6 shim at https://github.com/paulmillr/es6-shim
	    var repeat = function(times) {
	      if (times < 1) return '';
	      if (times % 2) return this[prefix+'repeat'](times - 1) + this;
	      var half = this[prefix+'repeat'](times / 2);
	      return half + half;
	    };

	    // string.toHash() return a hashed value of a string
	    // From http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
	    var toHash = function(){
	      var hash = 0,
	        length = this.length,
	        char;
	      if ( ! length ) {
	        return hash;
	      }
	      for (var index = 0; index < length; index++) {
	        char = this.charCodeAt(index);
	        hash = ((hash<<5)-hash)+char;
	        hash |= 0; // Convert to 32bit integer
	      }
	      return hash;
	    };

	    // Clone an object recursively
	    var clone = function() {
	      var newObj = (this instanceof Array) ? [] : {};
	      for (var key in this) {
	        if (this[key] && typeof this[key] == "object") {
	          newObj[key] = this[key][prefix+'clone']();
	        } else {
	          newObj[key] = this[key];
	        }
	      }
	      return newObj;
	    };

	    // compare an object with another object
	    var compare = function(otherObject){
	      var hashObject = function(object){
	        return JSON.stringify(object)[prefix+'toHash']();
	      };
	      return ( hashObject(this) === hashObject(otherObject) );
	    };

	    // Iterate over an objects keys
	    // Unlike a regular for ( var key in object )
	    // an additional scope is created, which avoids last-item looping probs
	    var objectForEach = function(callback){
	      for ( var key in this ) {
	        callback(key, this[key]);
	      }
	    };

	    var arrayClone = function(){
	      return this.slice();
	    };

	    // Array toNodeList converts arrays to NodeLists
	    var toNodeList = function(){
	      var fragment = document.createDocumentFragment();
	      this.forEach(function(item){
	        fragment.appendChild(item);
	      });
	      return fragment.childNodes;
	    };

	    // Array remove removes an item from an array, if it exists
	    var arrayRemove = function (member){
	      var index = this.indexOf(member);
	      if (index !== -1 ) {
	        this.splice(index, 1);
	        return true;
	      }
	      return false;
	    };

	    // Convert Number to (function name). +ensures type returned is still Number
	    var seconds = function() {
	      return +this * SECONDS;
	    };
	    var minutes = function() {
	      return +this * MINUTES;
	    };
	    var hours = function() {
	      return +this * HOURS;
	    };
	    var days = function() {
	      return +this * DAYS;
	    };
	    var weeks = function() {
	      return +this * WEEKS;
	    };

	    // Helper function for before() and after()
	    var getTimeOrNow = function(date) {
	      return (date || new Date()).getTime();
	    };

	    // Return Number of seconds to time delta from date (or now if not specified)
	    var before = function(date) {
	      var time = getTimeOrNow(date);
	      return new Date(time-(+this));
	    };

	    // Return Number of seconds to time delta after date (or now if not specified)
	    var after = function(date) {
	      var time = getTimeOrNow(date);
	      return new Date(time+(+this));
	    };

	    // Round Number
	    var round = function () {
	      return Math.round(this);
	    };

	    var ceil = function () {
	      return Math.ceil(this);
	    };

	    var floor = function () {
	      return Math.floor(this);
	    };

	    var abs = function () {
	      return Math.abs(this);
	    };

	    var pow = function (exp) {
	      return Math.pow(this, exp);
	    };

	    // Add a new element as a child of this element
	    var createChild = function(name, attributes, text) {
	      var newElement = document.createElement(name);
	      if ( attributes ) {
	        for (var attribute in attributes) {
	          newElement.setAttribute(attribute, attributes[attribute]);
	        }
	      }
	      if ( text ) {
	        newElement.textContent = text;
	      }
	      return this.appendChild(newElement);
	    };

	    // Apply the CSS styles
	    var applyStyles = function(styles) {
	      for ( var style in styles ) {
	        this.style[style] = styles[style];
	      }
	      return this;
	    };

	    // Toggle a class (considering replacing this with IE9 only element.classList.toggle)
	    var toggleClass = function(className) {
	      if ( this.classList.contains(className) ) {
	        this.classList.remove(className);
	      } else {
	        this.classList.add(className);
	      }
	      return this;
	    };

	    // Return nodeList of an elements parent elements from closest to farthest
	    var ancestorNodes = function(selector) {
	      var ancestors = [];
	      var parent = this.parentNode;
	      // While parents are 'element' type nodes
	      // See https://developer.mozilla.org/en-US/docs/DOM/Node.nodeType
	      while ( parent && parent.nodeType && parent.nodeType === 1 ) {
	        if ( selector ) {
	          if ( parent.matches(selector) ) {
	            ancestors.push(parent);
	          }
	        } else {
	          ancestors.push(parent);
	        }
	        parent = parent.parentNode;
	      }
	      // Return a NodeList to be consistent with childNodes
	      return ancestors[prefix+'toNodeList']();
	    };

	    // Return index of node under its parents. Eg, if you're the fourth child, return 3.
	    var getParentIndex = function() {
	      return Array.prototype.indexOf.call(this.parentNode.children, this);
	    }

	    var kind = function(item) {
	      var getPrototype = function(item) {
	        return Object.prototype.toString.call(item).slice(8, -1);
	      };
	      var kind, Undefined;
	      if (item === null ) {
	        kind = 'null';
	      } else {
	        if ( item === Undefined ) {
	          kind = 'undefined';
	        } else {
	          var prototype = getPrototype(item);
	          if ( ( prototype === 'Number' ) && isNaN(item) ) {
	            kind = 'NaN';
	          } else {
	            kind = prototype;
	          }
	        }
	      }
	      return kind;
	    };

	    // Polyfill if Element.prototype.matches doesn't exist.
	    var prefixedMatchesMethod = ( ! global.Element || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.oMatchesSelector);

	    // Add method as a non-enumerable property on obj with the name methodName
	    var addMethod = function( global, objectName, prefix, methodName, method) {
	      var objectToExtend = global[objectName];
	      methodName = prefix ? prefix+methodName: methodName;
	      // Check - NodeLists and Elements don't always exist on all JS implementations
	      if ( objectToExtend ) {
	        // Don't add if the method already exists
	        if ( ! objectToExtend.prototype.hasOwnProperty(methodName) ) {
	          Object.defineProperty( objectToExtend.prototype, methodName, {
	            value: method,
	            enumerable: false,
	            writable: true
	          });
	        }
	      }
	    };

	    // There's not always a 1:1 match of functions to method names. Eg, some objects share methods,
	    // others re-use inbuilt methods from other objects.
	    var newMethods = {
	      'Array':{
	        'findItem':findItem,
	        'extend':arrayExtend,
	        'contains':contains,
	        'clone':arrayClone,
	        'toNodeList':toNodeList,
	        'remove':arrayRemove
	      },
	      'Object':{
	        'getKeys':getKeys,
	        'getSize':getSize,
	        'getPath':getPath,
	        'clone':clone,
	        'forEach':objectForEach,
	        'extend':objectExtend,
	        'compare':compare
	      },
	      'String':{
	        'endsWith':endsWith,
	        'startsWith':startsWith,
	        'repeat':repeat,
	        'reverse':reverse,
	        'leftStrip':leftStrip,
	        'rightStrip':rightStrip,
	        'strip':strip,
	        'contains':contains,
	        'toHash':toHash,
	        'forEach':Array.prototype.forEach // Strings and NodeLists don't have .forEach() standard but the one from Array works fine
	      },
	      'Function':{
	        'throttle':throttle,
	        'repeat':functionRepeat
	      },
	      'Number':{
	        'seconds':seconds,
	        'minutes':minutes,
	        'hours':hours,
	        'days':days,
	        'weeks':weeks,
	        'before':before,
	        'after':after,
	        'round':round,
	        'ceil':ceil,
	        'floor':floor,
	        'abs':abs,
	        'pow':pow
	      },
	      'Element':{
	        'createChild':createChild,
	        'ancestorNodes':ancestorNodes,
	        'matches':prefixedMatchesMethod,
	        'applyStyles':applyStyles,
	        'toggleClass':toggleClass,
	        'getParentIndex':getParentIndex
	      },
	      'NodeList':{
	        'forEach':Array.prototype.forEach,
	        'reverse':Array.prototype.reverse
	      }
	    };
	    for ( var objectName in newMethods ) {
	      for ( var methodName in newMethods[objectName] ) {
	        addMethod(global, objectName, prefix, methodName, newMethods[objectName][methodName]);
	      }
	    }

	    // Add a function to the global
	    var addGlobal = function( global, globalName, prefix, globalFunction) {
	      globalName = prefix ? prefix+globalName: globalName;
	      // Don't add if the global already exists
	      if ( ! global.hasOwnProperty(globalName) ) {
	        global[globalName] = globalFunction;
	      }
	    };
	    addGlobal(global, 'kind', prefix, kind);

	    enabledPrefixes[prefix] = true;
	  }.bind();

	  // Just return a value to define the module export.
	  // This example returns an object, but the module
	  // can return a function as the exported value.
	  return {
	    enable:enable
	  };
	}));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var Reactor = __webpack_require__(7);
	var Superagent = __webpack_require__(16);
	var ImageBox = __webpack_require__(12);

	module.exports = Reactor.page.createClass({

	  title: 'Home',

	  getProps: function(cb, props) {
	    Superagent
	      .get('http://localhost:3000/articles.json')
	      .end(function(err, res) {
	        cb(err, { articles: res.body });
	      });
	  },

	  render: function() {
	    return (
	      React.DOM.div({id: "HomePage"}, 
	        ImageBox({images: this.state.data.articles})
	      )
	    );
	  }

	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var ReactorPage = __webpack_require__(7).page;

	module.exports = ReactorPage.createClass({

	  title: '404',

	  render: function() {
	    return (
	      React.DOM.div(null, 
	        React.DOM.h2(null, "Page Not Found!"), 
	        React.DOM.p(null, "404")
	      )
	    );
	  }

	 });

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("react/lib/ReactMount");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(1);
	var Image = __webpack_require__(17);

	module.exports = React.createClass({displayName: 'exports',

	  style: {
	    width: '100%'
	  },

	  layout: {
	  },

	  getInitialState: function() {
	    return {
	      activeImage: 0,
	      numImages: this.props.images.length,
	      width: 0
	    };
	  },

	  componentDidMount: function() {
	    window.addEventListener('resize', this.handleWindowSize);
	    this.handleWindowSize();
	  },

	  handleWindowSize: function() {
	    this.setState({
	      width: this.refs.images.getDOMNode().offsetWidth
	    });
	  },

	  onMouseMove: function(e) {
	    var which = Math.round(this.state.numImages * ( e.clientX / this.state.width ) );
	    this.setState({ activeImage: which });
	  },

	  render: function() {
	    var base = "http://localhost:3111/images/home/";

	    return (
	      React.DOM.div({ref: "images", id: "images", style: this.style, onMouseMove: this.onMouseMove}, 
	        this.props.images.map(function(image, index) {
	          var fullSrc = base + image.image_url;
	          var active = index === this.state.activeImage;
	          return (
	            Image({src: fullSrc, active: active})
	          );
	        }.bind(this))
	      )
	    );
	  }

	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React                   = __webpack_require__(1);
	var invariant               = __webpack_require__(18);
	var Preloaded               = __webpack_require__(19);
	var getComponentFingerprint = __webpack_require__(20);
	var injectIntoMarkup        = __webpack_require__(21);
	var prefetchAsyncState      = __webpack_require__(22);
	var isAsyncComponent        = __webpack_require__(23);

	var Mixin = {

	  getInitialState: function() {
	    if (this.props.asyncState) {
	      return this.props.asyncState;
	    }

	    var Fiber;

	    try {
	      Fiber = __webpack_require__(40);
	    } catch(err) {

	    }

	    if (Fiber === undefined ||
	        Fiber.current === undefined ||
	        Fiber.current.__reactAsyncStatePacket === undefined) {
	      return {};
	    }

	    invariant(
	      typeof this.getInitialStateAsync === 'function',
	      this.displayName + ' component must implement a `getInitialStateAsync` method. ' +
	      'Otherwise you should not use ReactAsync.Mixin'
	    );

	    var Future = __webpack_require__(31);

	    var getInitialStateAsync = Future.wrap(function(cb) {
	      var promise = this.getInitialStateAsync(cb);

	      if (promise && typeof promise.then === 'function') {
	        promise.then(cb.bind(cb, null), cb);
	      } else if (promise === false) {
	        cb(null);
	      }
	    }.bind(this));
	    var asyncState = getInitialStateAsync().wait();
	    var fingerprint = getComponentFingerprint(this);

	    var storedAsyncState = asyncState;

	    if (typeof this.stateToJSON === 'function') {
	      storedAsyncState = this.stateToJSON(storedAsyncState);
	    }

	    Fiber.current.__reactAsyncStatePacket[fingerprint] = storedAsyncState;

	    return asyncState || {};
	  }
	}

	/**
	 * Prefetch async state recursively and render component markup asynchronously.
	 *
	 * @param {ReactComponent} component
	 * @param {Function<Error, String, Object>} cb
	 */
	function renderComponentToStringWithAsyncState(component, cb) {

	  try {
	    var Fiber = __webpack_require__(40);
	  } catch (err) {
	    console.error('install fibers: npm install fibers');
	    throw err;
	  }

	  Fiber(function() { // jshint ignore:line
	    try {
	      Fiber.current.__reactAsyncStatePacket = {};

	      var data = Fiber.current.__reactAsyncStatePacket;
	      var markup = React.renderComponentToString(component);

	      // Inject data if callback doesn't receive the data argument
	      if (cb.length == 2) {
	        markup = injectIntoMarkup(markup, data)
	      }

	      cb(null, markup, data);
	    } catch(e) {
	      cb(e)
	    } finally {
	      delete Fiber.current.__reactAsyncStatePacket;
	    }
	  }).run();
	}

	module.exports = {
	  prefetchAsyncState: prefetchAsyncState,
	  isAsyncComponent: isAsyncComponent,
	  Mixin: Mixin,
	  Preloaded: Preloaded,
	  renderComponentToStringWithAsyncState: renderComponentToStringWithAsyncState,
	  injectIntoMarkup: injectIntoMarkup
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var UrlPattern = __webpack_require__(41);
	var invariant  = __webpack_require__(18);

	var Router = {
	  componentWillMount: function() {
	    this.setRoute(this.props.path);
	    this.shouldUpdate = true;
	  },

	  componentWillReceiveProps: function(props) {
	    if (!props.path) return;
	    this.setRoute(props.path);
	    this.shouldUpdate = false;

	    // Allow a callback to do things before changing pages
	    if (typeof this.routerPageChange == 'function')
	      this.routerPageChange(function() {
	        this.shouldUpdate = true;
	        this.forceUpdate();
	      }.bind(this));
	    else
	      this.shouldUpdate = true;
	  },

	  setRoute: function(path) {
	    if (this.route && path === this.props.path)
	      return this.route;
	    this.route = Router.getRoute(path);
	    return this.route;
	  },

	  setRoutes: function(routes) {
	    invariant(routes, 'Must set a routes key on your Reactor class with an \
	      \n object containing { \'/route\': require(\'page\')');
	    if (this._routes) return; // already set
	    this._routesHash = routes;
	    this._routes = Object.keys(routes).map(function(path) {
	      return { path: path, to: routes[path] };
	    });
	  },

	  getRoute: function(path) {
	    if (!this._routes) this.setRoutes();

	    invariant(
	      this._routes,
	      'Please run setRoutes() with a routes hash \
	      before calling getRoute()'
	    );

	    var path = path || window.location.pathname;
	    var i, len = this._routes.length;

	    for (i = 0; i < len; i++) {
	      var route = this._routes[i];
	      route.pattern = route.pattern || UrlPattern.newPattern(route.path);
	      match = route.pattern.match(path);
	      if (match) {
	        return { page: route.to, params: match };
	      }
	    }

	    // return 404 page
	    return { page: this._routesHash['404'] };
	  },

	  getPage: function(path) {
	    return this.getRoute(path).page;
	  },

	  getParams: function(path) {
	    return this.getRoute(path, true).params;
	  },

	  replaceParams: function(path, params) {
	    if (path.indexOf(':') !== -1)
	      for (var key in params)
	        path = path.replace(':' + key, params[key]);

	    return path;
	  },

	  rootUrl: function() {
	    if (this._rootUrl) return this._rootUrl;

	    try {
	      var protocol = (this.props.protocol || window.location.protocol) + '//';
	    }
	    catch(e) {
	      var protocol = 'http://';
	    }

	    var port = this.props.port ? ':' + this.props.port : '';
	    var host = this.props.host || window.location.host;
	    this._rootUrl = protocol + host + port;
	    return this._rootUrl;
	  }
	};

	module.exports = Router;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {

	  componentDidMount: function() {
	    window.addEventListener('popstate', this._onPopState);
	  },

	  componentWillUnmount: function() {
	    window.removeEventListener('popstate', this._onPopState);
	  },

	  navigate: function(e) {
	    if (e.target.tagName !== 'A' || !e.target.attributes.href) return;
	    e.preventDefault();

	    var path = e.target.attributes.href.value;
	    window.history.pushState({}, '', path);
	    this._navigateCallback(path);
	  },

	  _onPopState: function(e) {
	    var path = window.location.pathname;

	    if (this.state.path !== path) {
	      this.setState({path: path});
	      this._navigateCallback(path);
	    }
	  },

	  _navigateCallback: function(path) {
	    this.setProps({path: path});

	    // Allow hooks after navigate
	    if (typeof this.onNavigate === 'function')
	      this.onNavigate(path);
	  }

	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var debug = __webpack_require__(47)('superagent');
	var formidable = __webpack_require__(48);
	var FormData = __webpack_require__(49);
	var Response = __webpack_require__(32);
	var parse = __webpack_require__(24).parse;
	var format = __webpack_require__(24).format;
	var methods = __webpack_require__(43);
	var Stream = __webpack_require__(25);
	var utils = __webpack_require__(33);
	var extend = __webpack_require__(44);
	var Part = __webpack_require__(34);
	var mime = __webpack_require__(50);
	var https = __webpack_require__(26);
	var http = __webpack_require__(27);
	var fs = __webpack_require__(28);
	var qs = __webpack_require__(45);
	var zlib = __webpack_require__(29);
	var util = __webpack_require__(30);
	var pkg = __webpack_require__(46);

	/**
	 * Expose the request function.
	 */

	exports = module.exports = request;

	/**
	 * Expose the agent function
	 */

	exports.agent = __webpack_require__(35);

	/**
	 * Expose `Part`.
	 */

	exports.Part = Part;

	/**
	 * Noop.
	 */

	function noop(){};

	/**
	 * Expose `Response`.
	 */

	exports.Response = Response;

	/**
	 * Define "form" mime type.
	 */

	mime.define({
	  'application/x-www-form-urlencoded': ['form', 'urlencoded', 'form-data']
	});

	/**
	 * Protocol map.
	 */

	exports.protocols = {
	  'http:': http,
	  'https:': https
	};

	/**
	 * Check if `obj` is an object.
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */

	function isObject(obj) {
	  return null != obj && 'object' == typeof obj;
	}

	/**
	 * Default serialization map.
	 *
	 *     superagent.serialize['application/xml'] = function(obj){
	 *       return 'generated xml here';
	 *     };
	 *
	 */

	exports.serialize = {
	  'application/x-www-form-urlencoded': qs.stringify,
	  'application/json': JSON.stringify
	};

	/**
	 * Default parsers.
	 *
	 *     superagent.parse['application/xml'] = function(res, fn){
	 *       fn(null, result);
	 *     };
	 *
	 */

	exports.parse = __webpack_require__(36);

	/**
	 * Initialize a new `Request` with the given `method` and `url`.
	 *
	 * @param {String} method
	 * @param {String|Object} url
	 * @api public
	 */

	function Request(method, url) {
	  Stream.call(this);
	  var self = this;
	  if ('string' != typeof url) url = format(url);
	  this._agent = false;
	  this._formData = null;
	  this.method = method;
	  this.url = url;
	  this.header = {};
	  this.writable = true;
	  this._redirects = 0;
	  this.redirects(5);
	  this.cookies = '';
	  this.qs = {};
	  this._redirectList = [];
	  this.on('end', this.clearTimeout.bind(this));
	  this.on('response', function(res){
	    self.callback(null, res);
	  });
	}

	/**
	 * Inherit from `Stream`.
	 */

	util.inherits(Request, Stream);

	/**
	 * Write the field `name` and `val` for "multipart/form-data"
	 * request bodies.
	 *
	 * ``` js
	 * request.post('http://localhost/upload')
	 *   .field('foo', 'bar')
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} name
	 * @param {String|Buffer|fs.ReadStream} val
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.field = function(name, val){
	  debug('field', name, val);
	  if (!this._formData) this._formData = new FormData();
	  this._formData.append(name, val);
	  return this;
	};

	/**
	 * Queue the given `file` as an attachment to the specified `field`,
	 * with optional `filename`.
	 *
	 * ``` js
	 * request.post('http://localhost/upload')
	 *   .attach(new Buffer('<b>Hello world</b>'), 'hello.html')
	 *   .end(callback);
	 * ```
	 *
	 * A filename may also be used:
	 *
	 * ``` js
	 * request.post('http://localhost/upload')
	 *   .attach('files', 'image.jpg')
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} field
	 * @param {String|fs.ReadStream|Buffer} file
	 * @param {String} filename
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.attach = function(field, file, filename){
	  if (!this._formData) this._formData = new FormData();
	  if ('string' == typeof file) {
	    filename = file;
	    debug('creating `fs.ReadStream` instance for file: %s', filename);
	    file = fs.createReadStream(filename);
	  }
	  this._formData.append(field, file, filename);
	  return this;
	};

	/**
	 * Set the max redirects to `n`.
	 *
	 * @param {Number} n
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.redirects = function(n){
	  debug('max redirects %s', n);
	  this._maxRedirects = n;
	  return this;
	};

	/**
	 * Return a new `Part` for this request.
	 *
	 * @return {Part}
	 * @api public
	 * @deprecated pass a readable stream in to `Request#attach()` instead
	 */

	Request.prototype.part = util.deprecate(function(){
	  return new Part(this);
	}, '`Request#part()` is deprecated. ' +
	   'Pass a readable stream in to `Request#attach()` instead.');

	/**
	 * Gets/sets the `Agent` to use for this HTTP request. The default (if this
	 * function is not called) is to opt out of connection pooling (`agent: false`).
	 *
	 * @param {http.Agent} agent
	 * @return {http.Agent}
	 * @api public
	 */

	Request.prototype.agent = function(agent){
	  if (!arguments.length) return this._agent;
	  this._agent = agent;
	  return this;
	};

	/**
	 * Set header `field` to `val`, or multiple fields with one object.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .set('Accept', 'application/json')
	 *        .set('X-API-Key', 'foobar')
	 *        .end(callback);
	 *
	 *      req.get('/')
	 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
	 *        .end(callback);
	 *
	 * @param {String|Object} field
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.set = function(field, val){
	  if (isObject(field)) {
	    for (var key in field) {
	      this.set(key, field[key]);
	    }
	    return this;
	  }

	  debug('set %s "%s"', field, val);
	  this.request().setHeader(field, val);
	  return this;
	};

	/**
	 * Remove header `field`.
	 *
	 * Example:
	 *
	 *      req.get('/')
	 *        .unset('User-Agent')
	 *        .end(callback);
	 *
	 * @param {String} field
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.unset = function(field){
	  debug('unset %s', field);
	  this.request().removeHeader(field);
	  return this;
	};

	/**
	 * Get request header `field`.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */

	Request.prototype.get = function(field){
	  return this.request().getHeader(field);
	};

	/**
	 * Set _Content-Type_ response header passed through `mime.lookup()`.
	 *
	 * Examples:
	 *
	 *      request.post('/')
	 *        .type('xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 *      request.post('/')
	 *        .type('json')
	 *        .send(jsonstring)
	 *        .end(callback);
	 *
	 *      request.post('/')
	 *        .type('application/json')
	 *        .send(jsonstring)
	 *        .end(callback);
	 *
	 * @param {String} type
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.type = function(type){
	  return this.set('Content-Type', ~type.indexOf('/')
	    ? type
	    : mime.lookup(type));
	};

	/**
	 * Set _Accept_ response header passed through `mime.lookup()`.
	 *
	 * Examples:
	 *
	 *      superagent.types.json = 'application/json';
	 *
	 *      request.get('/agent')
	 *        .accept('json')
	 *        .end(callback);
	 *
	 *      request.get('/agent')
	 *        .accept('application/json')
	 *        .end(callback);
	 *
	 * @param {String} accept
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.accept = function(type){
	  return this.set('Accept', ~type.indexOf('/')
	    ? type
	    : mime.lookup(type));
	};

	/**
	 * Add query-string `val`.
	 *
	 * Examples:
	 *
	 *   request.get('/shoes')
	 *     .query('size=10')
	 *     .query({ color: 'blue' })
	 *
	 * @param {Object|String} val
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.query = function(val){
	  var obj = {};

	  if ('string' == typeof val) {
	    var elements = val.split('&');
	    for (var i = 0; i < elements.length; i++) {
	      var parts = elements[i].split('=');
	      obj[parts[0]] = parts[1];
	    }
	    return this.query(obj);
	  }

	  extend(this.qs, val);
	  return this;
	};

	/**
	 * Send `data`, defaulting the `.type()` to "json" when
	 * an object is given.
	 *
	 * Examples:
	 *
	 *       // manual json
	 *       request.post('/user')
	 *         .type('json')
	 *         .send('{"name":"tj"}')
	 *         .end(callback)
	 *
	 *       // auto json
	 *       request.post('/user')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // manual x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send('name=tj')
	 *         .end(callback)
	 *
	 *       // auto x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // string defaults to x-www-form-urlencoded
	 *       request.post('/user')
	 *         .send('name=tj')
	 *         .send('foo=bar')
	 *         .send('bar=baz')
	 *         .end(callback)
	 *
	 * @param {String|Object} data
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.send = function(data){
	  var obj = isObject(data);
	  var req = this.request();
	  var type = req.getHeader('Content-Type');

	  // merge
	  if (obj && isObject(this._data)) {
	    for (var key in data) {
	      this._data[key] = data[key];
	    }
	  // string
	  } else if ('string' == typeof data) {
	    // default to x-www-form-urlencoded
	    if (!type) this.type('form');
	    type = req.getHeader('Content-Type');

	    // concat &
	    if ('application/x-www-form-urlencoded' == type) {
	      this._data = this._data
	        ? this._data + '&' + data
	        : data;
	    } else {
	      this._data = (this._data || '') + data;
	    }
	  } else {
	    this._data = data;
	  }

	  if (!obj) return this;

	  // default to json
	  if (!type) this.type('json');
	  return this;
	};

	/**
	 * Write raw `data` / `encoding` to the socket.
	 *
	 * @param {Buffer|String} data
	 * @param {String} encoding
	 * @return {Boolean}
	 * @api public
	 */

	Request.prototype.write = function(data, encoding){
	  return this.request().write(data, encoding);
	};

	/**
	 * Pipe the request body to `stream`.
	 *
	 * @param {Stream} stream
	 * @param {Object} options
	 * @return {Stream}
	 * @api public
	 */

	Request.prototype.pipe = function(stream, options){
	  this.piped = true; // HACK...
	  this.buffer(false);
	  this.end().req.on('response', function(res){
	    if (/^(deflate|gzip)$/.test(res.headers['content-encoding'])) {
	      res.pipe(zlib.createUnzip()).pipe(stream, options);
	    } else {
	      res.pipe(stream, options);
	    }
	  });
	  return stream;
	};

	/**
	 * Enable / disable buffering.
	 *
	 * @return {Boolean} [val]
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.buffer = function(val){
	  this._buffer = false === val
	    ? false
	    : true;
	  return this;
	};

	/**
	 * Set timeout to `ms`.
	 *
	 * @param {Number} ms
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.timeout = function(ms){
	  this._timeout = ms;
	  return this;
	};

	/**
	 * Clear previous timeout.
	 *
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.clearTimeout = function(){
	  debug('clear timeout %s %s', this.method, this.url);
	  this._timeout = 0;
	  clearTimeout(this._timer);
	  return this;
	};

	/**
	 * Abort and clear timeout.
	 *
	 * @api public
	 */

	Request.prototype.abort = function(){
	  debug('abort %s %s', this.method, this.url);
	  this._aborted = true;
	  this.clearTimeout();
	  this.req.abort();
	};

	/**
	 * Define the parser to be used for this response.
	 *
	 * @param {Function} fn
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.parse = function(fn){
	  this._parser = fn;
	  return this;
	};

	/**
	 * Redirect to `url
	 *
	 * @param {IncomingMessage} res
	 * @return {Request} for chaining
	 * @api private
	 */

	Request.prototype.redirect = function(res){
	  var url = res.headers.location;
	  debug('redirect %s -> %s', this.url, url);

	  // location
	  if (!~url.indexOf('://')) {
	    if (0 != url.indexOf('//')) {
	      url = '//' + this.host + url;
	    }
	    url = this.protocol + url;
	  }

	  // ensure the response is being consumed
	  // this is required for Node v0.10+
	  res.resume();

	  // strip Content-* related fields
	  // in case of POST etc
	  var header = utils.cleanHeader(this.req._headers);
	  delete this.req;

	  // force GET
	  this.method = 'HEAD' == this.method
	    ? 'HEAD'
	    : 'GET';

	  // redirect
	  this._data = null;
	  this.url = url;
	  this._redirectList.push(url);
	  this.clearTimeout();
	  this.emit('redirect', res);
	  this.set(header);
	  this.end(this._callback);
	  return this;
	};

	/**
	 * Set Authorization field value with `user` and `pass`.
	 *
	 * @param {String} user
	 * @param {String} pass
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.auth = function(user, pass){
	  if (pass) pass = ':' + pass;
	  var str = new Buffer(user + (pass || '')).toString('base64');
	  return this.set('Authorization', 'Basic ' + str);
	};

	/**
	 * Set the certificate authority option for https request.
	 *
	 * @param {Buffer | Array} cert
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.ca = function(cert){
	  this._ca = cert;
	  return this;
	};

	/**
	 * Return an http[s] request.
	 *
	 * @return {OutgoingMessage}
	 * @api private
	 */

	Request.prototype.request = function(){
	  if (this.req) return this.req;

	  var self = this;
	  var options = {};
	  var data = this._data;
	  var url = this.url;

	  // default to http://
	  if (0 != url.indexOf('http')) url = 'http://' + url;
	  url = parse(url, true);

	  // options
	  options.method = this.method;
	  options.port = url.port;
	  options.path = url.pathname;
	  options.host = url.hostname;
	  options.ca = this._ca;
	  options.agent = this._agent;

	  // initiate request
	  var mod = exports.protocols[url.protocol];

	  // request
	  var req = this.req = mod.request(options);
	  if ('HEAD' != options.method) req.setHeader('Accept-Encoding', 'gzip, deflate');
	  this.protocol = url.protocol;
	  this.host = url.host;

	  // expose events
	  req.on('drain', function(){ self.emit('drain'); });

	  req.on('error', function(err){
	    // flag abortion here for out timeouts
	    // because node will emit a faux-error "socket hang up"
	    // when request is aborted before a connection is made
	    if (self._aborted) return;
	    self.callback(err);
	  });

	  // auth
	  if (url.auth) {
	    var auth = url.auth.split(':');
	    this.auth(auth[0], auth[1]);
	  }

	  // query
	  this.query(url.query);

	  // add cookies
	  req.setHeader('Cookie', this.cookies);

	  // set default UA
	  req.setHeader('User-Agent', 'node-superagent/' + pkg.version);

	  return req;
	};

	/**
	 * Invoke the callback with `err` and `res`
	 * and handle arity check.
	 *
	 * @param {Error} err
	 * @param {Response} res
	 * @api private
	 */

	Request.prototype.callback = function(err, res){
	  var fn = this._callback;
	  this.clearTimeout();
	  if (this.called) return console.warn('double callback!');
	  this.called = true;
	  if (2 == fn.length) return fn(err, res);
	  if (err) return this.emit('error', err);
	  fn(res);
	};

	/**
	 * Initiate request, invoking callback `fn(err, res)`
	 * with an instanceof `Response`.
	 *
	 * @param {Function} fn
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.end = function(fn){
	  var self = this;
	  var data = this._data;
	  var req = this.request();
	  var buffer = this._buffer;
	  var method = this.method;
	  var timeout = this._timeout;
	  debug('%s %s', this.method, this.url);

	  // store callback
	  this._callback = fn || noop;

	  // querystring
	  try {
	    var querystring = qs.stringify(this.qs);
	    req.path += querystring.length
	      ? (~req.path.indexOf('?') ? '&' : '?') + querystring
	      : '';
	  } catch (e) {
	    return this.callback(e);
	  }

	  // timeout
	  if (timeout && !this._timer) {
	    debug('timeout %sms %s %s', timeout, this.method, this.url);
	    this._timer = setTimeout(function(){
	      var err = new Error('timeout of ' + timeout + 'ms exceeded');
	      err.timeout = timeout;
	      self.abort();
	      self.callback(err);
	    }, timeout);
	  }

	  // body
	  if ('HEAD' != method && !req._headerSent) {
	    // serialize stuff
	    if ('string' != typeof data) {
	      var contentType = req.getHeader('Content-Type')
	      // Parse out just the content type from the header (ignore the charset)
	      if (contentType) contentType = contentType.split(';')[0]
	      var serialize = exports.serialize[contentType];
	      if (serialize) data = serialize(data);
	    }

	    // content-length
	    if (data && !req.getHeader('Content-Length')) {
	      this.set('Content-Length', Buffer.byteLength(data));
	    }
	  }

	  // response
	  req.on('response', function(res){
	    debug('%s %s -> %s', self.method, self.url, res.statusCode);
	    var max = self._maxRedirects;
	    var mime = utils.type(res.headers['content-type'] || '');
	    var len = res.headers['content-length'];
	    var type = mime.split('/');
	    var subtype = type[1];
	    var type = type[0];
	    var multipart = 'multipart' == type;
	    var redirect = isRedirect(res.statusCode);
	    var parser = self._parser

	    if (self.piped) {
	      res.on('end', function(){
	        self.emit('end');
	      });
	      return;
	    }

	    // redirect
	    if (redirect && self._redirects++ != max) {
	      return self.redirect(res);
	    }

	    // zlib support
	    if (/^(deflate|gzip)$/.test(res.headers['content-encoding'])) {
	      utils.unzip(req, res);
	    }

	    // don't buffer multipart
	    if (multipart) buffer = false;

	    // TODO: make all parsers take callbacks
	    if (!parser && multipart) {
	      var form = new formidable.IncomingForm;

	      form.parse(res, function(err, fields, files){
	        if (err) return self.callback(err);
	        var response = new Response(req, res);
	        response.body = fields;
	        response.files = files;
	        response.redirects = self._redirectList;
	        self.emit('end');
	        self.callback(null, response);
	      });
	      return;
	    }

	    // check for images, one more special treatment
	    if (!parser && isImage(mime)) {
	      exports.parse.image(res, function(err, obj){
	        if (err) return self.callback(err);
	        var response = new Response(req, res);
	        response.body = obj;
	        response.redirects = self._redirectList;
	        self.emit('end');
	        self.callback(null, response);
	      });
	      return;
	    }

	    // by default only buffer text/*, json
	    // and messed up thing from hell
	    var text = isText(mime);
	    if (null == buffer && text) buffer = true;

	    // parser
	    var parse = 'text' == type
	      ? exports.parse.text
	      : exports.parse[mime];

	    // buffered response
	    if (buffer) parse = parse || exports.parse.text;

	    // explicit parser
	    if (parser) parse = parser;

	    // parse
	    if (parse) {
	      try {
	        parse(res, function(err, obj){
	          if (err) self.callback(err);
	          res.body = obj;
	        });
	      } catch(err) {
	        self.callback(err);
	        return;
	      }
	    }

	    // unbuffered
	    if (!buffer) {
	      debug('unbuffered %s %s', self.method, self.url);
	      self.res = res;
	      var response = new Response(self.req, self.res);
	      response.redirects = self._redirectList;
	      self.emit('response', response);
	      if (multipart) return // allow multipart to handle end event
	      res.on('end', function(){
	        debug('end %s %s', self.method, self.url);
	        self.emit('end');
	      })
	      return;
	    }

	    // end event
	    self.res = res;
	    res.on('end', function(){
	      debug('end %s %s', self.method, self.url);
	      // TODO: unless buffering emit earlier to stream
	      var response = new Response(self.req, self.res);
	      response.redirects = self._redirectList;
	      self.emit('response', response);
	      self.emit('end');
	    });
	  });

	  this.emit('request', this);

	  // if a FormData instance got created, then we send that as the request body
	  var formData = this._formData;
	  if (formData) {

	    // set headers
	    var headers = formData.getHeaders();
	    for (var i in headers) {
	      debug('setting FormData header: "%s: %s"', i, headers[i]);
	      req.setHeader(i, headers[i]);
	    }

	    // attempt to get "Content-Length" header
	    formData.getLength(function(err, length) {
	      // TODO: Add chunked encoding when no length (if err)

	      debug('got FormData Content-Length: %s', length);
	      if ('number' == typeof length) {
	        req.setHeader('Content-Length', length);
	      }

	      formData.pipe(req);
	    });
	  } else {
	    req.end(data);
	  }

	  return this;
	};

	/**
	 * Expose `Request`.
	 */

	exports.Request = Request;

	/**
	 * Issue a request:
	 *
	 * Examples:
	 *
	 *    request('GET', '/users').end(callback)
	 *    request('/users').end(callback)
	 *    request('/users', callback)
	 *
	 * @param {String} method
	 * @param {String|Function} url or callback
	 * @return {Request}
	 * @api public
	 */

	function request(method, url) {
	  // callback
	  if ('function' == typeof url) {
	    return new Request('GET', method).end(url);
	  }

	  // url first
	  if (1 == arguments.length) {
	    return new Request('GET', method);
	  }

	  return new Request(method, url);
	}

	// generate HTTP verb methods

	methods.forEach(function(method){
	  var name = 'delete' == method ? 'del' : method;
	  method = method.toUpperCase();
	  request[name] = function(url, fn){
	    var req = request(method, url);
	    fn && req.end(fn);
	    return req;
	  };
	});

	/**
	 * Check if `mime` is text and should be buffered.
	 *
	 * @param {String} mime
	 * @return {Boolean}
	 * @api public
	 */

	function isText(mime) {
	  var parts = mime.split('/');
	  var type = parts[0];
	  var subtype = parts[1];

	  return 'text' == type
	    || 'json' == subtype
	    || 'x-www-form-urlencoded' == subtype;
	}

	/**
	 * Check if `mime` is image
	 *
	 * @param {String} mime
	 * @return {Boolean}
	 * @api public
	 */

	function isImage(mime) {
	  var parts = mime.split('/');
	  var type = parts[0];
	  var subtype = parts[1];

	  return 'image' == type;
	}

	/**
	 * Check if we should follow the redirect `code`.
	 *
	 * @param {Number} code
	 * @return {Boolean}
	 * @api private
	 */

	function isRedirect(code) {
	  return ~[301, 302, 303, 305, 307].indexOf(code);
	}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(1);

	module.exports = React.createClass({displayName: 'exports',

	  style: {
	    div: {
	      position: 'absolute',
	      zIndex: 0
	    },

	    img: {
	      width: '100%'
	    }
	  },

	  layout: {
	  },

	  render: function() {
	    var divStyle = this.style.div;
	    if (this.props.active) divStyle.zIndex = 1;
	    else divStyle.zIndex = 0;

	    return (
	      React.DOM.div({class: "image", style: divStyle}, 
	        React.DOM.img({src: this.props.src, style: this.style.img})
	      )
	    );
	  }

	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("react/lib/invariant");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React               = __webpack_require__(1);
	var cloneWithProps      = __webpack_require__(37);
	var ReactUpdates        = __webpack_require__(38);
	var emptyFunction       = __webpack_require__(39);
	var prefetchAsyncState  = __webpack_require__(22);
	var isAsyncComponent    = __webpack_require__(23);

	var PreloaderMixin = {

	  propTypes: {
	    children: React.PropTypes.component.isRequired,
	    onAsyncStateFetched: React.PropTypes.func,
	    onBeforeUpdate: React.PropTypes.func,
	    preloader: React.PropTypes.component,
	    alwayUsePreloader: React.PropTypes.bool
	  },

	  getDefaultProps: function() {
	    return {
	      onAsyncStateFetched: emptyFunction,
	      onBeforeUpdate: emptyFunction,
	      onUpdate: emptyFunction
	    };
	  },

	  getInitialState: function() {
	    var children = React.Children.only(this.props.children);
	    if (this.props.preloader) {
	      return {
	        rendered: this.props.preloader,
	        pending: children
	      };
	    } else {
	      return {
	        rendered: children,
	        pending: null
	      };
	    }
	  },

	  componentWillReceiveProps: function(nextProps) {
	    var children = React.Children.only(nextProps.children);
	    if (isAsyncComponent(children) &&
	        children.type !== this.state.rendered.type) {

	      var nextState = {pending: children};

	      if (nextProps.preloader && nextProps.alwayUsePreloader) {
	        nextState.rendered = nextProps.preloader;
	      }

	      this.setState(nextState, this.prefetchAsyncState.bind(null, children));

	    } else {

	      this.setState({
	        rendered: children,
	        pending: null
	      }, this.props.onUpdate);

	    }
	  },

	  componentDidMount: function() {
	    if (this.state.pending) {
	      this.prefetchAsyncState(this.state.pending);
	    }
	  },

	  /**
	   * Get the currently rendered component instance.
	   *
	   * Do not use it in a real code, this is provided only for testing purposes.
	   *
	   * @returns {ReactComponent}
	   */
	  getRendered: function() {
	    return this.refs.rendered;
	  },

	  /**
	   * Check if there's update pending.
	   *
	   * @returns {boolean}
	   */
	  hasPendingUpdate: function() {
	    return this.state.pending !== null;
	  },

	  /**
	   * Prefetch async state for a component and update state.
	   *
	   * @param {ReactComponent} component
	   */
	  prefetchAsyncState: function(component) {
	    prefetchAsyncState(component, function(err, nextRendered) {
	      ReactUpdates.batchedUpdates(function() {
	        this.props.onAsyncStateFetched();
	        if (this.state.pending === component && this.isMounted()) {
	          this.props.onBeforeUpdate();
	          this.setState({
	            rendered: nextRendered,
	            pending: null
	          }, this.props.onUpdate);
	        }
	      }.bind(this));
	    }.bind(this));
	  }
	};

	/**
	 * Component which wraps another component and prefetches its async state before
	 * rendering it.
	 */
	var Preloaded = React.createClass({

	  mixins: [PreloaderMixin],

	  render: function() {
	    return cloneWithProps(this.state.rendered, {ref: 'rendered'});
	  }
	});

	module.exports = Preloaded;



/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Get a fingerprint of the component.
	 *
	 * @param {Object} component
	 * @return {String}
	 */
	function getComponentFingerprint(component) {
	  return component._rootNodeID + '__' + component._mountDepth;
	}

	module.exports = getComponentFingerprint;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var asciiJSON = __webpack_require__(58);

	/**
	 * Inject data and optional client scripts into markup.
	 *
	 * @param {String} markup
	 * @param {Object} data
	 * @param {?Array} scripts
	 */
	function injectIntoMarkup(markup, data, scripts) {
	  var escapedJson = asciiJSON.stringify(data).replace(/<\//g, '<\\/');
	  var injected = '<script>window.__reactAsyncStatePacket=' + escapedJson + '</script>';

	  if (scripts) {
	    injected += scripts.map(function(script) {
	      return '<script src="' + script + '"></script>';
	    }).join('');
	  }

	  if (markup.indexOf('</body>') > -1) {
	    return markup.replace('</body>', injected + '$&');
	  } else {
	    return markup + injected;
	  }
	}

	module.exports = injectIntoMarkup;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var invariant         = __webpack_require__(18);
	var cloneWithProps    = __webpack_require__(37);
	var isAsyncComponent  = __webpack_require__(23);

	/**
	 * Prefetch an async state for an unmounted async component instance.
	 *
	 * @param {ReactComponent} component
	 * @param {Callback} cb
	 */
	function prefetchAsyncState(component, cb) {

	  invariant(
	    isAsyncComponent(component),
	    "%s should be an async component to be able to prefetch async state, " +
	    "but getInitialStateAsync(cb) method is missing or is not a function",
	    component.displayName
	  );

	  var cloneCallback = function(err, asyncState) {
	    if (err) {
	      return cb(err);
	    }

	    cb(null, cloneWithProps(component, {asyncState: asyncState || {}}));
	  };
	  var getInitialStateAsync = component.constructor.type.prototype.getInitialStateAsync;
	  var promise = getInitialStateAsync.call(component, cloneCallback);

	  if (promise && typeof promise.then === 'function') {
	    promise.then(cloneCallback.bind(cloneCallback, null), cloneCallback);
	  }
	}

	module.exports = prefetchAsyncState;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Check if a component is an async component.
	 *
	 * @param {ReactComponent} component
	 */
	function isAsyncComponent(component) {
	  return typeof component.constructor.type.prototype.getInitialStateAsync === 'function';
	}

	module.exports = isAsyncComponent;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("url");

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("stream");

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("https");

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("http");

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("fs");

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("zlib");

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("util");

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Fiber = __webpack_require__(40);
	var util = __webpack_require__(30);
	module.exports = Future;
	Function.prototype.future = function() {
		var fn = this;
		var ret = function() {
			return new FiberFuture(fn, this, arguments);
		};
		ret.toString = function() {
			return '<<Future '+ fn+ '.future()>>';
		};
		return ret;
	};

	function Future() {}

	/**
	 * Run a function(s) in a future context, and return a future to their return value. This is useful
	 * for instances where you want a closure to be able to `.wait()`. This also lets you wait for
	 * mulitple parallel opertions to run.
	 */
	Future.task = function(fn) {
		if (arguments.length === 1) {
			return fn.future()();
		} else {
			var future = new Future, pending = arguments.length, error, values = new Array(arguments.length);
			for (var ii = 0; ii < arguments.length; ++ii) {
				arguments[ii].future()().resolve(function(ii, err, val) {
					if (err) {
						error = err;
					}
					values[ii] = val;
					if (--pending === 0) {
						if (error) {
							future.throw(error);
						} else {
							future.return(values);
						}
					}
				}.bind(null, ii));
			}
			return future;
		}
	};

	/**
	 * Wrap node-style async functions to instead return futures. This assumes that the last parameter
	 * of the function is a callback.
	 *
	 * If a single function is passed a future-returning function is created. If an object is passed a
	 * new object is returned with all functions wrapped.
	 *
	 * The value that is returned from the invocation of the underlying function is assigned to the
	 * property `_` on the future. This is useful for functions like `execFile` which take a callback,
	 * but also return meaningful information.
	 *
	 * `multi` indicates that this callback will return more than 1 argument after `err`. For example,
	 * `child_process.exec()`
	 *
	 * `suffix` will append a string to every method that was overridden, if you pass an object to
	 * `Future.wrap()`. Default is 'Future'.
	 *
	 * var readFileFuture = Future.wrap(require('fs').readFile);
	 * var fs = Future.wrap(require('fs'));
	 * fs.readFileFuture('example.txt').wait();
	 */
	Future.wrap = function(fnOrObject, multi, suffix, stop) {
		if (typeof fnOrObject === 'object') {
			var wrapped = Object.create(fnOrObject);
			for (var ii in fnOrObject) {
				if (wrapped[ii] instanceof Function) {
					wrapped[suffix === undefined ? ii+ 'Future' : ii+ suffix] = Future.wrap(wrapped[ii], multi, suffix, stop);
				}
			}
			return wrapped;
		} else if (typeof fnOrObject === 'function') {
			var fn = function() {
				var future = new Future;
				var args = Array.prototype.slice.call(arguments);
				if (multi) {
					var cb = future.resolver();
					args.push(function(err) {
						cb(err, Array.prototype.slice.call(arguments, 1));
					});
				} else {
					args.push(future.resolver());
				}
				future._ = fnOrObject.apply(this, args);
				return future;
			}
			// Modules like `request` return a function that has more functions as properties. Handle this
			// in some kind of reasonable way.
			if (!stop) {
				var proto = Object.create(fnOrObject);
				for (var ii in fnOrObject) {
					if (fnOrObject.hasOwnProperty(ii) && fnOrObject[ii] instanceof Function) {
						proto[ii] = proto[ii];
					}
				}
				fn.__proto__ = Future.wrap(proto, multi, suffix, true);
			}
			return fn;
		}
	};

	/**
	 * Wait on a series of futures and then return. If the futures throw an exception this function
	 * /won't/ throw it back. You can get the value of the future by calling get() on it directly. If
	 * you want to wait on a single future you're better off calling future.wait() on the instance.
	 */
	Future.wait = function wait(/* ... */) {

		// Normalize arguments + pull out a FiberFuture for reuse if possible
		var futures = [], singleFiberFuture;
		for (var ii = 0; ii < arguments.length; ++ii) {
			var arg = arguments[ii];
			if (arg instanceof Future) {
				// Ignore already resolved fibers
				if (arg.isResolved()) {
					continue;
				}
				// Look for fiber reuse
				if (!singleFiberFuture && arg instanceof FiberFuture && !arg.started) {
					singleFiberFuture = arg;
					continue;
				}
				futures.push(arg);
			} else if (arg instanceof Array) {
				for (var jj = 0; jj < arg.length; ++jj) {
					var aarg = arg[jj];
					if (aarg instanceof Future) {
						// Ignore already resolved fibers
						if (aarg.isResolved()) {
							continue;
						}
						// Look for fiber reuse
						if (!singleFiberFuture && aarg instanceof FiberFuture && !aarg.started) {
							singleFiberFuture = aarg;
							continue;
						}
						futures.push(aarg);
					} else {
						throw new Error(aarg+ ' is not a future');
					}
				}
			} else {
				throw new Error(arg+ ' is not a future');
			}
		}

		// Resumes current fiber
		var fiber = Fiber.current;
		if (!fiber) {
			throw new Error('Can\'t wait without a fiber');
		}

		// Resolve all futures
		var pending = futures.length + (singleFiberFuture ? 1 : 0);
		function cb() {
			if (!--pending) {
				fiber.run();
			}
		}
		for (var ii = 0; ii < futures.length; ++ii) {
			futures[ii].resolve(cb);
		}

		// Reusing a fiber?
		if (singleFiberFuture) {
			singleFiberFuture.started = true;
			try {
				singleFiberFuture.return(
					singleFiberFuture.fn.apply(singleFiberFuture.context, singleFiberFuture.args));
			} catch(e) {
				singleFiberFuture.throw(e);
			}
			--pending;
		}

		// Yield this fiber
		if (pending) {
			Fiber.yield();
		}
	};

	Future.prototype = {
		/**
		 * Return the value of this future. If the future hasn't resolved yet this will throw an error.
		 */
		get: function() {
			if (!this.resolved) {
				throw new Error('Future must resolve before value is ready');
			} else if (this.error) {
				// Link the stack traces up
				var stack = {}, error = this.error instanceof Object ? this.error : new Error(this.error);
				var longError = Object.create(error);
				Error.captureStackTrace(stack, Future.prototype.get);
				Object.defineProperty(longError, 'stack', {
					get: function() {
						var baseStack = error.stack;
						if (baseStack) {
							baseStack = baseStack.split('\n');
							return [baseStack[0]]
								.concat(stack.stack.split('\n').slice(1))
								.concat('    - - - - -')
								.concat(baseStack.slice(1))
								.join('\n');
						} else {
							return stack.stack;
						}
					},
					enumerable: true,
				});
				throw longError;
			} else {
				return this.value;
			}
		},

		/**
		 * Mark this future as returned. All pending callbacks will be invoked immediately.
		 */
		"return": function(value) {
			if (this.resolved) {
				throw new Error('Future resolved more than once');
			}
			this.value = value;
			this.resolved = true;

			var callbacks = this.callbacks;
			if (callbacks) {
				delete this.callbacks;
				for (var ii = 0; ii < callbacks.length; ++ii) {
					try {
						var ref = callbacks[ii];
						if (ref[1]) {
							ref[1](value);
						} else {
							ref[0](undefined, value);
						}
					} catch(ex) {
						// console.log('Resolve cb threw', String(ex.stack || ex.message || ex));
						process.nextTick(function() {
							throw(ex);
						});
					}
				}
			}
		},

		/**
		 * Throw from this future as returned. All pending callbacks will be invoked immediately.
		 */
		"throw": function(error) {
			if (this.resolved) {
				throw new Error('Future resolved more than once');
			} else if (!error) {
				throw new Error('Must throw non-empty error');
			}
			this.error = error;
			this.resolved = true;

			var callbacks = this.callbacks;
			if (callbacks) {
				delete this.callbacks;
				for (var ii = 0; ii < callbacks.length; ++ii) {
					try {
						var ref = callbacks[ii];
						if (ref[1]) {
							ref[0].throw(error);
						} else {
							ref[0](error);
						}
					} catch(ex) {
						// console.log('Resolve cb threw', String(ex.stack || ex.message || ex));
						process.nextTick(function() {
							throw(ex);
						});
					}
				}
			}
		},

		/**
		 * "detach" this future. Basically this is useful if you want to run a task in a future, you
		 * aren't interested in its return value, but if it throws you don't want the exception to be
		 * lost. If this fiber throws, an exception will be thrown to the event loop and node will
		 * probably fall down.
		 */
		detach: function() {
			this.resolve(function(err) {
				if (err) {
					throw err;
				}
			});
		},

		/**
		 * Returns whether or not this future has resolved yet.
		 */
		isResolved: function() {
			return this.resolved === true;
		},

		/**
		 * Returns a node-style function which will mark this future as resolved when called.
		 */
		resolver: function() {
			return function(err, val) {
				if (err) {
					this.throw(err);
				} else {
					this.return(val);
				}
			}.bind(this);
		},

		/**
		 * Waits for this future to resolve and then invokes a callback.
		 *
		 * If two arguments are passed, the first argument is a future which will be thrown to in the case
		 * of error, and the second is a function(val){} callback.
		 *
		 * If only one argument is passed it is a standard function(err, val){} callback.
		 */
		resolve: function(arg1, arg2) {
			if (this.resolved) {
				if (arg2) {
					if (this.error) {
						arg1.throw(this.error);
					} else {
						arg2(this.value);
					}
				} else {
					arg1(this.error, this.value);
				}
			} else {
				(this.callbacks = this.callbacks || []).push([arg1, arg2]);
			}
			return this;
		},

		/**
		 * Resolve only in the case of success
		 */
		resolveSuccess: function(cb) {
			this.resolve(function(err, val) {
				if (err) {
					return;
				}
				cb(val);
			});
			return this;
		},

		/**
		 * Propogate results to another future.
		 */
		proxy: function(future) {
			this.resolve(function(err, val) {
				if (err) {
					future.throw(err);
				} else {
					future.return(val);
				}
			});
		},

		/**
		 * Propogate only errors to an another future or array of futures.
		 */
		proxyErrors: function(futures) {
			this.resolve(function(err) {
				if (!err) {
					return;
				}
				if (futures instanceof Array) {
					for (var ii = 0; ii < futures.length; ++ii) {
						futures[ii].throw(err);
					}
				} else {
					futures.throw(err);
				}
			});
			return this;
		},

		/**
		 * Differs from its functional counterpart in that it actually resolves the future. Thus if the
		 * future threw, future.wait() will throw.
		 */
		wait: function() {
			if (this.isResolved()) {
				return this.get();
			}
			Future.wait(this);
			return this.get();
		},
	};

	/**
	 * A function call which loads inside a fiber automatically and returns a future.
	 */
	function FiberFuture(fn, context, args) {
		this.fn = fn;
		this.context = context;
		this.args = args;
		this.started = false;
		var that = this;
		process.nextTick(function() {
			if (!that.started) {
				that.started = true;
				Fiber(function() {
					try {
						that.return(fn.apply(context, args));
					} catch(e) {
						that.throw(e);
					}
				}).run();
			}
		});
	}
	util.inherits(FiberFuture, Future);


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var util = __webpack_require__(30);
	var utils = __webpack_require__(33);
	var Stream = __webpack_require__(25);

	/**
	 * Expose `Response`.
	 */

	module.exports = Response;

	/**
	 * Initialize a new `Response` with the given `xhr`.
	 *
	 *  - set flags (.ok, .error, etc)
	 *  - parse header
	 *
	 * @param {ClientRequest} req
	 * @param {IncomingMessage} res
	 * @param {Object} options
	 * @constructor
	 * @extends {Stream}
	 * @implements {ReadableStream}
	 * @api private
	 */

	function Response(req, res, options) {
	  Stream.call(this);
	  options = options || {};
	  this.req = req;
	  this.res = res;
	  this.links = {};
	  this.text = res.text;
	  this.body = res.body || {};
	  this.files = res.files || {};
	  this.buffered = 'string' == typeof this.text;
	  this.header = this.headers = res.headers;
	  this.setStatusProperties(res.statusCode);
	  this.setHeaderProperties(this.header);
	  this.setEncoding = res.setEncoding.bind(res);
	  res.on('data', this.emit.bind(this, 'data'));
	  res.on('end', this.emit.bind(this, 'end'));
	  res.on('close', this.emit.bind(this, 'close'));
	  res.on('error', this.emit.bind(this, 'error'));
	}

	/**
	 * Inherit from `Stream`.
	 */

	util.inherits(Response, Stream);

	/**
	 * Get case-insensitive `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */

	Response.prototype.get = function(field){
	  return this.header[field.toLowerCase()];
	};

	/**
	 * Implements methods of a `ReadableStream`
	 */

	Response.prototype.destroy = function(err){
	  this.res.destroy(err);
	};

	/**
	 * Pause.
	 */

	Response.prototype.pause = function(){
	  this.res.pause();
	};

	/**
	 * Resume.
	 */

	Response.prototype.resume = function(){
	  this.res.resume();
	};

	/**
	 * Return an `Error` representative of this response.
	 *
	 * @return {Error}
	 * @api public
	 */

	Response.prototype.toError = function(){
	  var req = this.req;
	  var method = req.method;
	  var path = req.path;

	  var msg = 'cannot ' + method + ' ' + path + ' (' + this.status + ')';
	  var err = new Error(msg);
	  err.status = this.status;
	  err.method = method;
	  err.path = path;

	  return err;
	};

	/**
	 * Set header related properties:
	 *
	 *   - `.type` the content type without params
	 *
	 * A response of "Content-Type: text/plain; charset=utf-8"
	 * will provide you with a `.type` of "text/plain".
	 *
	 * @param {Object} header
	 * @api private
	 */

	Response.prototype.setHeaderProperties = function(header){
	  // TODO: moar!
	  // TODO: make this a util

	  // content-type
	  var ct = this.header['content-type'] || '';

	  // params
	  var params = utils.params(ct);
	  for (var key in params) this[key] = params[key];

	  this.type = utils.type(ct);

	  // links
	  try {
	    if (header.link) this.links = utils.parseLinks(header.link);
	  } catch (err) {
	    // ignore
	  }
	};

	/**
	 * Parse cookies from the header into an array.
	 */

	function parseCookies(header) {
	  return Array.isArray(header)
	    ? header.map(Cookie.parse)
	    : [Cookie.parse(header)];
	}

	/**
	 * Set flags such as `.ok` based on `status`.
	 *
	 * For example a 2xx response will give you a `.ok` of __true__
	 * whereas 5xx will be __false__ and `.error` will be __true__. The
	 * `.clientError` and `.serverError` are also available to be more
	 * specific, and `.statusType` is the class of error ranging from 1..5
	 * sometimes useful for mapping respond colors etc.
	 *
	 * "sugar" properties are also defined for common cases. Currently providing:
	 *
	 *   - .noContent
	 *   - .badRequest
	 *   - .unauthorized
	 *   - .notAcceptable
	 *   - .notFound
	 *
	 * @param {Number} status
	 * @api private
	 */

	Response.prototype.setStatusProperties = function(status){
	  var type = status / 100 | 0;

	  // status / class
	  this.status = this.statusCode = status;
	  this.statusType = type;

	  // basics
	  this.info = 1 == type;
	  this.ok = 2 == type;
	  this.redirect = 3 == type;
	  this.clientError = 4 == type;
	  this.serverError = 5 == type;
	  this.error = (4 == type || 5 == type)
	    ? this.toError()
	    : false;

	  // sugar
	  this.accepted = 202 == status;
	  this.noContent = 204 == status;
	  this.badRequest = 400 == status;
	  this.unauthorized = 401 == status;
	  this.notAcceptable = 406 == status;
	  this.forbidden = 403 == status;
	  this.notFound = 404 == status;
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var StringDecoder = __webpack_require__(42).StringDecoder;
	var Stream = __webpack_require__(25);
	var zlib;

	/**
	 * Require zlib module for Node 0.6+
	 */

	try {
	  zlib = __webpack_require__(29);
	} catch (e) { }

	/**
	 * Generate a UID with the given `len`.
	 *
	 * @param {Number} len
	 * @return {String}
	 * @api private
	 */

	exports.uid = function(len){
	  var buf = '';
	  var chars = 'abcdefghijklmnopqrstuvwxyz123456789';
	  var nchars = chars.length;
	  while (len--) buf += chars[Math.random() * nchars | 0];
	  return buf;
	};

	/**
	 * Return the mime type for the given `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */

	exports.type = function(str){
	  return str.split(/ *; */).shift();
	};

	/**
	 * Return header field parameters.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	exports.params = function(str){
	  return str.split(/ *; */).reduce(function(obj, str){
	    var parts = str.split(/ *= */);
	    var key = parts.shift();
	    var val = parts.shift();

	    if (key && val) obj[key] = val;
	    return obj;
	  }, {});
	};

	/**
	 * Parse Link header fields.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	exports.parseLinks = function(str){
	  return str.split(/ *, */).reduce(function(obj, str){
	    var parts = str.split(/ *; */);
	    var url = parts[0].slice(1, -1);
	    var rel = parts[1].split(/ *= */)[1].slice(1, -1);
	    obj[rel] = url;
	    return obj;
	  }, {});
	};

	/**
	 * Buffers response data events and re-emits when they're unzipped.
	 *
	 * @param {Request} req
	 * @param {Response} res
	 * @api private
	 */

	exports.unzip = function(req, res){
	  if (!zlib) return;

	  var unzip = zlib.createUnzip();
	  var stream = new Stream;
	  var decoder;

	  // make node responseOnEnd() happy
	  stream.req = req;

	  unzip.on('error', function(err){
	    stream.emit('error', err);
	  });

	  // pipe to unzip
	  res.pipe(unzip);

	  // override `setEncoding` to capture encoding
	  res.setEncoding = function(type){
	    decoder = new StringDecoder(type);
	  };

	  // decode upon decompressing with captured encoding
	  unzip.on('data', function(buf){
	    if (decoder) {
	      var str = decoder.write(buf);
	      if (str.length) stream.emit('data', str);
	    } else {
	      stream.emit('data', buf);
	    }
	  });

	  unzip.on('end', function(){
	    stream.emit('end');
	  });

	  // override `on` to capture data listeners
	  var _on = res.on;
	  res.on = function(type, fn){
	    if ('data' == type || 'end' == type) {
	      stream.on(type, fn);
	    } else if ('error' == type) {
	      stream.on(type, fn);
	      _on.call(res, type, fn);
	    } else {
	      _on.call(res, type, fn);
	    }
	  };
	};

	/**
	 * Strip content related fields from `header`.
	 *
	 * @param {Object} header
	 * @return {Object} header
	 * @api private
	 */

	exports.cleanHeader = function(header){
	  delete header['content-type'];
	  delete header['content-length'];
	  delete header['transfer-encoding'];
	  delete header['cookie'];
	  delete header['host'];
	  return header;
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var util = __webpack_require__(30);
	var mime = __webpack_require__(50);
	var FormData = __webpack_require__(49);
	var PassThrough = __webpack_require__(51);

	/**
	 * Initialize a new `Part` for the given `req`.
	 *
	 * @param {Request} req
	 * @api public
	 * @deprecated pass a readable stream in to `Request#attach()` instead
	 */

	var Part = function (req) {
	  PassThrough.call(this);
	  this._req = req;
	  this._attached = false;
	  this._name = null;
	  this._type = null;
	  this._header = null;
	  this._filename = null;

	  this.once('pipe', this._attach.bind(this));
	};
	Part = util.deprecate(Part, 'The `Part()` constructor is deprecated. ' +
	   'Pass a readable stream in to `Request#attach()` instead.');

	/**
	 * Inherit from `PassThrough`.
	 */

	util.inherits(Part, PassThrough);

	/**
	 * Expose `Part`.
	 */

	module.exports = Part;

	/**
	 * Set header `field` to `val`.
	 *
	 * @param {String} field
	 * @param {String} val
	 * @return {Part} for chaining
	 * @api public
	 */

	Part.prototype.set = function(field, val){
	  //if (!this._header) this._header = {};
	  //this._header[field] = val;
	  //return this;
	  throw new TypeError('setting custom form-data part headers is unsupported');
	};

	/**
	 * Set _Content-Type_ response header passed through `mime.lookup()`.
	 *
	 * Examples:
	 *
	 *     res.type('html');
	 *     res.type('.html');
	 *
	 * @param {String} type
	 * @return {Part} for chaining
	 * @api public
	 */

	Part.prototype.type = function(type){
	  var lookup = mime.lookup(type);
	  this._type = lookup;
	  //this.set('Content-Type', lookup);
	  return this;
	};

	/**
	 * Set the "name" portion for the _Content-Disposition_ header field.
	 *
	 * @param {String} name
	 * @return {Part} for chaining
	 * @api public
	 */

	Part.prototype.name = function(name){
	  this._name = name;
	  return this;
	};

	/**
	 * Set _Content-Disposition_ header field to _attachment_ with `filename`
	 * and field `name`.
	 *
	 * @param {String} name
	 * @param {String} filename
	 * @return {Part} for chaining
	 * @api public
	 */

	Part.prototype.attachment = function(name, filename){
	  this.name(name);
	  if (filename) {
	    this.type(filename);
	    this._filename = filename;
	  }
	  return this;
	};

	/**
	 * Calls `FormData#append()` on the Request instance's FormData object.
	 *
	 * Gets called implicitly upon the first `write()` call, or the "pipe" event.
	 *
	 * @api private
	 */

	Part.prototype._attach = function(){
	  if (this._attached) return;
	  this._attached = true;

	  if (!this._name) throw new Error('must call `Part#name()` first!');

	  // add `this` Stream's readable side as a stream for this Part
	  if (!this._req._formData) this._req._formData = new FormData();
	  this._req._formData.append(this._name, this, {
	    contentType: this._type,
	    filename: this._filename
	  });

	  // restore PassThrough's default `write()` function now that we're setup
	  this.write = PassThrough.prototype.write;
	};

	/**
	 * Write `data` with `encoding`.
	 *
	 * @param {Buffer|String} data
	 * @param {String} encoding
	 * @return {Boolean}
	 * @api public
	 */

	Part.prototype.write = function(){
	  this._attach();
	  return this.write.apply(this, arguments);
	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var CookieJar = __webpack_require__(60).CookieJar;
	var CookieAccess = __webpack_require__(60).CookieAccessInfo;
	var parse = __webpack_require__(24).parse;
	var request = __webpack_require__(16);
	var methods = __webpack_require__(43);

	/**
	 * Expose `Agent`.
	 */

	module.exports = Agent;

	/**
	 * Initialize a new `Agent`.
	 *
	 * @api public
	 */

	function Agent(options) {
	  if (!(this instanceof Agent)) return new Agent(options);
	  if (options) this._ca = options.ca;
	  this.jar = new CookieJar;
	}

	/**
	 * Save the cookies in the given `res` to
	 * the agent's cookie jar for persistence.
	 *
	 * @param {Response} res
	 * @api private
	 */

	Agent.prototype.saveCookies = function(res){
	  var cookies = res.headers['set-cookie'];
	  if (cookies) this.jar.setCookies(cookies);
	};

	/**
	 * Attach cookies when available to the given `req`.
	 *
	 * @param {Request} req
	 * @api private
	 */

	Agent.prototype.attachCookies = function(req){
	  var url = parse(req.url);
	  var access = CookieAccess(url.host, url.pathname, 'https:' == url.protocol);
	  var cookies = this.jar.getCookies(access).toValueString();
	  req.cookies = cookies;
	};

	// generate HTTP verb methods

	methods.forEach(function(method){
	  var name = 'delete' == method ? 'del' : method;

	  method = method.toUpperCase();
	  Agent.prototype[name] = function(url, fn){
	    var req = request(method, url);
	    req.ca(this._ca);

	    req.on('response', this.saveCookies.bind(this));
	    req.on('redirect', this.saveCookies.bind(this));
	    req.on('redirect', this.attachCookies.bind(this, req));
	    this.attachCookies(req);

	    fn && req.end(fn);
	    return req;
	  };
	});


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	
	exports['application/x-www-form-urlencoded'] = __webpack_require__(52);
	exports['application/json'] = __webpack_require__(53);
	exports.text = __webpack_require__(54);
	exports.image = __webpack_require__(55);


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("react/lib/cloneWithProps");

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("react/lib/ReactUpdates");

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("react/lib/emptyFunction");

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {var fs = __webpack_require__(28), path = __webpack_require__(56);

	// Seed random numbers [gh-82]
	Math.random();

	// Look for binary for this platform
	var v8 = 'v8-'+ /[0-9]+\.[0-9]+/.exec(process.versions.v8)[0];
	var modPath = path.join(__dirname, 'bin', process.platform+ '-'+ process.arch+ '-'+ v8, 'fibers');
	try {
		fs.statSync(modPath+ '.node');
	} catch (ex) {
		// No binary!
		throw new Error('`'+ modPath+ '.node` is missing. Try reinstalling `node-fibers`?');
	}

	// Pull in fibers implementation
	module.exports = __webpack_require__(57)(modPath).Fiber;
	
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.7.1
	var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	module.exports = {
	  PatternPrototype: {
	    match: function(url) {
	      var bound, captured, i, match, name, value, _i, _len;
	      match = this.regex.exec(url);
	      if (match == null) {
	        return null;
	      }
	      captured = match.slice(1);
	      if (this.isRegex) {
	        return captured;
	      }
	      bound = {};
	      for (i = _i = 0, _len = captured.length; _i < _len; i = ++_i) {
	        value = captured[i];
	        name = this.names[i];
	        if (value == null) {
	          continue;
	        }
	        if (name === '_') {
	          if (bound._ == null) {
	            bound._ = [];
	          }
	          bound._.push(value);
	        } else {
	          bound[name] = value;
	        }
	      }
	      return bound;
	    }
	  },
	  newPattern: function(arg, separator) {
	    var isRegex, pattern, regexString;
	    if (separator == null) {
	      separator = '/';
	    }
	    isRegex = arg instanceof RegExp;
	    if (!(('string' === typeof arg) || isRegex)) {
	      throw new TypeError('argument must be a regex or a string');
	    }
	    [':', '*'].forEach(function(forbidden) {
	      if (separator === forbidden) {
	        throw new Error("separator can't be " + forbidden);
	      }
	    });
	    pattern = Object.create(module.exports.PatternPrototype);
	    pattern.isRegex = isRegex;
	    pattern.regex = isRegex ? arg : (regexString = module.exports.toRegexString(arg, separator), new RegExp(regexString));
	    if (!isRegex) {
	      pattern.names = module.exports.getNames(arg, separator);
	    }
	    return pattern;
	  },
	  escapeForRegex: function(string) {
	    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	  },
	  getNames: function(arg, separator) {
	    var escapedSeparator, name, names, regex, results;
	    if (separator == null) {
	      separator = '/';
	    }
	    if (arg instanceof RegExp) {
	      return [];
	    }
	    escapedSeparator = module.exports.escapeForRegex(separator);
	    regex = new RegExp("((:?:[^" + escapedSeparator + "\(\)]+)|(?:[\*]))", 'g');
	    names = [];
	    results = regex.exec(arg);
	    while (results != null) {
	      name = results[1].slice(1);
	      if (name === '_') {
	        throw new TypeError(":_ can't be used as a pattern name in pattern " + arg);
	      }
	      if (__indexOf.call(names, name) >= 0) {
	        throw new TypeError("duplicate pattern name :" + name + " in pattern " + arg);
	      }
	      names.push(name || '_');
	      results = regex.exec(arg);
	    }
	    return names;
	  },
	  escapeSeparators: function(string, separator) {
	    var escapedSeparator, regex;
	    if (separator == null) {
	      separator = '/';
	    }
	    escapedSeparator = module.exports.escapeForRegex(separator);
	    regex = new RegExp(escapedSeparator, 'g');
	    return string.replace(regex, escapedSeparator);
	  },
	  toRegexString: function(string, separator) {
	    var escapedSeparator, stringWithEscapedSeparators;
	    if (separator == null) {
	      separator = '/';
	    }
	    stringWithEscapedSeparators = module.exports.escapeSeparators(string, separator);
	    stringWithEscapedSeparators = stringWithEscapedSeparators.replace(/\((.*?)\)/g, '(?:$1)?').replace(/\*/g, '(.*?)');
	    escapedSeparator = module.exports.escapeForRegex(separator);
	    module.exports.getNames(string, separator).forEach(function(name) {
	      return stringWithEscapedSeparators = stringWithEscapedSeparators.replace(':' + name, "([^\\" + separator + "]+)");
	    });
	    return "^" + stringWithEscapedSeparators + "$";
	  }
	};


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("string_decoder");

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	
	var http = __webpack_require__(27);

	if (http.METHODS) {

	  module.exports = http.METHODS.map(function(method){
	    return method.toLowerCase();
	  });

	} else {

	  module.exports = [
	    'get',
	    'post',
	    'put',
	    'head',
	    'delete',
	    'options',
	    'trace',
	    'copy',
	    'lock',
	    'mkcol',
	    'move',
	    'purge',
	    'propfind',
	    'proppatch',
	    'unlock',
	    'report',
	    'mkactivity',
	    'checkout',
	    'merge',
	    'm-search',
	    'notify',
	    'subscribe',
	    'unsubscribe',
	    'patch',
	    'search'
	  ];

	}


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var hasOwn = Object.prototype.hasOwnProperty;
	var toString = Object.prototype.toString;

	function isPlainObject(obj) {
		if (!obj || toString.call(obj) !== '[object Object]' || obj.nodeType || obj.setInterval)
			return false;

		var has_own_constructor = hasOwn.call(obj, 'constructor');
		var has_is_property_of_method = hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
		// Not own constructor property must be Object
		if (obj.constructor && !has_own_constructor && !has_is_property_of_method)
			return false;

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		var key;
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	};

	module.exports = function extend() {
		var options, name, src, copy, copyIsArray, clone,
		    target = arguments[0] || {},
		    i = 1,
		    length = arguments.length,
		    deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && typeof target !== "function") {
			target = {};
		}

		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( isPlainObject(copy) || (copyIsArray = Array.isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && Array.isArray(src) ? src : [];

						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Object#toString() ref for stringify().
	 */

	var toString = Object.prototype.toString;

	/**
	 * Object#hasOwnProperty ref
	 */

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Array#indexOf shim.
	 */

	var indexOf = typeof Array.prototype.indexOf === 'function'
	  ? function(arr, el) { return arr.indexOf(el); }
	  : function(arr, el) {
	      for (var i = 0; i < arr.length; i++) {
	        if (arr[i] === el) return i;
	      }
	      return -1;
	    };

	/**
	 * Array.isArray shim.
	 */

	var isArray = Array.isArray || function(arr) {
	  return toString.call(arr) == '[object Array]';
	};

	/**
	 * Object.keys shim.
	 */

	var objectKeys = Object.keys || function(obj) {
	  var ret = [];
	  for (var key in obj) {
	    if (obj.hasOwnProperty(key)) {
	      ret.push(key);
	    }
	  }
	  return ret;
	};

	/**
	 * Array#forEach shim.
	 */

	var forEach = typeof Array.prototype.forEach === 'function'
	  ? function(arr, fn) { return arr.forEach(fn); }
	  : function(arr, fn) {
	      for (var i = 0; i < arr.length; i++) fn(arr[i]);
	    };

	/**
	 * Array#reduce shim.
	 */

	var reduce = function(arr, fn, initial) {
	  if (typeof arr.reduce === 'function') return arr.reduce(fn, initial);
	  var res = initial;
	  for (var i = 0; i < arr.length; i++) res = fn(res, arr[i]);
	  return res;
	};

	/**
	 * Cache non-integer test regexp.
	 */

	var isint = /^[0-9]+$/;

	function promote(parent, key) {
	  if (parent[key].length == 0) return parent[key] = {}
	  var t = {};
	  for (var i in parent[key]) {
	    if (hasOwnProperty.call(parent[key], i)) {
	      t[i] = parent[key][i];
	    }
	  }
	  parent[key] = t;
	  return t;
	}

	function parse(parts, parent, key, val) {
	  var part = parts.shift();
	  
	  // illegal
	  if (Object.getOwnPropertyDescriptor(Object.prototype, key)) return;
	  
	  // end
	  if (!part) {
	    if (isArray(parent[key])) {
	      parent[key].push(val);
	    } else if ('object' == typeof parent[key]) {
	      parent[key] = val;
	    } else if ('undefined' == typeof parent[key]) {
	      parent[key] = val;
	    } else {
	      parent[key] = [parent[key], val];
	    }
	    // array
	  } else {
	    var obj = parent[key] = parent[key] || [];
	    if (']' == part) {
	      if (isArray(obj)) {
	        if ('' != val) obj.push(val);
	      } else if ('object' == typeof obj) {
	        obj[objectKeys(obj).length] = val;
	      } else {
	        obj = parent[key] = [parent[key], val];
	      }
	      // prop
	    } else if (~indexOf(part, ']')) {
	      part = part.substr(0, part.length - 1);
	      if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
	      parse(parts, obj, part, val);
	      // key
	    } else {
	      if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
	      parse(parts, obj, part, val);
	    }
	  }
	}

	/**
	 * Merge parent key/val pair.
	 */

	function merge(parent, key, val){
	  if (~indexOf(key, ']')) {
	    var parts = key.split('[')
	      , len = parts.length
	      , last = len - 1;
	    parse(parts, parent, 'base', val);
	    // optimize
	  } else {
	    if (!isint.test(key) && isArray(parent.base)) {
	      var t = {};
	      for (var k in parent.base) t[k] = parent.base[k];
	      parent.base = t;
	    }
	    set(parent.base, key, val);
	  }

	  return parent;
	}

	/**
	 * Compact sparse arrays.
	 */

	function compact(obj) {
	  if ('object' != typeof obj) return obj;

	  if (isArray(obj)) {
	    var ret = [];

	    for (var i in obj) {
	      if (hasOwnProperty.call(obj, i)) {
	        ret.push(obj[i]);
	      }
	    }

	    return ret;
	  }

	  for (var key in obj) {
	    obj[key] = compact(obj[key]);
	  }

	  return obj;
	}

	/**
	 * Parse the given obj.
	 */

	function parseObject(obj){
	  var ret = { base: {} };

	  forEach(objectKeys(obj), function(name){
	    merge(ret, name, obj[name]);
	  });

	  return compact(ret.base);
	}

	/**
	 * Parse the given str.
	 */

	function parseString(str){
	  var ret = reduce(String(str).split('&'), function(ret, pair){
	    var eql = indexOf(pair, '=')
	      , brace = lastBraceInKey(pair)
	      , key = pair.substr(0, brace || eql)
	      , val = pair.substr(brace || eql, pair.length)
	      , val = val.substr(indexOf(val, '=') + 1, val.length);

	    // ?foo
	    if ('' == key) key = pair, val = '';
	    if ('' == key) return ret;

	    return merge(ret, decode(key), decode(val));
	  }, { base: {} }).base;

	  return compact(ret);
	}

	/**
	 * Parse the given query `str` or `obj`, returning an object.
	 *
	 * @param {String} str | {Object} obj
	 * @return {Object}
	 * @api public
	 */

	exports.parse = function(str){
	  if (null == str || '' == str) return {};
	  return 'object' == typeof str
	    ? parseObject(str)
	    : parseString(str);
	};

	/**
	 * Turn the given `obj` into a query string
	 *
	 * @param {Object} obj
	 * @return {String}
	 * @api public
	 */

	var stringify = exports.stringify = function(obj, prefix) {
	  if (isArray(obj)) {
	    return stringifyArray(obj, prefix);
	  } else if ('[object Object]' == toString.call(obj)) {
	    return stringifyObject(obj, prefix);
	  } else if ('string' == typeof obj) {
	    return stringifyString(obj, prefix);
	  } else {
	    return prefix + '=' + encodeURIComponent(String(obj));
	  }
	};

	/**
	 * Stringify the given `str`.
	 *
	 * @param {String} str
	 * @param {String} prefix
	 * @return {String}
	 * @api private
	 */

	function stringifyString(str, prefix) {
	  if (!prefix) throw new TypeError('stringify expects an object');
	  return prefix + '=' + encodeURIComponent(str);
	}

	/**
	 * Stringify the given `arr`.
	 *
	 * @param {Array} arr
	 * @param {String} prefix
	 * @return {String}
	 * @api private
	 */

	function stringifyArray(arr, prefix) {
	  var ret = [];
	  if (!prefix) throw new TypeError('stringify expects an object');
	  for (var i = 0; i < arr.length; i++) {
	    ret.push(stringify(arr[i], prefix + '[' + i + ']'));
	  }
	  return ret.join('&');
	}

	/**
	 * Stringify the given `obj`.
	 *
	 * @param {Object} obj
	 * @param {String} prefix
	 * @return {String}
	 * @api private
	 */

	function stringifyObject(obj, prefix) {
	  var ret = []
	    , keys = objectKeys(obj)
	    , key;

	  for (var i = 0, len = keys.length; i < len; ++i) {
	    key = keys[i];
	    if ('' == key) continue;
	    if (null == obj[key]) {
	      ret.push(encodeURIComponent(key) + '=');
	    } else {
	      ret.push(stringify(obj[key], prefix
	        ? prefix + '[' + encodeURIComponent(key) + ']'
	        : encodeURIComponent(key)));
	    }
	  }

	  return ret.join('&');
	}

	/**
	 * Set `obj`'s `key` to `val` respecting
	 * the weird and wonderful syntax of a qs,
	 * where "foo=bar&foo=baz" becomes an array.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {String} val
	 * @api private
	 */

	function set(obj, key, val) {
	  var v = obj[key];
	  if (Object.getOwnPropertyDescriptor(Object.prototype, key)) return;
	  if (undefined === v) {
	    obj[key] = val;
	  } else if (isArray(v)) {
	    v.push(val);
	  } else {
	    obj[key] = [v, val];
	  }
	}

	/**
	 * Locate last brace in `str` within the key.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function lastBraceInKey(str) {
	  var len = str.length
	    , brace
	    , c;
	  for (var i = 0; i < len; ++i) {
	    c = str[i];
	    if (']' == c) brace = false;
	    if ('[' == c) brace = true;
	    if ('=' == c && !brace) return i;
	  }
	}

	/**
	 * Decode `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */

	function decode(str) {
	  try {
	    return decodeURIComponent(str.replace(/\+/g, ' '));
	  } catch (err) {
	    return str;
	  }
	}


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		"name": "superagent",
		"version": "0.18.2",
		"description": "elegant & feature rich browser / node HTTP with a fluent API",
		"scripts": {
			"test": "make test"
		},
		"keywords": [
			"http",
			"ajax",
			"request",
			"agent"
		],
		"author": {
			"name": "TJ Holowaychuk",
			"email": "tj@vision-media.ca"
		},
		"contributors": [
			{
				"name": "Hunter Loftis",
				"email": "hunter@hunterloftis.com"
			}
		],
		"repository": {
			"type": "git",
			"url": "git://github.com/visionmedia/superagent.git"
		},
		"dependencies": {
			"qs": "0.6.6",
			"formidable": "1.0.14",
			"mime": "1.2.11",
			"component-emitter": "1.1.2",
			"methods": "1.0.1",
			"cookiejar": "2.0.1",
			"debug": "~1.0.1",
			"reduce-component": "1.0.1",
			"extend": "~1.2.1",
			"form-data": "0.1.3",
			"readable-stream": "1.0.27-1"
		},
		"devDependencies": {
			"zuul": "~1.6.0",
			"express": "3.5.0",
			"better-assert": "~0.1.0",
			"should": "3.1.3",
			"mocha": "*"
		},
		"browser": {
			"./lib/node/index.js": "./lib/client.js",
			"emitter": "component-emitter",
			"reduce": "reduce-component"
		},
		"component": {
			"scripts": {
				"superagent": "lib/client.js"
			}
		},
		"main": "./lib/node/index.js",
		"engines": {
			"node": "*"
		},
		"readme": "# SuperAgent\n\n  SuperAgent is a small progressive __client-side__ HTTP request library, and __Node.js__ module with the same API, sporting many high-level HTTP client features. View the [docs](http://visionmedia.github.com/superagent/).\n\n![super agent](http://f.cl.ly/items/3d282n3A0h0Z0K2w0q2a/Screenshot.png)\n\n## Installation\n\n  node:\n\n```\n$ npm install superagent\n```\n\n  component:\n\n```\n$ component install visionmedia/superagent\n```\n\n  with script tags use ./superagent.js\n\n## Motivation\n\n  This library spawned from my frustration with jQuery's weak & inconsistent Ajax support. jQuery's API, while having recently added some promise-like support, is largely static, forcing you to build up big objects containing all the header fields and options, not to mention most of the options are awkwardly named \"type\" instead of \"method\", etc. Onto examples!\n\n  The following is what you might typically do for a simple __GET__ with jQuery:\n\n```js\n$.get('/user/1', function(data, textStatus, xhr){\n\n});\n```\n\nGreat, it's ok, but it's kinda lame having 3 arguments just to access something on the `xhr`. Our equivalent would be:\n\n```js\nrequest.get('/user/1', function(res){\n\n});\n```\n\nThe response object is an instanceof `request.Response`, encapsulating all of this information instead of throwing a bunch of arguments at you. For example, we can check `res.status`, `res.header` for header fields, `res.text`, `res.body` etc.\n\nAn example of a JSON POST with jQuery typically might use `$.post()`, however once you need to start defining header fields you have to then re-write it using `$.ajax()`... so that might look like:\n\n```js\n$.ajax({\n  url: '/api/pet',\n  type: 'POST',\n  data: { name: 'Manny', species: 'cat' },\n  headers: { 'X-API-Key': 'foobar' }\n}).success(function(res){\n\n}).error(function(){\n\n});\n```\n\n Not only is it ugly, but it's pretty opinionated. jQuery likes to special-case {4,5}xx- for example, you cannot (easily at least) receive a parsed JSON response for say \"400 Bad Request\". This same request would look like this:\n\n```js\nrequest\n  .post('/api/pet')\n  .send({ name: 'Manny', species: 'cat' })\n  .set('X-API-Key', 'foobar')\n  .set('Accept', 'application/json')\n  .end(function(error, res){\n\n  });\n```\n\nBuilding on the existing API internally, we also provide something similar to `$.post()` for those times in life where your interactions are very basic:\n\n```js\nrequest.post('/api/pet', cat, function(error, res){\n\n});\n```\n\n# Plugins\n\nUsage:\n\n```js\nvar nocache = require('no-cache');\nvar request = require('superagent');\nvar prefix = require('superagent-prefix')('/static');\n\nprefix(request); // Prefixes *all* requests\n\nrequest\n.get('/some-url')\n.use(nocache) // Prevents caching of *only* this request\n.end(function(res){\n    // Do something\n});\n```\n\nExisting plugins:\n * [superagent-no-cache](https://github.com/johntron/superagent-no-cache) - prevents caching by including Cache-Control header\n * [superagent-prefix](https://github.com/johntron/superagent-prefix) - prefixes absolute URLs (useful in test environment)\n\nPlease prefix your plugin component with `superagent-*`\n\nFor superagent extensions such as couchdb and oauth visit the [wiki](https://github.com/visionmedia/superagent/wiki).\n\n## Running node tests\n\n  Install dependencies:\n\n     $ npm install\n\n  Run em!\n\n    $ make test\n\n## Running browser tests\n\n Install the test server deps (nodejs / express):\n\n    $ npm install\n\n Start the test server:\n\n    $ make test-server\n\n Visit `localhost:4000/` in the browser.\n\n## Browser build\n\n  The browser build of superagent is located in ./superagent.js\n\n## Examples:\n\n- [agency tests](https://github.com/visionmedia/superagent/blob/master/test/node/agency.js)\n- [express demo app](https://github.com/hunterloftis/component-test/blob/master/lib/users/test/controller.test.js)\n\n\n## License\n\n  MIT\n",
		"readmeFilename": "Readme.md",
		"bugs": {
			"url": "https://github.com/visionmedia/superagent/issues"
		},
		"homepage": "https://github.com/visionmedia/superagent",
		"_id": "superagent@0.18.2",
		"dist": {
			"shasum": "894254513c122d66b7419ea4011f6954dac3100c"
		},
		"_from": "superagent@~0.18.2",
		"_resolved": "https://registry.npmjs.org/superagent/-/superagent-0.18.2.tgz"
	}

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var tty = __webpack_require__(59);
	var util = __webpack_require__(30);

	/**
	 * This is the Node.js implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(61);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;

	/**
	 * Colors.
	 */

	exports.colors = [6, 2, 3, 4, 5, 1];

	/**
	 * Is stdout a TTY? Colored output is enabled when `true`.
	 */

	function useColors() {
	  var debugColors = (process.env.DEBUG_COLORS || '').trim().toLowerCase();
	  if (0 === debugColors.length) {
	    return tty.isatty(1);
	  } else {
	    return '0' !== debugColors
	        && 'no' !== debugColors
	        && 'false' !== debugColors
	        && 'disabled' !== debugColors;
	  }
	}

	/**
	 * Map %o to `util.inspect()`, since Node doesn't do that out of the box.
	 */

	var inspect = (4 === util.inspect.length ?
	  // node <= 0.8.x
	  function (v, colors) {
	    return util.inspect(v, void 0, void 0, colors);
	  } :
	  // node > 0.8.x
	  function (v, colors) {
	    return util.inspect(v, { colors: colors });
	  }
	);

	exports.formatters.o = function(v) {
	  return inspect(v, this.useColors)
	    .replace(/\s*\n\s*/g, ' ');
	};

	/**
	 * Adds ANSI color escape codes if enabled.
	 *
	 * @api public
	 */

	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	  var name = this.namespace;

	  if (useColors) {
	    var c = this.color;

	    args[0] = '  \u001b[9' + c + 'm' + name + ' '
	      + '\u001b[0m'
	      + args[0] + '\u001b[3' + c + 'm'
	      + ' +' + exports.humanize(this.diff) + '\u001b[0m';
	  } else {
	    args[0] = new Date().toUTCString()
	      + ' ' + name + ' ' + args[0];
	  }
	  return args;
	}

	/**
	 * Invokes `console.log()` with the specified arguments.
	 */

	function log() {
	  return console.log.apply(console, arguments);
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  if (null == namespaces) {
	    // If you set a process.env field to null or undefined, it gets cast to the
	    // string 'null' or 'undefined'. Just delete instead.
	    delete process.env.DEBUG;
	  } else {
	    process.env.DEBUG = namespaces;
	  }
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  return process.env.DEBUG;
	}

	/**
	 * Enable namespaces listed in `process.env.DEBUG` initially.
	 */

	exports.enable(load());


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var IncomingForm = __webpack_require__(62).IncomingForm;
	IncomingForm.IncomingForm = IncomingForm;
	module.exports = IncomingForm;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var CombinedStream = __webpack_require__(116);
	var util = __webpack_require__(30);
	var path = __webpack_require__(56);
	var http = __webpack_require__(27);
	var https = __webpack_require__(26);
	var parseUrl = __webpack_require__(24).parse;
	var fs = __webpack_require__(28);
	var mime = __webpack_require__(50);
	var async = __webpack_require__(117);

	module.exports = FormData;
	function FormData() {
	  this._overheadLength = 0;
	  this._valueLength = 0;
	  this._lengthRetrievers = [];

	  CombinedStream.call(this);
	}
	util.inherits(FormData, CombinedStream);

	FormData.LINE_BREAK = '\r\n';

	FormData.prototype.append = function(field, value, options) {
	  options = options || {};

	  var append = CombinedStream.prototype.append.bind(this);

	  // all that streamy business can't handle numbers
	  if (typeof value == 'number') value = ''+value;

	  // https://github.com/felixge/node-form-data/issues/38
	  if (util.isArray(value)) {
	    // Please convert your array into string
	    // the way web server expects it
	    this._error(new Error('Arrays are not supported.'));
	    return;
	  }

	  var header = this._multiPartHeader(field, value, options);
	  var footer = this._multiPartFooter(field, value, options);

	  append(header);
	  append(value);
	  append(footer);

	  // pass along options.knownLength
	  this._trackLength(header, value, options);
	};

	FormData.prototype._trackLength = function(header, value, options) {
	  var valueLength = 0;

	  // used w/ getLengthSync(), when length is known.
	  // e.g. for streaming directly from a remote server,
	  // w/ a known file a size, and not wanting to wait for
	  // incoming file to finish to get its size.
	  if (options.knownLength != null) {
	    valueLength += +options.knownLength;
	  } else if (Buffer.isBuffer(value)) {
	    valueLength = value.length;
	  } else if (typeof value === 'string') {
	    valueLength = Buffer.byteLength(value);
	  }

	  this._valueLength += valueLength;

	  // @check why add CRLF? does this account for custom/multiple CRLFs?
	  this._overheadLength +=
	    Buffer.byteLength(header) +
	    + FormData.LINE_BREAK.length;

	  // empty or either doesn't have path or not an http response
	  if (!value || ( !value.path && !(value.readable && value.hasOwnProperty('httpVersion')) )) {
	    return;
	  }

	  // no need to bother with the length
	  if (!options.knownLength)
	  this._lengthRetrievers.push(function(next) {

	    if (value.hasOwnProperty('fd')) {
	      fs.stat(value.path, function(err, stat) {
	        if (err) {
	          next(err);
	          return;
	        }

	        next(null, stat.size);
	      });

	    // or http response
	    } else if (value.hasOwnProperty('httpVersion')) {
	      next(null, +value.headers['content-length']);

	    // or request stream http://github.com/mikeal/request
	    } else if (value.hasOwnProperty('httpModule')) {
	      // wait till response come back
	      value.on('response', function(response) {
	        value.pause();
	        next(null, +response.headers['content-length']);
	      });
	      value.resume();

	    // something else
	    } else {
	      next('Unknown stream');
	    }
	  });
	};

	FormData.prototype._multiPartHeader = function(field, value, options) {
	  var boundary = this.getBoundary();
	  var header = '';

	  // custom header specified (as string)?
	  // it becomes responsible for boundary
	  // (e.g. to handle extra CRLFs on .NET servers)
	  if (options.header != null) {
	    header = options.header;
	  } else {
	    header += '--' + boundary + FormData.LINE_BREAK +
	      'Content-Disposition: form-data; name="' + field + '"';

	    // fs- and request- streams have path property
	    // or use custom filename and/or contentType
	    // TODO: Use request's response mime-type
	    if (options.filename || value.path) {
	      header +=
	        '; filename="' + path.basename(options.filename || value.path) + '"' + FormData.LINE_BREAK +
	        'Content-Type: ' +  (options.contentType || mime.lookup(options.filename || value.path));

	    // http response has not
	    } else if (value.readable && value.hasOwnProperty('httpVersion')) {
	      header +=
	        '; filename="' + path.basename(value.client._httpMessage.path) + '"' + FormData.LINE_BREAK +
	        'Content-Type: ' + value.headers['content-type'];
	    }

	    header += FormData.LINE_BREAK + FormData.LINE_BREAK;
	  }

	  return header;
	};

	FormData.prototype._multiPartFooter = function(field, value, options) {
	  return function(next) {
	    var footer = FormData.LINE_BREAK;

	    var lastPart = (this._streams.length === 0);
	    if (lastPart) {
	      footer += this._lastBoundary();
	    }

	    next(footer);
	  }.bind(this);
	};

	FormData.prototype._lastBoundary = function() {
	  return '--' + this.getBoundary() + '--';
	};

	FormData.prototype.getHeaders = function(userHeaders) {
	  var formHeaders = {
	    'content-type': 'multipart/form-data; boundary=' + this.getBoundary()
	  };

	  for (var header in userHeaders) {
	    formHeaders[header.toLowerCase()] = userHeaders[header];
	  }

	  return formHeaders;
	}

	FormData.prototype.getCustomHeaders = function(contentType) {
	    contentType = contentType ? contentType : 'multipart/form-data';

	    var formHeaders = {
	        'content-type': contentType + '; boundary=' + this.getBoundary(),
	        'content-length': this.getLengthSync()
	    };

	    return formHeaders;
	}

	FormData.prototype.getBoundary = function() {
	  if (!this._boundary) {
	    this._generateBoundary();
	  }

	  return this._boundary;
	};

	FormData.prototype._generateBoundary = function() {
	  // This generates a 50 character boundary similar to those used by Firefox.
	  // They are optimized for boyer-moore parsing.
	  var boundary = '--------------------------';
	  for (var i = 0; i < 24; i++) {
	    boundary += Math.floor(Math.random() * 10).toString(16);
	  }

	  this._boundary = boundary;
	};

	// Note: getLengthSync DOESN'T calculate streams length
	// As workaround one can calculate file size manually
	// and add it as knownLength option
	FormData.prototype.getLengthSync = function(debug) {
	  var knownLength = this._overheadLength + this._valueLength;

	  // Don't get confused, there are 3 "internal" streams for each keyval pair
	  // so it basically checks if there is any value added to the form
	  if (this._streams.length) {
	    knownLength += this._lastBoundary().length;
	  }

	  // https://github.com/felixge/node-form-data/issues/40
	  if (this._lengthRetrievers.length) {
	    // Some async length retrivers are present
	    // therefore synchronous length calculation is false.
	    // Please use getLength(callback) to get proper length
	    this._error(new Error('Cannot calculate proper length in synchronous way.'));
	  }

	  return knownLength;
	};

	FormData.prototype.getLength = function(cb) {
	  var knownLength = this._overheadLength + this._valueLength;

	  if (this._streams.length) {
	    knownLength += this._lastBoundary().length;
	  }

	  if (!this._lengthRetrievers.length) {
	    process.nextTick(cb.bind(this, null, knownLength));
	    return;
	  }

	  async.parallel(this._lengthRetrievers, function(err, values) {
	    if (err) {
	      cb(err);
	      return;
	    }

	    values.forEach(function(length) {
	      knownLength += length;
	    });

	    cb(null, knownLength);
	  });
	};

	FormData.prototype.submit = function(params, cb) {

	  var request
	    , options
	    , defaults = {
	        method : 'post'
	    };

	  // parse provided url if it's string
	  // or treat it as options object
	  if (typeof params == 'string') {
	    params = parseUrl(params);

	    options = populate({
	      port: params.port,
	      path: params.pathname,
	      host: params.hostname
	    }, defaults);
	  }
	  else // use custom params
	  {
	    options = populate(params, defaults);
	    // if no port provided use default one
	    if (!options.port) {
	      options.port = options.protocol == 'https:' ? 443 : 80;
	    }
	  }

	  // put that good code in getHeaders to some use
	  options.headers = this.getHeaders(params.headers);

	  // https if specified, fallback to http in any other case
	  if (params.protocol == 'https:') {
	    request = https.request(options);
	  } else {
	    request = http.request(options);
	  }

	  // get content length and fire away
	  this.getLength(function(err, length) {

	    // TODO: Add chunked encoding when no length (if err)

	    // add content length
	    request.setHeader('Content-Length', length);

	    this.pipe(request);
	    if (cb) {
	      request.on('error', cb);
	      request.on('response', cb.bind(this, null));
	    }
	  }.bind(this));

	  return request;
	};

	FormData.prototype._error = function(err) {
	  if (this.error) return;

	  this.error = err;
	  this.pause();
	  this.emit('error', err);
	};

	/*
	 * Santa's little helpers
	 */

	// populates missing values
	function populate(dst, src) {
	  for (var prop in src) {
	    if (!dst[prop]) dst[prop] = src[prop];
	  }
	  return dst;
	}


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {var path = __webpack_require__(56);
	var fs = __webpack_require__(28);

	function Mime() {
	  // Map of extension -> mime type
	  this.types = Object.create(null);

	  // Map of mime type -> extension
	  this.extensions = Object.create(null);
	}

	/**
	 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
	 * to an array of extensions associated with the type.  The first extension is
	 * used as the default extension for the type.
	 *
	 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
	 *
	 * @param map (Object) type definitions
	 */
	Mime.prototype.define = function (map) {
	  for (var type in map) {
	    var exts = map[type];

	    for (var i = 0; i < exts.length; i++) {
	      if (process.env.DEBUG_MIME && this.types[exts]) {
	        console.warn(this._loading.replace(/.*\//, ''), 'changes "' + exts[i] + '" extension type from ' +
	          this.types[exts] + ' to ' + type);
	      }

	      this.types[exts[i]] = type;
	    }

	    // Default extension is the first one we encounter
	    if (!this.extensions[type]) {
	      this.extensions[type] = exts[0];
	    }
	  }
	};

	/**
	 * Load an Apache2-style ".types" file
	 *
	 * This may be called multiple times (it's expected).  Where files declare
	 * overlapping types/extensions, the last file wins.
	 *
	 * @param file (String) path of file to load.
	 */
	Mime.prototype.load = function(file) {

	  this._loading = file;
	  // Read file and split into lines
	  var map = {},
	      content = fs.readFileSync(file, 'ascii'),
	      lines = content.split(/[\r\n]+/);

	  lines.forEach(function(line) {
	    // Clean up whitespace/comments, and split into fields
	    var fields = line.replace(/\s*#.*|^\s*|\s*$/g, '').split(/\s+/);
	    map[fields.shift()] = fields;
	  });

	  this.define(map);

	  this._loading = null;
	};

	/**
	 * Lookup a mime type based on extension
	 */
	Mime.prototype.lookup = function(path, fallback) {
	  var ext = path.replace(/.*[\.\/\\]/, '').toLowerCase();

	  return this.types[ext] || fallback || this.default_type;
	};

	/**
	 * Return file extension associated with a mime type
	 */
	Mime.prototype.extension = function(mimeType) {
	  var type = mimeType.match(/^\s*([^;\s]*)(?:;|\s|$)/)[1].toLowerCase();
	  return this.extensions[type];
	};

	// Default instance
	var mime = new Mime();

	// Load local copy of
	// http://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types
	mime.load(path.join(__dirname, 'types/mime.types'));

	// Load additional types from node.js community
	mime.load(path.join(__dirname, 'types/node.types'));

	// Default type
	mime.default_type = mime.lookup('bin');

	//
	// Additional API specific to the default instance
	//

	mime.Mime = Mime;

	/**
	 * Lookup a charset based on mime type.
	 */
	mime.charsets = {
	  lookup: function(mimeType, fallback) {
	    // Assume text types are utf8
	    return (/^text\//).test(mimeType) ? 'UTF-8' : fallback;
	  }
	};

	module.exports = mime;
	
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(63)


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var qs = __webpack_require__(45);

	module.exports = function(res, fn){
	  res.text = '';
	  res.setEncoding('ascii');
	  res.on('data', function(chunk){ res.text += chunk; });
	  res.on('end', function(){
	    try {
	      fn(null, qs.parse(res.text));
	    } catch (err) {
	      fn(err);
	    }
	  });
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = function(res, fn){
	  res.text = '';
	  res.setEncoding('utf8');
	  res.on('data', function(chunk){ res.text += chunk; });
	  res.on('end', function(){
	    try {
	      fn(null, JSON.parse(res.text));
	    } catch (err) {
	      fn(err);
	    }
	  });
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = function(res, fn){
	  res.text = '';
	  res.setEncoding('utf8');
	  res.on('data', function(chunk){ res.text += chunk; });
	  res.on('end', fn);
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = function(res, fn){
	  var data = '';
	  res.on('data', function(chunk){ data += chunk; });
	  res.on('end', function () {
	    fn(null, data);
	  });
	};


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("path");

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./bin/.npmignore": 66,
		"./fibers": 40,
		"./fibers.js": 40,
		"./future": 31,
		"./future.js": 31,
		"./package.json": 86,
		"./quick-test": 87,
		"./quick-test.js": 87,
		"./test/already-running": 96,
		"./test/already-running.js": 96,
		"./test/bad-context": 97,
		"./test/bad-context.js": 97,
		"./test/child-process": 98,
		"./test/child-process.js": 98,
		"./test/current": 99,
		"./test/current.js": 99,
		"./test/exec": 100,
		"./test/exec.js": 100,
		"./test/exit": 101,
		"./test/exit.js": 101,
		"./test/fibonacci": 102,
		"./test/fibonacci.js": 102,
		"./test/finish-multiple": 103,
		"./test/finish-multiple.js": 103,
		"./test/future": 105,
		"./test/future-exception": 104,
		"./test/future-exception.js": 104,
		"./test/future.js": 105,
		"./test/illegal-yield": 106,
		"./test/illegal-yield.js": 106,
		"./test/pool": 107,
		"./test/pool.js": 107,
		"./test/process-title": 108,
		"./test/process-title.js": 108,
		"./test/stack-overflow": 109,
		"./test/stack-overflow.js": 109,
		"./test/stack-overflow2": 110,
		"./test/stack-overflow2.js": 110,
		"./test/started": 111,
		"./test/started.js": 111,
		"./test/unwind": 112,
		"./test/unwind.js": 112
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.6.2
	(function() {
	  var asciiJSON;

	  asciiJSON = exports;

	  asciiJSON.isAscii = function(text) {
	    return /^[\x00-\x7F]*$/.test(text);
	  };

	  asciiJSON.escapeNonAsciis = function(text) {
	    var chars, code, i;

	    chars = [];
	    i = 0;
	    while (i < text.length) {
	      code = text.charCodeAt(i);
	      if (code < 128) {
	        chars.push(text[i]);
	      } else {
	        if (code < 256) {
	          chars.push('\\u00');
	        } else if (code < 4096) {
	          chars.push('\\u0');
	        } else {
	          chars.push('\\u');
	        }
	        chars.push(code.toString(16));
	      }
	      i++;
	    }
	    return chars.join('');
	  };

	  asciiJSON.stringify = function(object) {
	    var utf8JSON;

	    utf8JSON = JSON.stringify(object);
	    return asciiJSON.escapeNonAsciis(utf8JSON);
	  };

	  asciiJSON.parse = JSON.parse;

	}).call(this);


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("tty");

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* jshint node: true */
	(function () {
	    "use strict";

	    function CookieAccessInfo(domain, path, secure, script) {
	        if (this instanceof CookieAccessInfo) {
	            this.domain = domain || undefined;
	            this.path = path || "/";
	            this.secure = !!secure;
	            this.script = !!script;
	            return this;
	        }
	        return new CookieAccessInfo(domain, path, secure, script);
	    }
	    exports.CookieAccessInfo = CookieAccessInfo;

	    function Cookie(cookiestr, request_domain, request_path) {
	        if (cookiestr instanceof Cookie) {
	            return cookiestr;
	        }
	        if (this instanceof Cookie) {
	            this.name = null;
	            this.value = null;
	            this.expiration_date = Infinity;
	            this.path = String(request_path || "/");
	            this.explicit_path = false;
	            this.domain = request_domain || null;
	            this.explicit_domain = false;
	            this.secure = false; //how to define default?
	            this.noscript = false; //httponly
	            if (cookiestr) {
	                this.parse(cookiestr, request_domain, request_path);
	            }
	            return this;
	        }
	        return new Cookie(cookiestr);
	    }
	    exports.Cookie = Cookie;

	    Cookie.prototype.toString = function toString() {
	        var str = [this.name + "=" + this.value];
	        if (this.expiration_date !== Infinity) {
	            str.push("expires=" + (new Date(this.expiration_date)).toGMTString());
	        }
	        if (this.domain) {
	            str.push("domain=" + this.domain);
	        }
	        if (this.path) {
	            str.push("path=" + this.path);
	        }
	        if (this.secure) {
	            str.push("secure");
	        }
	        if (this.noscript) {
	            str.push("httponly");
	        }
	        return str.join("; ");
	    };

	    Cookie.prototype.toValueString = function toValueString() {
	        return this.name + "=" + this.value;
	    };

	    var cookie_str_splitter = /[:](?=\s*[a-zA-Z0-9_\-]+\s*[=])/g;
	    Cookie.prototype.parse = function parse(str, request_domain, request_path) {
	        if (this instanceof Cookie) {
	            var parts = str.split(";").filter(function (value) {
	                    return !!value;
	                }),
	                pair = parts[0].match(/([^=]+)=([\s\S]*)/),
	                key = pair[1],
	                value = pair[2],
	                i;
	            this.name = key;
	            this.value = value;

	            for (i = 1; i < parts.length; i += 1) {
	                pair = parts[i].match(/([^=]+)(?:=([\s\S]*))?/);
	                key = pair[1].trim().toLowerCase();
	                value = pair[2];
	                switch (key) {
	                case "httponly":
	                    this.noscript = true;
	                    break;
	                case "expires":
	                    this.expiration_date = value ?
	                            Number(Date.parse(value)) :
	                            Infinity;
	                    break;
	                case "path":
	                    this.path = value ?
	                            value.trim() :
	                            "";
	                    this.explicit_path = true;
	                    break;
	                case "domain":
	                    this.domain = value ?
	                            value.trim() :
	                            "";
	                    this.explicit_domain = !!this.domain;
	                    break;
	                case "secure":
	                    this.secure = true;
	                    break;
	                }
	            }

	            if (!this.explicit_path) {
	               this.path = request_path || "/";
	            }
	            if (!this.explicit_domain) {
	               this.domain = request_domain;
	            }

	            return this;
	        }
	        return new Cookie().parse(str, request_domain, request_path);
	    };

	    Cookie.prototype.matches = function matches(access_info) {
	        if (this.noscript && access_info.script ||
	                this.secure && !access_info.secure ||
	                !this.collidesWith(access_info)) {
	            return false;
	        }
	        return true;
	    };

	    Cookie.prototype.collidesWith = function collidesWith(access_info) {
	        if ((this.path && !access_info.path) || (this.domain && !access_info.domain)) {
	            return false;
	        }
	        if (this.path && access_info.path.indexOf(this.path) !== 0) {
	            return false;
	        }
	        if (!this.explicit_path) {
	           if (this.path !== access_info.path) {
	               return false;
	           }
	        }
	        var access_domain = access_info.domain && access_info.domain.replace(/^[\.]/,'');
	        var cookie_domain = this.domain && this.domain.replace(/^[\.]/,'');
	        if (cookie_domain === access_domain) {
	            return true;
	        }
	        if (cookie_domain) {
	            if (!this.explicit_domain) {
	                return false; // we already checked if the domains were exactly the same
	            }
	            var wildcard = access_domain.indexOf(cookie_domain);
	            if (wildcard === -1 || wildcard !== access_domain.length - cookie_domain.length) {
	                return false;
	            }
	            return true;
	        }
	        return true;
	    };

	    function CookieJar() {
	        var cookies, cookies_list, collidable_cookie;
	        if (this instanceof CookieJar) {
	            cookies = Object.create(null); //name: [Cookie]

	            this.setCookie = function setCookie(cookie, request_domain, request_path) {
	                var remove, i;
	                cookie = new Cookie(cookie, request_domain, request_path);
	                //Delete the cookie if the set is past the current time
	                remove = cookie.expiration_date <= Date.now();
	                if (cookies[cookie.name] !== undefined) {
	                    cookies_list = cookies[cookie.name];
	                    for (i = 0; i < cookies_list.length; i += 1) {
	                        collidable_cookie = cookies_list[i];
	                        if (collidable_cookie.collidesWith(cookie)) {
	                            if (remove) {
	                                cookies_list.splice(i, 1);
	                                if (cookies_list.length === 0) {
	                                    delete cookies[cookie.name];
	                                }
	                                return false;
	                            }
	                            cookies_list[i] = cookie;
	                            return cookie;
	                        }
	                    }
	                    if (remove) {
	                        return false;
	                    }
	                    cookies_list.push(cookie);
	                    return cookie;
	                }
	                if (remove) {
	                    return false;
	                }
	                cookies[cookie.name] = [cookie];
	                return cookies[cookie.name];
	            };
	            //returns a cookie
	            this.getCookie = function getCookie(cookie_name, access_info) {
	                var cookie, i;
	                cookies_list = cookies[cookie_name];
	                if (!cookies_list) {
	                    return;
	                }
	                for (i = 0; i < cookies_list.length; i += 1) {
	                    cookie = cookies_list[i];
	                    if (cookie.expiration_date <= Date.now()) {
	                        if (cookies_list.length === 0) {
	                            delete cookies[cookie.name];
	                        }
	                        continue;
	                    }
	                    if (cookie.matches(access_info)) {
	                        return cookie;
	                    }
	                }
	            };
	            //returns a list of cookies
	            this.getCookies = function getCookies(access_info) {
	                var matches = [], cookie_name, cookie;
	                for (cookie_name in cookies) {
	                    cookie = this.getCookie(cookie_name, access_info);
	                    if (cookie) {
	                        matches.push(cookie);
	                    }
	                }
	                matches.toString = function toString() {
	                    return matches.join(":");
	                };
	                matches.toValueString = function toValueString() {
	                    return matches.map(function (c) {
	                        return c.toValueString();
	                    }).join(';');
	                };
	                return matches;
	            };

	            return this;
	        }
	        return new CookieJar();
	    }
	    exports.CookieJar = CookieJar;

	    //returns list of cookies that were set correctly. Cookies that are expired and removed are not returned.
	    CookieJar.prototype.setCookies = function setCookies(cookies, request_domain, request_path) {
	        cookies = Array.isArray(cookies) ?
	                cookies :
	                cookies.split(cookie_str_splitter);
	        var successful = [],
	            i,
	            cookie;
	        cookies = cookies.map(Cookie);
	        for (i = 0; i < cookies.length; i += 1) {
	            cookie = cookies[i];
	            if (this.setCookie(cookie, request_domain, request_path)) {
	                successful.push(cookie);
	            }
	        }
	        return successful;
	    };
	}());


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(124);

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */

	exports.formatters = {};

	/**
	 * Previously assigned color.
	 */

	var prevColor = 0;

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */

	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function debug(namespace) {

	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;

	  // define the `enabled` version
	  function enabled() {

	    var self = enabled;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();

	    var args = Array.prototype.slice.call(arguments);

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;

	  var fn = exports.enabled(namespace) ? enabled : disabled;

	  fn.namespace = namespace;

	  return fn;
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;

	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var require;if (global.GENTLY) require = GENTLY.hijack(__webpack_require__(114));

	var fs = require('fs');
	var util = require('util'),
	    path = require('path'),
	    File = require('./file'),
	    MultipartParser = require('./multipart_parser').MultipartParser,
	    QuerystringParser = require('./querystring_parser').QuerystringParser,
	    OctetParser       = require('./octet_parser').OctetParser,
	    JSONParser = require('./json_parser').JSONParser,
	    StringDecoder = require('string_decoder').StringDecoder,
	    EventEmitter = require('events').EventEmitter,
	    Stream = require('stream').Stream,
	    os = require('os');

	function IncomingForm(opts) {
	  if (!(this instanceof IncomingForm)) return new IncomingForm(opts);
	  EventEmitter.call(this);

	  opts=opts||{};

	  this.error = null;
	  this.ended = false;

	  this.maxFields = opts.maxFields || 1000;
	  this.maxFieldsSize = opts.maxFieldsSize || 2 * 1024 * 1024;
	  this.keepExtensions = opts.keepExtensions || false;
	  this.uploadDir = opts.uploadDir || os.tmpDir();
	  this.encoding = opts.encoding || 'utf-8';
	  this.headers = null;
	  this.type = null;
	  this.hash = false;

	  this.bytesReceived = null;
	  this.bytesExpected = null;

	  this._parser = null;
	  this._flushing = 0;
	  this._fieldsSize = 0;
	  this.openedFiles = [];

	  return this;
	};
	util.inherits(IncomingForm, EventEmitter);
	exports.IncomingForm = IncomingForm;

	IncomingForm.prototype.parse = function(req, cb) {
	  this.pause = function() {
	    try {
	      req.pause();
	    } catch (err) {
	      // the stream was destroyed
	      if (!this.ended) {
	        // before it was completed, crash & burn
	        this._error(err);
	      }
	      return false;
	    }
	    return true;
	  };

	  this.resume = function() {
	    try {
	      req.resume();
	    } catch (err) {
	      // the stream was destroyed
	      if (!this.ended) {
	        // before it was completed, crash & burn
	        this._error(err);
	      }
	      return false;
	    }

	    return true;
	  };

	  // Setup callback first, so we don't miss anything from data events emitted
	  // immediately.
	  if (cb) {
	    var fields = {}, files = {};
	    this
	      .on('field', function(name, value) {
	        fields[name] = value;
	      })
	      .on('file', function(name, file) {
	        files[name] = file;
	      })
	      .on('error', function(err) {
	        cb(err, fields, files);
	      })
	      .on('end', function() {
	        cb(null, fields, files);
	      });
	  }

	  // Parse headers and setup the parser, ready to start listening for data.
	  this.writeHeaders(req.headers);

	  // Start listening for data.
	  var self = this;
	  req
	    .on('error', function(err) {
	      self._error(err);
	    })
	    .on('aborted', function() {
	      self.emit('aborted');
	      self._error(new Error('Request aborted'));
	    })
	    .on('data', function(buffer) {
	      self.write(buffer);
	    })
	    .on('end', function() {
	      if (self.error) {
	        return;
	      }

	      var err = self._parser.end();
	      if (err) {
	        self._error(err);
	      }
	    });

	  return this;
	};

	IncomingForm.prototype.writeHeaders = function(headers) {
	  this.headers = headers;
	  this._parseContentLength();
	  this._parseContentType();
	};

	IncomingForm.prototype.write = function(buffer) {
	  if (!this._parser) {
	    this._error(new Error('unintialized parser'));
	    return;
	  }

	  this.bytesReceived += buffer.length;
	  this.emit('progress', this.bytesReceived, this.bytesExpected);

	  var bytesParsed = this._parser.write(buffer);
	  if (bytesParsed !== buffer.length) {
	    this._error(new Error('parser error, '+bytesParsed+' of '+buffer.length+' bytes parsed'));
	  }

	  return bytesParsed;
	};

	IncomingForm.prototype.pause = function() {
	  // this does nothing, unless overwritten in IncomingForm.parse
	  return false;
	};

	IncomingForm.prototype.resume = function() {
	  // this does nothing, unless overwritten in IncomingForm.parse
	  return false;
	};

	IncomingForm.prototype.onPart = function(part) {
	  // this method can be overwritten by the user
	  this.handlePart(part);
	};

	IncomingForm.prototype.handlePart = function(part) {
	  var self = this;

	  if (part.filename === undefined) {
	    var value = ''
	      , decoder = new StringDecoder(this.encoding);

	    part.on('data', function(buffer) {
	      self._fieldsSize += buffer.length;
	      if (self._fieldsSize > self.maxFieldsSize) {
	        self._error(new Error('maxFieldsSize exceeded, received '+self._fieldsSize+' bytes of field data'));
	        return;
	      }
	      value += decoder.write(buffer);
	    });

	    part.on('end', function() {
	      self.emit('field', part.name, value);
	    });
	    return;
	  }

	  this._flushing++;

	  var file = new File({
	    path: this._uploadPath(part.filename),
	    name: part.filename,
	    type: part.mime,
	    hash: self.hash
	  });

	  this.emit('fileBegin', part.name, file);

	  file.open();
	  this.openedFiles.push(file);

	  part.on('data', function(buffer) {
	    self.pause();
	    file.write(buffer, function() {
	      self.resume();
	    });
	  });

	  part.on('end', function() {
	    file.end(function() {
	      self._flushing--;
	      self.emit('file', part.name, file);
	      self._maybeEnd();
	    });
	  });
	};

	function dummyParser(self) {
	  return {
	    end: function () {
	      self.ended = true;
	      self._maybeEnd();
	      return null;
	    }
	  };
	}

	IncomingForm.prototype._parseContentType = function() {
	  if (this.bytesExpected === 0) {
	    this._parser = dummyParser(this);
	    return;
	  }

	  if (!this.headers['content-type']) {
	    this._error(new Error('bad content-type header, no content-type'));
	    return;
	  }

	  if (this.headers['content-type'].match(/octet-stream/i)) {
	    this._initOctetStream();
	    return;
	  }

	  if (this.headers['content-type'].match(/urlencoded/i)) {
	    this._initUrlencoded();
	    return;
	  }

	  if (this.headers['content-type'].match(/multipart/i)) {
	    var m;
	    if (m = this.headers['content-type'].match(/boundary=(?:"([^"]+)"|([^;]+))/i)) {
	      this._initMultipart(m[1] || m[2]);
	    } else {
	      this._error(new Error('bad content-type header, no multipart boundary'));
	    }
	    return;
	  }

	  if (this.headers['content-type'].match(/json/i)) {
	    this._initJSONencoded();
	    return;
	  }

	  this._error(new Error('bad content-type header, unknown content-type: '+this.headers['content-type']));
	};

	IncomingForm.prototype._error = function(err) {
	  if (this.error || this.ended) {
	    return;
	  }

	  this.error = err;
	  this.pause();
	  this.emit('error', err);

	  if (Array.isArray(this.openedFiles)) {
	    this.openedFiles.forEach(function(file) {
	      file._writeStream.destroy();
	      setTimeout(fs.unlink, 0, file.path);
	    });
	  }
	};

	IncomingForm.prototype._parseContentLength = function() {
	  this.bytesReceived = 0;
	  if (this.headers['content-length']) {
	    this.bytesExpected = parseInt(this.headers['content-length'], 10);
	  } else if (this.headers['transfer-encoding'] === undefined) {
	    this.bytesExpected = 0;
	  }

	  if (this.bytesExpected !== null) {
	    this.emit('progress', this.bytesReceived, this.bytesExpected);
	  }
	};

	IncomingForm.prototype._newParser = function() {
	  return new MultipartParser();
	};

	IncomingForm.prototype._initMultipart = function(boundary) {
	  this.type = 'multipart';

	  var parser = new MultipartParser(),
	      self = this,
	      headerField,
	      headerValue,
	      part;

	  parser.initWithBoundary(boundary);

	  parser.onPartBegin = function() {
	    part = new Stream();
	    part.readable = true;
	    part.headers = {};
	    part.name = null;
	    part.filename = null;
	    part.mime = null;

	    part.transferEncoding = 'binary';
	    part.transferBuffer = '';

	    headerField = '';
	    headerValue = '';
	  };

	  parser.onHeaderField = function(b, start, end) {
	    headerField += b.toString(self.encoding, start, end);
	  };

	  parser.onHeaderValue = function(b, start, end) {
	    headerValue += b.toString(self.encoding, start, end);
	  };

	  parser.onHeaderEnd = function() {
	    headerField = headerField.toLowerCase();
	    part.headers[headerField] = headerValue;

	    var m;
	    if (headerField == 'content-disposition') {
	      if (m = headerValue.match(/\bname="([^"]+)"/i)) {
	        part.name = m[1];
	      }

	      part.filename = self._fileName(headerValue);
	    } else if (headerField == 'content-type') {
	      part.mime = headerValue;
	    } else if (headerField == 'content-transfer-encoding') {
	      part.transferEncoding = headerValue.toLowerCase();
	    }

	    headerField = '';
	    headerValue = '';
	  };

	  parser.onHeadersEnd = function() {
	    switch(part.transferEncoding){
	      case 'binary':
	      case '7bit':
	      case '8bit':
	      parser.onPartData = function(b, start, end) {
	        part.emit('data', b.slice(start, end));
	      };

	      parser.onPartEnd = function() {
	        part.emit('end');
	      };
	      break;

	      case 'base64':
	      parser.onPartData = function(b, start, end) {
	        part.transferBuffer += b.slice(start, end).toString('ascii');

	        /*
	        four bytes (chars) in base64 converts to three bytes in binary
	        encoding. So we should always work with a number of bytes that
	        can be divided by 4, it will result in a number of buytes that
	        can be divided vy 3.
	        */
	        var offset = parseInt(part.transferBuffer.length / 4) * 4;
	        part.emit('data', new Buffer(part.transferBuffer.substring(0, offset), 'base64'))
	        part.transferBuffer = part.transferBuffer.substring(offset);
	      };

	      parser.onPartEnd = function() {
	        part.emit('data', new Buffer(part.transferBuffer, 'base64'))
	        part.emit('end');
	      };
	      break;

	      default:
	      return self._error(new Error('unknown transfer-encoding'));
	    }

	    self.onPart(part);
	  };


	  parser.onEnd = function() {
	    self.ended = true;
	    self._maybeEnd();
	  };

	  this._parser = parser;
	};

	IncomingForm.prototype._fileName = function(headerValue) {
	  var m = headerValue.match(/\bfilename="(.*?)"($|; )/i);
	  if (!m) return;

	  var filename = m[1].substr(m[1].lastIndexOf('\\') + 1);
	  filename = filename.replace(/%22/g, '"');
	  filename = filename.replace(/&#([\d]{4});/g, function(m, code) {
	    return String.fromCharCode(code);
	  });
	  return filename;
	};

	IncomingForm.prototype._initUrlencoded = function() {
	  this.type = 'urlencoded';

	  var parser = new QuerystringParser(this.maxFields)
	    , self = this;

	  parser.onField = function(key, val) {
	    self.emit('field', key, val);
	  };

	  parser.onEnd = function() {
	    self.ended = true;
	    self._maybeEnd();
	  };

	  this._parser = parser;
	};

	IncomingForm.prototype._initOctetStream = function() {
	  this.type = 'octet-stream';
	  var filename = this.headers['x-file-name'];
	  var mime = this.headers['content-type'];

	  var file = new File({
	    path: this._uploadPath(filename),
	    name: filename,
	    type: mime
	  });

	  file.open();

	  this.emit('fileBegin', filename, file);

	  this._flushing++;

	  var self = this;

	  self._parser = new OctetParser();

	  //Keep track of writes that haven't finished so we don't emit the file before it's done being written
	  var outstandingWrites = 0;

	  self._parser.on('data', function(buffer){
	    self.pause();
	    outstandingWrites++;

	    file.write(buffer, function() {
	      outstandingWrites--;
	      self.resume();

	      if(self.ended){
	        self._parser.emit('doneWritingFile');
	      }
	    });
	  });

	  self._parser.on('end', function(){
	    self._flushing--;
	    self.ended = true;

	    var done = function(){
	      self.emit('file', 'file', file);
	      self._maybeEnd();
	    };

	    if(outstandingWrites === 0){
	      done();
	    } else {
	      self._parser.once('doneWritingFile', done);
	    }
	  });
	};

	IncomingForm.prototype._initJSONencoded = function() {
	  this.type = 'json';

	  var parser = new JSONParser()
	    , self = this;

	  if (this.bytesExpected) {
	    parser.initWithLength(this.bytesExpected);
	  }

	  parser.onField = function(key, val) {
	    self.emit('field', key, val);
	  }

	  parser.onEnd = function() {
	    self.ended = true;
	    self._maybeEnd();
	  };

	  this._parser = parser;
	};

	IncomingForm.prototype._uploadPath = function(filename) {
	  var name = '';
	  for (var i = 0; i < 32; i++) {
	    name += Math.floor(Math.random() * 16).toString(16);
	  }

	  if (this.keepExtensions) {
	    var ext = path.extname(filename);
	    ext     = ext.replace(/(\.[a-z0-9]+).*/, '$1');

	    name += ext;
	  }

	  return path.join(this.uploadDir, name);
	};

	IncomingForm.prototype._maybeEnd = function() {
	  if (!this.ended || this._flushing || this.error) {
	    return;
	  }

	  this.emit('end');
	};



/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.

	module.exports = PassThrough;

	var Transform = __webpack_require__(115);

	/*<replacement>*/
	var util = __webpack_require__(128);
	util.inherits = __webpack_require__(129);
	/*</replacement>*/

	util.inherits(PassThrough, Transform);

	function PassThrough(options) {
	  if (!(this instanceof PassThrough))
	    return new PassThrough(options);

	  Transform.call(this, options);
	}

	PassThrough.prototype._transform = function(chunk, encoding, cb) {
	  cb(null, chunk);
	};


/***/ },
/* 64 */,
/* 65 */,
/* 66 */
/***/ function(module, exports, __webpack_require__) {



/***/ },
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		"name": "fibers",
		"version": "1.0.2",
		"description": "Cooperative multi-tasking for Javascript",
		"keywords": [
			"fiber",
			"fibers",
			"coroutine",
			"thread",
			"async",
			"parallel",
			"worker",
			"future",
			"promise"
		],
		"homepage": "https://github.com/laverdet/node-fibers",
		"author": {
			"name": "Marcel Laverdet",
			"email": "marcel@laverdet.com",
			"url": "https://github.com/laverdet/"
		},
		"main": "fibers",
		"scripts": {
			"install": "node ./build.js",
			"test": "node ./test.js"
		},
		"repository": {
			"type": "git",
			"url": "git://github.com/laverdet/node-fibers.git"
		},
		"engines": {
			"node": ">=0.5.2"
		},
		"readme": "fibers(1) -- Fiber support for v8 and Node\n==========================================\n\nINSTALLING\n----------\n\n### via npm\n* `npm install fibers`\n* You're done!\n\n### from source\n* `git clone git://github.com/laverdet/node-fibers.git`\n* `cd node-fibers`\n* `npm install`\n\nNote: node-fibers uses [node-gyp](https://github.com/TooTallNate/node-gyp) for\nbuilding. To manually invoke the build process, you can use `node-gyp rebuild`.\nThis will put the compiled extension in `build/Release/fibers.node`. However,\nwhen you do `require('fibers')`, it will expect the module to be in, for\nexample, `bin/linux-x64-v8-3.11/fibers.node`. You can manually put the module\nhere every time you build, or you can use the included build script. Either\n`npm install` or `node build -f` will do this for you. If you are going to be\nhacking on node-fibers, it may be worthwhile to first do `node-gyp configure`\nand then for subsequent rebuilds you can just do `node-gyp build` which will\nbe faster than a full `npm install` or `node-gyp rebuild`.\n\n### important!\nIt's recommended that you use node 0.6.18 or higher with node-fibers. Using\nother versions may lead to instability during high loads.\n\n### other notes\nUnlike most NodeJS projects, node-fibers is a C++ project. Some extra work is\nrequired to compile node-fibers, but pretty much every platform is supported\nin some way. Binary distributions in 32 and 64-bit forms are provided in npm for\nLinux, OS X, and Windows (special thanks to\n[Jeroen Janssen](https://github.com/japj) for his work on fibers in Windows).\n\nSupport for Solaris, FreeBSD, and OpenBSD is provided by compiling the extension\non your system during install time via\n[node-gyp](https://github.com/TooTallNate/node-gyp). If your operating system\nisn't listed here you may have luck copying the build process for one of the\nother OS's, assuming you are running a POSIX-like OS.\n\nnode 0.6.x is required to run this release of node-fibers. Older versions of\nnode (0.4.x) are supported in older releases of node-fibers. See the 0.5.x\nbranch of node-fibers for documentation.\n\n\nEXAMPLES\n--------\n\nThe examples below describe basic use of `Fiber`, but note that it is **not\nrecommended** to use `Fiber` without an abstraction in between your code and\nfibers. See \"FUTURES\" below for additional information.\n\n### Sleep\nThis is a quick example of how you can write sleep() with fibers. Note that\nwhile the sleep() call is blocking inside the fiber, node is able to handle\nother events.\n\n\t$ cat sleep.js\n\n```javascript\nvar Fiber = require('fibers');\n\nfunction sleep(ms) {\n\tvar fiber = Fiber.current;\n\tsetTimeout(function() {\n\t\tfiber.run();\n\t}, ms);\n\tFiber.yield();\n}\n\nFiber(function() {\n\tconsole.log('wait... ' + new Date);\n\tsleep(1000);\n\tconsole.log('ok... ' + new Date);\n}).run();\nconsole.log('back in main');\n```\n\n\t$ node sleep.js\n\twait... Fri Jan 21 2011 22:42:04 GMT+0900 (JST)\n\tback in main\n\tok... Fri Jan 21 2011 22:42:05 GMT+0900 (JST)\n\n\n### Incremental Generator\nYielding execution will resume back in the fiber right where you left off. You\ncan also pass values back and forth through yield() and run(). Again, the node\nevent loop is never blocked while this script is running.\n\n\t$ cat generator.js\n\n```javascript\nvar Fiber = require('fibers');\n\nvar inc = Fiber(function(start) {\n\tvar total = start;\n\twhile (true) {\n\t\ttotal += Fiber.yield(total);\n\t}\n});\n\nfor (var ii = inc.run(1); ii <= 10; ii = inc.run(1)) {\n\tconsole.log(ii);\n}\n```\n\n\t$ node generator.js\n\t1\n\t2\n\t3\n\t4\n\t5\n\t6\n\t7\n\t8\n\t9\n\t10\n\n\n### Fibonacci Generator\nExpanding on the incremental generator above, we can create a generator which\nreturns a new Fibonacci number with each invocation. You can compare this with\nthe [ECMAScript Harmony\nGenerator](http://wiki.ecmascript.org/doku.php?id=harmony:generators) Fibonacci\nexample.\n\n\t$ cat fibonacci.js\n\n```javascript\nvar Fiber = require('fibers');\n\n// Generator function. Returns a function which returns incrementing\n// Fibonacci numbers with each call.\nfunction Fibonacci() {\n\t// Create a new fiber which yields sequential Fibonacci numbers\n\tvar fiber = Fiber(function() {\n\t\tFiber.yield(0); // F(0) -> 0\n\t\tvar prev = 0, curr = 1;\n\t\twhile (true) {\n\t\t\tFiber.yield(curr);\n\t\t\tvar tmp = prev + curr;\n\t\t\tprev = curr;\n\t\t\tcurr = tmp;\n\t\t}\n\t});\n\t// Return a bound handle to `run` on this fiber\n\treturn fiber.run.bind(fiber);\n}\n\n// Initialize a new Fibonacci sequence and iterate up to 1597\nvar seq = Fibonacci();\nfor (var ii = seq(); ii <= 1597; ii = seq()) {\n\tconsole.log(ii);\n}\n```\n\n\t$ node fibonacci.js\n\t0\n\t1\n\t1\n\t2\n\t3\n\t5\n\t8\n\t13\n\t21\n\t34\n\t55\n\t89\n\t144\n\t233\n\t377\n\t610\n\t987\n\t1597\n\n\n### Basic Exceptions\nFibers are exception-safe; exceptions will continue travelling through fiber\nboundaries:\n\n\t$ cat error.js\n\n```javascript\nvar Fiber = require('fibers');\n\nvar fn = Fiber(function() {\n\tconsole.log('async work here...');\n\tFiber.yield();\n\tconsole.log('still working...');\n\tFiber.yield();\n\tconsole.log('just a little bit more...');\n\tFiber.yield();\n\tthrow new Error('oh crap!');\n});\n\ntry {\n\twhile (true) {\n\t\tfn.run();\n\t}\n} catch(e) {\n\tconsole.log('safely caught that error!');\n\tconsole.log(e.stack);\n}\nconsole.log('done!');\n```\n\n\t$ node error.js\n\tasync work here...\n\tstill working...\n\tjust a little bit more...\n\tsafely caught that error!\n\tError: oh crap!\n\t\t\tat error.js:11:9\n\tdone!\n\n\nFUTURES\n-------\n\nUsing the `Fiber` class without an abstraction in between your code and the raw\nAPI is **not recommended**. `Fiber` is meant to implement the smallest amount of\nfunctionality in order make possible many different programming patterns. This\nmakes the `Fiber` class relatively lousy to work with directly, but extremely\npowerful when coupled with a decent abstraction. There is no right answer for\nwhich abstraction is right for you and your project. Included with `node-fibers`\nis an implementation of \"futures\" which is fiber-aware. Usage of this library\nis documented below. There are several other externally-maintained options\nwhich can be found on the [wiki](https://github.com/laverdet/node-fibers/wiki).\nYou **should** feel encouraged to be creative with fibers and build a solution\nwhich works well with your project. For instance, `Future` is not a good\nabstraction to use if you want to build a generator function (see Fibonacci\nexample above).\n\nUsing `Future` to wrap existing node functions. At no point is the node event\nloop blocked:\n\n\t$ cat ls.js\n\n```javascript\nvar Future = require('fibers/future');\nvar fs = Future.wrap(require('fs'));\n\nFuture.task(function() {\n\t// Get a list of files in the directory\n\tvar fileNames = fs.readdirFuture('.').wait();\n\tconsole.log('Found '+ fileNames.length+ ' files');\n\n\t// Stat each file\n\tvar stats = [];\n\tfor (var ii = 0; ii < fileNames.length; ++ii) {\n\t\tstats.push(fs.statFuture(fileNames[ii]));\n\t}\n\tstats.map(function(f) {\n\t\tf.wait()\n\t});\n\n\t// Print file size\n\tfor (var ii = 0; ii < fileNames.length; ++ii) {\n\t\tconsole.log(fileNames[ii]+ ': '+ stats[ii].get().size);\n\t}\n}).detach();\n```\n\n\t$ node ls.js \n\tFound 11 files\n\tbin: 4096\n\tfibers.js: 1708\n\t.gitignore: 37\n\tREADME.md: 8664\n\tfuture.js: 5833\n\t.git: 4096\n\tLICENSE: 1054\n\tsrc: 4096\n\tls.js: 860\n\tMakefile: 436\n\tpackage.json: 684\n\n\nThe future API is designed to make it easy to move between classic\ncallback-style code and fiber-aware waiting code:\n\n\t$ cat sleep.js\n\n```javascript\nvar Future = require('fibers/future'), wait = Future.wait;\n\n// This function returns a future which resolves after a timeout. This\n// demonstrates manually resolving futures.\nfunction sleep(ms) {\n\tvar future = new Future;\n\tsetTimeout(function() {\n\t\tfuture.return();\n\t}, ms);\n\treturn future;\n}\n\n// You can create functions which automatically run in their own fiber and\n// return futures that resolve when the fiber returns (this probably sounds\n// confusing.. just play with it to understand).\nvar calcTimerDelta = function(ms) {\n\tvar start = new Date;\n\tsleep(ms).wait();\n\treturn new Date - start;\n}.future(); // <-- important!\n\n// And futures also include node-friendly callbacks if you don't want to use\n// wait()\ncalcTimerDelta(2000).resolve(function(err, val) {\n\tconsole.log('Set timer for 2000ms, waited '+ val+ 'ms');\n});\n```\n\n\t$ node sleep.js\n\tSet timer for 2000ms, waited 2009ms\n\n\nAPI DOCUMENTATION\n-----------------\nFiber's definition looks something like this:\n\n```javascript\n/**\n * Instantiate a new Fiber. You may invoke this either as a function or as\n * a constructor; the behavior is the same.\n *\n * When run() is called on this fiber for the first time, `fn` will be\n * invoked as the first frame on a new stack. Execution will continue on\n * this new stack until `fn` returns, or Fiber.yield() is called.\n *\n * After the function returns the fiber is reset to original state and\n * may be restarted with another call to run().\n */\nfunction Fiber(fn) {\n\t[native code]\n}\n\n/**\n * `Fiber.current` will contain the currently-running Fiber. It will be\n * `undefined` if there is no fiber (i.e. the main stack of execution).\n *\n * See \"Garbage Collection\" for more information on responsible use of\n * `Fiber.current`.\n */\nFiber.current = undefined;\n\n/**\n * `Fiber.yield()` will halt execution of the current fiber and return control\n * back to original caller of run(). If an argument is supplied to yield(),\n * run() will return that value.\n *\n * When run() is called again, yield() will return.\n *\n * Note that this function is a global to allow for correct garbage\n * collection. This results in no loss of functionality because it is only\n * valid to yield from the currently running fiber anyway.\n *\n * Note also that `yield` is a reserved word in Javascript. This is normally\n * not an issue, however some code linters may complain. Rest assured that it\n * will run fine now and in future versions of Javascript.\n */\nFiber.yield = function(param) {\n\t[native code]\n}\n\n/**\n * run() will start execution of this Fiber, or if it is currently yielding,\n * it will resume execution. If an argument is supplied, this argument will\n * be passed to the fiber, either as the first parameter to the main\n * function [if the fiber has not been started] or as the return value of\n * yield() [if the fiber is currently yielding].\n *\n * This function will return either the parameter passed to yield(), or the\n * returned value from the fiber's main function.\n */\nFiber.prototype.run = function(param) {\n\t[native code]\n}\n\n/**\n * reset() will terminate a running Fiber and restore it to its original\n * state, as if it had returned execution.\n *\n * This is accomplished by causing yield() to throw an exception, and any\n * futher calls to yield() will also throw an exception. This continues\n * until the fiber has completely unwound and returns.\n *\n * If the fiber returns a value it will be returned by reset().\n *\n * If the fiber is not running, reset() will have no effect.\n */\nFiber.prototype.reset = function() {\n\t[native code]\n}\n\n/**\n * throwInto() will cause a currently yielding fiber's yield() call to\n * throw instead of return gracefully. This can be useful for notifying a\n * fiber that you are no longer interested in its task, and that it should\n * give up.\n *\n * Note that if the fiber does not handle the exception it will continue to\n * bubble up and throwInto() will throw the exception right back at you.\n */\nFiber.prototype.throwInto = function(exception) {\n\t[native code]\n}\n```\n\n\nFuture's definition looks something like this:\n\n```javascript\n/**\n * Returns a future-function which, when run, starts running the target\n * function and returns a future for the result.\n * \n * Example usage: \n * var funcy = function(arg) {\n *   return arg+1;\n * }.future();\n * \n * funcy(1).wait(); // returns 2\n */\nFunction.prototype.future = function() { ... }\n\n/**\n * Future object, instantiated with the new operator.\n */\nfunction Future() {}\n\n/**\n * Wrap a node-style async function to return a future in place of using a callback.\n * \n * fn - the function or object to wrap\n * array - indicates that this callback will return more than 1 argument after `err`. For example,\n *         `child_process.exec()` returns [err, stdout, stderr]\n * suffix - appends a string to every method that was overridden, if you passed an object\n * \n * Example usage: Future.wrap(asyncFunction)(arg1).wait()\n */\nFuture.wrap = function(fn, multi, suffix) { ... }\n\n/**\n * Invoke a function that will be run in its own fiber context and return a future to its return\n * value.\n *\n * Example:\n * Future.task(function() {\n *   // You can safely `wait` on stuff here\n * }).detach();\n */\nFuture.task = function(fn) { ... }\n\n/**\n * Wait on a series of futures and then return. If the futures throw an exception this function\n * /won't/ throw it back. You can get the value of the future by calling get() on it directly. If\n * you want to wait on a single future you're better off calling future.wait() on the instance.\n * \n * Example usage: Future.wait(aFuture, anotherFuture)\n */\nFuture.wait = function(/* ... */) { ... }\n\n/**\n * Return the value of this future. If the future hasn't resolved yet this will throw an error.\n */\nFuture.prototype.get = function() { ... }\n\n/**\n * Mark this future as returned. All pending callbacks will be invoked immediately.\n * \n * value - the value to return when get() or wait() is called.\n * \n * Example usage: aFuture.return(value)\n */\nFuture.prototype.return = function(value) { ... }\n\n/**\n * Throw from this future as returned. All pending callbacks will be invoked immediately.\n * Note that execution will continue normally after running this method, \n * so make sure you exit appropriately after running throw()\n * \n * error - the error to throw when get() or wait() is called.\n * \n * Example usage: aFuture.throw(new Error(\"Something borked\"))\n */\nFuture.prototype.throw = function(error) { ... }\n\n/**\n * \"detach\" this future. Basically this is useful if you want to run a task in a future, you\n * aren't interested in its return value, but if it throws you don't want the exception to be\n * lost. If this fiber throws, an exception will be thrown to the event loop and node will\n * probably fall down.\n */\nFuture.prototype.detach = function() { ... }\n\n/**\n * Returns whether or not this future has resolved yet.\n */\nFuture.prototype.isResolved = function() { ... }\n\n/**\n * Returns a node-style function which will mark this future as resolved when called.\n * \n * Example usage: \n *   var errback = aFuture.resolver();\n *   asyncFunction(arg1, arg2, etc, errback)\n *   var result = aFuture.wait();\n */\nFuture.prototype.resolver = function() { ... }\n\n/**\n * Waits for this future to resolve and then invokes a callback.\n *\n * If only one argument is passed it is a standard function(err, val){} errback.\n *\n * If two arguments are passed, the first argument is a future which will be thrown to in the case\n * of error, and the second is a function(val){} callback.\n */\nFuture.prototype.resolve = function(/* errback or future, callback */) { ... }\n\n/**\n * Propogate results to another future.\n * \n * Example usage: future1.proxy(future2) // future2 gets automatically resolved with however future1 resolves\n */\nFuture.prototype.proxy = function(future) { ... }\n\n/**\n * Differs from its functional counterpart in that it actually resolves the future. Thus if the\n * future threw, future.wait() will throw.\n */\nFuture.prototype.wait = function() { ... }\n```\n\nGARBAGE COLLECTION\n------------------\n\nIf you intend to build generators, iterators, or \"lazy lists\", you should be\naware that all fibers must eventually unwind. This is implemented by causing\nyield() to throw unconditionally when the library is trying to unwind your\nfiber-- either because reset() was called, or all handles to the fiber were lost\nand v8 wants to delete it.\n\nSomething like this will, at some point, cause an infinite loop in your\napplication:\n\n```javascript\nvar fiber = Fiber(function() {\n\twhile (true) {\n\t\ttry {\n\t\t\tFiber.yield();\n\t\t} catch(e) {}\n\t}\n});\nfiber.run();\n```\n\nIf you either call reset() on this fiber, or the v8 garbage collector decides it\nis no longer in use, the fiber library will attempt to unwind the fiber by\ncausing all calls to yield() to throw. However, if you catch these exceptions\nand continue anyway, an infinite loop will occur.\n\nThere are other garbage collection issues that occur with misuse of fiber\nhandles. If you grab a handle to a fiber from within itself, you should make\nsure that the fiber eventually unwinds. This application will leak memory:\n\n```javascript\nvar fiber = Fiber(function() {\n\tvar that = Fiber.current;\n\tFiber.yield();\n}\nfiber.run();\nfiber = undefined;\n```\n\nThere is no way to get back into the fiber that was started, however it's\nimpossible for v8's garbage collector to detect this. With a handle to the fiber\nstill outstanding, v8 will never garbage collect it and the stack will remain in\nmemory until the application exits.\n\nThus, you should take care when grabbing references to `Fiber.current`.\n",
		"readmeFilename": "README.md",
		"bugs": {
			"url": "https://github.com/laverdet/node-fibers/issues"
		},
		"_id": "fibers@1.0.2",
		"dist": {
			"shasum": "dc4964ad07c58dabf8c658bd08bc333cdc653a83"
		},
		"_from": "fibers@",
		"_resolved": "https://registry.npmjs.org/fibers/-/fibers-1.0.2.tgz"
	}

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"
	var Fiber = __webpack_require__(40);
	var fiber = Fiber(function() {
		process.stdout.write(Fiber.yield());
	});
	fiber.run();
	fiber.run('pass');


/***/ },
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// gh-8
	var Fiber = __webpack_require__(40);
	try {
		Fiber(function() {
			var that = Fiber.current;
			Fiber(function(){
				that.run();
			}).run();
		}).run();
	} catch(err) {
		console.log('pass');
	}


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var Fiber = __webpack_require__(40);

	try {
		Fiber.prototype.run.call(null);
	} catch (err) {
		console.log('pass');
	}


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// gh-20
	var Fiber = __webpack_require__(40);

	function main() {
		var proc = __webpack_require__(118).spawn(process.execPath, [process.argv[1], 'child']);
		function ondata(data) {
			process.stdout.write(data+ '');
		}
		proc.stdout.on('data', ondata);
		proc.stderr.on('data', ondata);
	}

	function child() {
		var fn = Fiber(function() {
			Fiber.yield('pa');
			return 'ss';
		});
		var r1 = fn.run();
		var r2 = fn.run();
		console.log(r1+ r2);
	}

	process.argv[2] === 'child' ? child() : main();


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var Fiber = __webpack_require__(40);

	var current;
	Fiber(function() {
		current = Fiber.current;
		Fiber.yield();
		console.log('pass');
	}).run();
	if (current) {
		current.run();
	} else {
		console.log('fail');
	}


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	// gh-1
	var Fiber = __webpack_require__(40);

	if (process.platform == 'win32') {
		// There is a problem with running this from a script. Not fibers related.
		console.log('pass');
	} else {
		Fiber(function() {
			__webpack_require__(118).exec('echo pass', function(err, stdout) {
				if (err) console.log(err);
				process.stdout.write(stdout);
			});
		}).run();
	}


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var Fiber = __webpack_require__(40);
	if (!process.stdout.write('pass\n')) {
		process.stdout.on('drain', go);
	} else {
		go();
	}
	function go() {
		Fiber(function() {
			process.exit();
		}).run();
		console.log('fail');
	}


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var Fiber = __webpack_require__(40);

	function Fibonacci() {
		return Fiber.prototype.run.bind(Fiber(function() {
	    Fiber.yield(0); // F(0) -> 0
	    var prev = 0, curr = 1;
	    while (true) {
	      Fiber.yield(curr);
	      var tmp = prev + curr;
	      prev = curr;
	      curr = tmp;
	    }
	  }));
	}

	var seq = Fibonacci(), results = [];
	for (var ii = seq(); ii <= 1597; ii = seq()) {
		results.push(ii);
	}

	if (results+ '' !== '0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597') {
		throw new Error;
	}
	console.log('pass');


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	// gh-16
	var Fiber = __webpack_require__(40);
	Fiber(function() {
		Fiber(function() {
			Fiber(function() {}).run();
		}).run();
	}).run();
	console.log('pass');


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var Fiber = __webpack_require__(40);
	var Future = __webpack_require__(31);

	// Possible outputs:
	// pass: exception is thrown and caught in uncaughtException
	// fail: exception is thrown and not caught
	// no output: process dies


	var thrown = false;
	var caught = false;

	var async = function(continuation) {
		process.nextTick(function() {
			continuation();
		});
	}

	process.on('uncaughtException', function(err) {
		if (err.message === 'Catch me if you can') {
			caught = true;
		} else {
			throw err;
		}
	});

	// This fiber's job is to throw an exception after yielding.
	Fiber(function() {
		// yield and resume via Future.wait() and its cb() helper
		var sync = Future.wrap(async)();
		sync.wait();

		// this should get rethrown to the main event loop
		thrown = true;
		throw new Error('Catch me if you can');
	}).run();

	// This fiber's job is to make sure the process is still alive after the
	// exception was thrown.
	Fiber(function() {
		// wait for other fiber to throw exception and yield
		while (!thrown) {
			var sync = Future.wrap(async)();
			sync.wait();
		}

		// wait once more to allow exception to get caught
		process.nextTick(function() {
			// see if we have noticed the exception we expect to
			console.log(caught ? 'pass' : 'fail');
		});
	}).run();


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var Future;
	try {
		Future = __webpack_require__(31);
	} catch (err) {
		Future = __webpack_require__(31);
	}

	function Timer(ms) {
		var future = new Future;
		function ret() {
			future.return();
		}
		ms ? setTimeout(ret, ms) : process.nextTick(ret);
		return future;
	}

	~function() {
		var timer = new Timer(10), tick = new Timer;
		Future.wait(timer, tick);
		timer.get();
		tick.get();
		return 'pass';
	}.future()().resolve(function(err, val) {
		if (err) throw err;
		console.log(val);
	});


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// gh-3
	var Fiber = __webpack_require__(40);
	try {
		Fiber.yield();
	} catch(err) {
		console.log('pass');
	}


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var Fiber = __webpack_require__(40);

	for (var jj = 0; jj < 10; ++jj) {
		var fibers = [];
		for (var ii = 0; ii < 200; ++ii) {
			var fn = Fiber(function() {
				Fiber.yield();
			});
			fn.run();
			fibers.push(fn);
		}
		for (var ii = 0; ii < fibers.length; ++ii) {
			fibers[ii].run();
		}
	}
	console.log('pass');


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	// gh-10
	var Fiber = __webpack_require__(40);

	var title = process.title;
	Fiber(function() {
		process.title = 'pass';
	}).run();
	console.log(process.title === 'pass' || process.title === title ? 'pass' : 'fail');


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var Fiber = __webpack_require__(40);
	try {
		Fiber(function() {
			function foo() {
				var hello = Math.random();
				foo();
			}
			foo();
		}).run();
	} catch (err) {
		err.name === 'RangeError' && console.log('pass');
	}


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var Fiber = __webpack_require__(40);
	Fiber(function() {
		// Because of how v8 handles strings, the call to new RegExp chews up a lot of stack space
		// outside of JS.
		function fn() {
			var foo = '';
			for (var ii = 0; ii < 1024; ++ii) {
				foo += 'a';
			}
			new RegExp(foo, 'g');
		}

		// Calculate how far we can go recurse without hitting the JS stack limit
		var max = 0;
		function testRecursion(ii) {
			++max;
			testRecursion(ii + 1);
		}
		try {
			testRecursion();
		} catch (err) {}

		// Recurse to the limit and then invoke a stack-heavy C++ operation
		function wasteStack(ii) {
			ii ? wasteStack(ii - 1) : fn();
		}
		wasteStack(max - 94);
		console.log('pass');
	}).run();


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	// gh-12
	var Fiber = __webpack_require__(40);
	Fiber(function() {
		if (!Fiber.current.started) {
			throw new Error;
		}
	}).run();
	console.log('pass');


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var Fiber = __webpack_require__(40);

	var ii;
	var fn = Fiber(function() {
		for (ii = 0; ii < 1000; ++ii) {
			try {
				Fiber.yield();
			} catch (err) {}
		}
	});

	fn.run();
	fn.reset();
	ii === 1000 && console.log('pass');


/***/ },
/* 113 */,
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./file": 119,
		"./file.js": 119,
		"./incoming_form": 62,
		"./incoming_form.js": 62,
		"./index": 48,
		"./index.js": 48,
		"./json_parser": 120,
		"./json_parser.js": 120,
		"./multipart_parser": 121,
		"./multipart_parser.js": 121,
		"./octet_parser": 122,
		"./octet_parser.js": 122,
		"./querystring_parser": 123,
		"./querystring_parser.js": 123
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.


	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.

	module.exports = Transform;

	var Duplex = __webpack_require__(125);

	/*<replacement>*/
	var util = __webpack_require__(128);
	util.inherits = __webpack_require__(129);
	/*</replacement>*/

	util.inherits(Transform, Duplex);


	function TransformState(options, stream) {
	  this.afterTransform = function(er, data) {
	    return afterTransform(stream, er, data);
	  };

	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	}

	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;

	  var cb = ts.writecb;

	  if (!cb)
	    return stream.emit('error', new Error('no writecb in Transform class'));

	  ts.writechunk = null;
	  ts.writecb = null;

	  if (data !== null && data !== undefined)
	    stream.push(data);

	  if (cb)
	    cb(er);

	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}


	function Transform(options) {
	  if (!(this instanceof Transform))
	    return new Transform(options);

	  Duplex.call(this, options);

	  var ts = this._transformState = new TransformState(options, this);

	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;

	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;

	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;

	  this.once('finish', function() {
	    if ('function' === typeof this._flush)
	      this._flush(function(er) {
	        done(stream, er);
	      });
	    else
	      done(stream);
	  });
	}

	Transform.prototype.push = function(chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};

	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function(chunk, encoding, cb) {
	  throw new Error('not implemented');
	};

	Transform.prototype._write = function(chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform ||
	        rs.needReadable ||
	        rs.length < rs.highWaterMark)
	      this._read(rs.highWaterMark);
	  }
	};

	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function(n) {
	  var ts = this._transformState;

	  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};


	function done(stream, er) {
	  if (er)
	    return stream.emit('error', er);

	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var rs = stream._readableState;
	  var ts = stream._transformState;

	  if (ws.length)
	    throw new Error('calling transform done when ws.length != 0');

	  if (ts.transforming)
	    throw new Error('calling transform done when still transforming');

	  return stream.push(null);
	}


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(30);
	var Stream = __webpack_require__(25).Stream;
	var DelayedStream = __webpack_require__(132);

	module.exports = CombinedStream;
	function CombinedStream() {
	  this.writable = false;
	  this.readable = true;
	  this.dataSize = 0;
	  this.maxDataSize = 2 * 1024 * 1024;
	  this.pauseStreams = true;

	  this._released = false;
	  this._streams = [];
	  this._currentStream = null;
	}
	util.inherits(CombinedStream, Stream);

	CombinedStream.create = function(options) {
	  var combinedStream = new this();

	  options = options || {};
	  for (var option in options) {
	    combinedStream[option] = options[option];
	  }

	  return combinedStream;
	};

	CombinedStream.isStreamLike = function(stream) {
	  return (typeof stream !== 'function')
	    && (typeof stream !== 'string')
	    && (typeof stream !== 'boolean')    
	    && (typeof stream !== 'number')
	    && (!Buffer.isBuffer(stream));
	};

	CombinedStream.prototype.append = function(stream) {
	  var isStreamLike = CombinedStream.isStreamLike(stream);

	  if (isStreamLike) {
	    if (!(stream instanceof DelayedStream)) {
	      stream.on('data', this._checkDataSize.bind(this));

	      stream = DelayedStream.create(stream, {
	        maxDataSize: Infinity,
	        pauseStream: this.pauseStreams,
	      });
	    }

	    this._handleErrors(stream);

	    if (this.pauseStreams) {
	      stream.pause();
	    }
	  }

	  this._streams.push(stream);
	  return this;
	};

	CombinedStream.prototype.pipe = function(dest, options) {
	  Stream.prototype.pipe.call(this, dest, options);
	  this.resume();
	  return dest;
	};

	CombinedStream.prototype._getNext = function() {
	  this._currentStream = null;
	  var stream = this._streams.shift();


	  if (typeof stream == 'undefined') {
	    this.end();
	    return;
	  }

	  if (typeof stream !== 'function') {
	    this._pipeNext(stream);
	    return;
	  }

	  var getStream = stream;
	  getStream(function(stream) {
	    var isStreamLike = CombinedStream.isStreamLike(stream);
	    if (isStreamLike) {
	      stream.on('data', this._checkDataSize.bind(this));
	      this._handleErrors(stream);
	    }

	    this._pipeNext(stream);
	  }.bind(this));
	};

	CombinedStream.prototype._pipeNext = function(stream) {
	  this._currentStream = stream;

	  var isStreamLike = CombinedStream.isStreamLike(stream);
	  if (isStreamLike) {
	    stream.on('end', this._getNext.bind(this))
	    stream.pipe(this, {end: false});
	    return;
	  }

	  var value = stream;
	  this.write(value);
	  this._getNext();
	};

	CombinedStream.prototype._handleErrors = function(stream) {
	  var self = this;
	  stream.on('error', function(err) {
	    self._emitError(err);
	  });
	};

	CombinedStream.prototype.write = function(data) {
	  this.emit('data', data);
	};

	CombinedStream.prototype.pause = function() {
	  if (!this.pauseStreams) {
	    return;
	  }

	  this.emit('pause');
	};

	CombinedStream.prototype.resume = function() {
	  if (!this._released) {
	    this._released = true;
	    this.writable = true;
	    this._getNext();
	  }

	  this.emit('resume');
	};

	CombinedStream.prototype.end = function() {
	  this._reset();
	  this.emit('end');
	};

	CombinedStream.prototype.destroy = function() {
	  this._reset();
	  this.emit('close');
	};

	CombinedStream.prototype._reset = function() {
	  this.writable = false;
	  this._streams = [];
	  this._currentStream = null;
	};

	CombinedStream.prototype._checkDataSize = function() {
	  this._updateDataSize();
	  if (this.dataSize <= this.maxDataSize) {
	    return;
	  }

	  var message =
	    'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.'
	  this._emitError(new Error(message));
	};

	CombinedStream.prototype._updateDataSize = function() {
	  this.dataSize = 0;

	  var self = this;
	  this._streams.forEach(function(stream) {
	    if (!stream.dataSize) {
	      return;
	    }

	    self.dataSize += stream.dataSize;
	  });

	  if (this._currentStream && this._currentStream.dataSize) {
	    this.dataSize += this._currentStream.dataSize;
	  }
	};

	CombinedStream.prototype._emitError = function(err) {
	  this._reset();
	  this.emit('error', err);
	};


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * async
	 * https://github.com/caolan/async
	 *
	 * Copyright 2010-2014 Caolan McMahon
	 * Released under the MIT license
	 */
	/*jshint onevar: false, indent:4 */
	/*global setImmediate: false, setTimeout: false, console: false */
	(function () {

	    var async = {};

	    // global on the server, window in the browser
	    var root, previous_async;

	    root = this;
	    if (root != null) {
	      previous_async = root.async;
	    }

	    async.noConflict = function () {
	        root.async = previous_async;
	        return async;
	    };

	    function only_once(fn) {
	        var called = false;
	        return function() {
	            if (called) throw new Error("Callback was already called.");
	            called = true;
	            fn.apply(root, arguments);
	        }
	    }

	    //// cross-browser compatiblity functions ////

	    var _toString = Object.prototype.toString;

	    var _isArray = Array.isArray || function (obj) {
	        return _toString.call(obj) === '[object Array]';
	    };

	    var _each = function (arr, iterator) {
	        if (arr.forEach) {
	            return arr.forEach(iterator);
	        }
	        for (var i = 0; i < arr.length; i += 1) {
	            iterator(arr[i], i, arr);
	        }
	    };

	    var _map = function (arr, iterator) {
	        if (arr.map) {
	            return arr.map(iterator);
	        }
	        var results = [];
	        _each(arr, function (x, i, a) {
	            results.push(iterator(x, i, a));
	        });
	        return results;
	    };

	    var _reduce = function (arr, iterator, memo) {
	        if (arr.reduce) {
	            return arr.reduce(iterator, memo);
	        }
	        _each(arr, function (x, i, a) {
	            memo = iterator(memo, x, i, a);
	        });
	        return memo;
	    };

	    var _keys = function (obj) {
	        if (Object.keys) {
	            return Object.keys(obj);
	        }
	        var keys = [];
	        for (var k in obj) {
	            if (obj.hasOwnProperty(k)) {
	                keys.push(k);
	            }
	        }
	        return keys;
	    };

	    //// exported async module functions ////

	    //// nextTick implementation with browser-compatible fallback ////
	    if (typeof process === 'undefined' || !(process.nextTick)) {
	        if (typeof setImmediate === 'function') {
	            async.nextTick = function (fn) {
	                // not a direct alias for IE10 compatibility
	                setImmediate(fn);
	            };
	            async.setImmediate = async.nextTick;
	        }
	        else {
	            async.nextTick = function (fn) {
	                setTimeout(fn, 0);
	            };
	            async.setImmediate = async.nextTick;
	        }
	    }
	    else {
	        async.nextTick = process.nextTick;
	        if (typeof setImmediate !== 'undefined') {
	            async.setImmediate = function (fn) {
	              // not a direct alias for IE10 compatibility
	              setImmediate(fn);
	            };
	        }
	        else {
	            async.setImmediate = async.nextTick;
	        }
	    }

	    async.each = function (arr, iterator, callback) {
	        callback = callback || function () {};
	        if (!arr.length) {
	            return callback();
	        }
	        var completed = 0;
	        _each(arr, function (x) {
	            iterator(x, only_once(done) );
	        });
	        function done(err) {
	          if (err) {
	              callback(err);
	              callback = function () {};
	          }
	          else {
	              completed += 1;
	              if (completed >= arr.length) {
	                  callback();
	              }
	          }
	        }
	    };
	    async.forEach = async.each;

	    async.eachSeries = function (arr, iterator, callback) {
	        callback = callback || function () {};
	        if (!arr.length) {
	            return callback();
	        }
	        var completed = 0;
	        var iterate = function () {
	            iterator(arr[completed], function (err) {
	                if (err) {
	                    callback(err);
	                    callback = function () {};
	                }
	                else {
	                    completed += 1;
	                    if (completed >= arr.length) {
	                        callback();
	                    }
	                    else {
	                        iterate();
	                    }
	                }
	            });
	        };
	        iterate();
	    };
	    async.forEachSeries = async.eachSeries;

	    async.eachLimit = function (arr, limit, iterator, callback) {
	        var fn = _eachLimit(limit);
	        fn.apply(null, [arr, iterator, callback]);
	    };
	    async.forEachLimit = async.eachLimit;

	    var _eachLimit = function (limit) {

	        return function (arr, iterator, callback) {
	            callback = callback || function () {};
	            if (!arr.length || limit <= 0) {
	                return callback();
	            }
	            var completed = 0;
	            var started = 0;
	            var running = 0;

	            (function replenish () {
	                if (completed >= arr.length) {
	                    return callback();
	                }

	                while (running < limit && started < arr.length) {
	                    started += 1;
	                    running += 1;
	                    iterator(arr[started - 1], function (err) {
	                        if (err) {
	                            callback(err);
	                            callback = function () {};
	                        }
	                        else {
	                            completed += 1;
	                            running -= 1;
	                            if (completed >= arr.length) {
	                                callback();
	                            }
	                            else {
	                                replenish();
	                            }
	                        }
	                    });
	                }
	            })();
	        };
	    };


	    var doParallel = function (fn) {
	        return function () {
	            var args = Array.prototype.slice.call(arguments);
	            return fn.apply(null, [async.each].concat(args));
	        };
	    };
	    var doParallelLimit = function(limit, fn) {
	        return function () {
	            var args = Array.prototype.slice.call(arguments);
	            return fn.apply(null, [_eachLimit(limit)].concat(args));
	        };
	    };
	    var doSeries = function (fn) {
	        return function () {
	            var args = Array.prototype.slice.call(arguments);
	            return fn.apply(null, [async.eachSeries].concat(args));
	        };
	    };


	    var _asyncMap = function (eachfn, arr, iterator, callback) {
	        arr = _map(arr, function (x, i) {
	            return {index: i, value: x};
	        });
	        if (!callback) {
	            eachfn(arr, function (x, callback) {
	                iterator(x.value, function (err) {
	                    callback(err);
	                });
	            });
	        } else {
	            var results = [];
	            eachfn(arr, function (x, callback) {
	                iterator(x.value, function (err, v) {
	                    results[x.index] = v;
	                    callback(err);
	                });
	            }, function (err) {
	                callback(err, results);
	            });
	        }
	    };
	    async.map = doParallel(_asyncMap);
	    async.mapSeries = doSeries(_asyncMap);
	    async.mapLimit = function (arr, limit, iterator, callback) {
	        return _mapLimit(limit)(arr, iterator, callback);
	    };

	    var _mapLimit = function(limit) {
	        return doParallelLimit(limit, _asyncMap);
	    };

	    // reduce only has a series version, as doing reduce in parallel won't
	    // work in many situations.
	    async.reduce = function (arr, memo, iterator, callback) {
	        async.eachSeries(arr, function (x, callback) {
	            iterator(memo, x, function (err, v) {
	                memo = v;
	                callback(err);
	            });
	        }, function (err) {
	            callback(err, memo);
	        });
	    };
	    // inject alias
	    async.inject = async.reduce;
	    // foldl alias
	    async.foldl = async.reduce;

	    async.reduceRight = function (arr, memo, iterator, callback) {
	        var reversed = _map(arr, function (x) {
	            return x;
	        }).reverse();
	        async.reduce(reversed, memo, iterator, callback);
	    };
	    // foldr alias
	    async.foldr = async.reduceRight;

	    var _filter = function (eachfn, arr, iterator, callback) {
	        var results = [];
	        arr = _map(arr, function (x, i) {
	            return {index: i, value: x};
	        });
	        eachfn(arr, function (x, callback) {
	            iterator(x.value, function (v) {
	                if (v) {
	                    results.push(x);
	                }
	                callback();
	            });
	        }, function (err) {
	            callback(_map(results.sort(function (a, b) {
	                return a.index - b.index;
	            }), function (x) {
	                return x.value;
	            }));
	        });
	    };
	    async.filter = doParallel(_filter);
	    async.filterSeries = doSeries(_filter);
	    // select alias
	    async.select = async.filter;
	    async.selectSeries = async.filterSeries;

	    var _reject = function (eachfn, arr, iterator, callback) {
	        var results = [];
	        arr = _map(arr, function (x, i) {
	            return {index: i, value: x};
	        });
	        eachfn(arr, function (x, callback) {
	            iterator(x.value, function (v) {
	                if (!v) {
	                    results.push(x);
	                }
	                callback();
	            });
	        }, function (err) {
	            callback(_map(results.sort(function (a, b) {
	                return a.index - b.index;
	            }), function (x) {
	                return x.value;
	            }));
	        });
	    };
	    async.reject = doParallel(_reject);
	    async.rejectSeries = doSeries(_reject);

	    var _detect = function (eachfn, arr, iterator, main_callback) {
	        eachfn(arr, function (x, callback) {
	            iterator(x, function (result) {
	                if (result) {
	                    main_callback(x);
	                    main_callback = function () {};
	                }
	                else {
	                    callback();
	                }
	            });
	        }, function (err) {
	            main_callback();
	        });
	    };
	    async.detect = doParallel(_detect);
	    async.detectSeries = doSeries(_detect);

	    async.some = function (arr, iterator, main_callback) {
	        async.each(arr, function (x, callback) {
	            iterator(x, function (v) {
	                if (v) {
	                    main_callback(true);
	                    main_callback = function () {};
	                }
	                callback();
	            });
	        }, function (err) {
	            main_callback(false);
	        });
	    };
	    // any alias
	    async.any = async.some;

	    async.every = function (arr, iterator, main_callback) {
	        async.each(arr, function (x, callback) {
	            iterator(x, function (v) {
	                if (!v) {
	                    main_callback(false);
	                    main_callback = function () {};
	                }
	                callback();
	            });
	        }, function (err) {
	            main_callback(true);
	        });
	    };
	    // all alias
	    async.all = async.every;

	    async.sortBy = function (arr, iterator, callback) {
	        async.map(arr, function (x, callback) {
	            iterator(x, function (err, criteria) {
	                if (err) {
	                    callback(err);
	                }
	                else {
	                    callback(null, {value: x, criteria: criteria});
	                }
	            });
	        }, function (err, results) {
	            if (err) {
	                return callback(err);
	            }
	            else {
	                var fn = function (left, right) {
	                    var a = left.criteria, b = right.criteria;
	                    return a < b ? -1 : a > b ? 1 : 0;
	                };
	                callback(null, _map(results.sort(fn), function (x) {
	                    return x.value;
	                }));
	            }
	        });
	    };

	    async.auto = function (tasks, callback) {
	        callback = callback || function () {};
	        var keys = _keys(tasks);
	        var remainingTasks = keys.length
	        if (!remainingTasks) {
	            return callback();
	        }

	        var results = {};

	        var listeners = [];
	        var addListener = function (fn) {
	            listeners.unshift(fn);
	        };
	        var removeListener = function (fn) {
	            for (var i = 0; i < listeners.length; i += 1) {
	                if (listeners[i] === fn) {
	                    listeners.splice(i, 1);
	                    return;
	                }
	            }
	        };
	        var taskComplete = function () {
	            remainingTasks--
	            _each(listeners.slice(0), function (fn) {
	                fn();
	            });
	        };

	        addListener(function () {
	            if (!remainingTasks) {
	                var theCallback = callback;
	                // prevent final callback from calling itself if it errors
	                callback = function () {};

	                theCallback(null, results);
	            }
	        });

	        _each(keys, function (k) {
	            var task = _isArray(tasks[k]) ? tasks[k]: [tasks[k]];
	            var taskCallback = function (err) {
	                var args = Array.prototype.slice.call(arguments, 1);
	                if (args.length <= 1) {
	                    args = args[0];
	                }
	                if (err) {
	                    var safeResults = {};
	                    _each(_keys(results), function(rkey) {
	                        safeResults[rkey] = results[rkey];
	                    });
	                    safeResults[k] = args;
	                    callback(err, safeResults);
	                    // stop subsequent errors hitting callback multiple times
	                    callback = function () {};
	                }
	                else {
	                    results[k] = args;
	                    async.setImmediate(taskComplete);
	                }
	            };
	            var requires = task.slice(0, Math.abs(task.length - 1)) || [];
	            var ready = function () {
	                return _reduce(requires, function (a, x) {
	                    return (a && results.hasOwnProperty(x));
	                }, true) && !results.hasOwnProperty(k);
	            };
	            if (ready()) {
	                task[task.length - 1](taskCallback, results);
	            }
	            else {
	                var listener = function () {
	                    if (ready()) {
	                        removeListener(listener);
	                        task[task.length - 1](taskCallback, results);
	                    }
	                };
	                addListener(listener);
	            }
	        });
	    };

	    async.retry = function(times, task, callback) {
	        var DEFAULT_TIMES = 5;
	        var attempts = [];
	        // Use defaults if times not passed
	        if (typeof times === 'function') {
	            callback = task;
	            task = times;
	            times = DEFAULT_TIMES;
	        }
	        // Make sure times is a number
	        times = parseInt(times, 10) || DEFAULT_TIMES;
	        var wrappedTask = function(wrappedCallback, wrappedResults) {
	            var retryAttempt = function(task, finalAttempt) {
	                return function(seriesCallback) {
	                    task(function(err, result){
	                        seriesCallback(!err || finalAttempt, {err: err, result: result});
	                    }, wrappedResults);
	                };
	            };
	            while (times) {
	                attempts.push(retryAttempt(task, !(times-=1)));
	            }
	            async.series(attempts, function(done, data){
	                data = data[data.length - 1];
	                (wrappedCallback || callback)(data.err, data.result);
	            });
	        }
	        // If a callback is passed, run this as a controll flow
	        return callback ? wrappedTask() : wrappedTask
	    };

	    async.waterfall = function (tasks, callback) {
	        callback = callback || function () {};
	        if (!_isArray(tasks)) {
	          var err = new Error('First argument to waterfall must be an array of functions');
	          return callback(err);
	        }
	        if (!tasks.length) {
	            return callback();
	        }
	        var wrapIterator = function (iterator) {
	            return function (err) {
	                if (err) {
	                    callback.apply(null, arguments);
	                    callback = function () {};
	                }
	                else {
	                    var args = Array.prototype.slice.call(arguments, 1);
	                    var next = iterator.next();
	                    if (next) {
	                        args.push(wrapIterator(next));
	                    }
	                    else {
	                        args.push(callback);
	                    }
	                    async.setImmediate(function () {
	                        iterator.apply(null, args);
	                    });
	                }
	            };
	        };
	        wrapIterator(async.iterator(tasks))();
	    };

	    var _parallel = function(eachfn, tasks, callback) {
	        callback = callback || function () {};
	        if (_isArray(tasks)) {
	            eachfn.map(tasks, function (fn, callback) {
	                if (fn) {
	                    fn(function (err) {
	                        var args = Array.prototype.slice.call(arguments, 1);
	                        if (args.length <= 1) {
	                            args = args[0];
	                        }
	                        callback.call(null, err, args);
	                    });
	                }
	            }, callback);
	        }
	        else {
	            var results = {};
	            eachfn.each(_keys(tasks), function (k, callback) {
	                tasks[k](function (err) {
	                    var args = Array.prototype.slice.call(arguments, 1);
	                    if (args.length <= 1) {
	                        args = args[0];
	                    }
	                    results[k] = args;
	                    callback(err);
	                });
	            }, function (err) {
	                callback(err, results);
	            });
	        }
	    };

	    async.parallel = function (tasks, callback) {
	        _parallel({ map: async.map, each: async.each }, tasks, callback);
	    };

	    async.parallelLimit = function(tasks, limit, callback) {
	        _parallel({ map: _mapLimit(limit), each: _eachLimit(limit) }, tasks, callback);
	    };

	    async.series = function (tasks, callback) {
	        callback = callback || function () {};
	        if (_isArray(tasks)) {
	            async.mapSeries(tasks, function (fn, callback) {
	                if (fn) {
	                    fn(function (err) {
	                        var args = Array.prototype.slice.call(arguments, 1);
	                        if (args.length <= 1) {
	                            args = args[0];
	                        }
	                        callback.call(null, err, args);
	                    });
	                }
	            }, callback);
	        }
	        else {
	            var results = {};
	            async.eachSeries(_keys(tasks), function (k, callback) {
	                tasks[k](function (err) {
	                    var args = Array.prototype.slice.call(arguments, 1);
	                    if (args.length <= 1) {
	                        args = args[0];
	                    }
	                    results[k] = args;
	                    callback(err);
	                });
	            }, function (err) {
	                callback(err, results);
	            });
	        }
	    };

	    async.iterator = function (tasks) {
	        var makeCallback = function (index) {
	            var fn = function () {
	                if (tasks.length) {
	                    tasks[index].apply(null, arguments);
	                }
	                return fn.next();
	            };
	            fn.next = function () {
	                return (index < tasks.length - 1) ? makeCallback(index + 1): null;
	            };
	            return fn;
	        };
	        return makeCallback(0);
	    };

	    async.apply = function (fn) {
	        var args = Array.prototype.slice.call(arguments, 1);
	        return function () {
	            return fn.apply(
	                null, args.concat(Array.prototype.slice.call(arguments))
	            );
	        };
	    };

	    var _concat = function (eachfn, arr, fn, callback) {
	        var r = [];
	        eachfn(arr, function (x, cb) {
	            fn(x, function (err, y) {
	                r = r.concat(y || []);
	                cb(err);
	            });
	        }, function (err) {
	            callback(err, r);
	        });
	    };
	    async.concat = doParallel(_concat);
	    async.concatSeries = doSeries(_concat);

	    async.whilst = function (test, iterator, callback) {
	        if (test()) {
	            iterator(function (err) {
	                if (err) {
	                    return callback(err);
	                }
	                async.whilst(test, iterator, callback);
	            });
	        }
	        else {
	            callback();
	        }
	    };

	    async.doWhilst = function (iterator, test, callback) {
	        iterator(function (err) {
	            if (err) {
	                return callback(err);
	            }
	            var args = Array.prototype.slice.call(arguments, 1);
	            if (test.apply(null, args)) {
	                async.doWhilst(iterator, test, callback);
	            }
	            else {
	                callback();
	            }
	        });
	    };

	    async.until = function (test, iterator, callback) {
	        if (!test()) {
	            iterator(function (err) {
	                if (err) {
	                    return callback(err);
	                }
	                async.until(test, iterator, callback);
	            });
	        }
	        else {
	            callback();
	        }
	    };

	    async.doUntil = function (iterator, test, callback) {
	        iterator(function (err) {
	            if (err) {
	                return callback(err);
	            }
	            var args = Array.prototype.slice.call(arguments, 1);
	            if (!test.apply(null, args)) {
	                async.doUntil(iterator, test, callback);
	            }
	            else {
	                callback();
	            }
	        });
	    };

	    async.queue = function (worker, concurrency) {
	        if (concurrency === undefined) {
	            concurrency = 1;
	        }
	        function _insert(q, data, pos, callback) {
	          if (!q.started){
	            q.started = true;
	          }
	          if (!_isArray(data)) {
	              data = [data];
	          }
	          if(data.length == 0) {
	             // call drain immediately if there are no tasks
	             return async.setImmediate(function() {
	                 if (q.drain) {
	                     q.drain();
	                 }
	             });
	          }
	          _each(data, function(task) {
	              var item = {
	                  data: task,
	                  callback: typeof callback === 'function' ? callback : null
	              };

	              if (pos) {
	                q.tasks.unshift(item);
	              } else {
	                q.tasks.push(item);
	              }

	              if (q.saturated && q.tasks.length === q.concurrency) {
	                  q.saturated();
	              }
	              async.setImmediate(q.process);
	          });
	        }

	        var workers = 0;
	        var q = {
	            tasks: [],
	            concurrency: concurrency,
	            saturated: null,
	            empty: null,
	            drain: null,
	            started: false,
	            paused: false,
	            push: function (data, callback) {
	              _insert(q, data, false, callback);
	            },
	            kill: function () {
	              q.drain = null;
	              q.tasks = [];
	            },
	            unshift: function (data, callback) {
	              _insert(q, data, true, callback);
	            },
	            process: function () {
	                if (!q.paused && workers < q.concurrency && q.tasks.length) {
	                    var task = q.tasks.shift();
	                    if (q.empty && q.tasks.length === 0) {
	                        q.empty();
	                    }
	                    workers += 1;
	                    var next = function () {
	                        workers -= 1;
	                        if (task.callback) {
	                            task.callback.apply(task, arguments);
	                        }
	                        if (q.drain && q.tasks.length + workers === 0) {
	                            q.drain();
	                        }
	                        q.process();
	                    };
	                    var cb = only_once(next);
	                    worker(task.data, cb);
	                }
	            },
	            length: function () {
	                return q.tasks.length;
	            },
	            running: function () {
	                return workers;
	            },
	            idle: function() {
	                return q.tasks.length + workers === 0;
	            },
	            pause: function () {
	                if (q.paused === true) { return; }
	                q.paused = true;
	                q.process();
	            },
	            resume: function () {
	                if (q.paused === false) { return; }
	                q.paused = false;
	                q.process();
	            }
	        };
	        return q;
	    };
	    
	    async.priorityQueue = function (worker, concurrency) {
	        
	        function _compareTasks(a, b){
	          return a.priority - b.priority;
	        };
	        
	        function _binarySearch(sequence, item, compare) {
	          var beg = -1,
	              end = sequence.length - 1;
	          while (beg < end) {
	            var mid = beg + ((end - beg + 1) >>> 1);
	            if (compare(item, sequence[mid]) >= 0) {
	              beg = mid;
	            } else {
	              end = mid - 1;
	            }
	          }
	          return beg;
	        }
	        
	        function _insert(q, data, priority, callback) {
	          if (!q.started){
	            q.started = true;
	          }
	          if (!_isArray(data)) {
	              data = [data];
	          }
	          if(data.length == 0) {
	             // call drain immediately if there are no tasks
	             return async.setImmediate(function() {
	                 if (q.drain) {
	                     q.drain();
	                 }
	             });
	          }
	          _each(data, function(task) {
	              var item = {
	                  data: task,
	                  priority: priority,
	                  callback: typeof callback === 'function' ? callback : null
	              };
	              
	              q.tasks.splice(_binarySearch(q.tasks, item, _compareTasks) + 1, 0, item);

	              if (q.saturated && q.tasks.length === q.concurrency) {
	                  q.saturated();
	              }
	              async.setImmediate(q.process);
	          });
	        }
	        
	        // Start with a normal queue
	        var q = async.queue(worker, concurrency);
	        
	        // Override push to accept second parameter representing priority
	        q.push = function (data, priority, callback) {
	          _insert(q, data, priority, callback);
	        };
	        
	        // Remove unshift function
	        delete q.unshift;

	        return q;
	    };

	    async.cargo = function (worker, payload) {
	        var working     = false,
	            tasks       = [];

	        var cargo = {
	            tasks: tasks,
	            payload: payload,
	            saturated: null,
	            empty: null,
	            drain: null,
	            drained: true,
	            push: function (data, callback) {
	                if (!_isArray(data)) {
	                    data = [data];
	                }
	                _each(data, function(task) {
	                    tasks.push({
	                        data: task,
	                        callback: typeof callback === 'function' ? callback : null
	                    });
	                    cargo.drained = false;
	                    if (cargo.saturated && tasks.length === payload) {
	                        cargo.saturated();
	                    }
	                });
	                async.setImmediate(cargo.process);
	            },
	            process: function process() {
	                if (working) return;
	                if (tasks.length === 0) {
	                    if(cargo.drain && !cargo.drained) cargo.drain();
	                    cargo.drained = true;
	                    return;
	                }

	                var ts = typeof payload === 'number'
	                            ? tasks.splice(0, payload)
	                            : tasks.splice(0, tasks.length);

	                var ds = _map(ts, function (task) {
	                    return task.data;
	                });

	                if(cargo.empty) cargo.empty();
	                working = true;
	                worker(ds, function () {
	                    working = false;

	                    var args = arguments;
	                    _each(ts, function (data) {
	                        if (data.callback) {
	                            data.callback.apply(null, args);
	                        }
	                    });

	                    process();
	                });
	            },
	            length: function () {
	                return tasks.length;
	            },
	            running: function () {
	                return working;
	            }
	        };
	        return cargo;
	    };

	    var _console_fn = function (name) {
	        return function (fn) {
	            var args = Array.prototype.slice.call(arguments, 1);
	            fn.apply(null, args.concat([function (err) {
	                var args = Array.prototype.slice.call(arguments, 1);
	                if (typeof console !== 'undefined') {
	                    if (err) {
	                        if (console.error) {
	                            console.error(err);
	                        }
	                    }
	                    else if (console[name]) {
	                        _each(args, function (x) {
	                            console[name](x);
	                        });
	                    }
	                }
	            }]));
	        };
	    };
	    async.log = _console_fn('log');
	    async.dir = _console_fn('dir');
	    /*async.info = _console_fn('info');
	    async.warn = _console_fn('warn');
	    async.error = _console_fn('error');*/

	    async.memoize = function (fn, hasher) {
	        var memo = {};
	        var queues = {};
	        hasher = hasher || function (x) {
	            return x;
	        };
	        var memoized = function () {
	            var args = Array.prototype.slice.call(arguments);
	            var callback = args.pop();
	            var key = hasher.apply(null, args);
	            if (key in memo) {
	                async.nextTick(function () {
	                    callback.apply(null, memo[key]);
	                });
	            }
	            else if (key in queues) {
	                queues[key].push(callback);
	            }
	            else {
	                queues[key] = [callback];
	                fn.apply(null, args.concat([function () {
	                    memo[key] = arguments;
	                    var q = queues[key];
	                    delete queues[key];
	                    for (var i = 0, l = q.length; i < l; i++) {
	                      q[i].apply(null, arguments);
	                    }
	                }]));
	            }
	        };
	        memoized.memo = memo;
	        memoized.unmemoized = fn;
	        return memoized;
	    };

	    async.unmemoize = function (fn) {
	      return function () {
	        return (fn.unmemoized || fn).apply(null, arguments);
	      };
	    };

	    async.times = function (count, iterator, callback) {
	        var counter = [];
	        for (var i = 0; i < count; i++) {
	            counter.push(i);
	        }
	        return async.map(counter, iterator, callback);
	    };

	    async.timesSeries = function (count, iterator, callback) {
	        var counter = [];
	        for (var i = 0; i < count; i++) {
	            counter.push(i);
	        }
	        return async.mapSeries(counter, iterator, callback);
	    };

	    async.seq = function (/* functions... */) {
	        var fns = arguments;
	        return function () {
	            var that = this;
	            var args = Array.prototype.slice.call(arguments);
	            var callback = args.pop();
	            async.reduce(fns, args, function (newargs, fn, cb) {
	                fn.apply(that, newargs.concat([function () {
	                    var err = arguments[0];
	                    var nextargs = Array.prototype.slice.call(arguments, 1);
	                    cb(err, nextargs);
	                }]))
	            },
	            function (err, results) {
	                callback.apply(that, [err].concat(results));
	            });
	        };
	    };

	    async.compose = function (/* functions... */) {
	      return async.seq.apply(null, Array.prototype.reverse.call(arguments));
	    };

	    var _applyEach = function (eachfn, fns /*args...*/) {
	        var go = function () {
	            var that = this;
	            var args = Array.prototype.slice.call(arguments);
	            var callback = args.pop();
	            return eachfn(fns, function (fn, cb) {
	                fn.apply(that, args.concat([cb]));
	            },
	            callback);
	        };
	        if (arguments.length > 2) {
	            var args = Array.prototype.slice.call(arguments, 2);
	            return go.apply(this, args);
	        }
	        else {
	            return go;
	        }
	    };
	    async.applyEach = doParallel(_applyEach);
	    async.applyEachSeries = doSeries(_applyEach);

	    async.forever = function (fn, callback) {
	        function next(err) {
	            if (err) {
	                if (callback) {
	                    return callback(err);
	                }
	                throw err;
	            }
	            fn(next);
	        }
	        next();
	    };

	    // Node.js
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = async;
	    }
	    // AMD / RequireJS
	    else if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return async;
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	    // included directly via <script> tag
	    else {
	        root.async = async;
	    }

	}());


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("child_process");

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var require;if (global.GENTLY) require = GENTLY.hijack(__webpack_require__(114));

	var util = require('util'),
	    WriteStream = require('fs').WriteStream,
	    EventEmitter = require('events').EventEmitter,
	    crypto = require('crypto');

	function File(properties) {
	  EventEmitter.call(this);

	  this.size = 0;
	  this.path = null;
	  this.name = null;
	  this.type = null;
	  this.hash = null;
	  this.lastModifiedDate = null;

	  this._writeStream = null;
	  
	  for (var key in properties) {
	    this[key] = properties[key];
	  }

	  if(typeof this.hash === 'string') {
	    this.hash = crypto.createHash(properties.hash);
	  } else {
	    this.hash = null;
	  }
	}
	module.exports = File;
	util.inherits(File, EventEmitter);

	File.prototype.open = function() {
	  this._writeStream = new WriteStream(this.path);
	};

	File.prototype.toJSON = function() {
	  return {
	    size: this.size,
	    path: this.path,
	    name: this.name,
	    type: this.type,
	    mtime: this.lastModifiedDate,
	    length: this.length,
	    filename: this.filename,
	    mime: this.mime
	  };
	};

	File.prototype.write = function(buffer, cb) {
	  var self = this;
	  if (self.hash) {
	    self.hash.update(buffer);
	  }
	  this._writeStream.write(buffer, function() {
	    self.lastModifiedDate = new Date();
	    self.size += buffer.length;
	    self.emit('progress', self.size);
	    cb();
	  });
	};

	File.prototype.end = function(cb) {
	  var self = this;
	  if (self.hash) {
	    self.hash = self.hash.digest('hex');
	  }
	  this._writeStream.end(function() {
	    self.emit('end');
	    cb();
	  });
	};


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var require;if (global.GENTLY) require = GENTLY.hijack(__webpack_require__(114));

	var Buffer = require('buffer').Buffer

	function JSONParser() {
	  this.data = new Buffer('');
	  this.bytesWritten = 0;
	};
	exports.JSONParser = JSONParser;

	JSONParser.prototype.initWithLength = function(length) {
	  this.data = new Buffer(length);
	}

	JSONParser.prototype.write = function(buffer) {
	  if (this.data.length >= this.bytesWritten + buffer.length) {
	    buffer.copy(this.data, this.bytesWritten);
	  } else {
	    this.data = Buffer.concat([this.data, buffer]);
	  }
	  this.bytesWritten += buffer.length;
	  return buffer.length;
	}

	JSONParser.prototype.end = function() {
	  try {
	    var fields = JSON.parse(this.data.toString('utf8'))
	    for (var field in fields) {
	      this.onField(field, fields[field]);
	    }
	  } catch (e) {}
	  this.data = null;

	  this.onEnd();
	}

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var Buffer = __webpack_require__(126).Buffer,
	    s = 0,
	    S =
	    { PARSER_UNINITIALIZED: s++,
	      START: s++,
	      START_BOUNDARY: s++,
	      HEADER_FIELD_START: s++,
	      HEADER_FIELD: s++,
	      HEADER_VALUE_START: s++,
	      HEADER_VALUE: s++,
	      HEADER_VALUE_ALMOST_DONE: s++,
	      HEADERS_ALMOST_DONE: s++,
	      PART_DATA_START: s++,
	      PART_DATA: s++,
	      PART_END: s++,
	      END: s++
	    },

	    f = 1,
	    F =
	    { PART_BOUNDARY: f,
	      LAST_BOUNDARY: f *= 2
	    },

	    LF = 10,
	    CR = 13,
	    SPACE = 32,
	    HYPHEN = 45,
	    COLON = 58,
	    A = 97,
	    Z = 122,

	    lower = function(c) {
	      return c | 0x20;
	    };

	for (s in S) {
	  exports[s] = S[s];
	}

	function MultipartParser() {
	  this.boundary = null;
	  this.boundaryChars = null;
	  this.lookbehind = null;
	  this.state = S.PARSER_UNINITIALIZED;

	  this.index = null;
	  this.flags = 0;
	};
	exports.MultipartParser = MultipartParser;

	MultipartParser.stateToString = function(stateNumber) {
	  for (var state in S) {
	    var number = S[state];
	    if (number === stateNumber) return state;
	  }
	};

	MultipartParser.prototype.initWithBoundary = function(str) {
	  this.boundary = new Buffer(str.length+4);
	  this.boundary.write('\r\n--', 'ascii', 0);
	  this.boundary.write(str, 'ascii', 4);
	  this.lookbehind = new Buffer(this.boundary.length+8);
	  this.state = S.START;

	  this.boundaryChars = {};
	  for (var i = 0; i < this.boundary.length; i++) {
	    this.boundaryChars[this.boundary[i]] = true;
	  }
	};

	MultipartParser.prototype.write = function(buffer) {
	  var self = this,
	      i = 0,
	      len = buffer.length,
	      prevIndex = this.index,
	      index = this.index,
	      state = this.state,
	      flags = this.flags,
	      lookbehind = this.lookbehind,
	      boundary = this.boundary,
	      boundaryChars = this.boundaryChars,
	      boundaryLength = this.boundary.length,
	      boundaryEnd = boundaryLength - 1,
	      bufferLength = buffer.length,
	      c,
	      cl,

	      mark = function(name) {
	        self[name+'Mark'] = i;
	      },
	      clear = function(name) {
	        delete self[name+'Mark'];
	      },
	      callback = function(name, buffer, start, end) {
	        if (start !== undefined && start === end) {
	          return;
	        }

	        var callbackSymbol = 'on'+name.substr(0, 1).toUpperCase()+name.substr(1);
	        if (callbackSymbol in self) {
	          self[callbackSymbol](buffer, start, end);
	        }
	      },
	      dataCallback = function(name, clear) {
	        var markSymbol = name+'Mark';
	        if (!(markSymbol in self)) {
	          return;
	        }

	        if (!clear) {
	          callback(name, buffer, self[markSymbol], buffer.length);
	          self[markSymbol] = 0;
	        } else {
	          callback(name, buffer, self[markSymbol], i);
	          delete self[markSymbol];
	        }
	      };

	  for (i = 0; i < len; i++) {
	    c = buffer[i];
	    switch (state) {
	      case S.PARSER_UNINITIALIZED:
	        return i;
	      case S.START:
	        index = 0;
	        state = S.START_BOUNDARY;
	      case S.START_BOUNDARY:
	        if (index == boundary.length - 2) {
	          if (c != CR) {
	            return i;
	          }
	          index++;
	          break;
	        } else if (index - 1 == boundary.length - 2) {
	          if (c != LF) {
	            return i;
	          }
	          index = 0;
	          callback('partBegin');
	          state = S.HEADER_FIELD_START;
	          break;
	        }

	        if (c != boundary[index+2]) {
	          index = -2;
	        }
	        if (c == boundary[index+2]) {
	          index++;
	        }
	        break;
	      case S.HEADER_FIELD_START:
	        state = S.HEADER_FIELD;
	        mark('headerField');
	        index = 0;
	      case S.HEADER_FIELD:
	        if (c == CR) {
	          clear('headerField');
	          state = S.HEADERS_ALMOST_DONE;
	          break;
	        }

	        index++;
	        if (c == HYPHEN) {
	          break;
	        }

	        if (c == COLON) {
	          if (index == 1) {
	            // empty header field
	            return i;
	          }
	          dataCallback('headerField', true);
	          state = S.HEADER_VALUE_START;
	          break;
	        }

	        cl = lower(c);
	        if (cl < A || cl > Z) {
	          return i;
	        }
	        break;
	      case S.HEADER_VALUE_START:
	        if (c == SPACE) {
	          break;
	        }

	        mark('headerValue');
	        state = S.HEADER_VALUE;
	      case S.HEADER_VALUE:
	        if (c == CR) {
	          dataCallback('headerValue', true);
	          callback('headerEnd');
	          state = S.HEADER_VALUE_ALMOST_DONE;
	        }
	        break;
	      case S.HEADER_VALUE_ALMOST_DONE:
	        if (c != LF) {
	          return i;
	        }
	        state = S.HEADER_FIELD_START;
	        break;
	      case S.HEADERS_ALMOST_DONE:
	        if (c != LF) {
	          return i;
	        }

	        callback('headersEnd');
	        state = S.PART_DATA_START;
	        break;
	      case S.PART_DATA_START:
	        state = S.PART_DATA;
	        mark('partData');
	      case S.PART_DATA:
	        prevIndex = index;

	        if (index == 0) {
	          // boyer-moore derrived algorithm to safely skip non-boundary data
	          i += boundaryEnd;
	          while (i < bufferLength && !(buffer[i] in boundaryChars)) {
	            i += boundaryLength;
	          }
	          i -= boundaryEnd;
	          c = buffer[i];
	        }

	        if (index < boundary.length) {
	          if (boundary[index] == c) {
	            if (index == 0) {
	              dataCallback('partData', true);
	            }
	            index++;
	          } else {
	            index = 0;
	          }
	        } else if (index == boundary.length) {
	          index++;
	          if (c == CR) {
	            // CR = part boundary
	            flags |= F.PART_BOUNDARY;
	          } else if (c == HYPHEN) {
	            // HYPHEN = end boundary
	            flags |= F.LAST_BOUNDARY;
	          } else {
	            index = 0;
	          }
	        } else if (index - 1 == boundary.length)  {
	          if (flags & F.PART_BOUNDARY) {
	            index = 0;
	            if (c == LF) {
	              // unset the PART_BOUNDARY flag
	              flags &= ~F.PART_BOUNDARY;
	              callback('partEnd');
	              callback('partBegin');
	              state = S.HEADER_FIELD_START;
	              break;
	            }
	          } else if (flags & F.LAST_BOUNDARY) {
	            if (c == HYPHEN) {
	              callback('partEnd');
	              callback('end');
	              state = S.END;
	            } else {
	              index = 0;
	            }
	          } else {
	            index = 0;
	          }
	        }

	        if (index > 0) {
	          // when matching a possible boundary, keep a lookbehind reference
	          // in case it turns out to be a false lead
	          lookbehind[index-1] = c;
	        } else if (prevIndex > 0) {
	          // if our boundary turned out to be rubbish, the captured lookbehind
	          // belongs to partData
	          callback('partData', lookbehind, 0, prevIndex);
	          prevIndex = 0;
	          mark('partData');

	          // reconsider the current character even so it interrupted the sequence
	          // it could be the beginning of a new sequence
	          i--;
	        }

	        break;
	      case S.END:
	        break;
	      default:
	        return i;
	    }
	  }

	  dataCallback('headerField');
	  dataCallback('headerValue');
	  dataCallback('partData');

	  this.index = index;
	  this.state = state;
	  this.flags = flags;

	  return len;
	};

	MultipartParser.prototype.end = function() {
	  var callback = function(self, name) {
	    var callbackSymbol = 'on'+name.substr(0, 1).toUpperCase()+name.substr(1);
	    if (callbackSymbol in self) {
	      self[callbackSymbol]();
	    }
	  };
	  if ((this.state == S.HEADER_FIELD_START && this.index == 0) ||
	      (this.state == S.PART_DATA && this.index == this.boundary.length)) {
	    callback(this, 'partEnd');
	    callback(this, 'end');
	  } else if (this.state != S.END) {
	    return new Error('MultipartParser.end(): stream ended unexpectedly: ' + this.explain());
	  }
	};

	MultipartParser.prototype.explain = function() {
	  return 'state = ' + MultipartParser.stateToString(this.state);
	};


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var EventEmitter = __webpack_require__(127).EventEmitter
		, util = __webpack_require__(30);

	function OctetParser(options){
		if(!(this instanceof OctetParser)) return new OctetParser(options);
		EventEmitter.call(this);
	}

	util.inherits(OctetParser, EventEmitter);

	exports.OctetParser = OctetParser;

	OctetParser.prototype.write = function(buffer) {
	    this.emit('data', buffer);
		return buffer.length;
	};

	OctetParser.prototype.end = function() {
		this.emit('end');
	};


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var require;if (global.GENTLY) require = GENTLY.hijack(__webpack_require__(114));

	// This is a buffering parser, not quite as nice as the multipart one.
	// If I find time I'll rewrite this to be fully streaming as well
	var querystring = require('querystring');

	function QuerystringParser(maxKeys) {
	  this.maxKeys = maxKeys;
	  this.buffer = '';
	};
	exports.QuerystringParser = QuerystringParser;

	QuerystringParser.prototype.write = function(buffer) {
	  this.buffer += buffer.toString('ascii');
	  return buffer.length;
	};

	QuerystringParser.prototype.end = function() {
	  var fields = querystring.parse(this.buffer, '&', '=', { maxKeys: this.maxKeys });
	  for (var field in fields) {
	    this.onField(field, fields[field]);
	  }
	  this.buffer = '';

	  this.onEnd();
	};



/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Helpers.
	 */

	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  var match = /^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 's':
	      return n * s;
	    case 'ms':
	      return n;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.

	module.exports = Duplex;

	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}
	/*</replacement>*/


	/*<replacement>*/
	var util = __webpack_require__(128);
	util.inherits = __webpack_require__(129);
	/*</replacement>*/

	var Readable = __webpack_require__(130);
	var Writable = __webpack_require__(131);

	util.inherits(Duplex, Readable);

	forEach(objectKeys(Writable.prototype), function(method) {
	  if (!Duplex.prototype[method])
	    Duplex.prototype[method] = Writable.prototype[method];
	});

	function Duplex(options) {
	  if (!(this instanceof Duplex))
	    return new Duplex(options);

	  Readable.call(this, options);
	  Writable.call(this, options);

	  if (options && options.readable === false)
	    this.readable = false;

	  if (options && options.writable === false)
	    this.writable = false;

	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false)
	    this.allowHalfOpen = false;

	  this.once('end', onend);
	}

	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended)
	    return;

	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  process.nextTick(this.end.bind(this));
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("buffer");

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("events");

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	function isBuffer(arg) {
	  return Buffer.isBuffer(arg);
	}
	exports.isBuffer = isBuffer;

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(30).inherits


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = Readable;

	/*<replacement>*/
	var isArray = __webpack_require__(134);
	/*</replacement>*/


	/*<replacement>*/
	var Buffer = __webpack_require__(126).Buffer;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;

	var EE = __webpack_require__(127).EventEmitter;

	/*<replacement>*/
	if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	var Stream = __webpack_require__(25);

	/*<replacement>*/
	var util = __webpack_require__(128);
	util.inherits = __webpack_require__(129);
	/*</replacement>*/

	var StringDecoder;

	util.inherits(Readable, Stream);

	function ReadableState(options, stream) {
	  options = options || {};

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : 16 * 1024;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.buffer = [];
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = false;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // In streams that never have any data, and do push(null) right away,
	  // the consumer can miss the 'end' event if they do some I/O before
	  // consuming the stream.  So, we don't emit('end') until some reading
	  // happens.
	  this.calledRead = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, becuase any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;


	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;

	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder)
	      StringDecoder = __webpack_require__(133).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}

	function Readable(options) {
	  if (!(this instanceof Readable))
	    return new Readable(options);

	  this._readableState = new ReadableState(options, this);

	  // legacy
	  this.readable = true;

	  Stream.call(this);
	}

	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function(chunk, encoding) {
	  var state = this._readableState;

	  if (typeof chunk === 'string' && !state.objectMode) {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = new Buffer(chunk, encoding);
	      encoding = '';
	    }
	  }

	  return readableAddChunk(this, state, chunk, encoding, false);
	};

	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function(chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};

	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (chunk === null || chunk === undefined) {
	    state.reading = false;
	    if (!state.ended)
	      onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var e = new Error('stream.unshift() after end event');
	      stream.emit('error', e);
	    } else {
	      if (state.decoder && !addToFront && !encoding)
	        chunk = state.decoder.write(chunk);

	      // update the buffer info.
	      state.length += state.objectMode ? 1 : chunk.length;
	      if (addToFront) {
	        state.buffer.unshift(chunk);
	      } else {
	        state.reading = false;
	        state.buffer.push(chunk);
	      }

	      if (state.needReadable)
	        emitReadable(stream);

	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }

	  return needMoreData(state);
	}



	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended &&
	         (state.needReadable ||
	          state.length < state.highWaterMark ||
	          state.length === 0);
	}

	// backwards compatibility.
	Readable.prototype.setEncoding = function(enc) {
	  if (!StringDecoder)
	    StringDecoder = __webpack_require__(133).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	};

	// Don't raise the hwm > 128MB
	var MAX_HWM = 0x800000;
	function roundUpToNextPowerOf2(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2
	    n--;
	    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
	    n++;
	  }
	  return n;
	}

	function howMuchToRead(n, state) {
	  if (state.length === 0 && state.ended)
	    return 0;

	  if (state.objectMode)
	    return n === 0 ? 0 : 1;

	  if (isNaN(n) || n === null) {
	    // only flow one buffer at a time
	    if (state.flowing && state.buffer.length)
	      return state.buffer[0].length;
	    else
	      return state.length;
	  }

	  if (n <= 0)
	    return 0;

	  // If we're asking for more than the target buffer level,
	  // then raise the water mark.  Bump up to the next highest
	  // power of 2, to prevent increasing it excessively in tiny
	  // amounts.
	  if (n > state.highWaterMark)
	    state.highWaterMark = roundUpToNextPowerOf2(n);

	  // don't have that much.  return null, unless we've ended.
	  if (n > state.length) {
	    if (!state.ended) {
	      state.needReadable = true;
	      return 0;
	    } else
	      return state.length;
	  }

	  return n;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function(n) {
	  var state = this._readableState;
	  state.calledRead = true;
	  var nOrig = n;

	  if (typeof n !== 'number' || n > 0)
	    state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 &&
	      state.needReadable &&
	      (state.length >= state.highWaterMark || state.ended)) {
	    emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0)
	      endReadable(this);
	    return null;
	  }

	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.

	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length - n <= state.highWaterMark)
	    doRead = true;

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading)
	    doRead = false;

	  if (doRead) {
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0)
	      state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	  }

	  // If _read called its callback synchronously, then `reading`
	  // will be false, and we need to re-evaluate how much data we
	  // can return to the user.
	  if (doRead && !state.reading)
	    n = howMuchToRead(nOrig, state);

	  var ret;
	  if (n > 0)
	    ret = fromList(n, state);
	  else
	    ret = null;

	  if (ret === null) {
	    state.needReadable = true;
	    n = 0;
	  }

	  state.length -= n;

	  // If we have nothing in the buffer, then we want to know
	  // as soon as we *do* get something into the buffer.
	  if (state.length === 0 && !state.ended)
	    state.needReadable = true;

	  // If we happened to read() exactly the remaining amount in the
	  // buffer, and the EOF has been seen at this point, then make sure
	  // that we emit 'end' on the very next tick.
	  if (state.ended && !state.endEmitted && state.length === 0)
	    endReadable(this);

	  return ret;
	};

	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!Buffer.isBuffer(chunk) &&
	      'string' !== typeof chunk &&
	      chunk !== null &&
	      chunk !== undefined &&
	      !state.objectMode &&
	      !er) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}


	function onEofChunk(stream, state) {
	  if (state.decoder && !state.ended) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;

	  // if we've ended and we have some data left, then emit
	  // 'readable' now to make sure it gets picked up.
	  if (state.length > 0)
	    emitReadable(stream);
	  else
	    endReadable(stream);
	}

	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (state.emittedReadable)
	    return;

	  state.emittedReadable = true;
	  if (state.sync)
	    process.nextTick(function() {
	      emitReadable_(stream);
	    });
	  else
	    emitReadable_(stream);
	}

	function emitReadable_(stream) {
	  stream.emit('readable');
	}


	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    process.nextTick(function() {
	      maybeReadMore_(stream, state);
	    });
	  }
	}

	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended &&
	         state.length < state.highWaterMark) {
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;
	    else
	      len = state.length;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function(n) {
	  this.emit('error', new Error('not implemented'));
	};

	Readable.prototype.pipe = function(dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;

	  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
	              dest !== process.stdout &&
	              dest !== process.stderr;

	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted)
	    process.nextTick(endFn);
	  else
	    src.once('end', endFn);

	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    if (readable !== src) return;
	    cleanup();
	  }

	  function onend() {
	    dest.end();
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);

	  function cleanup() {
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (!dest._writableState || dest._writableState.needDrain)
	      ondrain();
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EE.listenerCount(dest, 'error') === 0)
	      dest.emit('error', er);
	  }
	  // This is a brutally ugly hack to make sure that our error handler
	  // is attached before any userland ones.  NEVER DO THIS.
	  if (!dest._events || !dest._events.error)
	    dest.on('error', onerror);
	  else if (isArray(dest._events.error))
	    dest._events.error.unshift(onerror);
	  else
	    dest._events.error = [onerror, dest._events.error];



	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);

	  function unpipe() {
	    src.unpipe(dest);
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    // the handler that waits for readable events after all
	    // the data gets sucked out in flow.
	    // This would be easier to follow with a .once() handler
	    // in flow(), but that is too slow.
	    this.on('readable', pipeOnReadable);

	    state.flowing = true;
	    process.nextTick(function() {
	      flow(src);
	    });
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function() {
	    var dest = this;
	    var state = src._readableState;
	    state.awaitDrain--;
	    if (state.awaitDrain === 0)
	      flow(src);
	  };
	}

	function flow(src) {
	  var state = src._readableState;
	  var chunk;
	  state.awaitDrain = 0;

	  function write(dest, i, list) {
	    var written = dest.write(chunk);
	    if (false === written) {
	      state.awaitDrain++;
	    }
	  }

	  while (state.pipesCount && null !== (chunk = src.read())) {

	    if (state.pipesCount === 1)
	      write(state.pipes, 0, null);
	    else
	      forEach(state.pipes, write);

	    src.emit('data', chunk);

	    // if anyone needs a drain, then we have to wait for that.
	    if (state.awaitDrain > 0)
	      return;
	  }

	  // if every destination was unpiped, either before entering this
	  // function, or in the while loop, then stop flowing.
	  //
	  // NB: This is a pretty rare edge case.
	  if (state.pipesCount === 0) {
	    state.flowing = false;

	    // if there were data event listeners added, then switch to old mode.
	    if (EE.listenerCount(src, 'data') > 0)
	      emitDataEvents(src);
	    return;
	  }

	  // at this point, no one needed a drain, so we just ran out of data
	  // on the next readable event, start it over again.
	  state.ranOut = true;
	}

	function pipeOnReadable() {
	  if (this._readableState.ranOut) {
	    this._readableState.ranOut = false;
	    flow(this);
	  }
	}


	Readable.prototype.unpipe = function(dest) {
	  var state = this._readableState;

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0)
	    return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes)
	      return this;

	    if (!dest)
	      dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    this.removeListener('readable', pipeOnReadable);
	    state.flowing = false;
	    if (dest)
	      dest.emit('unpipe', this);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    this.removeListener('readable', pipeOnReadable);
	    state.flowing = false;

	    for (var i = 0; i < len; i++)
	      dests[i].emit('unpipe', this);
	    return this;
	  }

	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1)
	    return this;

	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1)
	    state.pipes = state.pipes[0];

	  dest.emit('unpipe', this);

	  return this;
	};

	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function(ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);

	  if (ev === 'data' && !this._readableState.flowing)
	    emitDataEvents(this);

	  if (ev === 'readable' && this.readable) {
	    var state = this._readableState;
	    if (!state.readableListening) {
	      state.readableListening = true;
	      state.emittedReadable = false;
	      state.needReadable = true;
	      if (!state.reading) {
	        this.read(0);
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }

	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;

	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function() {
	  emitDataEvents(this);
	  this.read(0);
	  this.emit('resume');
	};

	Readable.prototype.pause = function() {
	  emitDataEvents(this, true);
	  this.emit('pause');
	};

	function emitDataEvents(stream, startPaused) {
	  var state = stream._readableState;

	  if (state.flowing) {
	    // https://github.com/isaacs/readable-stream/issues/16
	    throw new Error('Cannot switch to old mode now.');
	  }

	  var paused = startPaused || false;
	  var readable = false;

	  // convert to an old-style stream.
	  stream.readable = true;
	  stream.pipe = Stream.prototype.pipe;
	  stream.on = stream.addListener = Stream.prototype.on;

	  stream.on('readable', function() {
	    readable = true;

	    var c;
	    while (!paused && (null !== (c = stream.read())))
	      stream.emit('data', c);

	    if (c === null) {
	      readable = false;
	      stream._readableState.needReadable = true;
	    }
	  });

	  stream.pause = function() {
	    paused = true;
	    this.emit('pause');
	  };

	  stream.resume = function() {
	    paused = false;
	    if (readable)
	      process.nextTick(function() {
	        stream.emit('readable');
	      });
	    else
	      this.read(0);
	    this.emit('resume');
	  };

	  // now make it start, just in case it hadn't already.
	  stream.emit('readable');
	}

	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function(stream) {
	  var state = this._readableState;
	  var paused = false;

	  var self = this;
	  stream.on('end', function() {
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length)
	        self.push(chunk);
	    }

	    self.push(null);
	  });

	  stream.on('data', function(chunk) {
	    if (state.decoder)
	      chunk = state.decoder.write(chunk);
	    if (!chunk || !state.objectMode && !chunk.length)
	      return;

	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (typeof stream[i] === 'function' &&
	        typeof this[i] === 'undefined') {
	      this[i] = function(method) { return function() {
	        return stream[method].apply(stream, arguments);
	      }}(i);
	    }
	  }

	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function(ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function(n) {
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return self;
	};



	// exposed for testing purposes only.
	Readable._fromList = fromList;

	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	function fromList(n, state) {
	  var list = state.buffer;
	  var length = state.length;
	  var stringMode = !!state.decoder;
	  var objectMode = !!state.objectMode;
	  var ret;

	  // nothing in the list, definitely empty.
	  if (list.length === 0)
	    return null;

	  if (length === 0)
	    ret = null;
	  else if (objectMode)
	    ret = list.shift();
	  else if (!n || n >= length) {
	    // read it all, truncate the array.
	    if (stringMode)
	      ret = list.join('');
	    else
	      ret = Buffer.concat(list, length);
	    list.length = 0;
	  } else {
	    // read just some of it.
	    if (n < list[0].length) {
	      // just take a part of the first list item.
	      // slice is the same for buffers and strings.
	      var buf = list[0];
	      ret = buf.slice(0, n);
	      list[0] = buf.slice(n);
	    } else if (n === list[0].length) {
	      // first list is a perfect match
	      ret = list.shift();
	    } else {
	      // complex case.
	      // we have enough to cover it, but it spans past the first buffer.
	      if (stringMode)
	        ret = '';
	      else
	        ret = new Buffer(n);

	      var c = 0;
	      for (var i = 0, l = list.length; i < l && c < n; i++) {
	        var buf = list[0];
	        var cpy = Math.min(n - c, buf.length);

	        if (stringMode)
	          ret += buf.slice(0, cpy);
	        else
	          buf.copy(ret, c, 0, cpy);

	        if (cpy < buf.length)
	          list[0] = buf.slice(cpy);
	        else
	          list.shift();

	        c += cpy;
	      }
	    }
	  }

	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;

	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0)
	    throw new Error('endReadable called on non-empty stream');

	  if (!state.endEmitted && state.calledRead) {
	    state.ended = true;
	    process.nextTick(function() {
	      // Check that we didn't get one last unshift.
	      if (!state.endEmitted && state.length === 0) {
	        state.endEmitted = true;
	        stream.readable = false;
	        stream.emit('end');
	      }
	    });
	  }
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	function indexOf (xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, cb), and it'll handle all
	// the drain event emission and buffering.

	module.exports = Writable;

	/*<replacement>*/
	var Buffer = __webpack_require__(126).Buffer;
	/*</replacement>*/

	Writable.WritableState = WritableState;


	/*<replacement>*/
	var util = __webpack_require__(128);
	util.inherits = __webpack_require__(129);
	/*</replacement>*/


	var Stream = __webpack_require__(25);

	util.inherits(Writable, Stream);

	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	}

	function WritableState(options, stream) {
	  options = options || {};

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : 16 * 1024;

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, becuase any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function(er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;

	  this.buffer = [];

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;
	}

	function Writable(options) {
	  var Duplex = __webpack_require__(125);

	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex))
	    return new Writable(options);

	  this._writableState = new WritableState(options, this);

	  // legacy.
	  this.writable = true;

	  Stream.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function() {
	  this.emit('error', new Error('Cannot pipe. Not readable.'));
	};


	function writeAfterEnd(stream, state, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  process.nextTick(function() {
	    cb(er);
	  });
	}

	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  if (!Buffer.isBuffer(chunk) &&
	      'string' !== typeof chunk &&
	      chunk !== null &&
	      chunk !== undefined &&
	      !state.objectMode) {
	    var er = new TypeError('Invalid non-string/buffer chunk');
	    stream.emit('error', er);
	    process.nextTick(function() {
	      cb(er);
	    });
	    valid = false;
	  }
	  return valid;
	}

	Writable.prototype.write = function(chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (Buffer.isBuffer(chunk))
	    encoding = 'buffer';
	  else if (!encoding)
	    encoding = state.defaultEncoding;

	  if (typeof cb !== 'function')
	    cb = function() {};

	  if (state.ended)
	    writeAfterEnd(this, state, cb);
	  else if (validChunk(this, state, chunk, cb))
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);

	  return ret;
	};

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode &&
	      state.decodeStrings !== false &&
	      typeof chunk === 'string') {
	    chunk = new Buffer(chunk, encoding);
	  }
	  return chunk;
	}

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);
	  if (Buffer.isBuffer(chunk))
	    encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;

	  state.length += len;

	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret)
	    state.needDrain = true;

	  if (state.writing)
	    state.buffer.push(new WriteReq(chunk, encoding, cb));
	  else
	    doWrite(stream, state, len, chunk, encoding, cb);

	  return ret;
	}

	function doWrite(stream, state, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  if (sync)
	    process.nextTick(function() {
	      cb(er);
	    });
	  else
	    cb(er);

	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;

	  onwriteStateUpdate(state);

	  if (er)
	    onwriteError(stream, state, sync, er, cb);
	  else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(stream, state);

	    if (!finished && !state.bufferProcessing && state.buffer.length)
	      clearBuffer(stream, state);

	    if (sync) {
	      process.nextTick(function() {
	        afterWrite(stream, state, finished, cb);
	      });
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished)
	    onwriteDrain(stream, state);
	  cb();
	  if (finished)
	    finishMaybe(stream, state);
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}


	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;

	  for (var c = 0; c < state.buffer.length; c++) {
	    var entry = state.buffer[c];
	    var chunk = entry.chunk;
	    var encoding = entry.encoding;
	    var cb = entry.callback;
	    var len = state.objectMode ? 1 : chunk.length;

	    doWrite(stream, state, len, chunk, encoding, cb);

	    // if we didn't call the onwrite immediately, then
	    // it means that we need to wait until it does.
	    // also, that means that the chunk and cb are currently
	    // being processed, so move the buffer counter past them.
	    if (state.writing) {
	      c++;
	      break;
	    }
	  }

	  state.bufferProcessing = false;
	  if (c < state.buffer.length)
	    state.buffer = state.buffer.slice(c);
	  else
	    state.buffer.length = 0;
	}

	Writable.prototype._write = function(chunk, encoding, cb) {
	  cb(new Error('not implemented'));
	};

	Writable.prototype.end = function(chunk, encoding, cb) {
	  var state = this._writableState;

	  if (typeof chunk === 'function') {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (typeof chunk !== 'undefined' && chunk !== null)
	    this.write(chunk, encoding);

	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished)
	    endWritable(this, state, cb);
	};


	function needFinish(stream, state) {
	  return (state.ending &&
	          state.length === 0 &&
	          !state.finished &&
	          !state.writing);
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(stream, state);
	  if (need) {
	    state.finished = true;
	    stream.emit('finish');
	  }
	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished)
	      process.nextTick(cb);
	    else
	      stream.once('finish', cb);
	  }
	  state.ended = true;
	}


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var Stream = __webpack_require__(25).Stream;
	var util = __webpack_require__(30);

	module.exports = DelayedStream;
	function DelayedStream() {
	  this.source = null;
	  this.dataSize = 0;
	  this.maxDataSize = 1024 * 1024;
	  this.pauseStream = true;

	  this._maxDataSizeExceeded = false;
	  this._released = false;
	  this._bufferedEvents = [];
	}
	util.inherits(DelayedStream, Stream);

	DelayedStream.create = function(source, options) {
	  var delayedStream = new this();

	  options = options || {};
	  for (var option in options) {
	    delayedStream[option] = options[option];
	  }

	  delayedStream.source = source;

	  var realEmit = source.emit;
	  source.emit = function() {
	    delayedStream._handleEmit(arguments);
	    return realEmit.apply(source, arguments);
	  };

	  source.on('error', function() {});
	  if (delayedStream.pauseStream) {
	    source.pause();
	  }

	  return delayedStream;
	};

	DelayedStream.prototype.__defineGetter__('readable', function() {
	  return this.source.readable;
	});

	DelayedStream.prototype.resume = function() {
	  if (!this._released) {
	    this.release();
	  }

	  this.source.resume();
	};

	DelayedStream.prototype.pause = function() {
	  this.source.pause();
	};

	DelayedStream.prototype.release = function() {
	  this._released = true;

	  this._bufferedEvents.forEach(function(args) {
	    this.emit.apply(this, args);
	  }.bind(this));
	  this._bufferedEvents = [];
	};

	DelayedStream.prototype.pipe = function() {
	  var r = Stream.prototype.pipe.apply(this, arguments);
	  this.resume();
	  return r;
	};

	DelayedStream.prototype._handleEmit = function(args) {
	  if (this._released) {
	    this.emit.apply(this, args);
	    return;
	  }

	  if (args[0] === 'data') {
	    this.dataSize += args[1].length;
	    this._checkIfMaxDataSizeExceeded();
	  }

	  this._bufferedEvents.push(args);
	};

	DelayedStream.prototype._checkIfMaxDataSizeExceeded = function() {
	  if (this._maxDataSizeExceeded) {
	    return;
	  }

	  if (this.dataSize <= this.maxDataSize) {
	    return;
	  }

	  this._maxDataSizeExceeded = true;
	  var message =
	    'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.'
	  this.emit('error', new Error(message));
	};


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var Buffer = __webpack_require__(126).Buffer;

	var isBufferEncoding = Buffer.isEncoding
	  || function(encoding) {
	       switch (encoding && encoding.toLowerCase()) {
	         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
	         default: return false;
	       }
	     }


	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}

	var StringDecoder = exports.StringDecoder = function(encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }

	  this.charBuffer = new Buffer(6);
	  this.charReceived = 0;
	  this.charLength = 0;
	};


	StringDecoder.prototype.write = function(buffer) {
	  var charStr = '';
	  var offset = 0;

	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var i = (buffer.length >= this.charLength - this.charReceived) ?
	                this.charLength - this.charReceived :
	                buffer.length;

	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, offset, i);
	    this.charReceived += (i - offset);
	    offset = i;

	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }

	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

	    // lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;

	    // if there are no more bytes in this buffer, just emit our char
	    if (i == buffer.length) return charStr;

	    // otherwise cut off the characters end from the beginning of this buffer
	    buffer = buffer.slice(i, buffer.length);
	    break;
	  }

	  var lenIncomplete = this.detectIncompleteChar(buffer);

	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - lenIncomplete, end);
	    this.charReceived = lenIncomplete;
	    end -= lenIncomplete;
	  }

	  charStr += buffer.toString(this.encoding, 0, end);

	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    this.charBuffer.write(charStr.charAt(charStr.length - 1), this.encoding);
	    return charStr.substring(0, end);
	  }

	  // or just emit the charStr
	  return charStr;
	};

	StringDecoder.prototype.detectIncompleteChar = function(buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = (buffer.length >= 3) ? 3 : buffer.length;

	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];

	    // See http://en.wikipedia.org/wiki/UTF-8#Description

	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }

	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }

	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }

	  return i;
	};

	StringDecoder.prototype.end = function(buffer) {
	  var res = '';
	  if (buffer && buffer.length)
	    res = this.write(buffer);

	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }

	  return res;
	};

	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}

	function utf16DetectIncompleteChar(buffer) {
	  var incomplete = this.charReceived = buffer.length % 2;
	  this.charLength = incomplete ? 2 : 0;
	  return incomplete;
	}

	function base64DetectIncompleteChar(buffer) {
	  var incomplete = this.charReceived = buffer.length % 3;
	  this.charLength = incomplete ? 3 : 0;
	  return incomplete;
	}


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ }
/******/ ])
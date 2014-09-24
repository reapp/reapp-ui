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
/******/ 	if (typeof window !== "undefined") {
/******/ 	  window.__ReactStyle__ = {};
/******/ 	}
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	module.exports = __webpack_require__(4);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("react");

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//** @jsx React.DOM */

	var React = __webpack_require__(1);
	var Application = __webpack_require__(5);
	var html = __webpack_require__(7);

	module.exports = function(scriptUrl, styleUrl, commonsUrl) {
	  var application = React.renderComponentToString(Application(null));
	  return html
	    .replace("STYLE_URL", styleUrl)
	    .replace("SCRIPT_URL", scriptUrl)
	    .replace("COMMONS_URL", commonsUrl)
	    .replace("CONTENT", application);
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React  = __webpack_require__(1);
	var Layout = __webpack_require__(6);

	var Agave = __webpack_require__(9);
	Agave.enable('r');

	var App = React.createClass({displayName: 'App',

	  render:function() {
	    return (
	      Layout({title: "hello"}, 
	        this.props.activeRouteHandler(null)
	      )
	    );
	  }

	});

	module.exports = App;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//** @jsx React.DOM */
	var React = __webpack_require__(1);

	if (typeof window !== 'undefined') {
	  window.GSS_CONFIG = {
	    worker: "/bower/gss/dist/worker.js"
	  };
	}

	module.exports = React.createClass({displayName: 'exports',

	  render: function() {
	    return (
	      React.DOM.div({id: "layout"}, 
	        this.props.children
	      )
	    );
	  }

	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <link rel=\"stylesheet\" href=\"STYLE_URL\">\n</head>\n<body>\n  CONTENT\n  <script src=\"SCRIPT_URL\"></script>\n</body>\n</html>";

/***/ },
/* 8 */,
/* 9 */
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


/***/ }
/******/ ])
// https://github.com/azundo/scrollend-js

/*
 * All code Copyright Benjamin Best 2013 unless otherwise referenced.  Licensed
 * under the MIT License, see the LICENSE file included in this repository for
 * the full terms.
 */

 function getScrollTop() {
  // from http://stackoverflow.com/questions/871399/cross-browser-method-for-detecting-the-scrolltop-of-the-browser-window
  if (typeof pageYOffset != 'undefined') {
    return pageYOffset;
  } else {
    var B = document.body;
    var D = document.documentElement;
    D = (D.clientHeight) ? D : B;
    return D.scrollTop;
  }
};

ScrollEnd = function (options) {
  var checkInterval = (options && options.checkInterval) || 100,
  scrolling = false,
  lastScrollPosition = getScrollTop(),
  i = 0,
  that = this;

  this.subscribers = [];

  setInterval(function() {
    var scrollPosition = getScrollTop();
    if (scrolling && scrollPosition === lastScrollPosition) {
        // we have stopped scrolling
        scrolling = false;
        for (i = 0; i < that.subscribers.length; i++) {
          that.subscribers[i](scrollPosition);
        }
      } else if (!scrolling && scrollPosition !== lastScrollPosition) {
        // we have started scrolling
        scrolling = true;
      }
      lastScrollPosition = scrollPosition;
    }, checkInterval);
};

// subscribe to the ScrollEnd event
ScrollEnd.prototype.subscribe = function (func) {
  this.subscribers.push(func);
};

// unsusbscribe from the ScrollEnd event
ScrollEnd.prototype.unsubscribe = function (func) {
  var idx = this.subscribers.indexOf(func);
  if (idx >= 0) {
    this.subscribers.splice(idx, 1);
  }
};

// Aliases for subscribe and unsubscribe
ScrollEnd.prototype.sub = ScrollEnd.prototype.subscribe;
ScrollEnd.prototype.unsub = ScrollEnd.prototype.unsubscribe;

module.exports = ScrollEnd;
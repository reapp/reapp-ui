/*
The MIT License (MIT)

Copyright (c) 2014 Jed Watson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var React = require('react');

// be sure to run this before using this library
// React.initializeTouchEvents(true);

function getTouchProps(touch) {
  if (!touch) return {};
  return {
    pageX: touch.pageX,
    pageY: touch.pageY,
    clientX: touch.clientX,
    clientY: touch.clientY
  };
}

function extend(target, source) {
  if (!source || Object.prototype.toString.call(source) !== '[object Object]') return target;
  for (var key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = source[key];
    }
  }
  return target;
}

/**
 * Tappable Component
 * ==================
 */

module.exports = {

  propTypes: {

    disabled: React.PropTypes.bool,              // only applies to buttons

    moveThreshold: React.PropTypes.number,       // pixels to move before cancelling tap
    pressDelay: React.PropTypes.number,          // ms to wait before detecting a press
    pressMoveThreshold: React.PropTypes.number,  // pixels to move before cancelling press
    preventDefault: React.PropTypes.bool,        // whether to preventDefault on all events
    stopPropagation: React.PropTypes.bool,       // whether to stopPropagation on all events

    onTap: React.PropTypes.func,                 // fires when a tap is detected
    onPress: React.PropTypes.func,               // fires when a press is detected
    onTouchStart: React.PropTypes.func,          // pass-through touch event
    onTouchMove: React.PropTypes.func,           // pass-through touch event
    onTouchEnd: React.PropTypes.func,            // pass-through touch event
    onMouseDown: React.PropTypes.func,           // pass-through mouse event
    onMouseUp: React.PropTypes.func,             // pass-through mouse event
    onMouseMove: React.PropTypes.func,           // pass-through mouse event
    onMouseOut: React.PropTypes.func             // pass-through mouse event

  },

  getDefaultProps: function() {
    return {
      component: 'div',
      moveThreshold: 10,
      pressDelay: 1000,
      pressMoveThreshold: 20,
      tapTimeCeil: 300,
      delayUntilActive: 80
    };
  },

  getInitialState: function() {
    return {
      isActive: false,
      touchActive: false
    };
  },

  componentWillUnmount: function() {
    this.cleanupScrollDetection();
    this.cancelPressDetection();
  },

  processEvent: function(event) {
    if (this.props.preventDefault) event.preventDefault();
    if (this.props.stopPropagation) {
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    }
  },

  onTouchStart: function(event) {
    if (this.props.onTouchStart && this.props.onTouchStart(event) === false) return;
    this.processEvent(event);
    window._blockMouseEvents = true;
    this._initialTouch = this._lastTouch = getTouchProps(event.touches[0]);
    this.initScrollDetection();
    this.initPressDetection(this.endTouch);
    this.touchStartTime = Date.now();

    this.setActiveTimeout = setTimeout(() => {
      this.setState({
        isActive: true
      });
    }, this.props.delayUntilActive);
  },

  initScrollDetection: function() {
    this._scrollParents = [];
    this._scrollPos = { top: 0, left: 0 };
    var node = this.getDOMNode();
    while (node) {
      if (node.scrollHeight > node.offsetHeight || node.scrollWidth > node.offsetWidth) {
        this._scrollParents.push(node);
        this._scrollPos.top += node.scrollTop;
        this._scrollPos.left += node.scrollLeft;
      }
      node = node.parentNode;
    }
  },

  calculateMovement: function(touch) {
    return {
      x: Math.abs(touch.clientX - this._initialTouch.clientX),
      y: Math.abs(touch.clientY - this._initialTouch.clientY)
    };
  },

  detectScroll: function() {
    var currentScrollPos = { top: 0, left: 0 };
    for (var i = 0; i < this._scrollParents.length; i++) {
      currentScrollPos.top += this._scrollParents[i].scrollTop;
      currentScrollPos.left += this._scrollParents[i].scrollLeft;
    }
    return !(currentScrollPos.top === this._scrollPos.top && currentScrollPos.left === this._scrollPos.left);
  },

  cleanupScrollDetection: function() {
    this._scrollParents = undefined;
    this._scrollPos = undefined;
  },

  initPressDetection: function(callback) {
    if (!this.props.onPress) return;
    this._pressTimeout = setTimeout(function() {
      this.props.onPress();
      callback();
    }.bind(this), this.props.pressDelay);
  },

  cancelPressDetection: function() {
    clearTimeout(this._pressTimeout);
  },

  onTouchMove: function(event) {
    if (!this._initialTouch) return;
    this.processEvent(event);
    if (this.detectScroll()) {
      return this.endTouch(event);
    }
    this.props.onTouchMove && this.props.onTouchMove(event);
    this._lastTouch = getTouchProps(event.touches[0]);
    var movement = this.calculateMovement(this._lastTouch);
    if (movement.x > this.props.pressMoveThreshold || movement.y > this.props.pressMoveThreshold)
      this.cancelPressDetection();

    if (movement.x > this.props.moveThreshold || movement.y > this.props.moveThreshold)
      this.setInactive();
    else
      if (!this.state.isActive)
        this.setState({ isActive: true });
  },

  setInactive() {
    if (this.setActiveTimeout)
      clearTimeout(this.setActiveTimeout);

    this.setState({
      isActive: false
    });
  },

  onTouchEnd: function(event) {
    if (!this._initialTouch) return;
    this.processEvent(event);
    var movement = this.calculateMovement(this._lastTouch);
    if (movement.x <= this.props.moveThreshold && movement.y <= this.props.moveThreshold &&
        this.tapWithinTimeCeil()) {
      this.props.onTap && this.props.onTap(event);
    }
    this.endTouch(event);
  },

  tapWithinTimeCeil() {
    return Date.now() - this.touchStartTime <= this.props.tapTimeCeil;
  },

  endTouch: function() {
    this.cancelPressDetection();
    this.props.onTouchEnd && this.props.onTouchEnd(event);
    this._initialTouch = null;
    this._lastTouch = null;
    this.setInactive();
  },

  onMouseDown: function(event) {
    if (window._blockMouseEvents) {
      window._blockMouseEvents = false;
      return;
    }
    if (this.props.onMouseDown && this.props.onMouseDown(event) === false) return;
    this.processEvent(event);
    this.initPressDetection(this.endMouseEvent);
    this._mouseDown = true;
    this.setInactive();
  },

  onMouseMove: function(event) {
    if (window._blockMouseEvents || !this._mouseDown) return;
    this.processEvent(event);
    this.props.onMouseMove && this.props.onMouseMove(event);
  },

  onMouseUp: function(event) {
    if (window._blockMouseEvents || !this._mouseDown) return;
    this.processEvent(event);
    this.props.onMouseUp && this.props.onMouseUp(event);
    this.props.onTap && this.props.onTap(event);
    this.endMouseEvent();
  },

  onMouseOut: function(event) {
    if (window._blockMouseEvents || !this._mouseDown) return;
    this.processEvent(event);
    this.props.onMouseOut && this.props.onMouseOut(event);
    this.endMouseEvent();
  },

  endMouseEvent: function() {
    this.cancelPressDetection();
    this._mouseDown = false;
    this.setInactive();
  },

  tappableProps(props) {
    var className = this.state.isActive ? 'tap-active' : 'tap--inactive';

    if (props && props.className)
      className += ' ' + this.props.className;

    return {
      className: className,
      disabled: this.props.disabled,
      onTouchStart: this.onTouchStart,
      onTouchMove: this.onTouchMove,
      onTouchEnd: this.onTouchEnd,
      onMouseDown: this.onMouseDown,
      onMouseMove: this.onMouseMove,
      onMouseUp: this.onMouseUp,
      onMouseOut: this.onMouseOut
    };
  }

};
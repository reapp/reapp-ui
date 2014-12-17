var React = require('react');
var AnimateStore = require('../stores/AnimateStore');
// var getAnimationState = require('./getAnimationState');

var pick = (a, b) => typeof a !== 'undefined' ? a : b;

module.exports = function(source) {
  // todo: parent context
  // var childContextTypes = {};
  // childContextTypes[source] = React.PropTypes.object;

  return {
    // todo: parent context
    // childContextTypes,

    // see getAnimationState.js
    getAnimationState,

    setAnimationState() {
      AnimateStore(source, this.getAnimationState());
    },

    // todo: parent context
    // getChildContext() {
    //   var c = this.context && this.context.animations || {};
    //   return Object.assign(c, this.getAnimationState());
    // },

    disableAnimation() {
      this.setState({ animationDisabled: true });
    },

    enableAnimation() {
      this.setState({ animationDisabled: false });
    }
  };
};
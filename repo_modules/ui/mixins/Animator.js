var React = require('react');
var Axn = require('axn');
var AnimateActions = require('ui/actions/AnimateActions');

var i = 0;
function uniqueId() {
  if (i > 1000000) i = 0;
  return i++;
}

module.exports = {
  childContextTypes: {
    animateProps: React.PropTypes.object,
    animationDisabled: React.PropTypes.bool
  },

  getChildContext() {
    return {
      animateProps: this.props.animateProps,
      animationDisabled: typeof this._animationsDisabled !== 'undefined' ?
        !!this._animationsDisabled :
        this.props.animationDisabled
    };
  },

  runAnimation(source, props) {
    if (this._animationsDisabled)
      return;

    AnimateActions({ source, props });
  },

  disableAnimation() {
    this._animationsDisabled = true;
  },

  enableAnimation() {
    this._animationsDisabled = false;
  }
};
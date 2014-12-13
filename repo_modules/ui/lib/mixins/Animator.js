var React = require('react');
var Axn = require('axn');
var AnimateActions = require('../../actions/AnimateActions');

var i = 0;
function uniqueId() {
  if (i > 1000000) i = 0;
  return i++;
}

module.exports = {
  childContextTypes: {
    animateProps: React.PropTypes.object
  },

  getChildContext() {
    return { animateProps: this.props.animateProps };
  },

  runAnimation(source, props) {
    if (this._animationsDisabled)
      return;

    AnimateActions({
      source,
      props
    });
  },

  disableAnimation() {
    this._animationsDisabled = true;
  },

  enableAnimation() {
    this._animationsDisabled = false;
  }
};
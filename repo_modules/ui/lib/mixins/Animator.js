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

  componentWillMount() {
    this._animateID = uniqueId();
  },

  componentWillUnmount() {
    this._removeAnimation();
  },

  runAnimation(source, props) {
    if (this._animationsDisabled)
      return;

    AnimateActions({
      type: 'add',
      id: this._animateID,
      depth: this._mountDepth,
      source,
      props
    });
  },

  disableAnimation() {
    this._animationsDisabled = true;
    this._removeAnimation();
  },

  enableAnimation() {
    this._animationsDisabled = false;
  },

  _removeAnimation() {
    AnimateActions({
      type: 'remove',
      id: this._animateID
    });
  }
};
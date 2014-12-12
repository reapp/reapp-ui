var React = require('react');
var Axn = require('axn');
var AnimateActions = require('../../actions/Animate');

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
    AnimateActions({
      type: 'remove',
      id: this._animateID
    });
  },

  runAnimation(source, props) {
    AnimateActions({
      type: 'add',
      id: this._animateID,
      depth: this._mountDepth,
      source,
      props
    });
  }
};
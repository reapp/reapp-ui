var React = require('react');
var Axn = require('axn');
var AnimateActions = require('../../actions/Animate');

module.exports = {
  childContextTypes: {
    animateProps: React.PropTypes.object
  },

  getChildContext() {
    return { animateProps: this.props.animateProps };
  },

  animate(source, props, cb) {
    var obj = { mountDepth: this._mountDepth };
    obj[source] = props;
    AnimateActions(obj);
  }
};
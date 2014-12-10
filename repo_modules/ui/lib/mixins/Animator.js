var React = require('react');
var Axn = require('axn');
var Animate = require('../../actions/Animate');

module.exports = {
  childContextTypes: {
    animateProps: React.PropTypes.object
  },

  getChildContext() {
    return { animateProps: this.props.animateProps };
  },

  animate(source, props) {
    var obj = {};
    obj[source] = props;
    Animate(obj);
  }
};
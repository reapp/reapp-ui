var React = require('react/addons');
var ReactStyle = require('react-style');
var Merge = require('react/lib/merge');
var GSSMixin = require('../../../mixins/GSSMixin');
var Cx = React.addons.classSet;

var View = React.createClass({
  styles(propStyles) {
    return ReactStyle(Merge({
      background: '#efeff4',
      overflow: 'hidden',
      paddingTop: 44,
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      '-webkit-overflow-scrolling': 'touch'
    }, propStyles));
  },

  render() {
    var styles = this.styles(this.props.style || {});
    var classes = { 'pane': true };
    if (this.props.className)
      classes[this.props.className] = true;

    return (
      <div id={this.props.id} className={Cx(classes)} styles={styles}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = View;
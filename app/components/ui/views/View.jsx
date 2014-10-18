var React = require('react/addons');
var ReactStyle = require('react-style');
var GSSMixin = require('../../../mixins/GSSMixin');
var Cx = React.addons.classSet;

var View = React.createClass({
  styles(top) {
    return ReactStyle({
      background: '#efeff4',
      overflow: 'hidden',
      paddingTop: top,
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      '-webkit-overflow-scrolling': 'touch'
    });
  },

  render() {
    var styles = this.styles(44);
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
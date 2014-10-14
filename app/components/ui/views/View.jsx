var React = require('react/addons');
var ReactStyle = require('react-style');
var GSSMixin = require('../../../mixins/GSSMixin');
var Cx = React.addons.classSet;

var View = React.createClass({
  styles(top) {
    return ReactStyle({
      'background': '#efeff4',
      'height': '100%',
      'overflow': 'scroll',
      'padding-top': top
    });
  },

  render() {
    var firstChildType = this.props.children[0].type;
    var hasTitleBar = firstChildType && firstChildType.displayName.match(/^Title/);
    var styles = this.styles(hasTitleBar ? 44 : 0);
    var classes = { 'pane': true };
    if (this.props.className)
      classes[this.props.className] = true;

    return (
      <div className={Cx(classes)} styles={styles}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = View;
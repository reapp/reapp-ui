var React = require('react');
var ReactStyle = require('react-style');
var GSSMixin = require('../../../mixins/GSSMixin');

var View = React.createClass({
  styles(top) {
    return ReactStyle({
      background: '#efeff4',
      height: '100%',
      overflow: 'scroll',
      'padding-top': top
    });
  },

  render() {
    var hasTitleBar = this.props.children[0].type.displayName.match(/^Title/);
    var styles = this.styles(hasTitleBar ? 44 : 0);

    return (
      <div className="pane" styles={styles}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = View;
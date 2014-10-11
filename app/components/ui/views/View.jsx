var React = require('react');
var ReactStyle = require('react-style');
var GSSMixin = require('../../../mixins/GSSMixin');

var View = React.createClass({
  mixins: [GSSMixin],

  layout: `
    _[top] == window[bottom];
    _[left] == window[left];
    _[right] == window[right];
    _[bottom] == window[bottom];
  `,

  styles: ReactStyle`
    ignore: me;
    background: #efeff4;
    height: 100%;
    overflow: scroll;
  `,

  render() {
    return (
      <div className="pane" styles={this.styles}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = View;
var React = require('react');
var ReactStyle = require('react-style');
var GSSMixin = require('../../../mixins/GSSMixin');

var View = React.createClass({
  mixins: [GSSMixin],

  layout() {
    return `
      [top] == window[bottom];
      [left] == window[left];
      [right] == window[right];
      [bottom] == window[bottom];
    `
  },

  styles: ReactStyle`
    background: #efeff4;
    height: 100%;
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
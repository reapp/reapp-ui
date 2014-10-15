var React = require('react');
var ReactStyle = require('react-style');
var GSSMixin = require('../../../mixins/GSSMixin');

const TOOLBAR_HEIGHT = 44;

var Toolbar = React.createClass({
  // mixins: [GSSMixin],

  // layout() {
  //   return (`
  //     _[top] == ::window[top];
  //     _[left] == ::window[left];
  //     _[right] == ::window[right];
  //     _[height] == ${this.props.height || TOOLBAR_HEIGHT};
  //   `);
  // },

  styles(height) {
    return ReactStyle({
      'font-size': '16px',
      'background-color': '#fff',
      'text-align': 'center',
      'border-bottom': '1px solid #ccc',
      'padding': '12px',
      'z-index': '100',
      'position': 'fixed',
      'top': '0',
      'left': '0',
      'right': '0',
      'height': height
    })
  },

  render() {
    return (
      <div
        id={this.props.id || '__toolbar'}
        className="toolbar"
        styles={this.styles(this.props.height)}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Toolbar;
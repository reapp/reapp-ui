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

  styles: (height) => ReactStyle({
    fontSize: '16px',
    backgroundColor: '#fff',
    textAlign: 'center',
    borderBottom: '1px solid #ccc',
    padding: '12px',
    zIndex: 100,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: height
  }),

  render() {
    return (
      <div className="toolbar" styles={this.styles(this.props.height)}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Toolbar;
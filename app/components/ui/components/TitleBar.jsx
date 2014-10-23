var React = require('react');
var ReactStyle = require('react-style');
var DocumentTitle = require('react-document-title');
// var GSSMixin = require('../../../mixins/GSSMixin');

require('./TitleBar.styl');

const TOOLBAR_HEIGHT = 44;

var TitleBar = React.createClass({
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
    zIndex: 100,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: height || TOOLBAR_HEIGHT
  }),

  render() {
    return (
      <div className="TitleBar" styles={this.styles(this.props.height)}>
        <DocumentTitle title={this.props.children} />
        <div className="TitleBar--left">{this.props.left}</div>
        <div className="TitleBar--center">{this.props.children}</div>
        <div className="TitleBar--right">{this.props.right}</div>
      </div>
    );
  }
});

module.exports = TitleBar;
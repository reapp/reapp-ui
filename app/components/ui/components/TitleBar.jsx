var React = require('react');
var ReactStyle = require('react-style');
var DocumentTitle = require('react-document-title');
// var GSSMixin = require('../../../mixins/GSSMixin');

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
      <div className="TitleBar" styles={this.styles(this.props.height)}>
        <DocumentTitle title={this.props.children} />
        {this.props.left}
        {this.props.children}
        {this.props.right}
      </div>
    );
  }
});

module.exports = TitleBar;
var React = require('react');
var ReactStyle = require('react-style');
var DocumentTitle = require('react-document-title');
var AnimatableContainer = require('../helpers/AnimatableContainer');

require('./TitleBar.styl');

var TOOLBAR_HEIGHT = 44;

var TitleBar = React.createClass({
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

  getBarElements(titles) {
    var result = { left: [], mid: [], right: [] };

    Object.keys(titles).map((id, i) => {
      var { left, mid, right } = titles[id];

      if (this.props.step < i-1 || this.props.step > i+1)
        return null;

      var makeBarElement = this.makeBarElement.bind(this, i, id, this.props.step);

      result.left.push(makeBarElement(left));
      result.mid.push(makeBarElement(mid));
      result.right.push(makeBarElement(right));
    });

    return result;
  },

  makeBarElement(i, id, step, content) {
    return AnimatableContainer({
      key: i,
      index: i,
      id: `left-${id}`,
      step: step
    }, content);
  },

  render() {
    if (!this.props.titles) return null;
    var { left, mid, right } = this.getBarElements(this.props.titles);

    // <DocumentTitle title={this.props.children} />

    return (
      <div className="TitleBar" styles={this.styles(this.props.height)}>
        <div className="TitleBar--left">{left}</div>
        <div className="TitleBar--mid">{mid}</div>
        <div className="TitleBar--right">{right}</div>
      </div>
    );
  }
});

module.exports = TitleBar;
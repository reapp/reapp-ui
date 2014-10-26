var React = require('react/addons');
var Merge = require('react/lib/merge');
var ReactStyle = require('react-style');
var cx = React.addons.classSet;

var View = React.createClass({
  styles: (styles) => ReactStyle(Merge({
    background: '#efeff4',
    overflowY: 'scroll',
    paddingTop: 44,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    pointerEvents: 'all',
    '-webkit-overflow-scrolling': 'touch'
  }, styles)),

  render() {
    var styles = this.styles(this.props.styles);
    var classes = { 'pane': true };
    classes[this.props.className] = !!this.props.className;

    return (
      <div id={this.props.id} className={cx(classes)} styles={styles}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = View;
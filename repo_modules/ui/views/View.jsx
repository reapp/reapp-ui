var React = require('react/addons');
var ReactStyle = require('react-style');
var cx = React.addons.classSet;

var View = React.createClass({
  styles: (styles) => ReactStyle(Object.assign({}, {
    background: '#efeff4',
    overflowY: 'scroll',
    overflowX: 'hidden',
    paddingTop: 44,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    pointerEvents: 'all',
    '-webkit-overflow-scrolling': 'touch',
  }, styles)),

  render() {
    var styles = this.styles(this.props.style);
    var classes = { 'View': true };
    classes[this.props.className] = !!this.props.className;

    return this.transferPropsTo(
      <div id={this.props.id} className={cx(classes)} styles={styles}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = View;
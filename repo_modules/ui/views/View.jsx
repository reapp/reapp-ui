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
    WebkitOverflowScrolling: 'touch',
  }, styles)),

  render() {
    var { style, className, id, children, ...props } = this.props;
    var styles = this.styles(style);
    var classes = { 'View': true };
    classes[className] = !!className;

    return (
      <div {...props} id={id} className={cx(classes)} styles={styles}>
        {children}
      </div>
    );
  }
});

module.exports = View;
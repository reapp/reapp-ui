var React = require('react/addons');
var Merge = require('react/lib/merge');
var ReactStyle = require('react-style');
var cx = React.addons.classSet;

var ViewMain = React.createClass({
  styles: (styles) => ReactStyle(Merge({
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }, styles)),

  render() {
    var props = this.props;
    var styles = this.styles(props.styles);
    var classes = { ViewMain: true };
    if (props.className) classes[props.className] = true;

    return (
      <div className={cx(classes)} styles={styles}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = ViewMain;
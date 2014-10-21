var React = require('react/addons');
var Merge = require('react/lib/merge');
var ReactStyle = require('react-style');
var cx = React.addons.classSet;

var ViewLeft = React.createClass({
  styles: (styles) => ReactStyle(Merge({
    overflow: 'scroll',
    position: 'absolute',
    top: 44,
    left: 0,
    bottom: 0,
    right: 0
  }, styles)),

  render() {
    var props = this.props;
    var styles = this.styles(props.styles);
    var classes = { ViewLeft: true };
    classes[props.className] = !!props.className;

    return (
      <div className={cx(classes)}>
        {this.props.title}
        <div className="ViewLeftContent" styles={styles}>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = ViewLeft;
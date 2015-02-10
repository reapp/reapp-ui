var React = require('react/addons');
var Component = require('../component');
var Block = require('./Block');
var clone = require('../lib/niceClone');

module.exports = Component({
  name: 'Container',

  propTypes: {
    pad: React.PropTypes.bool,
    col: React.PropTypes.bool,

    // wrap in Block automatically
    wrap: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      pad: false,
      wrap: false
    };
  },

  render() {
    var {
      children,
      pad,
      col,
      wrap,
      ...props } = this.props;

    if (col)
      this.addStyles('col');

    return (
      <div {...this.componentProps()} {...props}>
        {React.Children.map(children, (child, index) => {
          var childProps = {
            pad, index,
            key: index,
            total: children.length
          };

          return wrap ?
            <Block {...childProps}>{child}</Block> :
            clone(child, childProps);
        })}
      </div>
    );
  }
});
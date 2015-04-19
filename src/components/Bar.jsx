var React = require('react/addons');
var Component = require('../component');
var BarItem = require('./BarItem');
var clone = require('../lib/niceClone');
var BarItem = require('./BarItem');

var Bar = Component({
  name: 'Bar',

  propTypes: {
    // one of text, icon, icon-text, icon-text-right
    display: React.PropTypes.string,

    // props to pass to each BarItem child
    barItemProps: React.PropTypes.object,

    // attach to which side of screen
    position: React.PropTypes.string,

    // which BarItem to pass active prop
    activeIndex: React.PropTypes.number,

    // automatically wrap children with BarItem
    wrap: React.PropTypes.bool
  },

  render() {
    var {
      display,
      children,
      barItemProps,
      activeIndex,
      position,
      wrap,
      ...props } = this.props;

    if (position)
      this.addStyles(`position-${position}`);

    return (
      <div {...this.componentProps()} {...props}>
        {React.Children.map(children, (child, i) => {
          var childProps = {
            display,
            active: i === activeIndex,
            key: i
          };

          if (wrap)
            return (
              <BarItem {...barItemProps} {...childProps}>
                {child}
              </BarItem>
            );

          return clone(child, childProps, true);
        })}
      </div>
    );
  }
});

Bar.Item = BarItem;

module.exports = Bar;
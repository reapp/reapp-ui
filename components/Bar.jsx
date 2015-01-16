var React = require('react/addons');
var Component = require('../component');
var BarItem = require('./BarItem');
var clone = require('../lib/niceClone');

module.exports = Component({
  name: 'Bar',

  propTypes: {
    barItemProps: React.PropTypes.object,
    position: React.PropTypes.string,
    activeIndexIndex: React.PropTypes.number,
    nowrap: React.PropTypes.bool
  },

  render() {
    var {
      children,
      barItemProps,
      activeIndex,
      position,
      nowrap,
      ...props } = this.props;

    if (position)
      this.addStyles(`position-${position}`);

    return (
      <ul {...this.componentProps()} {...props}>
        {React.Children.map(children, (child, i) => {
          var childProps = { active: i === activeIndex, key: i };

          if (nowrap || child.type && child.type.isBarItem)
            return clone(child, childProps);

          return (
            <BarItem {...barItemProps} {...childProps}>
              {child}
            </BarItem>
          );
        })}
      </ul>
    );
  }
});
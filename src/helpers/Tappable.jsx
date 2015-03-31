var React = require('react');
var Component = require('../component');
var Tappable = require('../mixins/Tappable');
var clone = require('../lib/niceClone');

module.exports = Component({
  name: 'Tappable',

  mixins: [
    Tappable
  ],

  getDefaultProps() {
    return {
      element: 'div'
    };
  },

  render() {
    var {
      element,
      children,
      tapFocusStyle,
      passprops,
      delayUntilActive,
      moveThreshold,
      pressDelay,
      pressMoveThreshold,
      ...props } = this.props;

    var tapProps = this.tappableProps();
    this.addClass(tapProps.className);

    if (this.state.tapActive && tapFocusStyle)
      this.addStyles(tapFocusStyle);

    // pass props to children
    if (passprops)
      children = clone(children, props, true);

    return React.createElement(
      element,
      Object.assign({}, tapProps, this.componentProps(), props),
      children
    );
  }
})
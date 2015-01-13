var React = require('react/addons');
var Component = require('../component');
var clone = require('../lib/niceClone');

module.exports = Component({
  name: 'ButtonGroup',

  propTypes: {
    children: React.PropTypes.node,
    buttonProps: React.PropTypes.object
  },

  // for handling styles of buttons at begin/end
  getStyleForButtonAtIndex(i, total) {
    var self;

    // first button
    if (i === 0 && total > 2)
      self = this.getStyles('buttonFirst');
    // first button, two total buttons
    else if (i === 0 && total === 2)
      self = this.getStyles('buttonFirstTwoTotal');
    // last button
    else if (i === total - 1 && total >= 2)
      self = this.getStyles('buttonLast');
    // middle button
    else
      self = this.getStyles('buttonMiddle');

    return { self };
  },

  render() {
    var { children, buttonProps, ...props } = this.props;
    var total = children && children.length || 0;

    return (
      <div {...this.componentProps()} {...props}>
        {clone(children, (child, i) => {
          // get extra styles for index
          var styles = this.getStyleForButtonAtIndex(i, total);

          // if no extra props, return styles
          if (!buttonProps)
            return { styles };

          // if props styles and extra styles, merge them
          if (buttonProps.styles)
            styles = this.mergeStylesProps(styles, buttonProps.styles);

          // merge extra props and extra styles
          return Object.assign({}, buttonProps, { styles });
        }, true)}
      </div>
    );
  }
});
var Component = require('ui/component');
var React = require('react/addons');

module.exports = Component({
  name: 'ButtonRow',

  getStyleForButtonAtIndex(i, total) {
    // first button
    if (i === 0 && total > 2)
      return this.styles.buttonFirst;
    if (i === 0 && total === 2)
      return this.styles.buttonFirstTwoTotal;

    // last button
    if (i === total - 1 && total >= 2)
      return this.styles.buttonLast;

    return this.styles.buttonMiddle;
  },

  render() {
    var { children, ...props } = this.props;
    var total = children.length;

    return (
      <div {...props} {...this.componentProps()}>
        {React.Children.map(children, (child, i) => {
          return React.addons.cloneWithProps(child, Object.assign({
            styles: this.getStyleForButtonAtIndex(i, total)
          }, props));
        })}
      </div>
    );
  }
});
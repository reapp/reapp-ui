var React = require('react');
var Component = require('ui/component');

module.exports = Component({
  name: 'Label',

  statics: {
    liNoPad: true
  },

  render() {
    var { title, children, ...props } = this.props;

    return (
      <label {...this.componentProps()} {...props}>
        {title && (
          <span {...this.componentProps('title')}>{title}</span>
        )}
        {children}
      </label>
    );
  }
});

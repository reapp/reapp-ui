var React = require('react');
var Component = require('../component');

module.exports = Component({
  name: 'Label',

  propTypes: {
    title: React.PropTypes.string
  },

  statics: {
    liNoPad: true
  },

  render() {
    var { title, children, ...props } = this.props;

    return (
      <label {...this.componentProps()} {...props}>
        {title && (
          <span {...this.componentProps('title')}>
            {title}
          </span>
        )}
        {children}
      </label>
    );
  }
});

var React = require('react');
var Component = require('../component');

module.exports = Component({
  name: 'Badge',

  propTypes: {
    value: React.PropTypes.string
  },

  render() {
    var { children, value, ...props } = this.props;

    return (
      <div {...this.componentProps()} {...props}>
        <span {...this.componentProps('text')}>
          {value || children}
        </span>
      </div>
    );
  }
});
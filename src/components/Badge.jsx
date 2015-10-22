var React = require('react');
var Component = require('../component');

module.exports = Component({
  name: 'Badge',

  propTypes: {
    children: React.PropTypes.node
  },

  render() {
    var { children, ...props } = this.props;

    return (
      <div {...this.componentProps()} {...props}>
        <span {...this.componentProps('text')}>
          {children}
        </span>
      </div>
    );
  }
});
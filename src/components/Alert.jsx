var React = require('react');
var Component = require('../component');

module.exports = Component({
  name: 'Alert',

  propTypes: {
    children: React.PropTypes.node
  },

  render() {
    var { children, ...props } = this.props;

    return (
      <div {...props} {...this.componentProps()}>
        {children}
      </div>
    );
  }
});
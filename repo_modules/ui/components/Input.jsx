var Component = require('ui/component');

module.exports = Component('Input', {
  getDefaultProps() {
    return {
      type: 'text'
    };
  },

  render() {
    return (
      <input {...this.componentProps()} {...this.props} />
    );
  }
});
var React = require('react');
var Component = require('../component');

module.exports = Component({
  name: 'StaticContainer',

  getDefaultProps() {
    return { shouldUpdate: false };
  },

  shouldComponentUpdate(nextProps) {
    return nextProps.shouldUpdate ||
      (this.props.staticKey !== nextProps.staticKey);
  },

  render() {
    if (this.props.fullscreen)
      this.addStyles('fullscreen');

    return (
      <div {...this.props} {...this.componentProps()}>
        {this.props.children}
      </div>
    );
  }
});
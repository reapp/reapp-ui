var React = require('react');
var Component = require('../component');

module.exports = Component({
  name: 'StaticContainer',

  propTypes: {
    children: React.PropTypes.element.isRequired
  },

  getDefaultProps() {
    return {
      update: false
    };
  },

  shouldComponentUpdate(nextProps) {
    return nextProps.update ||
      (this.props.staticKey !== nextProps.staticKey);
  },

  render() {
    if (this.props.fullscreen)
      this.addStyles('fullscreen');

    return (
      <div {...this.componentProps()}>
        {this.props.children}
      </div>
    );
  }
});
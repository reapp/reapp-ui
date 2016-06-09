var React = require('react');
var Component = require('../component');

module.exports = Component({
  name: 'StaticContainer',

  propTypes: {
    children: React.PropTypes.element.isRequired,
    scrollingEnabled: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      update: false,
      scrollingEnabled: true
    };
  },

  shouldComponentUpdate(nextProps) {
    return nextProps.update ||
      (this.props.staticKey !== nextProps.staticKey);
  },

  render() {
    if (this.props.fullscreen)
      this.addStyles('fullscreen');

    if (this.props.scrollingEnabled)
      this.addStyles('scrollingEnabled');

    return (
      <div {...this.componentProps()} >
        {this.props.children}
        {this.props.scrollingEnabled &&
          <div {...this.componentProps('after')} />
        }
      </div>
    );
  }
});
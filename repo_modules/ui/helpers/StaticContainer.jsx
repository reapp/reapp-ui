var Component = require('ui/component');

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
    return (
      <div {...this.props} {...this.componentProps()}>
        {this.props.children}
      </div>
    );
  }
});
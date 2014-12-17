var React = require('react/addons');
var Component = require('../component');

module.exports = Component({
  name: 'Tabs',

  getDefaultProps() {
    return {
      type: 'text'
    };
  },

  render() {
    var { children, type, ...props } = this.props;

    if (type)
      this.addStyles(this.styles[type]);

    return (
      <ul {...props} {...this.componentProps()}>
        {React.Children.map(children, (child, i) => {
          return React.addons.cloneWithProps(child, {
            key: i,
            type: type
          });
        })}
      </ul>
    );
  }
});
var ViewComponent = require('ui/viewcomponent');
var React = require('react/addons');

module.exports = ViewComponent('ViewMain', {
  getInitialState() {
    return { inactive: false };
  },

  render() {
    var { children, hasChild, ...props } = this.props;

    // this.addStyles({
    //   zIndex: this.getZIndexForLayer() + 50
    // });

    if (this.props.inactive || this.state.inactive)
      this.addStyles({ pointerEvents: 'none' });

    return (
      <div {...props} {...this.componentProps()}>
        {React.Children.map(children, child => {
          return React.addons.cloneWithProps(child, {
            styles: this.styles.child
          });
        })}
      </div>
    );
  }
});
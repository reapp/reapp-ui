var React = require('react/addons');
var Component = require('ui/component');
var Transition = React.addons.TransitionGroup;

module.exports = Component('ViewMain', {
  render() {
    var { children, hasChild, ...props } = this.props;

    if (!children)
      this.addStyles(this.styles.childless);

    debugger;
    return (
      <Transition component="div" {...props} {...this.componentProps()}>
        {children}
      </Transition>
    );
  }
});
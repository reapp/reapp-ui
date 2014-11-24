var React = require('react/addons');
var Component = require('ui/component');
var Transition = React.addons.CSSTransitionGroup;

var ViewMain = Component('viewMain', {
  render() {
    var { children, ...props } = this.props;

    if (!children)
      this.addStyles(this.styles.childless);

    return (
      <div {...props} {...this.componentProps()}>
        <Transition transitionName="drawer">
          {children}
        </Transition>
      </div>
    );
  }
});

module.exports = ViewMain;
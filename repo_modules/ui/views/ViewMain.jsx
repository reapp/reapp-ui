var React = require('react/addons');
var Styled = require('ui/styled');
var cx = React.addons.classSet;
var Transition = React.addons.CSSTransitionGroup;

var ViewMain = React.createClass({
  mixins: [Styled('viewmain')],

  render() {
    var { className, children, ...props } = this.props;

    var classes = { ViewMain: true };
    classes[className] = !!className;

    return (
      <div
        {...props}
        className={cx(classes)}
        styles={this.getStyles()}>
        <Transition transitionName="drawer">
          {children}
        </Transition>
      </div>
    );
  }
});

module.exports = ViewMain;
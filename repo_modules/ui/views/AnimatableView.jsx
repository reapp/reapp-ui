var React = require('react/addons');
var ReactStyle = require('react-style');
var View = require('./View');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var cx = React.addons.classSet;

module.exports = React.createClass({
  styles(propStyles) {
    return ReactStyle(Object.assign({}, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: propStyles.width,
      height: propStyles.height,
      pointerEvents: 'all',
      WebkitOverflowScrolling: 'touch',
      BackfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      MozBackfaceVisibility: 'hidden'
    }, propStyles));
  },

  getClasses(props) {
    var classes = {
      AnimatedView: true,
      touched: !!props.touching
    };

    if (props.className) classes[props.className] = true;
    return classes;
  },

  render() {
    var { id, width, height, index, step, ...props } = this.props;
    var classes = cx(this.getClasses(this.props));

    // todo: move to data-transforms
    var x = (index - step) * width;

    // parallax
    if (index < step) x = x / 2;

    return (
      <AnimatableContainer
        id={id}
        className={classes}
        styles={this.styles({ width, height })}
        translate={{x: x}}>
        <View {...props} />
      </AnimatableContainer>
    );
  }
});
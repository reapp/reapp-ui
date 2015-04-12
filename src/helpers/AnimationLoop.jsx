var React = require('react');
var Component = require('../component');
var Animate = require('react-animate-state');
var clone = require('../lib/niceClone');
var UI = require('../index');

// Animate your components in repeating loops,
// you pass in an 'animation' name, and then just set active={true}
// and it will loop for 'duration'

module.exports = Component({
  name: 'AnimationLoop',

  propTypes: {
    animation: React.PropTypes.string.isRequired,
    duration: React.PropTypes.number,
    easing: React.PropTypes.string,
    active: React.PropTypes.bool,
    blockOnAnimation: React.PropTypes.string
  },

  mixins: [
    Animate
  ],

  getDefaultProps() {
    return {
      duration: 1000,
      easing: 'linear'
    };
  },

  getInitialState() {
    return {
      step: 0,
      index: 1
    };
  },

  componentWillMount() {
    this.start(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this.start(nextProps);
  },

  componentWillUpdate() {
    if (this.props.blockOnAnimation) {
      if (this.isAnimating(this.props.blockOnAnimation))
        this.disableAnimation();
      else
        this.enableAnimation();
    }
  },

  start(props) {
    if (props.active && !this.state.isActive) {
      this.setState({
        step: 0,
        isActive: true,
        animations: {
          self: this.props.animation
        }
      });
      this.run();
    }
  },

  run() {
    this.animate({ step: 1 }, this.props.easing, this.props.duration, () => {
      this.setState({ step: 0 });

      if (this.props.active)
        this.run();
      else
        this.setState({ isActive: false });
    });
  },

  render() {
    var {
      children,
      animations,
      active,
      duration,
      ...props } = this.props;

    return (
      <div {...this.componentProps()} {...props}>
        {clone(children, props, true)}
      </div>
    );
  }
});
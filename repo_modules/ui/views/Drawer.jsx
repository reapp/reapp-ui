var Component = require('ui/component');
var TouchableArea = require('../helpers/TouchableArea');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var DrawerBehavior = require('./DrawerBehavior');
var TweenState = require('react-tween-state');
var { Scroller } = require('scroller');

module.exports = Component('Drawer', {
  mixins: [TweenState.Mixin],

  getDefaultProps() {
    return {
      layer: 2, // todo integrate w/ app state & manage index
      behavior: DrawerBehavior,
      parents: null
    };
  },

  getInitialState() {
    return {
      externalScroller: !!this.props.scroller,
      xOffset: 0,
      isClosed: false
    };
  },

  componentWillEnter(cb) {
    debugger;
    this.setState({ xOffset: window.innerWidth });
    this.tweenState('xOffset', {
      easing: TweenState.easingTypes.easeInOutQuad,
      duration: 300,
      endValue: 0,
      onEnd: () => {
        debugger;
        cb();
      }
    });
  },

  componentWillLeave(cb) {
    cb();
  },

  componentWillMount() {
    if (this.state.externalScroller) return;

    this.scroller = new Scroller(this._handleScroll, {
      bouncing: false,
      scrollingX: true,
      scrollingY: false,
      snapping: true
    });
  },

  componentDidMount() {
    this._measure();
    window.addEventListener('resize', this._measure);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this._measure);
    this.transformParents('none');
  },

  _measure() {
    if (this.state.externalScroller) return;
    var node = this.getDOMNode();
    this.scroller.setDimensions(
      node.clientWidth,
      node.clientHeight,
      node.clientWidth * 2,
      node.clientHeight
    );
    this.scroller.setSnapSize(node.clientWidth, node.clientHeight);
    this.scroller.scrollTo(node.clientWidth, 0);
  },

  _handleScroll(left) {
    debugger;
    this.setState({
      xOffset: left,
      isClosed: left === 0
    });

    this.transformParents('translate3d(-' + (left / 2) + 'px, 0, 0)');
  },

  transformParents(transform) {
    if (this.props.parents) {
      [].concat(this.props.parents).map(parent => {
        document.getElementById(parent).style.transform = transform;
      });
    }
  },

  render() {
    var {
      layer,
      translate,
      behavior,
      scroller,
      touchableProps,
      children,
      ...props
    } = this.props;

    this.addStyles({ zIndex: layer + 5000 });
    this.addStyles('dragger', {
      left: this.state.isClosed ? -10 : 0,
      zIndex: 1000 + layer
    });

    if (this.state.isClosed)
      this.addClass('closed');

    props.translate = (
      translate || behavior.translate(this.state.xOffset)
    );

    return (
      <AnimatableContainer {...props} {...this.componentProps()}>
        <TouchableArea {...this.componentProps('dragger')} {...touchableProps}
          scroller={scroller || this.scroller} />
        {children}
      </AnimatableContainer>
    );
  }
});
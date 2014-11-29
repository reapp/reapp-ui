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

  componentWillMount() {
    if (this.state.externalScroller) return;
    this.scroller = new Scroller(this._handleScroll, {
      bouncing: false,
      scrollingX: true,
      scrollingY: false,
      snapping: true
    });
  },

  enter(cb) {
    console.log(this.state.xOffset);
    this.tweenState('xOffset', {
      easing: TweenState.easingTypes.easeInOutQuad,
      duration: 1500,
      endValue: 300,
      onEnd: cb
    });
  },

  componentDidMount() {
    this.measureScroller();
    this.enter(this.scrollToOpen);
    window.addEventListener('resize', this.measureAndScrollOpen);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.measureAndScrollOpen);
    this.transformParents('none');
  },

  scrollToOpen() {
    if (this.scroller)
      this.scroller.scrollTo(this.getDOMNode().clientWidth, 0);
  },

  measureScroller() {
    if (this.state.externalScroller) return;
    var node = this.getDOMNode();
    this.scroller.setDimensions(
      node.clientWidth,
      node.clientHeight,
      node.clientWidth * 2,
      node.clientHeight
    );
    this.scroller.setSnapSize(node.clientWidth, node.clientHeight);
  },

  measureAndScrollOpen() {
    console.log('measure and scroll open');
    this.measureScroller();
    this.scrollToOpen();
  },

  _handleScroll(left) {
    console.log(left);
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
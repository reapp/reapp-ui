var React = require('react');
var { Scroller } = require('scroller');
var Component = require('../component');
var TouchableArea = require('../helpers/TouchableArea');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var StaticContainer = require('../helpers/StaticContainer');
var DrawerBehavior = require('../behaviors/DrawerBehavior');

module.exports = Component({
  name: 'Drawer',

  propTypes: {
    behavior: React.PropTypes.object,
    translate: React.PropTypes.object,
    from: React.PropTypes.oneOf([
      'left', 'right', 'top', 'bottom'
    ]),
    touchableProps: React.PropTypes.object,
    onClose: React.PropTypes.func,
    open: React.PropTypes.bool,
    dragger: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      behavior: DrawerBehavior,
      from: 'left',
      open: true,
      dragger: true
    };
  },

  getInitialState() {
    return {
      offset: 0,
      externalScroller: !!this.props.scroller
    };
  },

  componentWillMount() {
    if (this.state.externalScroller)
      return;

    this.scroller = new Scroller(this.handleScroll, {
      bouncing: false,
      scrollingX: this.isSideDrawer(),
      scrollingY: !this.isSideDrawer(),
      snapping: true
    });
  },

  componentDidMount() {
    this.measureAndPosition();
    window.addEventListener('resize', this.measureAndPosition);

    this.ignoreScroll = false;
    if (this.props.open) {
      this.scrollClosed(false);
      this.scrollOpen(true);
    }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open)
      this.scrollTo(100, true);
  },

  measureAndPosition() {
    this.measureScroller();

  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.measureAndPosition);
  },

  getWidth() {
    return this.getDOMNode().clientWidth;
  },

  getHeight() {
    return this.getDOMNode().clientHeight;
  },

  measureScroller() {
    if (this.state.externalScroller)
      return;

    var width = this.getWidth();
    var height = this.getHeight();
    var totalWidth = width;
    var totalHeight = height;

    if (this.isSideDrawer())
      totalWidth = width * 2;
    else
      totalHeight = height * 2;

    this.scroller.setDimensions(width, height, totalWidth, totalHeight);
    this.scroller.setSnapSize(width, height);
    this.scroller.scrollTo(0, 0, false);
  },

  scrollClosed(animated) {
    this.scrollTo(100, animated);
  },

  scrollOpen(animated) {
    this.scrollTo(0, animated);
  },

  // handles scrolling to a percent
  scrollTo(open, animated) {
    if (!this.scroller)
      return;

    var percent = open ? 100 : 0;
    var dec = percent * 0.01;

    if (this.isSideDrawer())
      this.scroller.scrollTo(dec * this.getDOMNode().clientWidth, 0, animated);
    else
      this.scroller.scrollTo(0, dec * this.getDOMNode().clientHeight, animated);
  },

  isSideDrawer() {
    return ['left', 'right'].filter(x => x === this.props.from).length;
  },

  isClosed() {
    return this.isSideDrawer() ?
      this.state.offset === this.getWidth() :
      this.state.offset === this.getHeight();
  },

  ignoreScroll: true,

  handleScroll(left, top) {
    if (this.ignoreScroll)
      return;

    var offset, transform;

    switch(this.props.from) {
      case 'left': case 'right':
        offset = left;
        break;
      case 'top': case 'bottom':
        offset = top;
      break;
    }

    this.setState({ offset });

    // onClose callback
    if (this.isClosed() && this.props.onClose)
      this.props.onClose();
  },

  oppositeSides: {
    left: 'right',
    right: 'left',
    top: 'bottom',
    bottom: 'top'
  },

  render() {
    var {
      from,
      behavior,
      translate,
      touchableProps,
      children,
      scroller,
      dragger,
      ...props
    } = this.props;

    var animatedProps = Object.assign({}, {
      translate: translate || behavior[from].translate(this.state.offset)
    }, this.props.animatedProps);

    this.addClass('open', this.props.open);
    this.addStyles(`from-${this.props.from}`);

    if (dragger) {
      this.addStyles('dragger', `${this.props.from}Dragger`);
      this.addStyles('dragger', {
        [this.oppositeSides[from]]: this.props.open ? 0 : -this.getConstant('edgeWidth')
      });
    }

    return (
      <AnimatableContainer {...this.componentProps()} {...animatedProps} {...props}>
        <div {...this.componentProps('inner')}>
          {dragger && (
            <TouchableArea
              {...this.componentProps('dragger')}
              {...touchableProps}
              scroller={scroller || this.scroller}
              currentTargetOnly />
          )}
          <StaticContainer shouldUpdate={this.state.offset === 0}>
            {children}
          </StaticContainer>
        </div>
      </AnimatableContainer>
    );
  }
});
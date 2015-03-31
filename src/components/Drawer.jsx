var React = require('react');
var { Scroller } = require('reapp-scroller');
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
    dragger: React.PropTypes.bool,
    draggerWidth: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      behavior: DrawerBehavior,
      from: 'left',
      open: true,
      dragger: true,
      width: window.innerWidth,
      height: window.innerHeight
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
      scrollingX: this.isSideDrawer(),
      scrollingY: !this.isSideDrawer(),
      snapping: true
    });
  },

  componentDidMount() {
    this.measureScroller();
    window.addEventListener('resize', this.measureScroller);

    this.ignoreScroll = false;

    this.scrollClosed(false);

    if (this.props.open)
      this.scrollOpen(true);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open) {
      if (nextProps.open)
       this.scrollOpen(true)
      else
        this.scrollClosed(true);
    }
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.measureScroller);
  },

  measureScroller() {
    if (this.state.externalScroller)
      return;

    var width = this.props.width;
    var totalWidth = this.props.width;
    var height = this.props.height;
    var totalHeight = this.props.height;

    if (this.isSideDrawer())
      totalWidth = width * 2;
    else
      totalHeight = height * 2;

    this.scroller.setDimensions(width, height, totalWidth, totalHeight);
    this.scroller.setSnapSize(width, height);

    if (this.props.from === 'bottom')
      this.scroller.scrollTo(0, totalHeight, false);
  },

  scrollClosed(animated) {
    this.scrollTo(100, animated);
  },

  scrollOpen(animated) {
    this.scrollTo(0, animated);
  },

  // handles scrolling to a percent
  scrollTo(percent, animated) {
    if (!this.scroller)
      return;

    var dec = percent * 0.01;

    if (this.isSideDrawer())
      this.scroller.scrollTo(dec * this.props.width, 0, animated);
    else
     this.scroller.scrollTo(0, dec * this.props.height, animated);
  },

  isSideDrawer() {
    return ['left', 'right'].filter(x => x === this.props.from).length;
  },

  isClosed() {
    return this.isSideDrawer() ?
      this.state.offset === this.props.width :
      this.state.offset === this.props.height;
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
    if (this.isClosed() && this.props.onClose) {
      this.props.onClose();
    }
  },

  draggerSide: {
    left: 'right',
    right: 'left',
    top: 'bottom',
    bottom: 'top'
  },

  render() {
    var {
      from,
      open,
      behavior,
      translate,
      touchableProps,
      children,
      scroller,
      dragger,
      draggerWidth,
      ...props
    } = this.props;

    var animatedProps = Object.assign({}, {
      translate: translate || behavior[from].translate(this.state.offset)
    }, this.props.animatedProps);

    if (open) {
      this.addClass('open', this.props.open);
      this.addStyles({ zIndex: 5 }); // move above other drawers
    }

    this.addStyles(`from-${this.props.from}`);

    if (dragger) {
      this.addStyles('dragger', `${this.props.from}Dragger`);
      this.addStyles('dragger', {
        [this.draggerSide[from]]: this.isClosed() ? -this.getConstant('edgeWidth') : 0
      });

      if (draggerWidth)
        this.addStyles('dragger', { width: draggerWidth });
    }

    var updateChildren = this.state.offset === 0;

    if (this.props.update === false)
      updateChildren = false;

    if (touchableProps && touchableProps.styles)
      this.addStyles('dragger', touchableProps.styles);

    return (
      <AnimatableContainer
        {...this.componentProps()}
        {...animatedProps}
        {...props}>
        <div {...this.componentProps('inner')}>
          {dragger &&
            <TouchableArea
              {...touchableProps}
              {...this.componentProps('dragger')}
              scroller={scroller || this.scroller}
              currentTargetOnly
              allowDefault
            />
          }
          <StaticContainer update={updateChildren}>
            {children}
          </StaticContainer>
        </div>
      </AnimatableContainer>
    );
  }
});
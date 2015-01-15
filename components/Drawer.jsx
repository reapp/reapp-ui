var React = require('react');
var { Scroller } = require('scroller');
var Component = require('../component');
var TouchableArea = require('../helpers/TouchableArea');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var StaticContainer = require('../helpers/StaticContainer');
var DrawerBehavior = require('../behaviors/DrawerBehavior');

// TODO:
// better handle this whole thing, needs some sort of state thing
// better than just Behavior, for handling various behaviors
// just need to sit down and draw this one out a bit more

// look at using animation mixins like viewlists

module.exports = Component({
  name: 'Drawer',

  getDefaultProps() {
    return {
      behavior: DrawerBehavior,
      type: 'left',
      parents: null,
      closed: false,
      shouldUpdate: true
    };
  },

  getInitialState() {
    return {
      externalScroller: !!this.props.scroller,
      offset: 0,
      closed: this.props.closed
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

  componentWillReceiveProps(nextProps) {
    // handle changing closed prop
    if (nextProps.closed !== this.props.closed)
      this.scrollTo(nextProps.closed ? 0 : 100, true);
  },

  componentDidMount() {
    this.measureAndPosition();
    window.addEventListener('resize', this.measureAndPosition);
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
  },

  measureAndPosition() {
    this.measureScroller();
    this.scrollTo(this.props.closed ? 100 : 0, false);
  },

  // handles scrolling to a percent
  scrollTo(percent, animated) {
    if (!this.scroller)
      return;

    var dec = percent * 0.01;

    if (this.isSideDrawer())
      this.scroller.scrollTo(dec * this.getDOMNode().clientWidth, 0, animated);
    else
      this.scroller.scrollTo(0, dec * this.getDOMNode().clientHeight, animated);
  },

  isSideDrawer() {
    return ['left', 'right'].filter(x => x === this.props.type).length;
  },

  isClosed() {
    return this.isSideDrawer() ?
      this.state.offset === this.getWidth() :
      this.state.offset === this.getHeight();
  },

  handleScroll(left, top) {
    var offset, transform;

    switch(this.props.type){
      case 'left':
      case 'right':
        offset = left;
        break;
      case 'top':
      case 'bottom':
        offset = top;
      break;
    }

    this.setState({
      offset,
      closed: offset === 0
    });

    // onClose callback
    if (this.isClosed() && this.props.onClose)
      this.props.onClose();
  },

  getOppositeType(type) {
    return { left: 'right', right: 'left', top: 'bottom', bottom: 'top' };
  },

  render() {
    var {
      translate,
      type,
      behavior,
      scroller,
      touchableProps,
      children,
      shouldUpdate,
      ...props
    } = this.props;

    props.translate = (
      translate || behavior[type].translate(this.state.offset)
    );

    this.addClass('closed', this.state.closed);
    this.addStyles(`type-${this.props.type}`);
    this.addStyles('dragger', `${this.props.type}Dragger`);

    // todo: use a constant for dragger width
    this.addStyles('dragger', {
      [this.getOppositeType(type)]: this.state.closed ? -20 : 0
    });

    return (
      <AnimatableContainer {...this.componentProps()} {...props}>
        <TouchableArea
          {...this.componentProps('dragger')}
          {...touchableProps}
          scroller={scroller || this.scroller} />
        <StaticContainer shouldUpdate={shouldUpdate}>
          {children}
        </StaticContainer>
      </AnimatableContainer>
    );
  }
});
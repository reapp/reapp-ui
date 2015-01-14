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

  componentDidMount() {
    this.measureAndPosition();
    window.addEventListener('resize', this.measureAndPosition);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.measureAndPosition);
  },

  measureScroller() {
    if (this.state.externalScroller)
      return;

    var node = this.getDOMNode();
    var totalWidth = node.clientWidth;
    var totalHeight = node.clientHeight;

    if (this.isSideDrawer())
      totalWidth = totalWidth * 2;
    else
      totalHeight = totalHeight * 2;

    this.scroller.setDimensions(
      node.clientWidth,
      node.clientHeight,
      totalWidth,
      totalHeight
    );

    this.scroller.setSnapSize(node.clientWidth, node.clientHeight);
    return { width: node.clientWidth, height: node.clientHeight };
  },

  measureAndPosition() {
    this.measureScroller();
    this.setPosition();
  },

  setPosition() {
    if (this.props.closed) {
      if (this.isSideDrawer())
        this.scroller.scrollTo(this.getDOMNode().clientWidth, 0, false);
      else
        this.scroller.scrollTo(0, this.getDOMNode().clientHeight, false);
    }
  },

  isSideDrawer() {
    return ['left', 'right'].filter(x => x === this.props.type).length;
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

    if (type === 'top')
      window.S = this.scroller

    props.translate = (
      translate || behavior[type].translate(this.state.offset)
    );

    this.addClass('closed', this.state.closed);
    this.addStyles(this.props.type);
    this.addStyles('dragger', `${this.props.type}Dragger`);

    var draggerOffset = {
      // todo get const dragger width
      [this.getOppositeType(type)]: this.state.closed ? -20 : 0
    };
    this.addStyles('dragger', draggerOffset);

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
var React = require('react');
var Component = require('ui/component');
var TouchableArea = require('../helpers/TouchableArea');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var StaticContainer = require('../helpers/StaticContainer');
var DrawerBehavior = require('./DrawerBehavior');
var { Scroller } = require('scroller');

// TODO:
// look at using transition mixin rather than scroller stuff

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
    if (this.state.externalScroller) return;
    this.scroller = new Scroller(this.handleScroll, {
      bouncing: false,
      scrollingX: true,
      scrollingY: false,
      snapping: true
    });
  },

  componentDidMount() {
    this.measureScroller();
    window.addEventListener('resize', this.measureAndScrollOpen);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.measureAndScrollOpen);
  },

  scrollToOpen() {
    if (this.scroller)
      this.scroller.scrollTo(this.getDOMNode().clientWidth, 0);
  },

  measureScroller() {
    if (this.state.externalScroller)
      return;

    var node = this.getDOMNode();
    var totalWidth = node.clientWidth;
    var totalHeight = node.clientHeight;

    if (['left', 'right'].filter(x => x === this.props.type).length)
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
  },

  measureAndScrollOpen() {
    this.measureScroller();
    this.scrollToOpen();
  },

  handleScroll(left, top) {
    var offset, transform;
    console.log(left, top)

    switch(this.props.type){
      case 'left':
        offset = left;
        break;
      case 'right':
        offset = -left;
        break;
      case 'top':
        offset = -top;
        break;
      case 'bottom':
        offset = top;
      break;
    }

    this.setState({
      offset,
      closed: offset === 0
    });
  },

  typeMap(type) {
    return { left: 'right', right: 'left', top: 'bottom', bottom: 'top' };
  },

  render() {
    var { translate, type, behavior, scroller, touchableProps, children, shouldUpdate, ...props } = this.props;

    props.translate = (
      translate || behavior[type].translate(this.state.offset)
    );

    this.addClass('closed', this.state.closed);
    this.addStyles(this.props.type);
    this.addStyles('dragger', `${this.props.type}Dragger`);

    var draggerOffset = {};
    // todo get const dragger width
    draggerOffset[this.typeMap(type)] = this.state.closed ? -20 : 0;
    this.addStyles('dragger', draggerOffset);

    return (
      <AnimatableContainer {...this.componentProps()} {...props}>
        <TouchableArea {...this.componentProps('dragger')} {...touchableProps}
          scroller={scroller || this.scroller} />
          <StaticContainer shouldUpdate={shouldUpdate}>
            {children}
          </StaticContainer>
      </AnimatableContainer>
    );
  }
});
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
      type: 'right',
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
    this.measureScroller();
    this.scrollToOpen();
  },

  handleScroll(left, top) {
    var offset, transform;

    switch(this.props.type){
      case 'left':
        offset = -left;
        transform = 'translate3d(' + (left / 2) + 'px, 0, 0)';
        break;
      case 'right':
        offset = left;
        transform = 'translate3d(-' + (left / 2) + 'px, 0, 0)';
        break;
      case 'top':
        offset = -top;
        transform = 'translate3d(0, ' + (left / 2) + 'px, 0)';
        break;
      case 'bottom':
        offset = top;
        transform = 'translate3d(0, -' + (left / 2) + 'px, 0)';
      break;
    }

    this.setState({
      offset,
      closed: offset === 0
    });

    this.transformParents(transform);
  },

  transformParents(transform) {
    if (this.props.parents) {
      [].concat(this.props.parents).map(parent => {
        document.getElementById(parent).style.transform = transform;
      });
    }
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

    var draggerOffset = {};
    draggerOffset[this.typeMap(type)] = this.state.closed ? -10 : 0;
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
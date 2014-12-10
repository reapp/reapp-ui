var Component = require('ui/component');
var TouchableArea = require('../helpers/TouchableArea');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var DrawerBehavior = require('./DrawerBehavior');
var { Scroller } = require('scroller');

// TODO:
// look at using transition mixin rather than scroller stuff
// drawer should support coming/dragging in from any direction
// Behavior should encompass this

module.exports = Component({
  name: 'Drawer',

  getDefaultProps() {
    return {
      behavior: DrawerBehavior,
      parents: null,
      closed: false
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
    console.log('measure and scroll open');
    this.measureScroller();
    this.scrollToOpen();
  },

  handleScroll(left) {
    if (left === this.state.offset)
      return;

    this.setState({
      offset: left,
      closed: left === 0
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
    var { translate, behavior, scroller, touchableProps, children, ...props } = this.props;

    props.translate = (
      translate || behavior.translate(this.state.offset)
    );

    this.addClass('closed', this.state.closed);
    this.addStyles('dragger', {
      left: this.state.closed ? -10 : 0,
      zIndex: this._mountDepth
    });

    return (
      <AnimatableContainer {...props} {...this.componentProps()}>
        <TouchableArea {...this.componentProps('dragger')} {...touchableProps}
          scroller={scroller || this.scroller} />
        {children}
      </AnimatableContainer>
    );
  }
});
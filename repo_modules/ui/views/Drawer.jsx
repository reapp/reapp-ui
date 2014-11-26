var Component = require('ui/component');
var TouchableArea = require('../helpers/TouchableArea');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var DrawerBehavior = require('./DrawerBehavior');
var { Scroller } = require('scroller');

module.exports = Component('Drawer', {
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

  componentDidMount() {
    this._measure();
    window.addEventListener('resize', this._measure);

    setTimeout(function(){this.fullyOpened = true;}.bind(this), 250);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this._measure);

    this.fullyOpened = false;
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
    this.setState({
      xOffset: left,
      isClosed: left === 0
    });

    if (this.fullyOpened)
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

    if (this.state.isClosed)
      this.addClass('closed');

    // either use given translation, or use behavior
    props.translate = translate ?
      translate :
      behavior.translate(this.state.xOffset);

    // todo: move styles to styled, allow dynamic vars
    touchableProps = Object.assign({
      scroller: scroller || this.scroller,
      style: {
        left: this.state.isClosed ? -10 : 0,
        position: 'fixed',
        top: 0,
        bottom: 0,
        width: 10,
        zIndex: 1000 + layer
      }
    }, touchableProps);

    return (
      <AnimatableContainer {...props} {...this.componentProps()}>
        <TouchableArea {...touchableProps} />
        {children}
      </AnimatableContainer>
    );
  }
});
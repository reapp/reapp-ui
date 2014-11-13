var React = require('react/addons');
var TouchableArea = require('../helpers/TouchableArea');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var DrawerBehavior = require('./DrawerBehavior');
var { Scroller } = require('scroller');
var cx = React.addons.classSet;

var Drawer = React.createClass({
  getDefaultProps() {
    return {
      className: 'drawer',
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
    var containerStyleProps = (this.props.containerProps || {}).style;
    if (containerStyleProps) delete this.props.containerProps.style;
    var containerClasses = {
      closed: this.state.isClosed
    };

    if (this.props.className)
      containerClasses[this.props.className] = true;

    var containerProps = {
      className: cx(containerClasses),
      style: Object.assign({}, {
        background: '#efeff4',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        position: 'fixed',
        marginLeft: '100%',
        width: '100%'
      }, containerStyleProps)
    };

    containerProps.style.zIndex = this.props.layer + 5000;

    if (this.props.id)
      containerProps.id = this.props.id;

    if (this.props.containerProps)
      containerProps = Object.assign({}, containerProps, this.props.containerProps);

    // if no behavior passed in, use default
    if (!(this.props.containerProps || {}).translate)
      containerProps = Object.assign({}, containerProps, {
        translate: this.props.behavior.translate(this.state.xOffset)
      });

    var touchableProps = {
      style: {
        left: this.state.isClosed ? -10 : 0,
        position: 'fixed',
        top: 0, bottom: 0, width: 10,
        zIndex: 1000 + this.props.layer
      },
      scroller: this.props.scroller || this.scroller
    };

    return (
      <AnimatableContainer {...containerProps}>
        <TouchableArea {...touchableProps} />
        {this.props.children}
      </AnimatableContainer>
    );
  }
});

module.exports = Drawer;
var React = require('react/addons');
var ReactStyle = require('react-style');
var Merge = require('react/lib/merge');
var View = require('./View');
var TouchableArea = require('../helpers/TouchableArea');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var DraggableViewBehavior = require('./DraggableViewBehavior');
var { Scroller } = require('scroller');
var Cx = React.addons.classSet;

var DraggableView = React.createClass({
  getDefaultProps() {
    return { behavior: DraggableViewBehavior };
  },

  getInitialState() {
    return { xOffset: 0 };
  },

  componentWillMount() {
    if (!this.props.scroller)
      this.scroller = new Scroller(this._handleScroll, {
        bouncing: false,
        scrollingX: true,
        scrollingY: false,
        snapping: true
      });
  },

  componentDidUpdate(prevProps) {
    if (!this.props.scroller && this.props.xOffset !== prevProps.xOffset)
      this._measure();
  },

  _measure() {
    var node = this.getDOMNode();
    this.scroller.setDimensions(
      node.clientWidth,
      node.clientHeight,
      node.clientWidth,
      node.clientHeight
    );
    this.scroller.setSnapSize(this.props.xOffset, node.clientHeight);
    this.scroller.scrollTo(this.props.xOffset, 0);
  },

  _handleScroll(left, top, zoom) {
    this.setState({xOffset: left});
  },

  isOpen() {
    console.log('isopen', (this.props.xOffset || this.state.xOffset) !== 0)
    return (this.props.xOffset || this.state.xOffset) !== 0;
  },

  render() {
    var isOpen = this.isOpen();
    var containerProps = {
      className: this.props.className,
      style: Merge({
        bottom: 0,
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        width: '100%',
        zIndex: 99
      }, this.props.containerStyle)
    };

    var touchableProps = Merge({
      style: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1000
      },
      scroller: this.props.scroller || this.scroller
    });

    // let a parent component control it
    if (this.props.translate) {
      containerProps = Merge(containerProps, {
        translate: this.props.translate
      });
    }
    // otherwise control by its own behavior
    else if (this.props.behavior) {
      containerProps = Merge(containerProps, {
        translate: this.props.behavior.translate(this.props.xOffset)
      });
    }

    // console.log('cprops', containerProps);

    // when open make touchable area small for dragging
    // from left of screen
    if (!isOpen) {
      touchableProps.style.right = 'auto';
      touchableProps.style.width = 10;
    }

    return (
      AnimatableContainer(containerProps,
        TouchableArea(touchableProps),
        View(null, this.props.children)
      )
    );
  }
});

module.exports = DraggableView;
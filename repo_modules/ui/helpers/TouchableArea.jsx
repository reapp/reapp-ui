var React = require('react');

var TouchableArea = React.createClass({
  getDefaultProps() {
    return {
      element: 'div',
      touchable: true,
      touchStartBoundsX: false,
      touchStartBoundsY: false,
      ignoreY: false,
      ignoreX: false,
      stopPropagation: false
    };
  },

  getTouchTop: touches => touches[0].pageY,
  getTouchLeft: touches => touches[0].pageX,

  isWithin: (bounds, point) => [].concat(bounds)
    .map(bound => point < bound.to && point > bound.from),

  allWithin(bounds, point) {
    return this.isWithin(bounds, point).reduce((acc, val) => val && acc);
  },

  oneWithin(bounds, point) {
    return this.isWithin(bounds, point).reduce((acc, val) => val || acc);
  },

  // this function accounts for touchStartBound that are passed in
  // if touchStart is within those bounds, it begins touchStartActions
  handleTouchStart(e) {
    if (!this.props.touchable || !this.props.scroller || e.touchableAreaIsMoving)
      return;

    // null == we haven't figured out if were ignoring this scroll, yet
    this.ignoringScroll = null;
    this._initialTouchLeft = this.getTouchLeft(e.touches);
    this._initialTouchTop = this.getTouchTop(e.touches);

    if (this.props.touchStartBoundsX || this.props.touchStartBoundsY) {
      var xBounds = this.props.touchStartBoundsX;
      var yBounds = this.props.touchStartBoundsY;
      var withinX = !xBounds || this.oneWithin(xBounds, this.getTouchLeft(e.touches));
      var withinY = !yBounds || this.oneWithin(yBounds, this.getTouchTop(e.touches));

      if (withinX && withinY)
        this.touchStartActions(e);
    }
    else
      this.touchStartActions(e);
  },

  touchStartActions(e) {
    this.props.scroller.doTouchStart(e.touches, e.timeStamp);
    if (this.props.onTouchStart) this.props.onTouchStart(e);
  },

  handleTouchMove(e) {
    if (!this.props.scroller || !this.props.touchable || this.ignoringScroll) return;
    if (this.ignoreDirectionalScroll(e)) return;

    if (this.props.stopPropagation)
      e.touchableAreaIsMoving = true;

    this.props.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
    e.preventDefault();
  },

  // this will ignore scrolls in a certain direction
  // for now it's very strict
  ignoreDirectionalScroll(e) {
    // performance optimization: return cached value
    if (this.ignoringScroll !== null)
      return this.ignoringScroll;

    // only run calculations if we have an ignore set
    if (!this.props.ignoreY && !this.props.ignoreX)
      return false;

    // calculate ignore possibility
    var distanceY = Math.abs(this._initialTouchTop - this.getTouchTop(e.touches));
    var distanceX = Math.abs(this._initialTouchLeft - this.getTouchLeft(e.touches));

    this.ignoringScroll = (
      distanceY > distanceX && this.props.ignoreY ||
      distanceX > distanceY && this.props.ignoreX
    );

    return this.ignoringScroll;
  },

  handleTouchEnd(e) {
    if (!this.props.touchable || !this.props.scroller) return;

    e.touchableAreaIsMoving = false;
    this.props.scroller.doTouchEnd(e.timeStamp);
    if (this.props.onTouchEnd) this.props.onTouchEnd(e);
  },

  render() {
    var { children, element, ...props } = this.props;

    props.onTouchStart = this.handleTouchStart;
    props.onTouchMove = this.handleTouchMove;
    props.onTouchEnd = this.handleTouchEnd;
    props.onTouchCancel = this.handleTouchEnd;

    return React.createElement(element, props, children);
  }
});

module.exports = TouchableArea;
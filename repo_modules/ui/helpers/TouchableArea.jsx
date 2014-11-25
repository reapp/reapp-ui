var React = require('react');

var TouchableArea = React.createClass({
  propTypes: {
    scroller: React.PropTypes.function.isRequired
  },

  getDefaultProps() {
    return {
      element: 'div',
      touchable: true,
      touchStartBounds: false,
      ignoreY: false,
      ignoreX: false
    };
  },

  getTouchTop: touches => touches[0].pageY,
  getTouchLeft: touches => touches[0].pageX,

  isWithin: (bounds, point) {
    return [].concat(bounds)
      .map(bound => point < bound.to && point > bound.from)
      .reduce((acc, val) => val && acc); // make sure all are true
  },

  // this function accounts for touchStartBound that are passed in
  // if touchStart is within those bounds, it begins touchStartActions
  handleTouchStart(e) {
    if (!this.props.touchable) return;

    this.ignoringScroll = false;
    this._initialTouchLeft = this.getTouchLeft(e.touches);
    this._initialTouchTop = this.getTouchTop(e.touches);

    if (this.props.touchStartBounds) {
      var xBounds = this.props.touchStartBounds.x;
      var yBounds = this.props.touchStartBounds.y;
      var withinX = !xBounds || this.isWithin(xBounds, this.getTouchLeft(touches));
      var withinY = !yBounds || this.isWithin(yBounds, this.getTouchTop(touches));

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
    if (!this.props.touchable || this.ignoringScroll) return;
    if (this.ignoreDirectionalScroll(e)) return;

    this.props.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
    e.preventDefault();
  },

  // this will ignore scrolls in a certain direction
  // for now it's very strict
  ignoreDirectionalScroll(e) {
    if (this.props.ignoreY || this.props.ignoreX) {
      var distanceY = Math.abs(this._initialTouchTop - this.getTouchTop(e.touches));
      var distanceX = Math.abs(this._initialTouchLeft - this.getTouchLeft(e.touches));

      if (distanceY > distanceX && this.props.ignoreY ||
          distanceX > distanceY && this.props.ignoreX) {
        this.ignoringScroll = true;
        return;
      }
    }
  },

  handleTouchEnd(e) {
    if (!this.props.touchable) return;

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
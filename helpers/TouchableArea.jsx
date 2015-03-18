var React = require('react');
var Component = require('../component');
var clone = require('../lib/niceClone');

// todo: decouple from scrolling more, it should be usable as a
// generic wrapper around anything so you can do stuff like:
//   - touchhold
//   - double/triple/xxx tap
//   - scrolls with limitations
//   - pinch
//   - double/triple touch

var TouchableArea = Component({
  name: 'TouchableArea',

  getDefaultProps() {
    return {
      element: 'div',
      untouchable: false,
      touchStartBoundsX: false,
      touchStartBoundsY: false,
      ignoreY: false,
      ignoreX: false,
      minimumDrag: 0,
      passprops: false,
      allowDefault: false
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
    if (this.props.untouchable || !this.props.scroller)
      return;

    // option to only accept touches on currentTarget
    if (this.props.currentTargetOnly && e.currentTarget !== this.getDOMNode())
      return;

    // _disableDirection === null, we haven't figured out if ignoring this scroll yet
    this.disableDirection = null;
    this._initialTouchLeft = this.getTouchLeft(e.touches);
    this._initialTouchTop = this.getTouchTop(e.touches);

    if (this.props.touchStartBoundsX || this.props.touchStartBoundsY) {
      var xBounds = this.props.touchStartBoundsX;
      var yBounds = this.props.touchStartBoundsY;
      var withinX = !xBounds || this.oneWithin(xBounds, this.getTouchLeft(e.touches));
      var withinY = !yBounds || this.oneWithin(yBounds, this.getTouchTop(e.touches));

      if (withinX && withinY) {
        this._touchStartOutOfBounds = false;
        this.touchStartActions(e);
      }
      else {
        this._touchStartOutOfBounds = true;
      }
    }
    else
      this.touchStartActions(e);
  },

  touchStartActions(e) {
    if (this.props.scroller)
      this.props.scroller.doTouchStart(e.touches, e.timeStamp);

    if (this.props.onTouchStart)
      this.props.onTouchStart(e);
  },

  handleTouchMove(e) {
    if (
      this._touchStartOutOfBounds ||
      !this.props.scroller ||
      this.props.untouchable ||
      this.disableDirection ||
      this.ignoreDirectionalScroll(e)
    )
      return;

    this.props.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);

    if (!this.props.allowDefault)
      e.preventDefault();

    if (this.props.onTouchMove)
      this.props.onTouchMove(e);
  },

  // ignore scrolls in a certain direction
  ignoreDirectionalScroll(e) {
    // performance: return cached value
    if (this.disableDirection !== null)
      return this.disableDirection;

    // if we have an ignore set
    if (!this.props.ignoreY && !this.props.ignoreX)
      return false;

    // calculate distances
    var distanceY = Math.abs(this._initialTouchTop - this.getTouchTop(e.touches));
    var distanceX = Math.abs(this._initialTouchLeft - this.getTouchLeft(e.touches));

    if (this.props.ignoreY && this.props.minimumDrag > distanceY ||
        this.props.ignoreX && this.props.minimumDrag > distanceX)
      return false;

    this.disableDirection = (
      distanceY > distanceX && this.props.ignoreY ||
      distanceX > distanceY && this.props.ignoreX
    );

    if (this.disableDirection)
      this.handleTouchEnd(e);

    return this.disableDirection;
  },

  handleTouchEnd(e) {
    if (this.props.untouchable || !this.props.scroller) return;

    this.props.scroller.doTouchEnd(e.timeStamp);

    if (this.props.onTouchEnd)
      this.props.onTouchEnd(e);
  },

  render() {
    var {
      children,
      element,
      untouchable,
      touchStartBoundsX,
      touchStartBoundsY,
      ignoreY,
      ignoreX,
      passprops,
      ...props } = this.props;

    Object.assign(props, this.componentProps(), {
      onTouchStart: this.handleTouchStart,
      onTouchMove: this.handleTouchMove,
      onTouchEnd: this.handleTouchEnd,
      onTouchCancel: this.handleTouchEnd
    });

    if (passprops)
      children = clone(children, props, true);

    return React.createElement(element, props, children);
  }
});

module.exports = TouchableArea;
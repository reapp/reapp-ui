var React = require('react');

var TouchableArea = React.createClass({
  getDefaultProps() {
    return {
      component: React.DOM.div,
      touchable: true,
      touchStartBounds: false,
      ignoreY: false,
      ignoreX: false
    };
  },

  handleTouchStart(e) {
    if (!this.props.scroller || !this.props.touchable) {
      return;
    }

    this.ignoringScroll = false;
    this._initialTouchLeft = this.getTouchLeft(e.touches);
    this._initialTouchTop = this.getTouchTop(e.touches);

    if (this.props.touchStartBounds) {
      if (this.props.touchStartBounds.x) {
        this.isWithin(this.props.touchStartBounds.x, e.touches[0].pageX, () => {
          this.touchStartActions(e);
        });
      }
    }
    else {
      this.touchStartActions(e);
    }
  },

  getTouchTop(touches) {
    return touches[0].pageY;
  },

  getTouchLeft(touches) {
    return touches[0].pageX;
  },

  touchStartActions(e) {
    this.props.scroller.doTouchStart(e.touches, e.timeStamp);
    if (this.props.onTouchStart) this.props.onTouchStart(e);
  },

  handleTouchMove(e) {
    if (!this.props.scroller || !this.props.touchable || this.ignoringScroll) {
      return;
    }

    if (this.props.ignoreY || this.props.ignoreX) {
      var distanceY = Math.abs(this._initialTouchTop - this.getTouchTop(e.touches));
      var distanceX = Math.abs(this._initialTouchLeft - this.getTouchLeft(e.touches));

      if (distanceY > distanceX && this.props.ignoreY ||
          distanceX > distanceY && this.props.ignoreX) {
        this.ignoringScroll = true;
        return;
      }
    }

    this.props.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
    e.preventDefault();
  },

  handleTouchEnd(e) {
    if (!this.props.scroller || !this.props.touchable) {
      return;
    }

    this.props.scroller.doTouchEnd(e.timeStamp);
    if (this.props.onTouchEnd) this.props.onTouchEnd(e);
  },

  isWithin(bounds, point, cb) {
    [].concat(bounds).map(bound => (point < bound.to && point > bound.from) && cb());
  },

  render() {
    var { children, component, ...props } = this.props;

    return (
      <component
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        onTouchCancel={this.handleTouchEnd}>
        {children}
      </component>
    );
  }
});

module.exports = TouchableArea;
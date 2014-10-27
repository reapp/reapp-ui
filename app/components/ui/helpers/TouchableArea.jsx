var React = require('react');

var TouchableArea = React.createClass({
  getDefaultProps() {
    return {
      component: React.DOM.div,
      touchable: true,
      touchStartBounds: false
    };
  },

  handleTouchStart(e) {
    if (!this.props.scroller || !this.props.touchable) {
      return;
    }

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

  touchStartActions(e) {
    this.props.scroller.doTouchStart(e.touches, e.timeStamp);
    if (this.props.onTouchStart) this.props.onTouchStart(e);
  },

  handleTouchMove(e) {
    if (!this.props.scroller || !this.props.touchable) {
      return;
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
    bounds.map(bound => (point < bound.to && point > bound.from) && cb());
  },

  render() {
    var component = this.props.component;
    return this.transferPropsTo(
      <component
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        onTouchCancel={this.handleTouchEnd}>
        {this.props.children}
      </component>
    );
  }
});

module.exports = TouchableArea;
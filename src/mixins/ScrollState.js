// Set the state isScrolling based on whether a ref is scrolling
// Must define isScrolling in getInitialState()
// and run this.scrollListener(node : DOMNode) on componentWillMount();

function getTouchProps(touch) {
  if (!touch) return {};
  return {
    pageX: touch.pageX,
    pageY: touch.pageY,
    clientX: touch.clientX,
    clientY: touch.clientY
  };
}

module.exports = {
  componentWillUnmount() {
    clearInterval(this._scrollEndInterval);

    if (this._scrollNode) {
      this._scrollNode.removeEventListener('touchstart', this._scrollHandleTouchStart);
      this._scrollNode.removeEventListener('touchmove', this._scrollHandleTouchMove);
    }
  },

  scrollListener(node) {
    this._scrollNode = node;
    this._scrollNode.addEventListener('touchstart', this._scrollHandleTouchStart);
    this._scrollNode.addEventListener('touchmove', this._scrollHandleTouchMove);
  },

  calculateMovement: function(touch) {
    return {
      x: Math.abs(touch.clientX - this._initialTouch.clientX),
      y: Math.abs(touch.clientY - this._initialTouch.clientY)
    };
  },

  _scrollHandleTouchStart() {
    this._initialTouch = this._lastTouch = getTouchProps(event.touches[0]);
  },

  _scrollHandleTouchMove() {
    this._lastTouch = getTouchProps(event.touches[0]);
    var movement = this.calculateMovement(this._lastTouch);

    if (movement.x > 20 || movement.y > 20)
      this._setIsScrolling();
  },

  _setIsScrolling() {
    if (!this.state.isScrolling) {
      this.setState({ isScrolling: true });
      this._scrollCheckIfEnded();

      if (this.props.onScrollStart)
        this.props.onScrollStart(this._scrollNode);
    }
  },

  _scrollCheckIfEnded() {
    var lastPosition = this._scrollNode.scrollTop;

    this._scrollEndInterval = setInterval(() => {
      var pos = this._scrollNode.scrollTop;
      if (pos === lastPosition) {
        clearInterval(this._scrollEndInterval);
        this.setState({ isScrolling: false });

        if (this.props.onScrollEnd)
          this.props.onScrollEnd(this._scrollNode);
      }
      else
        lastPosition = pos;
    }, 200);
  }
}
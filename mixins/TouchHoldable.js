var defaultTime = 300;

module.exports = function(ref, time) {
  if (!time) {
    ref = time;
    time = defaultTime;
  }

  return {
    componentDidMount() {
      this.getDOMNode()
    },

    handleTouchStart() {
      if (this.props.onTouchHold)
        this._holdTouchStarted = new Date();
    },

    handleTouchEnd() {
      if ((new Date()).valueOf() - this._holdTouchStarted.valueOf() >= time)

      this._holdTouchStarted = null;
    }
  };
};
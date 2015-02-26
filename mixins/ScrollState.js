// Set the state isScrolling based on whether a ref is scrolling
// Must define isScrolling in getInitialState()
// and run this.scrollListener(node : DOMNode) on componentWillMount();

module.exports = {
  scrollListener(node) {
    node.addEventListener('scroll', this.startScrollListen.bind(this, node));
  },

  startScrollListen(node) {
    if (!this.state.isScrolling) {
      this.setState({ isScrolling: true });
      this.listenForScrollEnd(node);
    }
  },

  listenForScrollEnd(node) {
    this._lastScrollPositionY = node.scrollTop;

    this.scrollEndInterval = setInterval(() => {
      var top = node.scrollTop;

      if (this.state.isScrolling && top === this._lastScrollPositionY) {
        clearInterval(this.scrollEndInterval);
        this.setState({ isScrolling: false });
      }

      this._lastScrollPositionY = top;
    }, 300);
  },

  componentWillUnmount() {
    clearInterval(this.scrollEndInterval);
  }
}
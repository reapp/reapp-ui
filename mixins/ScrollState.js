// Set the state isScrolling based on whether a ref is scrolling
// Must define isScrolling in getInitialState()
// and run this.scrollListener(node : DOMNode) on componentWillMount();

module.exports = {
  scrollListener(node) {
    node.addEventListener('scroll', this.setIsScrolling);
    this.listenForScrollEnd(node);
  },

  setIsScrolling() {
    if (!this.state.isScrolling)
      this.setState({ isScrolling: true });
  },

  listenForScrollEnd(node) {
    this._lastScrollPositionY = node.scrollTop;
    this._lastScrollPositionX = node.scrollWidth;

    this.scrollEndInterval = setInterval(() => {
      if (
        this.state && this.state.isScrolling &&
        node.scrollTop === this._lastScrollPositionY &&
        node.scrollWidth === this._lastScrollPositionX
      )
        this.setState({ isScrolling: false });

      this._lastScrollPositionY = node.scrollTop;
      this._lastScrollPositionX = node.scrollWidth;
    }, 100);
  },

  componentWillUnmount() {
    clearInterval(this.scrollEndInterval);
  }
}
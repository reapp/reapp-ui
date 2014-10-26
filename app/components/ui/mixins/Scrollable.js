// Assumes you have a Scroller available

var ScrollableMixin = {
  getDefaultProps() {
    return {
      scrollBounce: true,
      scrollX: true,
      scrollY: true,
      scrollSnap: false
    };
  },

  getInitialState() {
    return {
      scrollXOffset: 0,
      scrollYOffset: 0,
      isClosed: false
    };
  },

  componentWillMount() {
    this.scroller = new Scroller(this._handleScroll, {
      bouncing: this.props.scrollBounce,
      scrollingX: this.props.scrollX,
      scrollingY: this.props.scrollY,
      snapping: this.props.scrollSnap
    });
  },

  componentDidMount() {
    this._measureScroll();
    window.addEventListener('resize', this._measureScroll);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this._measureScroll);
  },

  _measureScroll() {
    var node = this.getDOMNode();
    this.scroller.setDimensions(
      node.clientWidth,
      node.clientHeight,
      node.clientWidth * 2,
      node.clientHeight
    );
    this.scroller.setSnapSize(node.clientWidth, node.clientHeight);
    this.scroller.scrollTo(node.clientWidth, 0);
  },

  _handleScroll(x, y, z) {
    this.setState({
      scrollXOffset: x,
      scrollYOffset: y
    });
  }
};

module.exports = ScrollableMixin;
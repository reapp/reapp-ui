var { Scroller } = require('scroller');

// this.props.contentWidth
// this.props.contentHeight

var Scrollable = function(props) {
  return {
    getDefaultProps() {
      return Object.assign({}, {
        scrollBounce: true,
        scrollX: false,
        scrollY: false,
        scrollSnap: false
      }, props);
    },

    getInitialState() {
      return {
        scrollX: 0,
        scrollY: 0,
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
      var content = this.refs.content;
      var contentWidth, contentHeight;

      if (content = content.getDOMNode()) {
        contentWidth = content.clientWidth;
        contentHeight = content.clientHeight;
      }

      this.scroller.setDimensions(
        node.clientWidth,
        node.clientHeight,
        this.props.contentWidth || contentWidth || node.clientWidth,
        this.props.contentHeight || contentHeight || node.clientHeight
      );

      if (this.props.scrollSnap)
        this.scroller.setSnapSize(node.clientWidth, node.clientHeight);

      this.scroller.scrollTo(node.clientWidth, 0);
    },

    _handleScroll(x, y, z) {
      console.log('handle scroll', x, y)
      this.setState({
        scrollX: x,
        scrollY: y
      });
    }
  };
};

module.exports = Scrollable;
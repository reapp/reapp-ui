var React = require('react/addons');
var Component = require('../component');
var { Scroller } = require('reapp-scroller');
var TouchableArea = require('../helpers/TouchableArea');
var clone = require('../lib/niceClone');

module.exports = Component({
  name: 'Swiper',

  scrollerProps() {
    return Object.assign({
      bouncing: true,
      snapping: true,
      locking: true,
      paging: false,
      scrollingY: this.props.up || this.props.down || false,
      scrollingX: this.props.left || this.props.right || false
    }, this.props.scrollerProps);
  },

  propTypes: {
    up: React.PropTypes.bool,
    down: React.PropTypes.bool,
    left: React.PropTypes.bool,
    right: React.PropTypes.bool,

    // What to show above
    above: React.PropTypes.node,

    // What to show above
    below: React.PropTypes.node,

    // Where to limit swiping
    limit: React.PropTypes.number,

    // Swiper no swiping!
    noswiping: React.PropTypes.bool
  },

  getInitialState() {
    return {
      x: 0,
      y: 0
    };
  },

  componentWillMount() {
    this.scroller = this.props.scroller ||
      new Scroller(this.handleScroll, this.scrollerProps());
  },

  componentDidMount() {
    var { width, height, limit, up, down, left, right } = this.props;
    var vertical = up || down;
    var horizontal = left || right;

    width = width || this.refs.above.getDOMNode().clientWidth;
    height = height || this.refs.above.getDOMNode().clientHeight;

    if (limit) {
      this.scroller.setSnapSize(limit, limit);
      limit = width;
    }
    else {
      limit = width * 2;
    }

    this.scroller.setDimensions(
      width, height,
      width * (horizontal ? limit : 1),
      height * (vertical ? limit : 1)
    );
  },

  handleScroll(x, y) {
    var updateState = false;

    switch(this.props.edges) {
      case 'right':
        break;
    }

    console.log('set', x, y);
    this.setState({ x, y });
  },

  render() {
    var {
      above,
      below,
      noswiping,
      ...props } = this.props;

    return (
      <TouchableArea {...props} {...this.componentProps()} scroller={this.scroller}>
        <div {...this.componentProps('above')} style={{ left: -this.state.x, top: -this.state.y }}>
          {above}
        </div>
        <div {...this.componentProps('below')}>
          {below}
        </div>
      </TouchableArea>
    );
  }
});
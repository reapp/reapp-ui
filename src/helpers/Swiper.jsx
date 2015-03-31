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

    // pass props to the scroller
    scrollerProps: React.PropTypes.object,

    // what to show above
    children: React.PropTypes.node,

    // what to show below
    below: React.PropTypes.node,

    // where to limit swiping
    limit: React.PropTypes.number,

    // disable swiping (swiper no swiping!)
    noswiping: React.PropTypes.bool
  },

  componentWillMount() {
    this.scroller = this.props.scroller ||
      new Scroller(this.handleScroll, this.scrollerProps());
  },

  componentDidMount() {
    var { width, height, limit, up, down, left, right } = this.props;
    var vertical = up || down;
    var horizontal = left || right;

    var aboveNode = this.refs.above.getDOMNode().children[0];
    width = width || aboveNode.clientWidth;
    height = height || aboveNode.clientHeight;

    if (!limit) {
      var belowNode = this.refs.below.getDOMNode().children[0];
      limit = belowNode[vertical ? 'clientHeight' : 'clientWidth'];
    }

    this.scroller.setSnapSize(limit, limit);

    this.scroller.setDimensions(
      width, height,
      width + (horizontal ? limit : 0),
      height + (vertical ? limit : 0)
    );
  },

  handleScroll(x, y) {
    var updateState = false;

    if (this.props.noswiping)
      return;

    // TODO: handle other sides
    if (!this.props.left)
      x = Math.max(0, x);

    var above = this.refs.above.getDOMNode();
    above.style.left = -x + 'px';
    // style={{ left: , top: -this.state.y }}
  },

  render() {
    var {
      up,
      down,
      left,
      right,
      children,
      below,
      noswiping,
      ...props } = this.props;

    if (up)
      this.addStyles('below', 'up');

    if (right)
      this.addStyles('below', 'right');

    if (down)
      this.addStyles('below', 'down');

    if (left)
      this.addStyles('below', 'left');

    var touchableProps = {
      ignoreX: !left && !right,
      ignoreY: !up && !down
    };

    return (
      <TouchableArea {...props} {...touchableProps} {...this.componentProps()} scroller={this.scroller}>
        <div {...this.componentProps('above')}>
          {clone(children, props, true)}
        </div>
        <div {...this.componentProps('below')}>
          {below}
        </div>
      </TouchableArea>
    );
  }
});
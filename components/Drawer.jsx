var React = require('react');
var { Scroller } = require('scroller');
var Component = require('../component');
var TouchableArea = require('../helpers/TouchableArea');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var StaticContainer = require('../helpers/StaticContainer');
var DrawerBehavior = require('../behaviors/DrawerBehavior');

module.exports = Component({
  name: 'Drawer',

  propTypes: {
    behavior: React.PropTypes.object,
    translate: React.PropTypes.object,
    from: React.PropTypes.oneOf([
      'left', 'right', 'top', 'bottom'
    ]),
    closed: React.PropTypes.bool,
    touchableProps: React.PropTypes.object,
    onClose: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      behavior: DrawerBehavior,
      from: 'left',
      closed: false
    };
  },

  getInitialState() {
    return {
      offset: 0,
      closed: this.props.closed,
      externalScroller: !!this.props.scroller
    };
  },

  componentWillMount() {
    if (this.state.externalScroller)
      return;

    this.scroller = new Scroller(this.handleScroll, {
      bouncing: false,
      scrollingX: this.isSideDrawer(),
      scrollingY: !this.isSideDrawer(),
      snapping: true
    });
  },

  componentWillReceiveProps(nextProps) {
    // handle changing closed prop
    if (nextProps.closed !== this.props.closed)
      this.scrollTo(nextProps.closed ? 0 : 100, true);
  },

  componentDidMount() {
    this.measureAndPosition();
    window.addEventListener('resize', this.measureAndPosition);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.measureAndPosition);
  },

  getWidth() {
    return this.getDOMNode().clientWidth;
  },

  getHeight() {
    return this.getDOMNode().clientHeight;
  },

  measureScroller() {
    if (this.state.externalScroller)
      return;

    var width = this.getWidth();
    var height = this.getHeight();
    var totalWidth = width;
    var totalHeight = height;

    if (this.isSideDrawer())
      totalWidth = width * 2;
    else
      totalHeight = height * 2;

    this.scroller.setDimensions(width, height, totalWidth, totalHeight);
    this.scroller.setSnapSize(width, height);
  },

  measureAndPosition() {
    this.measureScroller();
    this.scrollTo(this.props.closed ? 100 : 0, false);
  },

  // handles scrolling to a percent
  scrollTo(percent, animated) {
    if (!this.scroller)
      return;

    var dec = percent * 0.01;

    if (this.isSideDrawer())
      this.scroller.scrollTo(dec * this.getDOMNode().clientWidth, 0, animated);
    else
      this.scroller.scrollTo(0, dec * this.getDOMNode().clientHeight, animated);
  },

  isSideDrawer() {
    return ['left', 'right'].filter(x => x === this.props.from).length;
  },

  isClosed() {
    return this.isSideDrawer() ?
      this.state.offset === this.getWidth() :
      this.state.offset === this.getHeight();
  },

  handleScroll(left, top) {
    var offset, transform;

    switch(this.props.from){
      case 'left':
      case 'right':
        offset = left;
        break;
      case 'top':
      case 'bottom':
        offset = top;
      break;
    }

    console.log('handle scroll', offset)

    this.setState({
      offset,
      closed: offset === 0
    });

    // onClose callback
    if (this.isClosed() && this.props.onClose)
      this.props.onClose();
  },

  getOppositeSide(from) {
    return { left: 'right', right: 'left', top: 'bottom', bottom: 'top' };
  },

  render() {
    var {
      from,
      behavior,
      translate,
      touchableProps,
      children,
      scroller,
      ...props
    } = this.props;

    var animatedProps = Object.assign({}, {
      translate: translate || behavior[from].translate(this.state.offset)
    }, this.props.animatedProps);

    this.addClass('closed', this.state.closed);
    this.addStyles(`from-${this.props.from}`);
    this.addStyles('dragger', `${this.props.from}Dragger`);

    // todo: use a constant for dragger width
    this.addStyles('dragger', {
      [this.getOppositeSide(from)]: this.state.closed ? -20 : 0
    });

    return (
      <AnimatableContainer {...this.componentProps()} {...animatedProps} {...props}>
        <div {...this.componentProps('inner')}>
          <TouchableArea
            {...this.componentProps('dragger')}
            {...touchableProps}
            scroller={scroller || this.scroller} />
          <StaticContainer shouldUpdate={this.state.offset === 0}>
            {children}
          </StaticContainer>
        </div>
      </AnimatableContainer>
    );
  }
});
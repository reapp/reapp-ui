var React = require('react/addons');
var Component = require('ui/component');
var { Scroller } = require('scroller');
var { Promise } = require('when');
var TouchableArea = require('../helpers/TouchableArea');
var CloneChildren = require('../lib/CloneChildren');

module.exports = Component('ViewList', {
  // we pass down step so elements nested inside the views
  // can access them for their own animations
  childContextTypes: {
    step: React.PropTypes.number
  },

  getChildContext() {
    return { step: this.state.step };
  },

  propTypes: {
    onTouchStart: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onViewEnter: React.PropTypes.func,
    onViewLeave: React.PropTypes.func,
  },

  getDefaultProps() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    return {
      width,
      height,
      noTitleBar: false,
      resizeWithWindow: true,
      initialStep: 0,
      animation: 'VIEW_PARALLAX',
      titleBarProps: {},
      scrollerProps: {
        animationDuration: 350,
        paging: true,
        bouncing: false,
        scrollingY: false
      },
      touchStartBounds: {
        // touchable only on the left and right edges
        x: [
          { from: 0, to: 10 },
          { from: width - 10, to: width }
        ]
      }
    };
  },

  getInitialState() {
    return {
      // We put children in state, to animate them out
      children: this.props.children,
      width: this.props.width,
      height: this.props.height,
      step: this.props.initialStep
    };
  },

  componentDidMount() {
    this.setupScroller(this.props);
    this.scroller.setPosition(this.state.step * this.state.width, 0);
    window.addEventListener('resize', this.setupDimensions);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.setupDimensions);
  },

  componentWillReceiveProps(nextProps) {
    // if not changing views
    if (nextProps.initialStep === this.props.initialStep)
      return this.setupScroller(nextProps);

    // if advancing views
    if (nextProps.initialStep > this.state.step) {
      this.setupScroller(nextProps);
      this.scrollToView(nextProps.initialStep);
    }
    // if regressing views
    else {
      this.scrollToView(nextProps.initialStep).then(() => {
        this.setupScroller(nextProps);
      });
    }
  },

  setupScroller(props) {
    var { width, height, children, scrollerProps } = props;
    children = children.filter(child => !!child);

    this.setupDimensions();
    this.setupViewEnterStates(children);
    this.scroller = new Scroller(this.handleScroll, scrollerProps);
    this.scroller.setSnapSize(width, height);
    this.scroller.setDimensions(width, height, width * children.length, height);
    this.setState({ children });
  },

  setupDimensions() {
    if (this.props.resizeWithWindow)
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight
      });
  },

  setupViewEnterStates(children) {
    this.visibleViews = children.map(v => false);
    this.visibleViews[0] = true;
  },

  // ignore first scroll event because scroller sucks
  ignoreScroll: true,

  handleScroll(left) {
    if (this.ignoreScroll) {
      this.ignoreScroll = !this.ignoreScroll;
      return;
    }

    // don't scroll if we only have one view
    if (this.state.children.length === 1 && this.state.step === 0)
      return;

    var step = this.state.width ? left / this.state.width : 0;
    this.setState({ step: step });
    this.runViewCallbacks(step);
  },

  runViewCallbacks(step) {
    if (step % 1 !== 0) {
      var newVisibleIndex = [ Math.floor(step), Math.ceil(step) ]
        .filter(i => !this.visibleViews[i])[0];

      if (newVisibleIndex >= 0) {
        this.visibleViews[newVisibleIndex] = true;
        this.callProperty('onViewEntering', newVisibleIndex);
      }
    }
    else {
      this.callProperty('onViewEntered', step);

      var prev = step-1;
      var next = step+1;

      if (this.visibleViews[prev]) {
        this.callProperty('onViewLeft', prev);
        this.visibleViews[prev] = false;
      }
      else if (this.visibleViews[next]) {
        this.callProperty('onViewLeft', next);
        this.visibleViews[next] = false;
      }
    }
  },

  callProperty(name) {
    if (this.props[name])
      this.props[name].apply(this, Array.prototype.slice.call(arguments, 1));
  },

  isOnStage(index) {
    return (
      (index >= this.state.step - 1) &&
      (index <= this.state.step + 1)
    );
  },

  handleTouchStart(e) {
    if (this.props.onTouchStart)
      this.props.onTouchStart(e);
  },

  handleTouchEnd(e) {
    if (this.props.onTouchEnd)
      this.props.onTouchEnd(e);
  },

  handleClick(e) {
    var hash = e.target.hash;
    if (!hash) return;

    var viewIndex = this.props.children.map(v => v.id).indexOf(hash.slice(1));

    if (viewIndex >= 0) {
      this.scrollToView(viewIndex);
      e.preventDefault();
    }
  },

  scrollToView(index) {
    this.scroller.scrollTo(this.state.width * index, 0, true);
    return new Promise(res => {
      setTimeout(res, this.props.scrollerProps.animationDuration);
    });
  },

  makeFakeTitleBar() {
    var titleBarStyles = this.getStylesForComponent('TitleBar');
    if (this.props.titleBarProps.height)
      titleBarStyles.push(this.makeReactStyle({ height: this.props.titleBarProps.height }));

    return <div className="ViewList__fakeTitleBar" styles={titleBarStyles} />;
  },

  render() {
    window.ViewList = this;
    var {
      after,
      before,
      touchStartBounds,
      children,
      animation,
      titleBarProps,
      noTitleBar,
      ...props
    } = this.props;

    if (!noTitleBar)
      titleBarProps.styles = { self: { background: 'none' } };

    var viewListProps = Object.assign({
      touchStartBounds,
      ignoreY: true,
      scroller: this.scroller,
      onTouchStart: this.handleTouchStart,
      onTouchEnd: this.handleTouchEnd,
      onClick: this.handleClick
    }, props);

    var clonedChildren = React.Children.map(this.state.children, (view, i) => {
      return React.isValidElement(view) && React.addons.cloneWithProps(view, {
        titleBarProps,
        animation,
        index: i,
        step: this.state.step,
        width: this.state.width,
      });
    });

    if (this.state.step === 0)
      this.addStyles(this.styles.underTouchable);

    return (
      <TouchableArea {...this.componentProps()} {...viewListProps}>
        {!noTitleBar && this.makeFakeTitleBar()}
        {before}
        {clonedChildren}
        {after}
      </TouchableArea>
    );
  }
});
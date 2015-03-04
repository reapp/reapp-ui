var React = require('react/addons');
var { Scroller } = require('reapp-scroller');
var DocumentTitle = require('react-document-title');
var Component = require('../component');
var TitleBar = require('../components/TitleBar');
var TouchableArea = require('../helpers/TouchableArea');
var clone = require('../lib/niceClone');

// ViewLists are the most complex piece of the UI kit.
// Their usage is simple, but they manage a lot of state,
// encompass many animations, and also need to know about multiple
// child components (see TitleBar, View, Icon)

module.exports = {
  propTypes: {
    scrollToStep: React.PropTypes.number,
    disableScroll: React.PropTypes.bool,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    onTouchStart: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onViewEntering: React.PropTypes.func,
    onViewEntered: React.PropTypes.func,
    onViewLeaving: React.PropTypes.func,
    onViewLeft: React.PropTypes.func,
    scrollerProps: React.PropTypes.object
  },

  getViewListInitialState() {
    return {
      // We put children in state, so when a parent removes a view
      // we can animate backwards, and then remove them from state
      children: this.props.children,
      width: this.props.width,
      height: this.props.height,
      step: this.props.scrollToStep || 0
    };
  },

  componentWillMount() {
    this.setAnimationState('viewList');
    this.scroller = new Scroller(this.handleScroll, this.props.scrollerProps);
    this.setupViewList(this.props);
  },

  componentDidMount() {
    this.setScrollPosition();
    this.setupDimensions();
    this.setTouchableAreaProps(this.props);
    this.runViewCallbacks(this.props.scrollToStep || this.state.step);
    window.addEventListener('resize', this.resize);
    this.didMount = true;
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  },

  componentWillReceiveProps(nextProps) {
    this.setTouchableAreaProps(nextProps)

    if (this.props.disableScroll !== nextProps.disableScroll) {
      if (nextProps.disableScroll)
        return this.disableAnimation();
      else
        this.enableAnimation();
    }

    if (this._isAnimating || !this.didMount)
      return;

    // new scrollToStep
    this.handleScrollToStep(nextProps);
  },

  // animates forward and backward depending
  handleScrollToStep(nextProps) {
    if (nextProps.scrollToStep === this.props.scrollToStep)
      return this.setupViewList(nextProps);

    // if advancing
    if (nextProps.scrollToStep >= this.state.step) {
      this.setupViewList(nextProps, () => {
        this.scrollToStep(nextProps.scrollToStep);
      });
    }
    else
      this.scrollToStep(nextProps.scrollToStep, () => {
        this.setupViewList(nextProps);
      });
  },

  // todo: this shouldn't need to do so much here
  // for now this fixes a bug where if you start with a step > 0
  setScrollPosition() {
    var step = this.state.step;

    this.scroller.setPosition(step * this.state.width, 0);
    this.scroller.scrollTo(step * this.state.width, 0, false);
    this.setState({ step  });
  },

  animationContext() {
    return {
      width: this.state.width
    };
  },

  // allow custom title bar heights
  getTitleBarHeight() {
    return this.props.titleBarProps.height || this.getConstant('titleBarHeight');
  },

  setupViewList(props, cb) {
    var { width, height, children } = props;
    this.setupViewEnterStates(children);

    if (!children || !children.length)
      return;

    children = children.filter(child => !!child);

    this.scroller.setSnapSize(width, height);
    this.scroller.setDimensions(width, height, width * children.length, height);

    if (this.isMounted())
      this.setState({ children });

    // for animating forwards
    if (cb) {
      if (!this.state.children[props.scrollToStep]) {
        this._advancingToIndex = props.scrollToStep;
        this._afterViewMounted = cb;
      }
      else
        cb();
    }
  },

  // used by scrollToStep to ensure we animate after mount
  handleViewMounted() {
    if (this._afterViewMounted)
      this._afterViewMounted();

    delete this._advancingToIndex;
    delete this._afterViewMounted;
  },

  // scrolls the viewList to a given step
  scrollToStep(step, cb) {
    if (step !== this.state.step) {
      this._isAnimating = true;
      this.scroller.scrollTo(this.state.width * step, 0, true);

      this.onViewEntered = () => {
        this.onViewEntered = null;
        this._isAnimating = false;
        if (cb) cb();
      };
    }
  },

  setupDimensions() {
    if (this.props.resizeWithWindow)
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight
      });
  },

  resize() {
    this.setupDimensions();
    this.setScrollPosition();
  },

  setupViewEnterStates(children) {
    if (!children || !children.length)
      this.visibleViews = [];
    else {
      this.visibleViews = new Array(children.length - 1);
      this.visibleViews[0] = true;
    }
  },

  // this is a hack, but the Scroller lib fires a scroll event that
  // results in not respecting the props.scrollToStep on mount
  // .... we need to improve the Scroller lib
  initialScrollEvent: true,

  // Called back from Scroller on each frame of scroll
  handleScroll(left) {
    if (!this.props.disableScroll) {
      if (this.initialScrollEvent)
        this.initialScrollEvent = false;
      else {
        var step = left / this.state.width;
        if (step !== this.state.step)
          this.setState({ step });
      }
    }
  },

  componentDidUpdate(_, prevState) {
    if (prevState.step !== this.state.step)
      this.runViewCallbacks(this.state.step);
  },

  runViewCallbacks(step) {
    if (step % 1 === 0) {
      this._hasCalledEnteringLeaving = false;

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
    else if (!this._hasCalledEnteringLeaving) {
      var entering, leaving;
      var floor = Math.floor(step);
      var ceil = Math.ceil(step);

      // if sliding forwards
      if (this.visibleViews[floor]) {
        entering = ceil;
        leaving = floor;
      }
      else {
        entering = floor;
        leaving = ceil;
      }

      this.visibleViews[entering] = true;
      this.callProperty('onViewEntering', entering);
      this.callProperty('onViewLeaving', leaving);
      this._hasCalledEnteringLeaving = true;
    }
  },

  callProperty(name, ...args) {
    setTimeout(() => {
      // apply to viewlist first
      if (this[name])
        this[name].apply(this, args);

      // then call any external
      if (this.props[name])
        this.props[name].apply(this, args);
    }, 80)
  },

  isOnStage(index) {
    return (
      (index >= this.state.step - 1) &&
      (index <= this.state.step + 1)
    );
  },

  getTitleBarProps() {
    return this.props.noFakeTitleBar ?
      this.props.titleBarProps :
      Object.assign({ transparent: true }, this.props.titleBarProps);
  },

  getViewAnimations(view) {
    return view && view.props.animations ?
      Object.assign(this.props.viewAnimations, view.props.animations) :
      this.props.viewAnimations;
  },

  setTouchableAreaProps(props) {
    this._touchableAreaProps = this.getTouchableAreaProps(props);
  },

  getTouchableAreaProps(props) {
    return props.disableScroll ?
      {
        untouchable: true
      } :
      Object.assign({
        ignoreY: true,
        scroller: this.scroller
      },
      props.touchableAreaProps,
      {
        touchStartBoundsX: props.touchStartBoundsX,
        touchStartBoundsY: this.getTouchStartBoundsY(),
        untouchable: (
          props.touchableAreaProps && props.touchableAreaProps.untouchable ||
          props.disableScroll
        )
      });
    },

  getTouchStartBoundsY() {
    return this.props.touchStartBoundsY || {
      from: this.getTitleBarHeight(),
      to: this.props.height
    };
  },

  getViewList(props) {
    var { touchableProps } = props || {};
    var activeTitle;

    this.setAnimationState('viewList');

    return (
      <TouchableArea {...this._touchableAreaProps} {...touchableProps}>
        {!this.props.noFakeTitleBar && (
          <TitleBar {...this.props.titleBarProps} animations={{}} />
        )}

        {clone(this.state.children, (child, i) => {
          var active = i === this.state.step;
          if (active)
            activeTitle = child.props && child.props.title;

          return Object.assign({
            ref: i,
            key: i,
            index: i,
            inactive: i !== this.state.step,
            animationState: {
              viewList: {
                index: i,
                step: this.state.step
              }
            },
            titleBarProps: this.getTitleBarProps(),
            isInViewList: true,
            animations: this.getViewAnimations(child),
            width: this.state.width,
            height: this.state.height,
            viewListScrollToStep: this.scrollToStep
          }, i === this._advancingToIndex && {
            onComponentMounted: this.handleViewMounted
          },
          this.getViewProps && this.getViewProps());
        }, true)}

        {activeTitle &&
          <DocumentTitle title={Array.isArray(activeTitle) ?
            activeTitle[1] :
            activeTitle} />}
      </TouchableArea>
    );
  }
};
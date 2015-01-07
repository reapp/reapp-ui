var React = require('react/addons');
var { Scroller } = require('scroller');
var Component = require('../component');
var TitleBar = require('../components/TitleBar');
var TouchableArea = require('../helpers/TouchableArea');
var Animated = require('../mixins/Animated');
var clone = require('../lib/niceClone');

// ViewLists are, so far, the most complex piece of the UI kit
// Their usage is simple, but they manage a lot of state,
// encompass many animations, and also need to know about multiple
// children components (see TitleBar, View, Icon)

module.exports = {
  propTypes: {
    onTouchStart: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onViewEntering: React.PropTypes.func,
    onViewEntered: React.PropTypes.func,
    onViewLeaving: React.PropTypes.func,
    onViewLeft: React.PropTypes.func,
  },

  getViewListInitialState(state) {
    return Object.assign({
      // We put children in state, so when a parent removes a view
      // we can animate backwards, and then remove them from state
      children: this.props.children,
      width: this.props.width,
      height: this.props.height,
      step: this.props.scrollToStep
    }, state || {});
  },

  componentWillMount() {
    if (this.props.scrollToStep !== this.state.step)
      this.setState({ step: this.props.scrollToStep });
  },

  componentDidMount() {
    this.scroller = new Scroller(this.handleScroll, this.props.scrollerProps);
    this.setupViewList(this.props);
    this.scrollToStep(this.state.step);
    this.runViewCallbacks();
    window.addEventListener('resize', this.resize);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  },

  // ensure proper animation/update order
  componentWillReceiveProps(nextProps) {
    if (this._isAnimating || nextProps.disable)
      return;

    // if new scroll position
    if (nextProps.scrollToStep !== this.props.scrollToStep) {
      // if advancing views or remaining the same
      if (nextProps.scrollToStep >= this.state.step) {
        this.setupViewList(nextProps);
        // setTimeout to push until after next render, hopefully
        setTimeout(() => this.scrollToStep(nextProps.scrollToStep), 5);
      }
      // if regressing views
      else {
        this.scrollToStep(nextProps.scrollToStep).then(() => {
          this.setupViewList(nextProps);
        });
      }
    }
    // else no new scroll position
    else {
      this.setupViewList(nextProps);
    }
  },

  setScrollPosition() {
    this.scroller.setPosition(this.state.step * this.state.width, 0);
  },

  animationContext() {
    return {
      width: this.state.width
    };
  },

  getTitleBarHeight() {
    return this.props.titleBarProps.height || this.getConstant('titleBarHeight');
  },

  setupViewList(props) {
    var { width, height, children } = props;
    children = children.filter(child => !!child);

    // default to not allowing swipes on the titlebar
    props.touchStartBoundsY = props.touchStartBoundsY || {
      from: this.getTitleBarHeight(),
      to: this.props.height
    };

    this.setupDimensions();
    this.setupViewEnterStates(children);
    this.scroller.setSnapSize(width, height);
    this.scroller.setDimensions(width, height, width * children.length, height);
    this.setState({ children });
  },

  // scrolls the viewList to a given step
  scrollToStep(step) {
    this._isAnimating = true;
    var duration = 0;

    if (step !== this.state.step) {
      this.scroller.scrollTo(this.state.width * step, 0, true);
      duration = this.props.scrollerProps.animationDuration;
    }

    return new Promise(res => setTimeout(() => {
      this._isAnimating = false;
      res(); // promise fulfilled
    }, duration));
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
    this.visibleViews = children.map(v => false);
    this.visibleViews[0] = true;
  },

  // ignore first scroll event because scroller sucks
  ignoreScroll: true,

  // this is called back from Scroller, each time the user scrolls
  handleScroll(left) {
    if (this.ignoreScroll) {
      this.ignoreScroll = !this.ignoreScroll;
      return;
    }

    // disabled
    if (this.props.disable)
      return;

    // don't scroll if we only have one view
    if (this.state.children.length === 1 && this.state.step === 0)
      return;

    var step = this.state.width ? left / this.state.width : 0;

    if (step !== this.state.step) {
      this.setState({ step });
      this.runViewCallbacks(step);
    }
  },

  runViewCallbacks(step) {
    step = step || this.state.step;

    if (step % 1 !== 0) {
      if (this._hasCalledEnteringLeaving)
        return;

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
      this.callProperty('onViewEntering', ceil);
      this.callProperty('onViewLeaving', floor);
      this._hasCalledEnteringLeaving = true;
    }
    else {
      // set this to false to reset entering/leaving callbacks for next drag
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
  },

  callProperty(name) {
    var args = Array.prototype.slice.call(arguments, 1);

    // apply to viewlist first
    if (this[name])
      this[name].apply(this, args);

    // then call any external
    if (this.props[name])
      this.props[name].apply(this, args);
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

    // this logic is for handling button presses that link to #${id}
    var step = this.props.children.map(v => v.id).indexOf(hash.slice(1));
    if (step >= 0) {
      this.scrollToStep(step);
      e.preventDefault();
    }
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

  getViewList(extraProps) {
    // pushes state to a store for child use
    // in the future this can be done with contexts
    if (!this.props.disable)
      this.setAnimationState('viewList');

    var touchableAreaProps = Object.assign({
        ignoreY: true,
        scroller: this.scroller
      },
      this.props.touchableAreaProps,
      {
        touchStartBoundsX: this.props.touchStartBoundsX,
        touchStartBoundsY: this.props.touchStartBoundsY,
        onTouchStart: this.handleTouchStart,
        onTouchEnd: this.handleTouchEnd,
        onClick: this.handleClick,
        untouchable: (
          this.props.touchableAreaProps && this.props.touchableAreaProps.untouchable ||
          this.props.disable
        )
      }
    );

    return (
      <TouchableArea {...touchableAreaProps} {...extraProps}>
        {!this.props.noFakeTitleBar && (
          <TitleBar {...this.props.titleBarProps} animations={false} />
        )}
        {this.props.before}
        {clone(this.state.children, (child, i) => {
          return {
            key: i,
            index: i,
            viewList: { index: i },
            titleBarProps: this.getTitleBarProps(),
            animations: this.getViewAnimations(child),
            width: this.state.width,
            height: this.state.height
          };
        }, true)}
        {this.props.after}
      </TouchableArea>
    );
  }
};
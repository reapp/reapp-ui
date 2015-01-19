var React = require('react/addons');
var { Scroller } = require('scroller');
var DocumentTitle = require('react-document-title');
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

  componentDidMount() {
    this.scroller = new Scroller(this.handleScroll, this.props.scrollerProps);
    this.setScrollPosition();
    this.setupViewList(this.props);
    this.runViewCallbacks();
    window.addEventListener('resize', this.resize);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  },

  // ensure proper animation/update order
  componentWillReceiveProps(nextProps) {
    if (this._isAnimating || nextProps.disableScroll)
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

  // todo: this shouldn't need to do so much here
  // for now this fixes a bug where if you start with a step > 0
  setScrollPosition() {
    var step = this.state.step;

    // setTimeout because we are fighting Scroller
    setTimeout(() => {
      this.scroller.setPosition(step * this.state.width, 0);
      this.scroller.scrollTo(step * this.state.width, 0, false);
      this.setState({ step  });
    });
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

  disableInitialScrollEvent: true,

  // this is called back from Scroller, each time the user scrolls
  handleScroll(left) {
    // this is a hack, but the Scroller lib fires a scroll event that
    // results in not respecting the props.scrollToStep on mount
    // need a better Scroller lib
    if (this.disableInitialScrollEvent) {
      this.disableInitialScrollEvent = false;
      return;
    }

    // disabled
    if (this.props.disableScroll)
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
    if (!this.props.disableScroll)
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
          this.props.disableScroll
        )
      }
    );

    var activeTitle;

    return (
      <TouchableArea {...touchableAreaProps} {...extraProps}>
        {!this.props.noFakeTitleBar && (
          <TitleBar {...this.props.titleBarProps} animations={{}} />
        )}

        {this.props.before}

        {clone(this.state.children, (child, i) => {
          if (i === this.state.step)
            activeTitle = child.props && child.props.title;

          return {
            key: i,
            index: i,
            viewList: { index: i },
            titleBarProps: this.getTitleBarProps(),
            animations: this.getViewAnimations(child),
            width: this.state.width,
            height: this.state.height,
            viewListScrollToStep: this.scrollToStep
          };
        }, true)}

        {activeTitle &&
          <DocumentTitle title={Array.isArray(activeTitle) ?
            activeTitle[1] :
            activeTitle} />}

        {this.props.after}
      </TouchableArea>
    );
  }
};
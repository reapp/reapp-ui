var React = require('react/addons');
var { Scroller } = require('reapp-scroller');
var Component = require('../component');
var TitleBar = require('../components/TitleBar');
var TouchableArea = require('../helpers/TouchableArea');
var Animator = require('../lib/Animator');
var clone = require('../lib/niceClone');

// ViewLists are the most complex piece of the UI kit.
// Their usage is simple, but they manage a lot of state,
// encompass many animations, and also need to know about multiple
// child components (see TitleBar, View, Button, Icon)

module.exports = Object.assign(
  Animator('viewList', ['width', 'height']),

  {
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
      this.setupBeforeMount(this.props);
    },

    componentDidMount() {
      this.setScrollPosition();
      this.setupAfterMount(this.props);
    },

    setupBeforeMount(props, cb) {
      this.scroller = new Scroller(this.handleScroll, props.scrollerProps);
      this.setupViewList(props, cb);
    },

    setupAfterMount(props) {
      this.setupDimensions(props);
      this.setTouchableAreaProps(props);
      this.runViewCallbacks(props.scrollToStep || this.state.step);
      window.addEventListener('resize', this.resize);
      this.didMount = true;
    },

    componentWillUnmount() {
      window.removeEventListener('resize', this.resize);
    },

    componentWillReceiveProps(nextProps) {
      // if changing type of viewlist
      if (nextProps.name !== this.props.name) {
        var step = this.state.step; //this.props.scrollToStep;
        delete this.scroller;
        return this.setupBeforeMount(nextProps, () => {
          this.setupAfterMount(nextProps);
          this.setTouchableAreaProps(nextProps);
          this.handleScrollToStep(step, nextProps);
        });
      }

      this.setTouchableAreaProps(nextProps);

      if (this.props.disableScroll !== nextProps.disableScroll) {
        if (nextProps.disableScroll)
          return this.disableAnimation();
        else
          this.enableAnimation();
      }

      if (this._isAnimating || !this.didMount)
        return;

      // new scrollToStep
      this.handleScrollToStep(this.props.scrollToStep, nextProps);
    },

    // animates forward and backward depending
    handleScrollToStep(step, nextProps) {
      if (nextProps.scrollToStep === step)
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
      var isVertical = this.props.vertical;
      var left = !isVertical ? step * this.state.width : 0;
      var top = isVertical ? step * this.state.height : 0;

      this.scroller.setPosition(left, top);
      this.scroller.scrollTo(left, top, false);
      this.setState({ step  });
    },

    animationContext() {
      return {
        height: this.state.height,
        width: this.state.width
      };
    },

    // allow custom title bar heights
    getTitleBarHeight() {
      return (
        this.props.titlebarProps && typeof this.props.titlebarProps.height === 'number' ?
          this.props.titleBarProps.height :
          this.getConstant('titleBarHeight')
      );
    },

    setupViewList(props, cb) {
      var { width, height, children } = props;
      this.setupViewEnterStates(children);

      if (!children || !children.length)
        return;

      children = children.filter(child => !!child);

      this.scroller.setSnapSize(width, height);

      var isVertical = this.props.vertical;
      var fullWidth = isVertical ? width : width * children.length;
      var fullHeight = isVertical ? height * children.length : height;

      this.scroller.setDimensions(width, height, fullWidth, fullHeight);

      if (this.isMounted())
        this.setState({ children });

      // for animating forwards
      if (cb) {
        // if no child is there, we want to wait for it to mount
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

        var isVertical = !!this.props.vertical;

        this.scroller.scrollTo(
          !isVertical ? this.state.width * step : 0,
          isVertical ? this.state.height * step : 0,
          true
        );

        this.onViewEntered = () => {
          this.onViewEntered = null;
          this._isAnimating = false;
          if (typeof cb === 'function') cb();
        };
      }
    },

    setupDimensions(props) {
      if (props.resizeWithWindow)
        this.setState({
          width: window.innerWidth,
          height: window.innerHeight
        });
    },

    resize() {
      this.setupDimensions(this.props);
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
    ignoreNextScrollEvent: true,

    // Called back from Scroller on each frame of scroll
    handleScroll(left, top) {
      if (!this.props.disableScroll) {
        if (this.ignoreNextScrollEvent)
          this.ignoreNextScrollEvent = false;
        else {
          var step;

          if (this.props.vertical)
            step = top / this.state.height;
          else
            step = left / this.state.width;

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
      });
    },

    isOnStage(index) {
      return (
        (index >= this.state.step - 1) &&
        (index <= this.state.step + 1)
      );
    },

    getTitleBarProps() {
      return Object.assign({
        transparent: !this.props.noFakeTitleBar,
        animationSource: 'viewList'
      }, this.props.titleBarProps);
    },

    getViewAnimations(view) {
      return view && view.props.animations ?
        Object.assign({}, this.props.viewAnimations, view.props.animations) :
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
        (props.touchStartBoundsX || props.touchStartBoundsY) && {
          touchStartBoundsX: props.touchStartBoundsX,
          touchStartBoundsY: this.getTouchStartBoundsY()
        },
        {
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
      var activeTitle;
      var titleBarProps = this.getTitleBarProps();

      return (
        <TouchableArea {...this._touchableAreaProps} {...props}>
          {!this.props.noFakeTitleBar && (
            <TitleBar {...this.props.titleBarProps} animations={{}} />
          )}

          {clone(this.state.children, (child, i) => {
            if (!child) return;

            return Object.assign({
              key: i,
              index: i,
              titleBarProps,
              inactive: i !== this.state.step,
              isInViewList: true,
              animations: this.getViewAnimations(child),
              animationSource: 'viewList',
              viewListScrollToStep: this.scrollToStep
            }, i === this._advancingToIndex && {
              onComponentMounted: this.handleViewMounted
            },
            this.props.viewProps,
            this.getViewProps && this.getViewProps());
          }, true)}
        </TouchableArea>
      );
    }
  }
);
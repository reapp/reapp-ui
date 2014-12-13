var React = require('react/addons');
var Component = require('ui/component');
var { Scroller } = require('scroller');
var { Promise } = require('bluebird');
var TitleBar = require('ui/components/TitleBar');
var TouchableArea = require('../helpers/TouchableArea');
var CloneChildren = require('../lib/CloneChildren');
var Animator = require('../lib/mixins/Animator');

module.exports = Component({
  name: 'ViewList',

  mixins: [
    Animator
  ],

  propTypes: {
    onTouchStart: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onViewEntered: React.PropTypes.func,
    onViewEntering: React.PropTypes.func,
    onViewLeaving: React.PropTypes.func,
    onViewLeft: React.PropTypes.func,
  },

  getDefaultProps() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    return {
      disable: false,
      width,
      height,
      noFakeTitleBar: false,
      resizeWithWindow: true,
      scrollToStep: 0,
      animations: [
       { name: 'viewParallax', source: 'viewList' }
      ],
      titleBarProps: {},
      scrollerProps: {
        animationDuration: 400,
        paging: true,
        bouncing: false,
        scrollingY: false
      },
      // touchable only on the left and right edges
      touchStartBoundsX: [
        { from: 0, to: 20 },
        { from: width - 20, to: width }
      ]
    };
  },

  getInitialState() {
    return {
      // We put children in state, to animate them out
      children: this.props.children,
      width: this.props.width,
      height: this.props.height,
      step: this.props.scrollToStep
    };
  },

  componentDidMount() {
    this.doAnimate();
    this.scroller = new Scroller(this.handleScroll, this.props.scrollerProps);
    this.setupViewList(this.props);
    this.setScrollPosition();
    window.addEventListener('resize', this.resize);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  },

  componentWillMount() {
    if (this.props.disable)
      this.disableAnimation();
  },

  // needs to ensure it animates, then updates children views in state
  componentWillReceiveProps(nextProps) {
    if (nextProps.disable)
      this.disableAnimation();
    else
      this.enableAnimation();

    // if advancing views or remaining the same
    if (nextProps.scrollToStep >= this.state.step) {
      this.setupViewList(nextProps);
      this.scrollToStep(nextProps.scrollToStep);
    }
    // if regressing views
    else {
      this.scrollToStep(nextProps.scrollToStep).then(() => {
        this.setupViewList(nextProps);
      });
    }
  },

  setScrollPosition() {
    this.scroller.setPosition(this.state.step * this.state.width, 0);
  },

  getTitleBarHeight() {
    return this.props.titleBarProps.height || this.getConstant('titleBarHeight');
  },

  setupViewList(props) {
    var { width, height, children } = props;
    children = children.filter(child => !!child);

    // set default titlebar height
    // props.titleBarProps.height = this.getTitleBarHeight();

    // default to not allowing swipes on the titlebar
    props.touchStartBoundsY = props.touchStartBoundsY || {
      from: this.getTitleBarHeight(),
      to: window.innerHeight
    };

    this.setupDimensions();
    this.setupViewEnterStates(children);
    this.scroller.setSnapSize(width, height);
    this.scroller.setDimensions(width, height, width * children.length, height);
    this.setState({ children });
  },

  scrollToStep(step) {
    var duration = 0;

    if (step !== this.state.step) {
      this.scroller.scrollTo(this.state.width * step, 0, true);
      duration = this.props.scrollerProps.animationDuration;
    }

    return new Promise(res => setTimeout(res, duration));
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

  handleScroll(left) {
    if (this.ignoreScroll) {
      this.ignoreScroll = !this.ignoreScroll;
      return;
    }

    // don't scroll if we only have one view
    if (this.state.children.length === 1 && this.state.step === 0)
      return;

    var step = this.state.width ? left / this.state.width : 0;

    if (step !== this.state.step) {
      this.setState({ step });
      this.doAnimate();
      this.runViewCallbacks(step);
    }
  },

  runViewCallbacks(step) {
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

    // this logic is for handling button presses that link to #${id}
    var step = this.props.children.map(v => v.id).indexOf(hash.slice(1));
    if (step >= 0) {
      this.scrollToStep(step);
      e.preventDefault();
    }
  },

  doAnimate() {
    if (!this.props.disable)
      this.runAnimation('viewList', {
        step: this.state.step,
        width: this.state.width
      });
  },

  render() {
    var {
      after,
      before,
      children,
      animations,
      titleBarProps,
      noFakeTitleBar,
      ...props
    } = this.props;

    // animate on the final step
    if (this.state.step % 1 === 0)
      this.doAnimate();

    var fakeTitleBar = !noFakeTitleBar && (
      <TitleBar {...titleBarProps} animations={[]} />
    );

    if (!noFakeTitleBar)
      Object.assign(titleBarProps, { transparent: true });

    var viewListProps = Object.assign({
      ignoreY: true,
      scroller: this.scroller,
      onTouchStart: this.handleTouchStart,
      onTouchEnd: this.handleTouchEnd,
      onClick: this.handleClick
    }, props);

    if (this.state.step === 0)
      this.addStyles(this.styles.underTouchable);

    return (
      <div {...this.componentProps()}>
        <TouchableArea {...viewListProps}>
          {!noFakeTitleBar && fakeTitleBar}
          {before}
          {Component.clone(this.state.children, (child, i) => ({
            titleBarProps,
            key: i,
            index: i,
            animations,
            animateProps: {
              viewList: { index: i }
            },
            width: this.state.width,
            height: this.state.height,
          }))}
          {after}
        </TouchableArea>
      </div>
    );
  }
});
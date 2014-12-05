var React = require('react/addons');
var ViewComponent = require('ui/viewcomponent');
var { Scroller } = require('scroller');
var { Promise } = require('when');
var TitleBar = require('ui/components/TitleBar');
var TouchableArea = require('../helpers/TouchableArea');
var CloneChildren = require('../lib/CloneChildren');

module.exports = ViewComponent('ViewList', {
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
      noFakeTitleBar: false,
      resizeWithWindow: true,
      initialStep: 0,
      animation: 'VIEW_PARALLAX',
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
      step: this.props.initialStep
    };
  },

  componentDidMount() {
    this.scroller = new Scroller(this.handleScroll, this.props.scrollerProps);
    this.setupViewList(this.props);
    this.scroller.setPosition(this.state.step * this.state.width, 0);
    window.addEventListener('resize', this.setupDimensions);
  },

  componentWillUnmount() {
    delete this.scroller; // just in case?
    window.removeEventListener('resize', this.setupDimensions);
  },

  componentWillReceiveProps(nextProps) {
    // if not changing views
    if (nextProps.initialStep === this.props.initialStep)
      return this.setupViewList(nextProps);

    // if advancing views
    if (nextProps.initialStep > this.state.step) {
      this.setupViewList(nextProps);
      this.scrollToStep(nextProps.initialStep);
    }
    // if regressing views
    else {
      this.scrollToStep(nextProps.initialStep).then(() => {
        this.setupViewList(nextProps);
      });
    }
  },

  scrollToStep(step) {
    var duration = 0;

    if (step !== this.state.step) {
      this.scroller.scrollTo(this.state.width * step, 0, true);
      duration = this.props.scrollerProps.animationDuration;
    }

    return new Promise(res => setTimeout(res, duration));
  },

  setupViewList(props) {
    var { width, height, children } = props;
    children = children.filter(child => !!child);

    if (!props.titleBarProps.height)
      props.titleBarProps.height = this.getConstant('titleBarHeight');

    this.setupDimensions();
    this.setupViewEnterStates(children);
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

    if (step !== this.state.step) {
      this.setState({ step });
      this.runViewCallbacks(step);
    }
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

    // this logic is for handling button presses that link to #${id}
    var step = this.props.children.map(v => v.id).indexOf(hash.slice(1));
    if (step >= 0) {
      this.scrollToStep(step);
      e.preventDefault();
    }
  },

  render() {
    window.ViewList = this;
    var {
      after,
      before,
      children,
      animation,
      titleBarProps,
      noFakeTitleBar,
      ...props
    } = this.props;

    if (!noFakeTitleBar) {
      var fakeTitleBar = <TitleBar {...titleBarProps} />;
      var childTitleBarProps = Object.assign({ transparent: true }, titleBarProps);
    }

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
      <TouchableArea {...this.componentProps()} {...viewListProps} stopPropagation>
        {!noFakeTitleBar && fakeTitleBar}
        {before}
        {React.Children.map(this.state.children, (view, i) => {
          return React.isValidElement(view) && React.addons.cloneWithProps(view, {
            titleBarProps: childTitleBarProps,
            animation,
            index: i,
            key: i,
            step: this.state.step,
            width: this.state.width,
            height: this.state.height,
          });
        })}
        {after}
      </TouchableArea>
    );
  }
});
var React = require('react/addons');
var Component = require('ui/component');
var { Scroller } = require('scroller');
var TouchableArea = require('../helpers/TouchableArea');

module.exports = Component({
  name: 'CardList',

  // todo
  childContextTypes: {
    step: React.PropTypes.number
  },

  getChildContext() {
    return { step: this.state.step };
  },

  getDefaultProps() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    return {
      initialStep: 0,
      cardProps: {},
      scrollerProps: {
        animationDuration: 400,
        paging: false,
        bouncing: true,
        scrollingX: false
      }
    };
  },

  getInitialState() {
    return {
      step: this.props.initialStep,
      width: window.innerWidth,
      height: window.innerHeight * 10
    };
  },

  componentDidMount() {
    this.scroller = new Scroller(this.handleScroll, this.props.scrollerProps);
    this.scroller.setPosition(this.state.step * this.state.width, 0);
  },

  componentWillReceiveProps(nextProps) {
    // if not changing views
    if (nextProps.initialStep === this.props.initialStep)
      return this.setupCardList(nextProps);

    // if advancing views
    if (nextProps.initialStep > this.state.step) {
      this.setupCardList(nextProps);
      this.scrollToStep(nextProps.initialStep);
    }
    // if regressing views
    else {
      this.scrollToStep(nextProps.initialStep).then(() => {
        this.setupCardList(nextProps);
      });
    }
  },

  scrollToStep(step) {
    var duration = 0;

    if (step !== this.state.step) {
      // todo: fetch card heights?
      this.scroller.scrollTo(this.state.width * step, 0, true);
      duration = this.props.scrollerProps.animationDuration;
    }

    return new Promise(res => setTimeout(res, duration));
  },

  setupCardList(props) {
    var { width, height, children } = props;
    children = children.filter(child => !!child);

    this.scroller.setSnapSize(width, height);
    this.scroller.setDimensions(width, height, width * children.length, height);
  },

  handleScroll(left) {
    // don't scroll if we only have one view
    if (this.props.children.length === 1 && this.state.step === 0)
      return;

    var step = this.state.width ? left / this.state.width : 0;

    if (step !== this.state.step) {
      this.setState({ step });
    }
  },

  render() {
    var {
      children,
      animation,
      cardProps,
      ...props
    } = this.props;

    var cardListProps = Object.assign({
      ignoreX: true,
      scroller: this.scroller
    }, props);

    return (
      <TouchableArea {...this.componentProps()} {...cardListProps}>
        {React.Children.map(children, (card, i) => {
          return React.isValidElement(card) && React.addons.cloneWithProps(card, {
            cardProps: cardProps,
            animation,
            index: i,
            step: this.state.step
          });
        })}
      </TouchableArea>
    );
  }
});
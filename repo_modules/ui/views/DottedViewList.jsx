var Component = require('ui/component');
var ViewList = require('./ViewList');
var Dots = require('../components/Dots');

module.exports = Component('DottedViewList', {
  getDefaultProps() {
    return {
      animation: 'VIEW_SIDE_BY_SIDE',
      titleBarProps: {
        height: 48,
        styles: {
          mid: {
            position: 'relative',
            top: -4
          }
        }
      },
      touchStartBounds: {
        // everything but the left edge
        x: {
          from: 20,
          to: window.innerWidth
        }
      }
    };
  },

  getInitialState() {
    return { activeViewIndex: 0 };
  },

  componentWillMount() {
    this.wrapOnViewEnteredCallback(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this.wrapOnViewEnteredCallback(nextProps);
  },

  wrapOnViewEnteredCallback(props) {
    var viewEnteredCallback = props.onViewEntered;
    this.props.onViewEntered = (index) => {
      if (viewEnteredCallback)
        viewEnteredCallback(index);

      if (this.state.activeViewIndex !== index)
        this.setState({ activeViewIndex: index });
    };
  },

  render() {
    return (
      <ViewList
        {...this.componentProps()}
        {...this.props}
        initialStep={this.state.activeViewIndex}
        after={(
          <Dots
            total={this.props.children.length}
            active={this.state.activeViewIndex}
            styles={this.getStyles('dots')} />
        )} />
    );
  }
});
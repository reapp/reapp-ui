var Component = require('ui/component');
var ViewList = require('./ViewList');
var Dots = require('../components/Dots');

module.exports = Component('DottedViewList', {
  getDefaultProps() {
    return {
      transform: 'VIEW_SIDE_BY_SIDE',
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
          from: 10,
          to: window.innerWidth
        }
      }
    };
  },

  getInitialState() {
    return { activeViewIndex: 0 };
  },

  render() {
    var viewEntered = this.props.onViewEntered;
    this.props.onViewEntered = (index) => {
      if (viewEntered)
        viewEntered(index);
      if (this.state.activeViewIndex !== index)
        this.setState({ activeViewIndex: index });
    };

    return (
      <ViewList
        {...this.componentProps()}
        {...this.props}
        after={(
          <Dots
            total={this.props.children.length}
            active={this.state.activeViewIndex}
            styles={this.getStyles('dots')} />
        )} />
    );
  }
});
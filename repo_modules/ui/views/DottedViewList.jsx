var Component = require('ui/component');
var ViewList = require('./ViewList');
var Dots = require('../components/Dots');

module.exports = Component('DottedViewList', {
  getInitialState() {
    return { activeViewIndex: 0 };
  },

  render() {
    var width = this.props.width || window.innerWidth;
    var dottedViewProps = Object.assign({
      titleBarProps: {
        height: 48,
        styles: {
          mid: {
            position: 'relative',
            top: -4
          }
        }
      },
      width: width,
      transform: 'VIEW_SIDE_BY_SIDE',
      touchStartBounds: {
        x: {
          from: 10, // exclude left edge
          to: width
        }
      }
    }, this.props);

    var viewEntered = dottedViewProps.onViewEntered;
    dottedViewProps.onViewEntered = (index) => {
      if (viewEntered) viewEntered(index);
      if (this.state.activeViewIndex !== index)
        this.setState({ activeViewIndex: index });
    };

    var dots = (
      <Dots
        total={this.props.views.length}
        active={this.state.activeViewIndex}
        styles={this.getStyles('dots')} />
    );

    return (
      <ViewList {...this.componentProps()} {...dottedViewProps} after={dots} />
    );
  }
});
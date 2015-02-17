var React = require('react');
var Component = require('../component');
var ViewListMixin = require('../mixins/ViewListMixin');
var Dots = require('../components/Dots');

module.exports = Component({
  name: 'DottedViewList',

  mixins: [
    ViewListMixin
  ],

  getDefaultProps() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      resizeWithWindow: true,
      scrollToStep: 0,
      scrollerProps: {
        animationDuration: 500,
        paging: true,
        bouncing: false,
        scrollingY: false
      },
      viewAnimations: {
        inner: 'viewSideBySide'
      },
      titleBarProps: {
        height: 48,
        styles: {
          mid: {
            position: 'relative',
            top: -4
          }
        }
      },
      touchStartBoundsX: {
        from: 20,
        to: window.innerWidth
      }
    };
  },

  getInitialState() {
    return Object.assign(
      this.getViewListInitialState(),
      {
        activeViewIndex: 0
      }
    );
  },

  onViewEntered(index) {
    if (this.state.activeViewIndex !== index)
      this.setState({ activeViewIndex: index });
  },

  render() {
    return (
      <div>
        {this.getViewList()}
        <Dots
          total={this.props.children.length}
          active={this.state.activeViewIndex}
          styles={this.getStyles('dots')}
          {...this.props.dotProps}
        />
      </div>
    );
  }
});
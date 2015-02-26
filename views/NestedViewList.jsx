var React = require('react');
var Component = require('../component');
var ViewListMixin = require('../mixins/ViewListMixin');

module.exports = Component({
  name: 'NestedViewList',

  mixins: [
    ViewListMixin
  ],

  getInitialState() {
    return this.getViewListInitialState();
  },

  getDefaultProps() {
    // var edgeWidth = UI.getConstants('edgeWidth');
    var edgeWidth = 44;

    return {
      width: window.innerWidth,
      height: window.innerHeight,
      resizeWithWindow: true,
      scrollToStep: 0,
      titleBarProps: {
        animations: {
          self: 'fadeToLeft'
        }
      },
      scrollerProps: {
        animationDuration: 500,
        paging: true,
        bouncing: false,
        easing: 'cubic'
      },
      viewAnimations: {
        inner: 'viewParallax',
        overlay: 'nestedViewOverlay'
      },
      // touchable only on the left and right edges
      touchStartBoundsX: [
        { from: 0, to: edgeWidth },
        { from: window.innerWidth - edgeWidth, to: window.innerWidth }
      ],
      // only touchable on right edge at first step
      touchStartBoundsXFirstStep: {
        from: window.innerWidth - edgeWidth,
        to: window.innerWidth
      }
    };
  },

  getViewProps() {
    return {
      styles: {
        inner: {
          boxShadow: this.isAnimating() ? '0 0 15px rgba(0,0,0,0.2)' : 'none'
        }
      }
    };
  },

  render() {
    var touchableProps = {};

    // only enable right side touching if on first view
    if (this.state.step === 0)
      touchableProps.touchStartBoundsX = this.props.touchStartBoundsXFirstStep;

    // disable touch events if only one view
    if (this.state.children && this.state.children.length === 1)
      touchableProps.untouchable = true;

    return (
      <div>
        {this.getViewList({ touchableProps })}
      </div>
    );
  }
});
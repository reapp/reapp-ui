var React = require('react');
var Component = require('../component');
var ViewListMixin = require('../mixins/ViewListMixin');
var NestedViewListBehavior = require('../behaviors/NestedViewListBehavior');
var Animator = require('../mixins/Animator');

module.exports = Component({
  name: 'NestedViewList',

  mixins: [
    ViewListMixin,
    Animator('viewList', ['width'])
  ],

  getDefaultProps: function() {
    return NestedViewListBehavior;
  },

  getInitialState: function() {
    return this.getViewListInitialState();
  },

  getViewProps() {
    return {
      styles: {
        inner: {
          boxShadow: this.isAnimating() ? '0 0 15px rgba(0,0,0,0.2)' : 'none'
        }
      }
    }
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
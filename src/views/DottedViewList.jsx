var React = require('react');
var Component = require('../component');
var ViewListMixin = require('./ViewListMixin');
var Dots = require('../components/Dots');
var DottedViewListBehavior = require('../behaviors/DottedViewListBehavior');

module.exports = Component({
  name: 'DottedViewList',

  mixins: [
    ViewListMixin
  ],

  getDefaultProps() {
    return DottedViewListBehavior;
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
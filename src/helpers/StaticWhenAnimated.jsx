var React = require('react');
var Component = require('../component');
var StaticContainer = require('../helpers/StaticContainer');

module.exports = Component({
  name: 'StaticInViewList',

  render() {
    return (
      <StaticContainer
        shouldUpdate={this.getAnimationState(this.props.animation).step % 1 === 0}
        {...this.props}
      />
    )
  }
});
var React = require('react');
var Component = require('../component');
var Tappable = require('../mixins/Tappable');
var clone = require('../lib/niceClone');
var Button = require('./Button');

module.exports = Component({
  name: 'TabItem',

  mixins: [
    Tappable
  ],

  propTypes: {

    // place an icon or element before the item
    before: React.PropTypes.node,

    // place an icon or element after the item
    after: React.PropTypes.node,

    // wrap an element around the item, good for links
    wrapper: React.PropTypes.node,

    // was the tab item wrapped in the tab component?
    wrapped: React.PropTypes.bool,

    // don't add padding
    nopad: React.PropTypes.bool
  },

  render() {
    var {
      children,
      active,
      before,
      after,
      wrapper,
      wrapped,
      nopad,
      index,
      onTap,
      ...props } = this.props;

    if (index === 0) {
      this.addStyles('content', 'borderless');
      this.addStyles('after', 'borderless');
    }

    if (this.state.tapActive)
      this.addStyles('tapActive');

    var buttonStyles = this.componentProps('button').style;

    if (this.props.active) {
      this.addStyles('active');
    }

    return (
      <Button {...props} onTap={this.props.onTap.bind(this, this.props.index)} styles={{self: buttonStyles}} chromeless secondaryRipple>
        <div {...this.componentProps()}>
          {children}
        </div>
      </Button>
    );
  }
});
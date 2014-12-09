var React = require('react');
var Component = require('ui/component');

module.exports = Component('Card', {
  childContextTypes: {
    index: React.PropTypes.number
  },

  getChildContext() {
    return { index: this.props.index };
  },

  getDefaultProps() {
    return {
      animation: 'card'
    };
  },

  makeSection(title, content) {
    return content && (
      <span {...this.componentProps(title)}>
        {content}
      </span>
    );
  },

  render() {
    var { children, title, animation, index, step, ...props } = this.props;

    return (
      <div {...this.componentProps()} {...props}
        style={this.getAnimationStyles(animation)}>
        {this.makeSection('title', title)}
        {this.makeSection('content', children)}
      </div>
    );
  }
});
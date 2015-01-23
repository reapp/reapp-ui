var React = require('react');
var Component = require('../component');

module.exports = Component({
  name: 'Card',

  propTypes: {
    title: React.PropTypes.string,
    children: React.PropTypes.node
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
    var {
      children,
      title,
      ...props } = this.props;

    return (
      <div {...this.componentProps()} {...props}>
        {this.makeSection('title', title)}
        {this.makeSection('content', children)}
      </div>
    );
  }
});
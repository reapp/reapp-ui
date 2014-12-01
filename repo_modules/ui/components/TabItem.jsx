var React = require('react');
var Invariant = require('react/lib/invariant');
var Component = require('ui/component');
var Icon = require('./Icon');

module.exports = Component('TabItem', {
  makeSection(name, content) {
    return content && (
      <span {...this.componentProps(name)}>
        {content}
      </span>
    );
  },

  render() {
    var { icon, text, children, ...props } = this.props;

    Invariant(text || children, 'Must either pass in children or text, but not both');

    if (!text && children)
      text = children;

    if (typeof icon === 'string')
      icon = <Icon type={icon} />;

    return (
      <li {...props} {...this.componentProps()}>
        {this.makeSection('icon', icon)}
        {this.makeSection('text', text)}
      </li>
    );
  }
});
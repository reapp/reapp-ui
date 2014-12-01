var React = require('react');
var Component = require('ui/component');
var Icon = require('./Icon');

module.exports = Component('TabItem', {
  getDefaultProps() {
    return { type: 'text' };
  },

  makeSection(name, content) {
    return content && (
      <span {...this.componentProps(`${this.props.type}-${name}`)}>
        {content}
      </span>
    );
  },

  render() {
    var { icon, text, children, type, ...props } = this.props;

    this.addStyles(this.styles['tab-' + type]);

    if (!text && children)
      text = children;

    if (typeof icon === 'string')
      icon = (
        <Icon
          type={icon}
          styles={this.styles.icon}
          svgProps={{style: { margin: 'auto' }}} />
        );

    return (
      <li {...props} {...this.componentProps()}>
        {this.makeSection('icon', icon)}
        {this.makeSection('text', text)}
      </li>
    );
  }
});
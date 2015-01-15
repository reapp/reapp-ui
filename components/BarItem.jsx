var React = require('react');
var Component = require('../component');
var Icon = require('./Icon');

module.exports = Component({
  name: 'BarItem',

  getDefaultProps() {
    return {
      type: 'text'
    };
  },

  makeSection(name, content) {
    return content && (
      <span {...this.componentProps(`${this.props.type}-${name}`)}>
        {content}
      </span>
    );
  },

  render() {
    var { icon, text, children, type, iconProps, active, ...props } = this.props;

    // todo: verify proper types
    this.addStyles(this.styles['tab-' + type]);

    if (active)
      this.addStyles('active');

    if (!text && children)
      text = children;

    if (typeof icon === 'string')
      icon = (
        <Icon
          size={(type === 'icon-text-right') ? 24 : 32}
          name={icon}
          styles={this.styles.icon}
          svgProps={{style: { margin: 'auto' }}}
          {...iconProps} />
      );

    return (
      <li {...this.componentProps()} {...props}>
        {this.makeSection('icon', icon)}
        {this.makeSection('text', text)}
      </li>
    );
  }
});
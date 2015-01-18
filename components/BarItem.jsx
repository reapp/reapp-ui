var React = require('react');
var Component = require('../component');
var Icon = require('./Icon');

module.exports = Component({
  name: 'BarItem',

  propTypes: {
    icon: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),
    iconProps: React.PropTypes.object,
    children: React.PropTypes.string,
    display: React.PropTypes.oneOf([
      'text', 'icon', 'icon-text', 'icon-text-right'
    ]),
    active: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      display: 'text'
    };
  },

  makeSection(name, content) {
    return content && (
      <span {...this.componentProps(`${this.props.display}-${name}`)}>
        {content}
      </span>
    );
  },

  render() {
    var {
      icon,
      children,
      display,
      iconProps,
      active,
      ...props } = this.props;

    this.addStyles(`display-${display}`);

    if (active)
      this.addStyles('active');

    if (typeof icon === 'string')
      icon = (
        <Icon
          size={(display === 'icon-text-right') ? 24 : 32}
          name={icon}
          styles={this.getStyles('icon')}
          svgProps={{style: { margin: 'auto' }}}
          {...iconProps} />
      );

    return (
      <li {...this.componentProps()} {...props}>
        {this.makeSection('icon', icon)}
        {this.makeSection('text', children)}
      </li>
    );
  }
});
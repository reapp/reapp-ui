var React = require('react');
var Component = require('../component');
var Icon = require('./Icon');
var Tappable = require('../mixins/Tappable');

module.exports = Component({
  name: 'BarItem',

  mixins: [
    Tappable
  ],

  propTypes: {
    icon: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),
    iconProps: React.PropTypes.object,
    children: React.PropTypes.node,
    display: React.PropTypes.oneOf([
      'text', 'icon', 'icon-text', 'icon-text-right'
    ]),
    active: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      display: 'icon-text'
    };
  },

  makeSection(name, content) {
    return content && (
      <div {...this.componentProps(`display:${this.props.display}__${name}`)}>
        {content}
      </div>
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

    this.addStyles(display);

    if (active)
      this.addStyles('active');

    if (typeof icon === 'string')
      icon = (
        <Icon
          color={this.getConstant(active ? 'barColorActive' : 'barColor')}
          size={(display === 'icon-text-right') ? 24 : 32}
          file={icon}
          styles={this.getStyles('icon')}
          svgProps={{style: { margin: 'auto' }}}
          {...iconProps}
        />
      );

    return (
      <div {...this.componentProps()} {...this.tappableProps()} {...props}>
        {display != 'text' && this.makeSection('icon', icon)}
        {display != 'icon' && this.makeSection('text', children)}
      </div>
    );
  }
});
var React = require('react');
var ReactStyle = require('react-style');
var Icon = require('./Icon');

require('./Button.styl');

var Button = React.createClass({
  getDefaultProps() {
    return { iconProps: {} };
  },

  styles: (styleProps) => Object.assign({}, {
    fontSize: '16px',
    background: 'none',
    border: 'none',
    padding: '8px 0',
    color: '#307cff',
    flexFlow: 'row',
    zoom: 1,
    lineHeight: 'normal',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    textAlign: 'center',
    cursor: 'pointer',
    '-webkit-user-drag': 'none',
    '-webkit-user-select': 'none',
    outline: 'none'
  }, styleProps),

  render() {
    var children;
    var { style, transforms, iconProps } = this.props;
    var styles = this.styles(style);

    if (this.props.children) {
      var childStyle = { margin: 'auto' };
      children = <span
        style={childStyle}
        data-transform={transforms}>
        {this.props.children}
        </span>;
    }

    iconProps.style = iconProps.style || {};
    iconProps.style.color = iconProps.style.color || styles.color;
    var icon = <Icon {...iconProps} />;

    return this.transferPropsTo(
      <button
        style={styles}
        className={'button-' + this.props.type}>
        {icon}
        {children}
      </button>
    );
  }
});

module.exports = Button;
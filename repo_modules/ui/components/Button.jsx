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
    WebkitUserDrag: 'none',
    WebkitUserSelect: 'none',
    outline: 'none'
  }, styleProps),

  render() {
    var { style, transforms, iconProps, children, type, ...props } = this.props;
    var styles = this.styles(style);

    iconProps.style = iconProps.style || {};
    iconProps.style.color = iconProps.style.color || styles.color;

    return (
      <button {...props} style={styles} className={`button-${type}`}>
        <Icon {...iconProps} />
        {children && (
          <span style={{ margin: 'auto' }} data-transform={transforms}>
            {children}
          </span>
        )}
      </button>
    );
  }
});

module.exports = Button;
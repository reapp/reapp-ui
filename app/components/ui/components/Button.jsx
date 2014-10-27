var React = require('react');
var Icon = require('./Icon');

require('./Button.styl');

var Button = React.createClass({
  render() {
    var children;
    var color = this.props.color || '#307cff';
    var styles = {
      fontSize: '16px',
      background: 'none',
      border: 'none',
      padding: 8,
      color: color,
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 102,
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
    };

    var childStyle = {
      margin: 'auto'
    };

    if (this.props.children) {
      children = <span data-transform-translate="-step*10,," style={childStyle}>{this.props.children}</span>;
    }

    return this.transferPropsTo(
      <button style={styles} className={'button-' + this.props.type}>
        <Icon type={this.props.type} color={color} size="2x" data-transform-opacity="-step" />
        {children}
      </button>
    );
  }
});

module.exports = Button;
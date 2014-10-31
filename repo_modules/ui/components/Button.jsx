var React = require('react');
var ReactStyle = require('react-style');
var Icon = require('./Icon');

require('./Button.styl');

var Button = React.createClass({
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
    var styles = this.styles(this.props.style);

    if (this.props.children) {
      var childStyle = { margin: 'auto' };
      children = <span
        style={childStyle}
        data-transform={this.props.textTransforms}>
        {this.props.children}
        </span>;
    }

    var icon = <Icon
      type={this.props.type}
      color={styles.color}
      size="2x"
      data-transform={this.props.iconTransforms} />;

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
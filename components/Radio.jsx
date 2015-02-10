var React = require('react');
var Component = require('../component');
var Icon = require('../components/Icon');

module.exports = Component({
  name: 'Radio',

  propTypes: {
    iconProps: React.PropTypes.object
  },

  getInitialState() {
    return {
      checked: this.props.checked
    };
  },

  handleChange(e) {
    if (e.currentTarget.checked)
      this.setState({ checked: true });
    else
      this.setState({ checked: false });

    if (this.props.onChange)
      this.props.onChange(e);
  },

  render() {
    var { iconProps, ...props } = this.props;

    return (
      <span {...this.componentProps()}>
        <input
          {...this.componentProps('input')}
          {...props}
          onChange={this.handleChange}
        />
        <Icon
          name="check"
          size={24}
          color={this.getConstant(this.state.checked ? 'active' : 'inactive')}
          {...iconProps}
        />
      </span>
    );
  }
});
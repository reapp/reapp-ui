var React = require('react');
var Component = require('../component');
var Icon = require('../components/Icon');

module.exports = Component({
  name: 'Radio',

  statics: {
    liNoPad: true
  },

  getInitialState() {
    return { checked: this.props.checked };
  },

  handleChange() {
    if (this.refs.input.getDOMNode().checked)
      this.setState({ checked: true });
    else
      this.setState({ checked: false });

    if (this.props.onChange)
      this.props.onChange(e);
  },

  render() {
    return (
      <span {...this.componentProps()}>
        <input ref="input" {...this.componentProps('input')} {...this.props} onChange={this.handleChange} />
        <Icon name="check" color={this.state.checked ?
          this.getConstant('active') : this.getConstant('inactive')} />
      </span>
    );
  }
});
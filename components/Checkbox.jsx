var React = require('react');
var Component = require('../component');

module.exports = Component({
  name: 'Checkbox',

  propTypes: {
    onChange: React.PropTypes.func,
    checked: React.PropTypes.bool
  },

  statics: {
    liNoPad: true
  },

  getInitialState() {
    return { checked: this.props.checked };
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
    if (this.state.checked) {
      this.addStyles('toggle', 'toggleIsChecked');
      this.addStyles('toggleSwitch', 'toggleSwitchIsChecked');
    }

    return (
      <span {...this.componentProps()}>
        <input {...this.componentProps('input')} {...this.props} onChange={this.handleChange} />
        <span {...this.componentProps('toggle')}>
          <span {...this.componentProps('toggleSwitch')} />
        </span>
      </span>
    );
  }
});
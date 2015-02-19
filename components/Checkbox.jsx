var React = require('react');
var Component = require('../component');
var Tappable = require('../helpers/Tappable');

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
    return {
      checked: this.props.checked
    };
  },

  handleChange() {
    if (!this.refs.input.getDOMNode().checked)
      this.setState({ checked: true });
    else
      this.setState({ checked: false });

    if (this.props.onChange)
      this.props.onChange(this.state.checked);
  },

  render() {
    if (this.state.checked) {
      this.addStyles('toggle', 'toggleIsChecked');
      this.addStyles('toggleSwitch', 'toggleSwitchIsChecked');
    }

    return (
      <Tappable {...this.componentProps()} onTap={this.handleChange} stopPropagation>
        <input
          {...this.componentProps('input')}
          {...this.props}
          checked={this.state.checked}
        />
        <span {...this.componentProps('toggle')}>
          <span {...this.componentProps('toggleSwitch')} />
        </span>
      </Tappable>
    );
  }
});
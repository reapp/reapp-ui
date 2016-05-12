var React = require('react');
var Component = require('../component');
var Tappable = require('../helpers/Tappable');

module.exports = Component({
  name: 'Checkbox',

  propTypes: {
    onChange: React.PropTypes.func,
    checked: React.PropTypes.bool,
    disabled: React.PropTypes.bool
  },

  statics: {
    liNoPad: true
  },

  getInitialState() {
    this.enableAnimations = false;
    return {
      checked: this.props.checked || this.props.defaultChecked,
      disabled: this.props.disabled
    };
  },

  handleChange() {
    this.enableAnimations = true;
    let checked = !this.state.checked;
    if(!!!this.props.disabled)
      this.setState({ checked: checked });
    if (this.props.onChange)
      this.props.onChange(checked);
  },

  componentWillReceiveProps(nextProps) {
    if ((typeof nextProps.checked !== 'undefined') && (nextProps.checked !== this.state.checked)) {
      let checked = !this.state.checked;
      if(!!!this.props.disabled) {
        this.setState({ checked: checked });
      }
    }
  },

  render() {
    if (this.state.checked) {
      this.addStyles('toggle', 'toggleIsChecked');
      this.addStyles('toggleSwitch', 'toggleSwitchIsChecked');
    }

    if (this.enableAnimations) {
      this.addStyles('toggle', 'animate');
      this.addStyles('toggleSwitch', 'animate');
    }

    var { onChange, defaultChecked, checked, ...props } = this.props;

    return (
      <Tappable {...this.componentProps()} onTap={this.handleChange} stopPropagation>
        <input
          {...this.componentProps('input')}
          {...props}
          defaultChecked={this.state.checked}
        />
        <span {...this.componentProps('toggle')}>
          <span {...this.componentProps('toggleSwitch')} />
        </span>
      </Tappable>
    );
  }
});

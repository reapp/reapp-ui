var Component = require('ui/component');

var Form = Component({
  name: 'Form',

  render() {
    return (
      <form {...this.componentProps()} {...this.props} />
    );
  }
});

var Label = Component({
  name: 'Label',

  statics: {
    liNoPad: true
  },

  render() {
    var { title, children, ...props } = this.props;

    return (
      <label {...this.componentProps()} {...props}>
        {title && (
          <span {...this.componentProps('title')}>{title}</span>
        )}
        {children}
      </label>
    );
  }
});

var Input = Component({
  name: 'Input',

  statics: {
    liNoPad: true
  },

  getDefaultProps() {
    return { type: 'text' };
  },

  render() {
    switch(this.props.type) {
    case 'checkbox':
      return <Checkbox {...this.props} />;
    }

    return <input {...this.componentProps()} {...this.props} />;
  }
});

var Checkbox = Component({
  name: 'Checkbox',

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
    var { label, nolabel, ...props } = this.props;

    if (this.state.checked) {
      this.addStyles('toggle', 'toggleIsChecked');
      this.addStyles('toggleSwitch', 'toggleSwitchIsChecked');
    }

    var input = (
      <span {...this.componentProps()}>
        <input {...this.componentProps('input')} {...this.props} onChange={this.handleChange} />
        <span {...this.componentProps('toggle')}>
          <span {...this.componentProps('toggleSwitch')} />
        </span>
      </span>
    );

    if (nolabel)
      return input;

    return (
      <Label title={label}>
        {input}
      </Label>
    );
  }
});

var Radio = Component({
  name: 'Radio',

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
    var { label, nolabel, ...props } = this.props;

    if (this.state.checked) {
      this.addStyles('toggle', 'toggleIsChecked');
      this.addStyles('toggleSwitch', 'toggleSwitchIsChecked');
    }

    var input = (
      <span {...this.componentProps()}>
        <input {...this.componentProps('input')} {...this.props} onChange={this.handleChange} />
        <span {...this.componentProps('toggle')}>
          <span {...this.componentProps('toggleSwitch')} />
        </span>
      </span>
    );

    if (nolabel)
      return input;

    return (
      <Label title={label}>
        {input}
      </Label>
    );
  }
});

module.exports = { Input, Form, Label };
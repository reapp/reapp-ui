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
      this.addStyles('toggle', this.styles.toggleIsChecked);
      this.addStyles('toggleSwitch', this.styles.toggleSwitchIsChecked);
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

module.exports = { Input, Form, Label };
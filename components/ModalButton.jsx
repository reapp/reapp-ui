var React = require('react');
var Component = require('../component');
var Button = require('./Button');

module.exports = Component({
  name: 'ModalButton',

  render() {
    var {
      confirm,
      ...props } = this.props;

    if (confirm)
      this.addStyles('confirm');

    return <Button {...this.componentProps()} {...props} />;
  }
});
var React = require('react');
var Component = require('../component');

module.exports = Component({
  name: 'Form',

  render() {
    return (
      <form {...this.componentProps()} {...this.props} />
    );
  }
});
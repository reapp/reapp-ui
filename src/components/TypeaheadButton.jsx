var React = require('react');
var Component = require('../component');
var Button = require('./Button');

module.exports = Component({
  name: 'TypeaheadButton',

  propTypes: {
    optionStyles: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      optionStyles: {},
    };
  },

  render() {
    var {
      confirm,
      ...props } = this.props;

    if (confirm)
      this.addStyles('confirm');

  	var testStyle = {
  	  background: '#FF0000',
  	}

    return <Button chromeless {...this.componentProps()} {...props} />;
  }
});
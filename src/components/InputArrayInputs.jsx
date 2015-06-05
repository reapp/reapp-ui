var React = require('react');
var Component = require('../component');
var Form = require('./Form');
var Button = require('./Button');
var Icon = require('./Icon');
var validator = require('validator'); 

var InputArrayInputs = Component({
  name: 'InputArrayInputs',

  propTypes: {
    namePrefix: React.PropTypes.string,
    inputs: React.PropTypes.array,
    handleInputBlur: React.PropTypes.func,
    inputStyles: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      namePrefix: "InputArray-",
      inputs: {},
      handleInputBlur: function() {},
      inputStyles: {},
    };
  },
  _renderInputs() {
  	return this.props.inputs.map((item, index) => {
  	  var inputName = this.props.namePrefix + index;
  	  var inputType = "text";
  	  var inputDefaultValue = "";
  	  var inputDisabled = false;
  	  var inputPlaceholder = "";
  	  var inputLabel = false;
  	  if (!!item.type) {
  	  	inputType = item.type;
  	  }
  	  if (!!item.defaultValue) {
  	  	inputDefaultValue = item.defaultValue;
  	  }
  	  if (!!item.disabled) {
  	  	inputDisabled = true;
  	  }
  	  if (!!item.placeholder) {
  	  	inputPlaceholder = item.placeholder;
  	  }
  	  if (!!item.label) {
  	  	inputLabel = item.label;
  	  }
      return (
        <Form.Input ref={inputName}
          key={index} 
          type={inputType} 
      	  name={inputName} 
      	  defaultValue={inputDefaultValue} 
      	  disabled={inputDisabled} 
          styles={this.props.inputStyles}
          onBlur={this.props.handleInputBlur.bind(null,this)} 
      	  placeholder={inputPlaceholder} 
      	  label={inputLabel} />
      );
    });
  },

  render() {
    return (
      <div>
        { this._renderInputs() }
      </div>
    );
  }
});

module.exports = InputArrayInputs;

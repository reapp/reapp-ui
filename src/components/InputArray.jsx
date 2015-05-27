var React = require('react');
var Component = require('../component');
var Form = require('./Form');
var Button = require('./Button');

var InputArray = Component({
  name: 'InputArray',

  propTypes: {
    namePrefix: React.PropTypes.string,
    inputStyles: React.PropTypes.object,
    inputDefaultValue: React.PropTypes.string,
    addInputStyles: React.PropTypes.object,
    addInputText: React.PropTypes.string,
    addInputCb: React.PropTypes.func,
    removeInputStyles: React.PropTypes.object,
    maxVisible: React.PropTypes.number,
    inputs: React.PropTypes.array,
    clearOnInputBlank: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      namePrefix: "InputArray-",
      inputStyles: {},
      inputDefaultValue: "",
      addInputStyles: {},
      addInputText: "+ Add",
      addInputCb: function() {},
      removeInputStyles: {},
      maxVisible: 20,
      inputs: [],
      clearOnInputBlank: false,
      disabled: false,
    };
  },

  //componentWillReceiveProps(nextProps,asdf) {
  //  this.setState({
  //    inputs: nextProps.inputs,
  //  });
  //},

  /*componentDidMount() {
  	return this.props.inputs.map((item, index) => {
  	  var inputName = this.props.namePrefix + index;
  	  React.findDOMNode(this.refs[inputName]).value = item[index].value;
  	},
  },*/

  getInitialState() {
    return {
      inputs: this.props.inputs,
    };
  },

  _addInputDefault() {
  	console.log('_addInputDefault hit');
  	//this.props.inputs.push({
  	//  defaultValue: "",
    //  disabled: false,
  	//});
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
      	  placeholder={inputPlaceholder} 
      	  label={inputLabel} />
      );
    });
  },

  render() {
    return (
      <div>
        { this._renderInputs() }
        <Button chromeless
        		key="addInputArray"
                onTap={this.props.addInputCb}
                styles={this.props.addInputStyles}>
          {this.props.addInputText}
        </Button>
      </div>
    );
  }
});

module.exports = InputArray;

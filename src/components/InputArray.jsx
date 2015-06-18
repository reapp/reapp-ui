var React = require('react');
var Component = require('../component');
var Form = require('./Form');
var Button = require('./Button');
var Icon = require('./Icon');
var validator = require('validator');
var InputArrayInputs = require('./InputArrayInputs');

var InputArray = Component({
  name: 'InputArray',

  propTypes: {
    namePrefix: React.PropTypes.string,
    inputContainerStyles: React.PropTypes.object,
    inputDefaultValue: React.PropTypes.string,
    defaultValidator: React.PropTypes.string,
    addInputCb: React.PropTypes.func,
    addInputTextStyles: React.PropTypes.object,
    addInputIconStyles: React.PropTypes.object,
    addInputText: React.PropTypes.string,
    addInputIcon: React.PropTypes.string,
    addInputChromeless: React.PropTypes.bool,
    addInputType: React.PropTypes.string,
    removeInputStyles: React.PropTypes.object,
    maxVisible: React.PropTypes.number,
    inputs: React.PropTypes.array,
    inputsCb: React.PropTypes.func,
    inputStyles: React.PropTypes.object,
    clearOnInputBlank: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      namePrefix: "InputArray-",
      inputContainerStyles: {},
      inputDefaultValue: "",
      defaultValidator: "",
      addInputCb: function() {},
      addInputTextStyles: {},
      addInputIconStyles: {},
      addInputText: "Add",
      addInputIcon: "+&nbsp;&nbsp;",
      addInputChromeless: false,
      addInputType: "text",
      removeInputStyles: {},
      maxVisible: 20,
      inputs: [],
      inputsCb: function() {},
      inputStyles: {},
      clearOnInputBlank: false,
      disabled: false,
    };
  },

  componentWillReceiveProps(nextProps) {
    var inputs = nextProps.inputs;
    for(var i=0;i<inputs.length;i++) {
      inputs[i].inputName = nextProps.namePrefix + i;
    }
    this.setState({
      inputs: inputs,
    });
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
    var inputs = this.props.inputs;
    for(var i=0;i<inputs.length;i++) {
      inputs[i].inputName = this.props.namePrefix + i;
    }
    return {
      inputs: inputs,
    };
  },

  _addInputDefault() {
  	console.log('_addInputDefault hit');
  	//this.props.inputs.push({
  	//  defaultValue: "",
    //  disabled: false,
  	//});
  },

  addInput() {
    //Blur all elements before validation.
    //document.activeElement.blur();
    if(this.validateInputs(null)) {
        var inputsCopy = JSON.parse(JSON.stringify(this.state.inputs));
        inputsCopy.push({
          defaultValue: this.props.inputDefaultValue,
          disabled: this.props.disabled,
          validator: this.props.defaultValidator,
          inputName: this.props.namePrefix + inputsCopy.length,
          type: this.props.addInputType,
        });
        this.props.inputsCb(inputsCopy);
      }
  },

  addInputMouseUp() {
    this.props.addInputCb(this.state.inputs);
  },

  validateInputs() {
    for(var x=0;x<this.state.inputs.length;x++) {
      if(this.state.inputs[x].validator == 'phone') {
        if(!validator.isMobilePhone(this.state.inputs[x].defaultValue.replace(/[^0-9]/g,""),'en-US')) {
          return false;
        }
      }
      if(this.state.inputs[x].validator == 'email') {
        if(!validator.isEmail(this.state.inputs[x].defaultValue)) {
          return false;
        }
      }
    }
    return true;
  },

  handleInputBlur(that,inputElement) {
    console.log('test');
    var inputKey = inputElement.target.name.replace(this.props.namePrefix,"");
    var inputsCopy = JSON.parse(JSON.stringify(this.state.inputs));
    inputsCopy[inputKey].defaultValue = inputElement.target.value;
    this.props.inputsCb(inputsCopy);
  },

  //renderInputs() {
  //  this.setState({inputs: this._renderInputs()});
  //},

  render() {
    var { children, ...props } = this.props;
    return (
      <div>
	      <div styles={this.props.inputContainerStyles}>
	        <InputArrayInputs ref="inputArrayInputs" disabled={this.props.disabled} inputs={this.state.inputs} handleInputBlur={this.handleInputBlur} inputStyles={this.props.inputStyles} />
	      </div>
        {!!!this.props.disabled && 
	      <Button {...this.componentProps('addInput')}
                key="addInputArray" 
	    	        chromeless={this.props.addInputChromeless} 
                onTap={this.addInput}
                onMouseUp={this.addInputMouseUp}>
          <div styles={this.props.addInputTextStyles}>
            <img src={this.props.addInputIcon} styles={this.props.addInputIconStyles} /> {this.props.addInputText}
          </div>
        </Button>
        }
	    </div>
    );
  }
});

module.exports = InputArray;

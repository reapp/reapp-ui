var React = require('react');
var Component = require('../component');
var Form = require('./Form');
var TypeaheadSelector = require('./TypeaheadSelector');
var fuzzy = require('fuzzy');
var classNames = require('classnames');
var flattenObject = require('flatten-object');

var Typeahead = Component({
  name: 'Typeahead',

  propTypes: {
    name: React.PropTypes.string,
    customClasses: React.PropTypes.object,
    inputStyles: React.PropTypes.object,
    listStyles: React.PropTypes.object,
    optionStyles: React.PropTypes.object,
    maxVisible: React.PropTypes.number,
    options: React.PropTypes.array,
    allowCustomValues: React.PropTypes.number,
    staticCustomValue: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    inputProps: React.PropTypes.object,
    onOptionSelected: React.PropTypes.func,
    clearOnOptionSelected: React.PropTypes.bool,
    onKeyDown: React.PropTypes.func,
    filterOption: React.PropTypes.func,
    disabled: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      options: [],
      customClasses: {},
      inputStyles: {},
      listStyles: {},
      optionStyles: {},
      allowCustomValues: 0,
      staticCustomValue: "",
      defaultValue: "",
      placeholder: "",
      inputProps: {},
      onOptionSelected: function(option) {},
      clearOnOptionSelected: false,
      onKeyDown: function(event) {},
      filterOption: null,
      disabled: false,
    };
  },

  getInitialState() {
    return {
      // The currently visible set of options
      visible: this.getOptionsForDisplay(this.props.defaultValue, this._flattenOptions(this.props.options)),
      // This should be called something else, "defaultValue"
      defaultValue: this.props.defaultValue,
      // A valid typeahead value
      selection: null
    };
  },

  getOptionsForDisplay(display, options) {
    var result;
    if (this.props.filterOption) {
      result = options.display.filter((function(o) { return this.props.filterOption(display, o); }).bind(this));
    } else {
      var optionSet = {
        extract: function(el) { return el.display; }
      };
      result = fuzzy.filter(display, options, optionSet).map(function(res) {
        return res.original;
      });
    }
    if (this.props.maxVisible) {
      result = result.slice(0, this.props.maxVisible);
    }
    return result;
  },

  setEntryText(value) {
    this.refs.entry.getDOMNode().value = value;
    this._onTextEntryUpdated();
  },

  _hasCustomValue() {
    if (this.props.allowCustomValues > 0 &&
      this.state.defaultValue.length >= this.props.allowCustomValues) {
      return true;
    }
    return false;
  },

  _getCustomValue() {
    if (this._hasCustomValue()) {
      if (!!this.props.staticCustomValue) {
        return this.props.staticCustomValue;
      } else {
        return this.state.defaultValue;
      }

    }
    return null
  },

  _flattenOptions(options) {
    /*var optionFlat;
    var optionObj;
    var count = 0;
    var optionsArr;
    var option;
    var optionsFlatArr = [];
    var storeValue = null;
    var storeDisplayElements = null;
    var optionsClone = JSON.parse(JSON.stringify(options))
    if (Array.isArray(optionsClone)) {
      optionsArr = optionsClone;
    } else {
      optionsArr = [ optionsClone ];
    }
    for (var x=0; x<optionsArr.length; x++) {
      optionFlat = {};
      option = optionsArr[x];
      if (typeof(option) == 'object') {
        if(Object.keys(option).length > 1)
          if(!!option.value)
            storeValue = option['value'];
            delete option["value"];
          if(!!option.displayElements)
            storeDisplayElements = option['displayElements'];
            delete option["displayElements"];
        optionObj = flattenObject(option);
        for (var prop in optionObj) {
          if (optionObj.hasOwnProperty(prop)) {
            if(!!!optionFlat.display) {
              optionFlat.display = '';
            }
            if (count>0)
              optionFlat.display = optionFlat.display + ' '
            optionFlat.display = optionFlat.display + optionObj[prop]
            count++;
          }
        }
      } else {
        optionFlat.display = option;
      }
      //optionsFlatArr[x] = {};
      optionsFlatArr[x] = optionFlat;
      if(!!storeValue) {
        optionsFlatArr[x].value = storeValue;
      }
      if(!!storeDisplayElements) {
        optionsFlatArr[x].displayElements = storeDisplayElements;
      }
    }*/
    //return optionsFlatArr;
    return options;
  },

  _getValues() {

  },

  _renderIncrementalSearchResults() {
    // Nothing has been entered into the textbox
    if (!this.state.defaultValue || this.state.defaultValue == this.props.defaultValue) {
      return "";
    }

    // Something was just selected
    if (this.state.selection) {
      return "";
    }

    // There are no typeahead / autocomplete suggestions
    if (!this.state.visible.length && !(this.props.allowCustomValues > 0)) {
      return "";
    }

    if (this._hasCustomValue()) {
      return (
        <TypeaheadSelector
          ref="sel" options={this.state.visible}
          optionStyles={this.props.optionStyles}
          customValue={this._getCustomValue()}
          listStyles={this.props.listStyles}
          onOptionSelected={this._onOptionSelected}
          customClasses={this.props.customClasses} />
      );
    }

    return (
      <TypeaheadSelector
        ref="sel" options={ this.state.visible }
        optionStyles={this.props.optionStyles}
        listStyles={this.props.listStyles}
        onOptionSelected={ this._onOptionSelected }
        customClasses={this.props.customClasses}/>
    );
  },

  _onOptionSelected(option, event) {
    var nEntry = this.refs.entry.getDOMNode();
    var defaultValue = null;
    nEntry.focus();
    nEntry.value = option.display;
    if (!!this.props.clearOnOptionSelected) {
      nEntry.value = "";
      defaultValue = "";
    } else {
      nEntry.value = option.display;
      defaultValue = option.display;
    }
    this.setState({visible: this.getOptionsForDisplay(option.display, this._flattenOptions(this.props.options)),
                   selection: option.display,
                   defaultValue: defaultValue});
    return this.props.onOptionSelected(option, event);
  },

  _closeTypeahead() {
    event.stopPropagation();
    var nEntry = this.refs.entry.getDOMNode();
    this.setState({visible: this.state.defaultValue, selection: nEntry.value, defaultValue: this.state.defaultValue});
  },

  _onTextEntryUpdated() {
    var enteredText = this.refs.entry.getDOMNode().value;
    this.setState({visible: this.getOptionsForDisplay(enteredText, this._flattenOptions(this.props.options)),
                   selection: null,
                   defaultValue: enteredText});
  },

  _onEnter(event) {
    if (!this.refs.sel.state.selection) {
      return this.props.onKeyDown(event);
    }
    return this._onOptionSelected(this.refs.sel.state.selection, event);
  },

  _onEscape() {
    this.refs.sel.setSelectionIndex(null)
  },

  _onTab(event) {
    var option = this.refs.sel.state.selection ?
      this.refs.sel.state.selection : (this.state.visible.length > 0 ? this.state.visible[0] : null);

    if (option === null && this._hasCustomValue()) {
      option = this._getCustomValue();
    }

    if (option !== null) {
      return this._onOptionSelected(option, event);
    }
  },

  eventMap(event) {

    var KeyEvent = KeyEvent || {};
    KeyEvent.DOM_VK_UP = KeyEvent.DOM_VK_UP || 38;
    KeyEvent.DOM_VK_DOWN = KeyEvent.DOM_VK_DOWN || 40;
    KeyEvent.DOM_VK_BACK_SPACE = KeyEvent.DOM_VK_BACK_SPACE || 8;
    KeyEvent.DOM_VK_RETURN = KeyEvent.DOM_VK_RETURN || 13;
    KeyEvent.DOM_VK_ENTER = KeyEvent.DOM_VK_ENTER || 14;
    KeyEvent.DOM_VK_ESCAPE = KeyEvent.DOM_VK_ESCAPE || 27;
    KeyEvent.DOM_VK_TAB = KeyEvent.DOM_VK_TAB || 9;

    var events = {};

    events[KeyEvent.DOM_VK_UP] = this.refs.sel.navUp;
    events[KeyEvent.DOM_VK_DOWN] = this.refs.sel.navDown;
    events[KeyEvent.DOM_VK_RETURN] = events[KeyEvent.DOM_VK_ENTER] = this._onEnter;
    events[KeyEvent.DOM_VK_ESCAPE] = this._onEscape;
    events[KeyEvent.DOM_VK_TAB] = this._onTab;

    return events;
  },

  _onKeyDown(event) {
    // If there are no visible elements, don't perform selector navigation.
    // Just pass this up to the upstream onKeydown handler
    if (!this.refs.sel) {
      return this.props.onKeyDown(event);
    }

    var handler = this.eventMap()[event.keyCode];

    if (handler) {
      handler(event);
    } else {
      return this.props.onKeyDown(event);
    }
    // Don't propagate the keystroke back to the DOM/browser
    event.preventDefault();
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: this.getOptionsForDisplay(this.state.defaultValue, this._flattenOptions(nextProps.options)),
      defaultValue: nextProps.defaultValue
    });
  },

  render() {
    var inputClasses = {}
    inputClasses[this.props.customClasses.input] = !!this.props.customClasses.input;
    var inputClassList = classNames(inputClasses);

    var classes = {
      typeahead: true
    }
    classes[this.props.className] = !!this.props.className;
    var classList = classNames(classes);

    return (
      <div {...this.componentProps()} className={classList}>
        { this._renderHiddenInput() }
        <Form.Input ref="entry"
          {...this.props.inputProps}
          disabled={this.props.disabled}
          styles={this.props.inputStyles}
          placeholder={this.props.placeholder}
          className={inputClassList}
          value={this.state.defaultValue}
          defaultValue={this.props.defaultValue}
          onChange={this._onTextEntryUpdated} 
          onKeyDown={this._onKeyDown} 
          onBlur={this._closeTypeahead}
          autocapitalize="words" />
        { this._renderIncrementalSearchResults() }
      </div>
    );
  },

  _renderHiddenInput() {
    if (!this.props.name) {
      return null;
    }

    return (
      <input
        type="hidden"
        name={ this.props.name }
        value={ this.state.selection }/>
    );
  }
});

module.exports = Typeahead;

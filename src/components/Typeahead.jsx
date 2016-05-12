var React = require('react');
var Component = require('../component');
var Form = require('./Form');
var TypeaheadSelector = require('./TypeaheadSelector');
var fuzzy = require('fuzzy');
var classNames = require('classnames');
var searchIcon = require('../../assets/icons/search.svg');
var micIcon = require('../../assets/icons/mic3.svg');
var closeIcon = require('../../assets/icons/material-close.svg');
var leftIcon = require('../../assets/icons/material-left.svg');

var searchIconProps = {
  size: 24,
  file: searchIcon,
  viewBox: '16 12 24 24',
  stroke: 0,
  styles: {
    self: {
    }
  }
};

var micIconProps = {
  size: 24,
  file: micIcon,
  viewBox: '304 12 24 24',
  stroke: 0,
  styles: {
    self: {
    }
  }
};

var backIconProps = {
  size: 24,
  file: leftIcon,
  viewBox: '52 99 24 24',
  stroke: 0,
  styles: {
    self: {
    }
  }
};

var closeIconProps = {
  size: 24,
  file: closeIcon,
  viewBox: '416 99 24 24',
  stroke: 0,
  styles: {
    self: {
    }
  }
};

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
    allowCustomValues: React.PropTypes.bool,
    staticCustomValue: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    inputProps: React.PropTypes.object,
    onOptionSelected: React.PropTypes.func,
    clearOnOptionSelected: React.PropTypes.bool,
    closeOnBlur: React.PropTypes.bool,
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
      allowCustomValues: false,
      staticCustomValue: "",
      defaultValue: "",
      placeholder: "",
      inputProps: {},
      onOptionSelected: function(option) {},
      clearOnOptionSelected: false,
      closeOnBlur: false,
      onKeyDown: function(event) {},
      filterOption: null,
      disabled: false,
    };
  },

  getInitialState() {
    return {
      // The currently visible set of options
      visible: this.getOptionsForDisplay(this.props.defaultValue, this.props.options),
      // This should be called something else, "defaultValue"
      defaultValue: this.props.defaultValue,
      // A valid typeahead value
      selection: null
    };
  },

  getOptionsForDisplay(inputDisplayText, options) {
    var result = [];
    if (this.props.filterOption) {
      result = options.inputDisplayText.filter((function(o) { return this.props.filterOption(inputDisplayText, o); }).bind(this));
    } else {
      var optionSet = {
        extract: function(el) { return el.display; }
      };
      if (!!inputDisplayText) {
        result = fuzzy.filter(inputDisplayText, options, optionSet).map(function(res) {
          return res.original;
        });
      }
    }
    if (this.props.maxVisible) {
      result = result.slice(0, this.props.maxVisible);
    }
    return result;
  },

  setEntryText(value) {
    this.refs.entry.value = value;
    this._onTextEntryUpdated();
  },

  _enableVoice() {
    alert('Enable voice to text.');
  },

  _focusEntry() {
    this.refs.entry.refs.input.getDOMNode().focus();
  },

  _hasCustomValue() {
    if (this.props.allowCustomValues && this.state.defaultValue.length > 0) {
      return true;
    }
    return false;
  },

  _getCustomValue() {
    if (this._hasCustomValue()) {
      if (!!this.props.staticCustomValue) {
        var customValue = {};
        customValue.inputDisplayText = this.props.staticCustomValue;
        return customValue;
      } else {
        var customValue = {};
        customValue.inputDisplayText = this.state.defaultValue;
        return customValue;
      }

    }
    return null
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
    if (!this.state.visible.length && !(this.props.allowCustomValues)) {
      return "";
    }

    if (this._hasCustomValue()) {
      console.log('customValue - this.state.visible: ' + this.state.visible);
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

    console.log('return - this.state.visible: ' + this.state.visible);
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
    console.log('onOptionSelected!');
    var nEntry = this.refs.entry.refs.input;
    var defaultValue = null;
    nEntry.focus();
    nEntry.value = option.display;
    if (!!this.props.clearOnOptionSelected) {
      nEntry.value = "";
      defaultValue = "";
    } else {
      nEntry.value = option.value;
      defaultValue = option.display;
    }
    console.log('this.getOptionsForDisplay(option.display, this.props.options): ' + this.getOptionsForDisplay(option.display, this.props.options));
    this.setState({visible: this.getOptionsForDisplay(option.display, this.props.options),
                   selection: option.display,
                   defaultValue: defaultValue});
    return this.props.onOptionSelected(option, event);
  },

  _onBlur() {
    if (this.props.closeOnBlur) {
      this._closeTypeahead();
    }
  },

  _closeTypeahead() {
    event.stopPropagation();
    var nEntry = this.refs.entry.refs.input;
    this.setState({visible: [], selection: nEntry.value, defaultValue: ''});
  },

  _onTextEntryUpdated() {
    var enteredText = this.refs.entry.refs.input.value;
    this.setState({visible: this.getOptionsForDisplay(enteredText, this.props.options),
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
      visible: this.getOptionsForDisplay(this.state.defaultValue, nextProps.options),
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

    var leftIconProps = searchIconProps;
    var leftIconFunc = this._focusEntry;
    var rightIconProps = micIconProps;
    var rightIconFunc = this._enableVoice;
    if (!!this.state.defaultValue && this.state.defaultValue != '') {
      leftIconProps = backIconProps;
      rightIconProps = closeIconProps;
      var rightIconFunc = this._closeTypeahead;
    }

    return (
      <div {...this.componentProps()} className={classList}>
        { this._renderHiddenInput() }
        <Form.Input ref="entry"
          {...this.props.inputProps}
          leftIconProps={leftIconProps}
          leftIconFunc={leftIconFunc}
          rightIconProps={rightIconProps}
          rightIconFunc={rightIconFunc}
          disabled={this.props.disabled}
          placeholder={this.props.placeholder}
          className={inputClassList}
          value={this.state.defaultValue}
          defaultValue={this.props.defaultValue}
          onChange={this._onTextEntryUpdated}
          onKeyDown={this._onKeyDown}
          onBlur={this._onBlur}
          autoCapitalize="words" />
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

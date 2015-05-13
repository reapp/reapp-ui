var React = require('react');
var Component = require('../component');
var Form = require('./Form');
var TypeaheadSelector = require('./TypeaheadSelector');
var fuzzy = require('fuzzy');
var classNames = require('classnames');

var Typeahead = Component({
  name: 'Typeahead',

  propTypes: {
    name: React.PropTypes.string,
    customClasses: React.PropTypes.object,
    inputStyles: React.PropTypes.object,
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
    filterOption: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      options: [],
      customClasses: {},
      inputStyles: {},
      allowCustomValues: 0,
      staticCustomValue: "",
      defaultValue: "",
      placeholder: "",
      inputProps: {},
      onOptionSelected: function(option) {},
      clearOnOptionSelected: false,
      onKeyDown: function(event) {},
      filterOption: null
    };
  },

  getInitialState() {
    return {
      // The currently visible set of options
      visible: this.getOptionsForValue(this.props.defaultValue, this.props.options),
      // This should be called something else, "entryValue"
      entryValue: this.props.defaultValue,
      // A valid typeahead value
      selection: null
    };
  },

  getOptionsForValue(value, options) {
    var result;
    if (this.props.filterOption) {
      result = options.filter((function(o) { return this.props.filterOption(value, o); }).bind(this));
    } else {
      result = fuzzy.filter(value, options).map(function(res) {
        return res.string;
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
      this.state.entryValue.length >= this.props.allowCustomValues &&
      this.state.visible.indexOf(this.state.entryValue) < 0) {
      return true;
    }
    return false;
  },

  _getCustomValue() {
    if (this._hasCustomValue()) {
      if (!!this.props.staticCustomValue) {
        return this.props.staticCustomValue;
      } else {
        return this.state.entryValue;
      }

    }
    return null
  },

  _renderIncrementalSearchResults() {
    // Nothing has been entered into the textbox
    if (!this.state.entryValue) {
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

    return (
      <TypeaheadSelector
        ref="sel" options={this.state.visible}
        customValue={this._getCustomValue()}
        onOptionSelected={this._onOptionSelected}
        customClasses={this.props.customClasses} />
    );
  },

  _onOptionSelected(option, event) {
    var nEntry = this.refs.entry.getDOMNode();
    var entryValue = null;
    nEntry.focus();
    nEntry.value = option;
    if (!!this.props.clearOnOptionSelected) {
      nEntry.value = "";
      entryValue = "";
    } else {
      nEntry.value = option;
      entryValue = option;
    }
    this.setState({visible: this.getOptionsForValue(option, this.props.options),
                   selection: option,
                   entryValue: entryValue});
    return this.props.onOptionSelected(option, event);
  },

  _onTextEntryUpdated() {
    var value = this.refs.entry.getDOMNode().value;
    this.setState({visible: this.getOptionsForValue(value, this.props.options),
                   selection: null,
                   entryValue: value});
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
      visible: this.getOptionsForValue(this.state.entryValue, nextProps.options)
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
      <div className={classList}>
        { this._renderHiddenInput() }
        <Form.Input ref="entry"
          {...this.props.inputProps}
          styles={this.props.inputStyles}
          placeholder={this.props.placeholder}
          className={inputClassList}
          value={this.state.entryValue}
          defaultValue={this.props.defaultValue}
          onChange={this._onTextEntryUpdated} onKeyDown={this._onKeyDown} />
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

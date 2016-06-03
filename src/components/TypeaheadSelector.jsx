var React = require('react');
var Component = require('../component');
var TypeaheadList = require('./TypeaheadList');
var TypeaheadOption = require('./TypeaheadOption');
var classNames = require('classnames');
var List = require('./List');
var ListItem = require('./ListItem');

/**
 * Container for the options rendered as part of the autocompletion process
 * of the typeahead
 */
module.exports = Component({
  name: 'TypeaheadSelector',

  propTypes: {
    listStyles: React.PropTypes.object,
    optionStyles: React.PropTypes.object,
    options: React.PropTypes.array,
    customValue: React.PropTypes.object,
    selectionIndex: React.PropTypes.number,
    onOptionSelected: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      listStyles: {},
      optionStyles: {},
      selectionIndex: null,
      customValue: null,
      onOptionSelected: function(option) { }
    };
  },

  getInitialState() {
    return {
      listStyles: this.props.listStyles,
      selectionIndex: this.props.selectionIndex,
      selection: this.getSelectionForIndex(this.props.selectionIndex)
    };
  },

  render() {
    var classes = {
      "typeahead-selector": true
    };
    var classList = classNames(classes);

    var results = [];

    this.props.options.forEach(function(result, i) {
      results.push (
        <TypeaheadOption
          styles={this.props.optionStyles}
          data-test={result.keys}
          ref={result}
          key={result.inputDisplayText}
          hover={this.state.selectionIndex === results.length}
          onMouseDown={this._onMouseDown.bind(this, result)}>
          { result.displayElements }
        </TypeaheadOption>
      );
    }, this);

    // CustomValue should be added to results list with different class name
    if (this.props.customValue !== null) {

      results.push(
        <TypeaheadOption
          styles={this.props.optionStyles}
          ref={this.props.customValue}
          key={this.props.customValue}
          hover={this.state.selectionIndex === results.length}
          customValue={this.props.customValue}
          onMouseDown={this._onMouseDown.bind(this, this.props.customValue)}>
          { this.props.customValue.inputDisplayText }
        </TypeaheadOption>
      );
    }

    return <TypeaheadList className={classList}>{ results }</TypeaheadList>;
  },

  setSelectionIndex(index) {
    this.setState({
      selectionIndex: index,
      selection: this.getSelectionForIndex(index),
    });
  },

  getSelectionForIndex(index) {
    if (index === null) {
      return null;
    }
    if (index === 0 && this.props.customValue !== null) {
      return this.props.customValue;
    }

    if (this.props.customValue !== null) {
      index -= 1;
    }

    return this.props.options[index];
  },

  _onMouseDown(result, event) {
    return this.props.onOptionSelected(result, event);
  },

  _nav(delta) {
    if (!this.props.options && this.props.customValue === null) {
      return;
    }
    var newIndex = this.state.selectionIndex === null ? (delta == 1 ? 0 : delta) : this.state.selectionIndex + delta;
    var length = this.props.options.length;
    if (this.props.customValue !== null) {
      length += 1;
    }

    if (newIndex < 0) {
      newIndex += length;
    } else if (newIndex >= length) {
      newIndex -= length;
    }

    var newSelection = this.getSelectionForIndex(newIndex);
    this.setState({selectionIndex: newIndex,
                   selection: newSelection});
  },

  navDown() {
    this._nav(1);
  },

  navUp() {
    this._nav(-1);
  }

});

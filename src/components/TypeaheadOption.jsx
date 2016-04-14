var React = require('react');
var Component = require('../component');
var TypeaheadButton = require('./TypeaheadButton');

/**
 * A single option within the TypeaheadOption
 */
module.exports = Component({
  name: 'TypeaheadOption',

  propTypes: {
    customValue: React.PropTypes.string,
    onMouseDown: React.PropTypes.func,
    children: React.PropTypes.string,
    hover: React.PropTypes.bool,
    optionStyles: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      onMouseDown: function(event) { event.preventDefault(); },
      optionStyles: {},
    };
  },

  getInitialState() {
    return {};
  },

  render() {
    return (
      <TypeaheadButton {...this.componentProps('typeaheadButton')} styles={this.props.optionStyles} onMouseDown={this._onMouseDown}>
        { this.props.children }
      </TypeaheadButton>
    );
  },

  _onMouseDown(event) {
    event.preventDefault();
    return this.props.onMouseDown(event);
  }
});

var React = require('react/addons');
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
    hover: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      onMouseDown: function(event) {
        event.preventDefault();
      }
    };
  },

  getInitialState() {
    return {};
  },

  render() {
    return (
      <TypeaheadButton onMouseDown={this._onMouseDown}>
        { this.props.children }
      </TypeaheadButton>
    );
  },

  _onMouseDown(event) {
    event.preventDefault();
    return this.props.onMouseDown(event);
  }
});

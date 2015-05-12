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
    onClick: React.PropTypes.func,
    children: React.PropTypes.string,
    hover: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      onClick: function(event) {
        event.preventDefault();
      }
    };
  },

  getInitialState() {
    return {};
  },

  render() {
    return (
      <TypeaheadButton onClick={this._onClick}>
        { this.props.children }
      </TypeaheadButton>
    );
  },

  _onClick(event) {
    event.preventDefault();
    return this.props.onClick(event);
  }
});

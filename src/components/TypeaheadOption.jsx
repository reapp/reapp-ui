var React = require('react/addons');
var Component = require('../component');
var TypeaheadButton = require('./TypeaheadButton');
var classNames = require('classnames');

/**
 * A single option within the TypeaheadOption
 */
module.exports = Component({
  name: 'TypeaheadOption',

  propTypes: {
    customClasses: React.PropTypes.object,
    customValue: React.PropTypes.string,
    onClick: React.PropTypes.func,
    children: React.PropTypes.string,
    hover: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      customClasses: {},
      onClick: function(event) {
        event.preventDefault();
      }
    };
  },

  getInitialState() {
    return {};
  },

  render() {
    var classes = {};
    classes[this.props.customClasses.hover || "hover"] = !!this.props.hover;
    classes[this.props.customClasses.listItem] = !!this.props.customClasses.listItem;

    if (this.props.customValue) {
      classes[this.props.customClasses.customAdd] = !!this.props.customClasses.customAdd;
    }

    var classList = classNames(classes);

    return (
      <TypeaheadButton className={classList} onClick={this._onClick}>
        <a href="javascript: void 0;" className={this._getClasses()} ref="anchor">
          { this.props.children }
        </a>
      </TypeaheadButton>
    );
  },

  _getClasses() {
    var classes = {
      "typeahead-option": true,
    };
    classes[this.props.customClasses.listAnchor] = !!this.props.customClasses.listAnchor;

    return classNames(classes);
  },

  _onClick(event) {
    event.preventDefault();
    return this.props.onClick(event);
  }
});
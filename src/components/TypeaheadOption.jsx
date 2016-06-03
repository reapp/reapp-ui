var React = require('react');
var Component = require('../component');
var ListItem = require('./ListItem');
/**
 * A single option within the TypeaheadOption
 */
module.exports = Component({
  name: 'TypeaheadOption',

  propTypes: {
    customValue: React.PropTypes.object,
    children: React.PropTypes.string,
    hover: React.PropTypes.bool,
    optionStyles: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      optionStyles: {}
    };
  },

  getInitialState() {
    return {};
  },

  render() {

    var { styles, ...props } = this.props;
    var listItemStyles = { self: this.getStyles('listItem'), touchRipple: this.getStyles('listItem--touchRipple'), children: this.getStyles('listItem--children') };

    return (
      <ListItem styles={ listItemStyles } { ...this.componentProps() } { ...props }>
        { this.props.children }
      </ListItem>
    );
  },

  _onMouseDown(event) {
    event.preventDefault();
    return this.props.onMouseDown(event);
  }
});

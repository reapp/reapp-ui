var React = require('react/addons');
var ReactStyle = require('react-style');
var cx = React.addons.classSet;

require('./ListItem.styl');

var ListItem = React.createClass({
  statics: {
    isListItem: true
  },

  styles: {
    item: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      flexFlow: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: 44
    },

    before: {
      flexShrink: 0,
      flexWrap: 'nowrap',
      margin: '0 12px 0 0'
    },

    after: {
      color: '#999',
      flexShrink: 0,
      margin: '0 12px',
      whiteSpace: 'nowrap'
    },

    content: {
      flexGrow: 10
    }
  },

  makeSection(name, content) {
    return content && (
      <span
        styles={[this.styles[name]].map(ReactStyle)}
        className={`ListItem--${name}`}>
        {content}
      </span>
    );
  },

  render() {
    var { className, styles, children, before, after } = this.props;
    var classes = { ListItem: true };
    classes[className] = !!className;

    return (
      <li className={cx(classes)} styles={[this.styles.item, styles].map(ReactStyle)}>
        {this.makeSection('before', before)}
        {this.makeSection('content', children)}
        {this.makeSection('after', after)}
      </li>
    );
  }
});

module.exports = ListItem;
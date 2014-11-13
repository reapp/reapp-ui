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
    var {
      className,
      styles,
      children,
      title,
      titleAfter,
      titleSub,
      before,
      after,
      wrapper } = this.props;

    var classes = { ListItem: true };
    classes[className] = !!className;

    var content = [
      this.makeSection('before', before),
      this.makeSection('content', [
        <div className="ListItem--titleTop">
          {this.makeSection('title', title)}
          {this.makeSection('titleAfter', titleAfter)}
        </div>,
        this.makeSection('titleSub', titleSub),
        this.makeSection('children', children)
      ]),
      this.makeSection('after', after)
    ];

    if (wrapper)
      content = React.addons.cloneWithProps(wrapper, {
        children: content
      });

    return (
      <li className={cx(classes)} styles={[this.styles.item, styles].map(ReactStyle)}>
        {content}
      </li>
    );
  }
});

module.exports = ListItem;
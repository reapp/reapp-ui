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
      flexGrow: 10,
      color: '#000',
      padding: '10px 10px 10px 0',
    },

    titleTop: {
      flexFlow: 'row',
      justifyContent: 'space-between'
    },

    title: {
      fontWeight: '500',
    },

    titleAfter: {
      color: '#999',
      marginRight: 10
    },

    titleSub: {
      fontSize: '15px'
    },

    children: {
      color: '#999',
      maxHeight: 42,
      fontSize: '15px',
      lineHeight: '21px',
      overflow: 'hidden',
      WebkitLineLamp: 2,
      WebkitBoxOrient: 'vertical',
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

    if (
      React.isValidElement(children) &&
      (children.type === 'a' ||
        children.type && children.type.displayName === 'Link' )
    ) {
      wrapper = children;
      children = wrapper.props.children;
    }

    var content = [
      this.makeSection('before', before),
      this.makeSection('content', [
        this.makeSection('titleTop', [
          this.makeSection('title', title),
          this.makeSection('titleAfter', titleAfter)
        ]),
        this.makeSection('titleSub', titleSub),
        this.makeSection('children', children)
      ]),
      this.makeSection('after', after)
    ];

    if (wrapper)
      content = React.addons.cloneWithProps(wrapper, {
        children: content,
        styles: [this.styles.item].map(ReactStyle)
      });

    return (
      <li className={cx(classes)} styles={[this.styles.item, styles].map(ReactStyle)}>
        {content}
      </li>
    );
  }
});

module.exports = ListItem;
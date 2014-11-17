var React = require('react/addons');
var ReactStyle = require('react-style');
var cx = React.addons.classSet;

require('./ListItem.styl');

var ListItem = React.createClass({
  statics: {
    isListItem: true
  },

  getDefaultProps() {
    return {
      styles: {}
    };
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

    wrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },

    before: {
      flexShrink: 0,
      flexWrap: 'nowrap',
      margin: '0 12px 0 0'
    },

    after: {
      color: '#999',
      flexShrink: 0,
      margin: '0',
      whiteSpace: 'nowrap',
      alignSelf: 'stretch'
    },

    content: {
      flexShrink: 1,
      flexGrow: 10,
      color: '#000',
      padding: '10px 10px 10px 0',
      position: 'relative'
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
      maxHeight: 42,
      fontSize: '15px',
      lineHeight: '21px',
      overflow: 'hidden',
      WebkitLineLamp: 2,
      WebkitBoxOrient: 'vertical',
    }
  },

  getStyle(name) {
    return [this.styles[name], this.props.styles[name]].map(ReactStyle);
  },

  makeSection(name, content) {
    return content && (
      <span
        styles={this.getStyle(name)}
        className={`ListItem--${name}`}>
        {content}
      </span>
    );
  },

  hasLinkAsChild(children) {
    return  React.isValidElement(children) &&
      (children.type === 'a' ||
        children.type && children.type.displayName === 'Link' );
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

    // make a top level link into a wrapper so it can take up the whole item
    if (!wrapper && this.hasLinkAsChild(children)) {
      wrapper = children;
      children = wrapper.props.children;
    }

    this.styles.children.color =  title ? '#999' : '#000';

    if (wrapper)
      wrapper = React.addons.cloneWithProps(wrapper, {
        children: null,
        styles: [this.styles.wrapper].map(ReactStyle)
      });

    var span = this.makeSection;
    var content = [
      span('before', before),
      span('content', [
        span('wrapper', wrapper),
        (title || titleAfter) && span('titleTop', [
          span('title', title),
          span('titleAfter', titleAfter)
        ]),
        span('titleSub', titleSub),
        span('children', children)
      ]),
      span('after', after)
    ];

    return (
      <li className={cx(classes)} styles={[this.styles.item, styles].map(ReactStyle)}>
        {content}
      </li>
    );
  }
});

module.exports = ListItem;
var React = require('react/addons');
var Styled = require('ui/styled');
var cx = React.addons.classSet;

require('./ListItem.styl');

var ListItem = React.createClass({
  mixins: [Styled('listitem')],

  statics: {
    isListItem: true
  },

  makeSection(name, content) {
    return content && (
      <span
        styles={this.getStyles(name)}
        className={`ListItem--${name}`}>
        {content}
      </span>
    );
  },

  isLink(el) {
    return el.type && (el.type === 'a' || el.type.displayName === 'Link');
  },

  hasLinkAsChild(children) {
    return  React.isValidElement(children) && this.isLink(children);
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

    // this.styles.children.color =  title ? '#999' : '#000';

    if (wrapper)
      wrapper = React.addons.cloneWithProps(wrapper, {
        children: null,
        styles: this.getStyles('wrapper')
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
      <li
        className={cx(classes)}
        styles={this.getStyles()}>
        {content}
      </li>
    );
  }
});

module.exports = ListItem;
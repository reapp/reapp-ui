var React = require('react/addons');
var Styled = require('ui/styled');
var Icon = require('./Icon');
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
      children,
      title,
      titleAfter,
      titleSub,
      before,
      after,
      wrapper,
      noicon } = this.props;

    var classes = { ListItem: true };
    classes[className] = !!className;

    // make a top level link into a wrapper so it can take up the whole item
    if (!wrapper && this.hasLinkAsChild(children)) {
      wrapper = children;
      children = wrapper.props.children;
    }

    if (!this.getStyleVal('children', 'color'))
      this.addStyles('children', { color: title ? '#999' : '#000' });

    if (wrapper) {
      var hasLinkIcon = this.isLink(wrapper) && !noicon;

      wrapper = React.addons.cloneWithProps(wrapper, {
        children: hasLinkIcon ?
          <Icon
            styles={this.getStyles('arrow')}
            size={12}
            stroke={2}
            color="#ccc"
            type="right" /> :
          null,
        styles: this.getStyles('wrapper')
      });

      if (hasLinkIcon) {
        // pad out right side if wrapper
        this.addStyles({ paddingRight: 20 });
      }
    }

    var span = this.makeSection;
    var content = [
      span('wrapper', wrapper),
      span('before', before),
      span('content', [
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
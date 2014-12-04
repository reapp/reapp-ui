var React = require('react');
var Component = require('ui/component');
var Icon = require('./Icon');

module.exports = Component('ListItem', {
  makeSection(name, content) {
    return content && (
      <span {...this.componentProps(name)}>
        {content}
      </span>
    );
  },

  isLink(el) {
    return el.type && (el.type === 'a' || el.type.displayName === 'Link');
  },

  hasLinkAsChild(child) {
    return  React.isValidElement(child) && this.isLink(child);
  },

  render() {
    var {
      children,
      title,
      titleAfter,
      titleSub,
      before,
      after,
      wrapper,
      noicon,
      ...props } = this.props;

    // make a top level link into a wrapper so it can take up the whole item
    if (!wrapper && this.hasLinkAsChild(children)) {
      wrapper = children;
      children = wrapper.props.children;
    }

    // todo: implement getConstant
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
            color={this.getStyleVal('arrow', 'color')}
            type="right" /> :
          null,
        styles: this.getStyles('wrapper')
      });

      // pad out right side if it has a wrapper
      if (hasLinkIcon)
        this.addStyles({ paddingRight: 20 });
    }

    var hasTitle = (title || titleAfter);

    if (!hasTitle)
      this.addStyles('children', this.styles.childrenNoTitle);

    if (React.isValidElement(children) && children.type.isInput) {
      this.addStyles('content', this.styles.contentBorderless);
    }

    var span = this.makeSection;
    var content = [
      span('wrapper', wrapper),
      span('before', before),
      span('content', [
        hasTitle && span('titleTop', [
          span('title', title),
          span('titleAfter', titleAfter)
        ]),
        span('titleSub', titleSub),
        span('children', children)
      ]),
      span('after', after)
    ];

    return (
      <li {...props} {...this.componentProps()}>
        {content}
      </li>
    );
  }
});
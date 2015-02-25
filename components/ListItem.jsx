var React = require('react/addons');
var Component = require('../component');
var Icon = require('./Icon');
var Tappable = require('../mixins/Tappable');

module.exports = Component({
  name: 'ListItem',

  mixins: [
    React.addons.PureRenderMixin,
    Tappable
  ],

  propTypes: {
    title: React.PropTypes.node,
    titleAfter: React.PropTypes.node,
    titleSub: React.PropTypes.node,
    before: React.PropTypes.node,
    after: React.PropTypes.node,
    wrapper: React.PropTypes.node,
    underLeft: React.PropTypes.node,
    underRight: React.PropTypes.node,
    noicon: React.PropTypes.bool,
    icon: React.PropTypes.bool,
    nopad: React.PropTypes.bool
  },

  makeSection(name, content, props) {
    return content &&
      <span
        {...props}
        {...this.componentProps(name)}
        key={`${name}-${this.props.key}`}>
        {content}
      </span>
  },

  isLink(el) {
    return (
      el.type === 'a' ||
      el.type.displayName === 'Link'
    );
  },

  hasLinkAsChild(child) {
    return React.isValidElement(child) && this.isLink(child);
  },

  getIcon() {
    return
      <Icon
        file={require('../assets/icons/right.svg')}
        styles={this.getStyles('arrow')}
        size={12}
        stroke={3}
        color={this.getConstant('listItemArrowColor')}
      />
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
      underLeft,
      underRight,
      noicon,
      icon,
      nopad,
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
      var hasLinkIcon = this.isLink(wrapper) && !noicon || icon;

      wrapper = React.addons.cloneWithProps(wrapper, {
        children: hasLinkIcon ?
          this.getIcon() :
          null,
        style: this.getStyles('wrapper')[0]
      });

      // pad out right side if it has a wrapper
      if (hasLinkIcon)
        this.addStyles({ paddingRight: 20 });
    }
    else if (icon) {
      wrapper = this.getIcon();
    }

    var hasTitle = (title || titleAfter);

    if (!hasTitle)
      this.addStyles('children', 'childrenNoTitle');

    if (nopad || children && children.type && children.type.liNoPad)
      this.addStyles('content', 'contentNoPad');

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
      span('after', after),
    ];

    var cProps = this.componentProps();

    return (
      <li {...cProps} {...props} {...this.tappableProps({ className: cProps.className })}>
        {content}
      </li>
    );
  }
});
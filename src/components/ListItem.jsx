var React = require('react');
var Component = require('../component');
var Icon = require('./Icon');
var Tappable = require('../mixins/Tappable');
var clone = require('../lib/niceClone');
var linkedIcon = require('../assets/icons/right.svg');
var TouchRipple = require('../helpers/ripple/TouchRipple');

module.exports = Component({
  name: 'ListItem',

  mixins: [
    Tappable
  ],

  propTypes: {
    // displayed in bold at the top
    title: React.PropTypes.node,

    // aligns to the right of title, for badges, time, etc
    titleAfter: React.PropTypes.node,

    // lighter sub title
    titleSub: React.PropTypes.node,

    // place an icon or element before the item
    before: React.PropTypes.node,

    // place an icon or element after the item
    after: React.PropTypes.node,

    // wrap an element around the item, good for links
    wrapper: React.PropTypes.node,

    // show an icon indicating it's linked
    icon: React.PropTypes.bool,

    // don't add padding
    nopad: React.PropTypes.bool
  },

  makeSection(name, content, props) {
    return content &&
      <div
        {...props}
        {...this.componentProps(name)}
        key={`${name}-${this.props.key}`}>
        {content}
      </div>
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
    return (
      <Icon
        file={linkedIcon}
        styles={this.getStyles('arrow')}
        size={12}
        stroke={3}
        color={this.getConstant('listItemArrowColor')}
      />
    );
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
      icon,
      nopad,
      index,
      fulltext,
      ...props } = this.props;

    if (index === 0) {
      this.addStyles('content', 'borderless');
      this.addStyles('after', 'borderless');
    }

    if (fulltext)
      this.addStyles('children', 'fulltext');

    // make a top level link into a wrapper so it can take up the whole item
    if (!wrapper && this.hasLinkAsChild(children)) {
      wrapper = children;
      children = wrapper.props.children;
    }

    if (!this.getStyleVal('children', 'color'))
      this.addStyles('children', {
        color: this.getConstant(title ? 'listItemChildrenColor' : 'listItemColor')
      });

    if (wrapper) {
      var hasLinkIcon = this.isLink(wrapper) || icon;

      var padStyles = {};
      if (hasLinkIcon)
        padStyles = this.getStyles('wrapperPadRight');

      wrapper = clone(wrapper, {
        children: hasLinkIcon ?
          this.getIcon() :
          null,
        style: Object.assign({}, this.getStyles('wrapper')[0], padStyles[0])
      });

      // pad out right side if it has a wrapper
      
    }
    else if (icon) {
      wrapper = this.getIcon();
    }

    var hasTitle = (title || titleAfter);

    if (!hasTitle)
      this.addStyles('children', 'childrenNoTitle');

    if (nopad || children && children.type && children.type.liNoPad)
      this.addStyles('content', 'contentNoPad');

    if (!before)
      this.addStyles('touchRipple', 'selfNoPadLeft');

    if (!after)
      this.addStyles('touchRipple', 'selfNoPadRight');

    var section = this.makeSection;
    var content = [
      section('wrapper', wrapper),
      section('before', before),
      section('content', [
        hasTitle && section('titleTop', [
          section('title', title),
          section('titleAfter', titleAfter)
        ]),
        section('titleSub', titleSub),
        section('children', children)
      ]),
      section('after', after),
    ];

    var tapProps;
    tapProps = this.tappableProps();

    if (this.state.tapActive)
      this.addStyles('tapActive');

    var touchRippleStyles = {
      self: this.componentProps('touchRipple').style
    }

    return (
      <div {...tapProps} {...props} {...this.componentProps()}>
        <TouchRipple
          styles={touchRippleStyles}
          centerRipple={false}
        >
          {content}
        </TouchRipple>
      </div>
    );
  }
});
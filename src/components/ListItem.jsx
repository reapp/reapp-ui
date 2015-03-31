var React = require('react/addons');
var Component = require('../component');
var Icon = require('./Icon');
var Tappable = require('../mixins/Tappable');
var clone = require('../lib/niceClone');
var linkedIcon = require('../assets/icons/right.svg');

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
    noicon: React.PropTypes.bool,
    icon: React.PropTypes.bool,
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
      noicon,
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
      var hasLinkIcon = this.isLink(wrapper) && !noicon || icon;

      wrapper = clone(wrapper, {
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
    if (this.props.onTap)
      tapProps = this.tappableProps();

    if (this.state.tapActive)
      this.addStyles('tapActive');

    return (
      <div {...tapProps} {...props} {...this.componentProps()}>
        {content}
      </div>
    );
  }
});
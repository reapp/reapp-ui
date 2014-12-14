var React = require('react');
var Component = require('ui/component');
var Icon = require('./Icon');
var TweenState = require('react-tween-state');
var Animator = require('../lib/mixins/Animator');

module.exports = Component({
  name: 'ListItem',

  // todo: testing this as a simple example of animating
  // mixins: [TweenState.Mixin, Animator],

  // getDefaultProps() {
  //   return {
  //     animations: [{ name: 'fadeDown', source: 'listItem' }],
  //     step: 0,
  //   };
  // },

  // componentDidMount() {
  //   this.setState({ step: this.props.index - 1 });
  //   this.tweenState('step', {
  //     endValue: this.props.index,
  //     duration: 100
  //   });
  // },

  makeSection(name, content) {
    return content && (
      <span {...this.componentProps(name)} key={`${name}-${this.props.key}`}>
        {content}
      </span>
    );
  },

  isLink(el) {
    return el.type && (el.type === 'a' || el.type.displayName === 'Link');
  },

  hasLinkAsChild(child) {
    return React.isValidElement(child) && this.isLink(child);
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
      nopad,
      ...props } = this.props;

    // this.animate('listItem', {
    //   step: this.state.step
    // });

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
            name="right"
            styles={this.getStyles('arrow')}
            size={12}
            stroke={2}
            color={this.getStyleVal('arrow', 'color')} /> :
          null,
        styles: this.getStyles('wrapper')
      });

      // pad out right side if it has a wrapper
      if (hasLinkIcon)
        this.addStyles({ paddingRight: 20 });
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
      span('after', after)
    ];

    return (
      <li {...this.componentProps()} {...props}>
        {content}
      </li>
    );
  }
});
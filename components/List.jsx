var React = require('react/addons');
var Component = require('../component');
var clone = require('../lib/niceClone');
var ListItem = require('./ListItem');
var Title = require('./Title');
// var StickyTitles = require('sticky-titles');

module.exports = Component({
  name: 'List',

  propTypes: {
    type: React.PropTypes.string,
    liProps: React.PropTypes.object,
    title: React.PropTypes.node,
    nowrap: React.PropTypes.bool,
    nopad: React.PropTypes.bool
  },

  componentDidMount() {
    // todo: StickyTItles
  },

  componentWillUnmount() {
    // todo: undo stickytitles
  },

  render() {
    var {
      children,
      liProps,
      title,
      type,
      nowrap,
      nopad,
      ...props } = this.props;

    if (type)
      this.addStyles(this.getStyles(`type-${type}`));

    return (
      <ul {...this.componentProps()} {...props}>
        {title && (
          <Title>{title}</Title>
        )}
        {React.Children.map(children, (li, i) => {
          if (nowrap || li.type && li.type.isListItem)
            return clone(li, { key: i, index: i, nopad });

          return (
            <ListItem {...liProps}
              index={i}
              key={i}
              nopad={nopad}>
              {li.content || li}
            </ListItem>
          );
        })}
      </ul>
    );
  }
});
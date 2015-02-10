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
    wrap: React.PropTypes.bool,
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
      wrap,
      nopad,
      ...props } = this.props;

    if (type)
      this.addStyles(this.getStyles(`type-${type}`));

    return (
      <ul {...this.componentProps()} {...props}>
        {title && (
          <Title styles={this.getStyles('title')}>{title}</Title>
        )}
        {React.Children.map(children, (li, i) => {
          if (wrap)
            return (
              <ListItem {...liProps}
                index={i}
                key={i}
                nopad={nopad}>
                {li.content || li}
              </ListItem>
            );

          return clone(li, { key: i, index: i, nopad });
        })}
      </ul>
    );
  }
});
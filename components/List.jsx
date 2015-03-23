var React = require('react');
var Component = require('../component');
var clone = require('../lib/niceClone');
var ListItem = require('./ListItem');
var Title = require('./Title');

module.exports = Component({
  name: 'List',

  propTypes: {
    type: React.PropTypes.string,
    itemProps: React.PropTypes.object,
    title: React.PropTypes.node,
    wrap: React.PropTypes.bool,
    nopad: React.PropTypes.bool
  },

  render() {
    var {
      children,
      itemProps,
      title,
      type,
      wrap,
      nopad,
      ...props } = this.props;

    if (type)
      this.addStyles(this.getStyles(`type-${type}`));

    return (
      <div {...this.componentProps()} {...props}>
        {title && (
          <Title styles={this.getStyles('title')}>{title}</Title>
        )}
        {React.Children.map(children, (li, i) => {
          if (wrap)
            return (
              <ListItem {...itemProps}
                index={i}
                key={i}
                nopad={nopad}>
                {li.content || li}
              </ListItem>
            );

          return clone(li, { key: i, index: i, nopad });
        })}
      </div>
    );
  }
});
var React = require('react');
var Component = require('../component');
var clone = require('../lib/niceClone');
var ListItem = require('./ListItem');
var Title = require('./Title');

var List = Component({
  name: 'List',

  propTypes: {
    // pass props to List.Item
    itemProps: React.PropTypes.object,

    // List title
    title: React.PropTypes.node,

    // Automatically wrap children with List.Item
    wrap: React.PropTypes.bool,

    // Don't add padding
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

List.Item = require('./ListItem');

module.exports = List;
var React = require('react/addons');
var Component = require('../component');
var clone = require('../lib/niceClone');
var ListItem = require('./ListItem');
// var StickyTitles = require('sticky-titles');

module.exports = Component({
  name: 'List',

  componentDidMount() {
    // todo: StickyTItles
  },

  componentWillUnmount() {
    // todo: undo stickytitles
  },

  render() {
    var { children, type, liProps, title, nowrap, nopad, ...props } = this.props;

    if (type)
      this.addStyles(this.styles[type]);

    return (
      <ul {...this.componentProps()} {...props}>
        {title && (
          <li {...this.componentProps('title')}>
            {title}
          </li>
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
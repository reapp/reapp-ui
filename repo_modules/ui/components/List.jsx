var React = require('react/addons');
var Component = require('ui/component');
var ListItem = require('./ListItem');
// var StickyTitles = require('sticky-titles');

require('./List.styl');

module.exports = Component({
  name: 'List',

  componentDidMount() {
    // todo: expect StickyTItles
    var titles = this.getDOMNode().querySelectorAll('.List--title');
    if (titles) {
      // new StickyTitles(titles);
    }
  },

  componentWillUnmount() {
    // todo: undo stickytitles
  },

  render() {
    var { children, type, liProps, title, dontWrapChildren } = this.props;

    if (type)
      this.addStyles(this.styles[type]);

    return (
      <ul {...this.componentProps()}>
        {title && (
          <li {...this.componentProps('title')}>
            {title}
          </li>
        )}
        {React.Children.map(children, (li, i) => {
          if (dontWrapChildren || li.type && li.type.isListItem)
            return React.addons.cloneWithProps(li, { key: i, index: i });

          return (
            <ListItem {...liProps}
              index={i}
              key={i}>
              {li.content || li}
            </ListItem>
          );
        })}
      </ul>
    );
  }
});
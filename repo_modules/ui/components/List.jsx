var React = require('react/addons');
var Component = require('ui/component');
var ListItem = require('./ListItem');
var StickyTitles = require('sticky-titles');

require('./List.styl');

var List = Component('list', {
  componentDidMount() {
    // todo: expect StickyTItles
    var titles = this.getDOMNode().querySelectorAll('.List--title');
    if (titles) {
      new StickyTitles(titles);
    }
  },

  componentWillUnmount() {
    // todo: undo stickytitles
  },

  render() {
    var {
      children,
      type,
      liProps,
      title,
      dontWrap
    } = this.props;

    if (type)
      this.addStyles(this.styles[type]);

    return (
      <ul {...this.componentProps()}>
        {title && <li className="List--title">{title}</li>}
        {React.Children.map(children, (li, i) => {
          if (dontWrap || li.type && li.type.isListItem)
            return React.addons.cloneWithProps(li, { key: i, index: i });

          return (
            <ListItem {...liProps}
              index={i}
              key={li.key || i}>
              {li.content || li}
            </ListItem>
          );
        })}
      </ul>
    );
  }
});

module.exports = List;
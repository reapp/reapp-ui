var React = require('react/addons');
var Styled = require('ui/styled');
var ListItem = require('./ListItem');
var StickyTitles = require('sticky-titles');
var cx = React.addons.classSet;

require('./List.styl');

var List = React.createClass({
  mixins: [Styled('list')],

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
      className,
      children,
      type,
      liProps,
      title,
      dontWrap
    } = this.props;

    var classes = { List: true };
    classes[className] = !!className;

    if (type)
      this.addStyles(this.styles[type]);


    console.log('LIST', className, this.getStyles(), liProps);

    return (
      <ul
        className={cx(classes)}
        styles={this.getStyles()}>

        {title && <li className="List--title">{title}</li>}
        {React.Children.map(children, (li, i) => {
          if (dontWrap || li.type && li.type.isListItem)
            return React.addons.cloneWithProps(li, { key: i, index: i });

          return (
            <ListItem
              {...liProps}
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
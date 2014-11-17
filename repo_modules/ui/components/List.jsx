var React = require('react/addons');
var ReactStyle = require('react-style');
var ListItem = require('./ListItem');
var StickyTitles = require('sticky-titles');
var cx = React.addons.classSet;

require('./List.styl');

var List = React.createClass({
  styles: {
    list: {
      background: '#fff',
      borderTop: '1px solid #c8c7cc',
      borderBottom: '1px solid #c8c7cc',
      margin: 0,
      padding: '0 0 0 12px',
      zIndex: 101,
      fontSize: '16px'
    },

    inset: {
      margin: 20,
      borderRadius: 10
    }
  },

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
      styles,
      liProps,
      title,
      dontWrap
    } = this.props;

    var classes = { List: true };
    var listStyles = [this.styles.list, styles];
    if (type) listStyles.push(this.styles[type]);
    classes[className] = !!className;

    return (
      <ul className={cx(classes)} styles={listStyles.map(ReactStyle)}>
        {title && <li className="List--title">{title}</li>}
        {React.Children.map(children, (li, i) => {
          if (dontWrap || li.type && li.type.isListItem)
            return React.addons.cloneWithProps(li, { key: i });

          return (
            <ListItem
              {...liProps}
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
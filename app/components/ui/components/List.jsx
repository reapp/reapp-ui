var React = require('react');
var ReactStyle = require('react-style');
var ListItem = require('./ListItem');

require('./List.styl');

var List = React.createClass({
  shouldComponentUpdate(nextProps) {
    // console.log('list', this.props.children !== nextProps.children)
    return this.props.children !== nextProps.children;
  },

  styles: {
    list: ReactStyle({
      margin: '-10px 0 0',
      padding: 10,
      zIndex: 101,
    }),
  },

  render() {
    return (
      <ul className={this.props.className || "list"} styles={[this.styles.list, this.props.styles]}>
        {React.Children.map(this.props.children, (li, i) => {
          return <ListItem key={li.key || i}>{li.content || li}</ListItem>
        })}
      </ul>
    );
  }
});

module.exports = List;
var React = require('react/addons');
var ReactStyle = require('react-style');
var cx = React.addons.classSet;

require('./ListItem.styl');

var ListItem = React.createClass({
  styles: {
    li: ReactStyle({
      listStyle: 'none',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    })
  },

  render() {
    var contentClasses = { 'list-item__content': true };
    if (this.props.className) contentClasses[this.props.className] = true;

    return (
      <li className="ListItem" styles={this.styles.li}>
        <div className={cx(contentClasses)}>
          {this.props.children}
        </div>
      </li>
    );
  }
});

module.exports = ListItem;
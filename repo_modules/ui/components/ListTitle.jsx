var React = require('react/addons');
var ReactStyle = require('react-style');

var ListTitle = React.createClass({
  styles: {
    fontSize: '13px',
    textTransform: 'uppercase',
    color: '#888',
    padding: '10px 0 2px 12px',
    margin: '15px 0 5px',
    fontWeight: 'normal'
  },

  render() {
    return this.transferPropsTo(
      <h3 className="list-title" style={this.styles}>
        {this.props.children}
      </h3>
    );
  }
});

module.exports = ListTitle;
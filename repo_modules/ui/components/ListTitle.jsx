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
    var { children, ...props } = this.props;

    return (
      <h3 {...props} className="list-title" style={this.styles}>
        {children}
      </h3>
    );
  }
});

module.exports = ListTitle;
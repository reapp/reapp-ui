var React = require('react/addons');
var ReactStyle = require('react-style');

var TitleView = React.createClass({
  styles: ReactStyle({
    overflow: 'scroll',
    position: 'absolute',
    top: 44,
    left: 0,
    bottom: 0,
    right: 0
  }),

  render() {
    return (
      <div styles={this.styles}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = TitleView;
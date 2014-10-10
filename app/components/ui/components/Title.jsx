var React = require('react');
var ReactStyle = require('react-style');

var Title = React.createClass({
  styles: ReactStyle`
    text-align: center;
    font-weight: bold;
  `,

  render() {
    return (
      <div styles={this.styles}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = Title;
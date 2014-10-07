var React = require('react');
var ReactStyle = require('react-style');

var View = React.createClass({
  styles: ReactStyle`
    background: #efeff4;
    height: 100%;
  `,

  render() {
    return (
      <div className="pane" styles={this.styles}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = View;
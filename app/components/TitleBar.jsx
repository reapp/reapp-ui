var React = require('react');
var DocumentTitle = require('react-document-title');
var Toolbar = require('./ui/components/Toolbar');
var Title = require('./ui/components/Title');

var TitleBar = React.createClass({

  render() {
    return (
      <Toolbar>
        <DocumentTitle title={this.props.title || this.props.children} />
        <Title>{this.props.children}</Title>
      </Toolbar>
    );
  }

});

module.exports = TitleBar;
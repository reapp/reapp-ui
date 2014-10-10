var React = require('react');
var LeftNavView = require('./ui/views/LeftNavView');

require('./Layout.css');

var Layout = React.createClass({
  render() {
    return (
      <LeftNavView
        ref="leftNavView"
        topContent={this.props.header}
        sideContent={this.props.menu}
        topHeight={51}
        sideWidth={200}>

        <div id="layout">
          {this.props.children}
        </div>

      </LeftNavView>
    );
  }
});

module.exports = Layout;
/** @jsx React.DOM */
var React = require('react');

if (typeof window !== 'undefined') {
  window.GSS_CONFIG = {
    worker: "/bower/gss/dist/worker.js"
  };
}

module.exports = React.createClass({

  render: function() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{this.props.title}</title>
          <link rel="stylesheet" href="/assets/css/app.css" type="text/css" media="all" />
          <link rel="stylesheet" type="text/gss" href="/assets/gss/styles.gss"></link>
          <script type="text/javascript" src="/bower/scroller/src/Animate.js"></script>
          <script type="text/javascript" src="/bower/scroller/src/EasyScroller.js"></script>
          <script type="text/javascript" src="/bower/scroller/src/Scroller.js"></script>
          <script src="/bower/gss/dist/gss.js"></script>
        </head>
        <body onClick={this.props.onClick}>
          {this.props.children}
        </body>
      </html>
    );
  }

});
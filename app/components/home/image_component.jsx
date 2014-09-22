/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({

  style: {
    div: {
      position: 'absolute',
      zIndex: 0
    },

    img: {
      width: '100%'
    }
  },

  layout: {
  },

  render: function() {
    var divStyle = this.style.div;
    if (this.props.active) divStyle.zIndex = 1;
    else divStyle.zIndex = 0;

    return (
      <div class="image" style={divStyle}>
        <img src={this.props.src} style={this.style.img} />
      </div>
    );
  }

});
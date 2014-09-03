/** @jsx React.DOM */
var React = require('react');

var ImageBox = React.createClass({

  style: {
    width: '100%'
  },

  layout: {
  },

  render: function() {
    var image = this.props.image;

    return (
      <div class="image">
        <h1>{image.title}</h1>
        <img src={"http://localhost:3111/images/home/" + image.image_url} />
      </div>
    );
  }

});

module.exports = ImageBox;
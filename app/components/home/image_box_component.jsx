/** @jsx React.DOM */
var Reactor = require('react');
var Image = require('./image_component');

module.exports = Reactor.createClass({

  style: {
    '.images': {
      width: '100%'
    }
  },

  layout: {
  },

  render: function() {
    return (
      <div id="images">
        {this.props.images.map(function(image) {
          return (
            <div class="image">
              <div>{image.getKeys()}</div>
              <h1>{image.title}</h1>
              <img src={"http://localhost:3111/images/home/" + image.image_url} />
            </div>
          );
        })}
      </div>
    );
  }

});

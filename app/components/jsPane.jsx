/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return { activeImage: 0 };
  },

  changeImage: function(i, e) {
    e.preventDefault();
    this.setState({ activeImage: i });
  },

  render: function() {
    var fullImage = this.props.images[this.state.activeImage].full.val();

    return (
      <section id="imagery">
        <img src={this.props.path + fullImage} />

        <ul className="thumbs">
          {this.props.images.map(function(image, i) {
            return (
              <li key={i}>
                <a href="#" onMouseEnter={this.changeImage.bind(this, i)}>
                  <img src={this.props.path + image.thumb.val()} />
                </a>
              </li>
            );
          }.bind(this))}
        </ul>
      </section>
    );
  }

});
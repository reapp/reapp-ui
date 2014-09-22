/** @jsx React.DOM */
var React = require('react');
var Image = require('./image_component');

module.exports = React.createClass({

  propTypes: {
    images: React.PropTypes.array.isRequired
  },

  style: {
    width: '100%'
  },

  getInitialState: function() {
    return {
      activeImage: 0,
      numImages: this.props.images.length,
      width: 0
    };
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleWindowSize);
    this.handleWindowSize();
  },

  handleWindowSize: function() {
    this.setState({
      width: this.refs.images.getDOMNode().offsetWidth
    });
  },

  onMouseMove: function(e) {
    var which = Math.round(this.state.numImages * ( e.clientX / this.state.width ) );
    this.setState({ activeImage: which });
  },

  render: function() {
    var base = "http://localhost:2992/images/home/";

    return (
      <div ref="images" id="images" style={this.style} onMouseMove={this.onMouseMove}>
        {this.props.images.map(function(image, index) {
          var fullSrc = base + image.image_url;
          var active = index === this.state.activeImage;
          return (
            <Image src={fullSrc} active={active} />
          );
        }.bind(this))}
      </div>
    );
  }

});
var React = require('react');
var Image = require('./image_component');

module.exports = React.createClass({

  style: {
    width: '100%'
  },

  getInitialState() {
    return {
      activeImage: 0,
      numImages: this.props.images.length,
      width: 0
    };
  },

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowSize);
    this.handleWindowSize();
  },

  handleWindowSize() {
    this.setState({
      width: this.refs.images.getDOMNode().offsetWidth
    });
  },

  onMouseMove(e) {
    var which = Math.round(this.state.numImages * ( e.clientX / this.state.width ) );
    this.setState({ activeImage: which });
  },

  renderImage(image, index) {
    var active = index === this.state.activeImage;
    return <Image key={index} src={image} active={active} />;
  },

  render() {
    return (
      <div ref='images' id='images' style={this.style} onMouseMove={this.onMouseMove}>
        {this.props.images.map(this.renderImage)}
      </div>
    );
  }

});
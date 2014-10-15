var React = require('react');
var Image = require('./ImageRollItem');
var { FluxChildMixin } = require('../../flux/bootstrap');
var AutoBind = require('fluxxor-autobind');

var ImageRoll = React.createClass({
  mixins: [FluxChildMixin, AutoBind.Mixin('theTime')],

  style: {
    width: '100%',
    position: 'relative'
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

  whichImage(clientX) {
    return Math.round(this.state.numImages * ( clientX / this.state.width ) );
  },

  onMouseMove(e) {
    this.setState({ activeImage: this.whichImage(e.clientX) });
  },

  onTouchEvent(e) {
    if (!e.touches[0]) return;
    this.setState({ activeImage: this.whichImage(e.touches[0].clientX) });
  },

  renderImage(image, index) {
    var active = index === this.state.activeImage;
    return <Image key={index} src={image} active={active} />;
  },

  render() {
    return (
      <div
        ref='images'
        id='images'
        style={this.style}
        onMouseMove={this.onMouseMove}
        onTouchStart={this.onTouchEvent}
        onTouchEnd={this.onTouchEvent}
        onTouchMove={this.onTouchEvent}>
        {this.props.images.map(this.renderImage)}
        <p style={{position: 'fixed', bottom:0 }}>{this.state.theTime}</p>
      </div>
    );
  }

});

module.exports = ImageRoll;
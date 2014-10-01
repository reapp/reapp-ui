// Implicit require of Scroller from Zynga
var ImageCardContainer = require('./ImageCardContainer');
var React = require('react');

var TouchableArea =
  require('../touch/TouchableArea');

var Viewer = React.createClass({
  componentWillMount() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://localhost:8000/app/assets/js/scroller.js';
    document.getElementsByTagName('head')[0].appendChild(script);

    script.onload = function() {
      this.scroller = new Scroller(this.handleScroll, {
        snapping: true
      });
    };
  },

  componentDidMount() {
    console.log('waht')
    this.scroller.setDimensions(
      this.props.width,
      this.props.height,
      this.props.width * this.props.images.urls.length,
      this.props.height
    );
    this.scroller.setSnapSize(this.props.width, this.props.height);
  },

  getInitialState() {
    return {left: 0};
  },

  handleScroll(left, top, zoom) {
    this.setState({left: left});
  },

  render() {
    console.log('heloooo')

    var images = this.props.images.urls.map(function(url, i) {
      if (this.state.left < (i - 1) * this.props.width || this.state.left > (i + 1) * this.props.width) {
        return null;
      }

      // Find the highest resolution image
      return (
        <ImageCardContainer
          left={this.state.left}
          key={i}
          index={i}
          url={url}
          width={this.props.width}
          height={this.props.height}
          caption={'LoremPixel photo #' + (i + 1)} />
      );
    }, this);

    return (
      <TouchableArea
        className="Viewer"
        style={{width: this.props.width, height: this.props.height}}
        scroller={this.scroller}>
        {images}
      </TouchableArea>
    );
  }
});

module.exports = Viewer;
var React = require('react');
var Component = require('../component');
var GalleryCard = require('./GalleryCard');
var TouchableArea = require('../helpers/TouchableArea');
var { Scroller } = require('reapp-scroller');

module.exports = Component({
  componentWillMount() {
    this.scroller = new Scroller(this.handleScroll, {
      snapping: true
    });
  },

  componentDidMount() {
    this.scroller.setDimensions(
      this.props.width,
      this.props.height,
      this.props.width * this.props.images.length,
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
    var { width, height, images, ...props } = this.props;

    var images = images.map(function(url, i) {
      if (this.state.left < (i - 1) * width ||
          this.state.left > (i + 1) * width)
        return null;

      // Find highest resolution image
      return (
        <GalleryCard
          left={this.state.left}
          key={i}
          index={i}
          url={url}
          width={width}
          height={height}
        />
      );
    }, this);

    this.addStyles({
      width: width,
      height: height
    });

    return (
      <TouchableArea
        {...this.componentProps()}
        scroller={this.scroller}
        {...this.props}>
        {images}
      </TouchableArea>
    );
  }
});
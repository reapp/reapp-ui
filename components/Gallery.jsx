var React = require('react');
var Component = require('../component');
var GalleryCard = require('./GalleryCard');
var TouchableArea = require('../helpers/TouchableArea');
var TweenState = require('react-tween-state');
var Icon = require('./Icon');
var Button = require('./Button');
var { Scroller } = require('reapp-scroller');

module.exports = Component({
  name: 'Gallery',

  mixins: [
    TweenState.Mixin
  ],

  propTypes: {
    images: React.PropTypes.array.isRequired,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    onClose: React.PropTypes.func,
    animationDuration: React.PropTypes.number,
    animations: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      animationDuration: 200,
      animations: {
        self: 'fade'
      }
    };
  },

  getInitialState() {
    return {
      left: 0,
      step: 0,
      index: 1
    }
  },

  componentWillMount() {
    this.scroller = new Scroller(this.handleScroll, {
      snapping: true
    });
  },

  componentDidMount() {
    if (this.props.animations)
      this.tweenState('step', {
        endValue: 1,
        duration: this.props.animationDuration
      });

    this.scroller.setDimensions(
      this.props.width,
      this.props.height,
      this.props.width * this.props.images.length,
      this.props.height
    );
    this.scroller.setSnapSize(this.props.width, this.props.height);
  },

  handleScroll(left, top, zoom) {
    if (this.isMounted())
      this.setState({ left });
  },

  handleClose() {
    if (this.props.animations && !this._isClosing) {
      this._isClosing = true;
      this.tweenState('step', {
        endValue: 2,
        duration: this.props.animationDuration,
        onEnd: () => {
          setTimeout(this.props.onClose);
        }
      });
    }
    else {
      this.props.onClose();
    }
  },

  render() {
    var { width, height, images, onClose, closeIconProps, ...props } = this.props;

    var close = onClose && (
      <Button chromeless onTap={this.handleClose} {...this.componentProps('close')}>
        <Icon
          color="#fff"
          file={require('../assets/icons/x.svg')}
          size={20}
          stroke={2}
          {...closeIconProps}
        />
      </Button>
    );

    var images = images.map((url, i) => {
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
    });

    this.addStyles({
      width: width,
      height: height
    });

    return (
      <div {...props} {...this.componentProps()}>
        {close}
        <TouchableArea scroller={this.scroller}>
          {images}
        </TouchableArea>
      </div>
    );
  }
});
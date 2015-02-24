var React = require('react');
var Component = require('../component');
var ViewListMixin = require('../mixins/ViewListMixin');
var View = require('./View');

var NestedViewList = Component({
  name: 'NestedViewList',

  mixins: [
    ViewListMixin
  ],

  getInitialState() {
    return this.getViewListInitialState();
  },

  getDefaultProps() {
    // var edgeWidth = UI.getConstants('edgeWidth');
    var edgeWidth = 44;

    return {
      width: window.innerWidth,
      height: window.innerHeight,
      resizeWithWindow: true,
      scrollToStep: 0,
      titleBarProps: {
        animations: {
          self: 'fadeToLeft'
        }
      },
      scrollerProps: {
        animationDuration: 500,
        paging: true,
        bouncing: false,
        easing: 'cubic'
      },
      viewAnimations: {
        inner: 'viewParallax',
        overlay: 'nestedViewOverlay'
      },
      // touchable only on the left and right edges
      touchStartBoundsX: [
        { from: 0, to: edgeWidth },
        { from: window.innerWidth - edgeWidth, to: window.innerWidth }
      ],
      // only touchable on right edge at first step
      touchStartBoundsXFirstStep: {
        from: window.innerWidth - edgeWidth,
        to: window.innerWidth
      }
    };
  },

  componentDidMount() {
    if (!this.props.isPortal && this.props.preload) {
      this.preload();
      document.addEventListener('resume', this.preload, false);
    }
  },

  componentWillUnmount() {
    document.removeEventListener('resume', this.preload);
  },

  // runs the view animation in the background to load it into memory
  preload() {
    console.log('preloading view animation...');
    var portal = document.createElement('div');
    portal.className = 'offscreen';
    document.body.appendChild(portal);
    React.render(<NestedViewList {...this.props} isPortal={true} />, portal);
    setTimeout(() => {
      React.render(
        <NestedViewList {...this.props} scrollToStep={1} isPortal={true} dontChangeTitle>
          {this.props.children[0]}
          <View title="Preload"></View>
        </NestedViewList>,
        portal
      )
    });
    setTimeout(() => {
      document.body.removeChild(portal);
    }, this.props.animationDuration + 10);
  },

  render() {
    var touchableProps = {};

    // only enable right side touching if on first view
    if (this.state.step === 0)
      touchableProps.touchStartBoundsX = this.props.touchStartBoundsXFirstStep;

    // disable touch events if only one view
    if (this.state.children && this.state.children.length === 1)
      touchableProps.untouchable = true;

    var viewProps = {
      styles: {
        inner: {
          boxShadow: this.isAnimating() ? '0 0 15px rgba(0,0,0,0.2)' : 'none'
        }
      }
    };

    return (
      <div>
        {this.getViewList({ touchableProps, viewProps, ...{ dontChangeTitle: this.props.dontChangeTitle } })}
      </div>
    );
  }
});

module.exports = NestedViewList;
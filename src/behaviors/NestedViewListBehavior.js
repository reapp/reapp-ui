module.exports = {
  name: 'Nested',
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
    pagingDeceleration: false,
    bouncing: false,
    easing: 'cubic'
  },
  viewAnimations: {
    inner: 'viewParallax',
    shadow: 'fade',
    overlay: 'nestedViewOverlay'
  },
  // touchable only on the left and right edges
  touchStartBoundsX: [
    { from: 0, to: 44 },
    { from: window.innerWidth - 44, to: window.innerWidth }
  ],
  // only touchable on right edge at first step
  touchStartBoundsXFirstStep: {
    from: window.innerWidth - 44,
    to: window.innerWidth
  }
};
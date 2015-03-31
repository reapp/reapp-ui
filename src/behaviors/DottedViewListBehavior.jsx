module.exports = {
  name: 'Dotted',
  width: window.innerWidth,
  height: window.innerHeight,
  resizeWithWindow: true,
  noFakeTitleBar: true,
  scrollToStep: 0,
  scrollerProps: {
    animationDuration: 500,
    paging: true,
    bouncing: false,
    scrollingY: false
  },
  viewAnimations: {
    inner: 'viewSideBySide'
  },
  viewProps: {
    plain: true
  },
  titleBarProps: {
    animations: {
      self: 'fadeToLeft'
    },
    height: 48,
    styles: {
      mid: {
        position: 'relative',
        top: -4
      }
    }
  },
  touchStartBoundsX: {
    from: 30,
    to: window.innerWidth
  }
};
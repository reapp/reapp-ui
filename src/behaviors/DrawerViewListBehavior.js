module.exports = {
  name: 'Drawer',
  noFakeTitleBar: true,
  vertical: true,
  width: window.innerWidth,
  height: window.innerHeight,
  resizeWithWindow: true,
  scrollToStep: 0,
  scrollerProps: {
    scrollingY: true,
    scrollingX: false,
    animationDuration: 500,
    paging: true,
    bouncing: false,
    easing: 'cubic'
  },
  viewAnimations: {
    self: 'viewDrawer'
  }
};
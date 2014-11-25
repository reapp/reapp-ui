module.exports = {
  self: {
    position: 'absolute',
    zIndex: 1003, // todo: zindex management, this needs to be above to Layout touchable area, at zinedx 1002
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },

  underTouchable: {
    zIndex: 1001
  }
};
var AnimationHelpers = module.exports = {
  // Increase strength on enter
  //  0 -> 1 (in) -> 1
  increaseOnEnter(index, step) {
    return Math.min(1, step - index + 1);
  },

  // Decrease strength on exit
  //  1 -> 1 (in) -> 0
  decreaseOnExit(index, step) {
    return Math.max(0, 1 - (step - index) );
  },

  // Decrease strength on enter
  //  1 -> 1 (in) -> 0
  decreaseOnEnter(index, step) {
    return Math.min(1, index - step);
  },

  // Linear increasing then decreasing strength
  //  0 -> 1 (in) -> 0
  symmetrical(index, step) {
    return (step <= index) ?
      AnimationHelpers.increaseOnEnter(index, step) :
      AnimationHelpers.decreaseOnExit(index, step);
  }
};
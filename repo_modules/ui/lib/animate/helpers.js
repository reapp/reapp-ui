var AnimationHelpers = module.exports = {
  // Increase strength on enter
  //  0 -> 1 (in) -> 1
  linearEnter(step, index) {
    return Math.min(1, step - index + 1);
  },

  // Decrease strength on exit
  //  1 -> 1 (in) -> 0
  linearExit(step, index) {
    return Math.max(0, 1 - (step - index) );
  },

  // Linear increasing then decreasing strength
  //  0 -> 1 (in) -> 0
  symmetrical(step, index) {
    return (step <= index) ?
      AnimationHelpers.linearEnter(step, index) :
      AnimationHelpers.linearExit(step, index);
  }
};
var Easings = require('./EasingFunctions');

// Functions helpfun when dealing with index-based animations
// Assuming index and step, where index refers to the element
// position within a list, and step refers to a dynamically
// updating reference to the current index within the list.

var AnimationHelpers = module.exports = {
  // Increase strength on enter
  //  0 -> 1 (in) -> 1
  increaseOnEnter(index, step, easing) {
    const val = Math.min(1, step - index + 1);
    return easing ? Easings[easing](val) : val;
  },

  // Decrease strength on exit
  //  1 -> 1 (in) -> 0
  decreaseOnExit(index, step, easing) {
    const val = Math.max(0, 1 - (step - index) );
    return easing ? Easings[easing](val) : val;
  },

  // Decrease strength on enter
  //  1 -> 1 (in) -> 0
  decreaseOnEnter(index, step, easing) {
    const val = Math.min(1, index - step);
    return easing ? Easings[easing](val) : val;
  },

  // Linear increasing then decreasing strength
  //  0 -> 1 (in) -> 0
  symmetrical(index, step, easing) {
    return (step <= index) ?
      AnimationHelpers.increaseOnEnter(index, step, easing) :
      AnimationHelpers.decreaseOnExit(index, step, easing);
  },

  // Hard limit within a range
  limitRange(step, bottom, top) {
    return Math.max(bottom, Math.min(top, step));
  },

  // Scales numbers into a range
  // step is the current index
  // fromTop and Bot are the min and max of the index
  // toTop and Bot are the desired min and max
  // returns step, scaled between toTop and toBot
  scaleBetween(step, fromTop, fromBot, toTop, toBot) {
    var pivot = (fromTop - fromBot) / 2; // 1, usually

    if (step === pivot)
      return step;

    if (step > pivot) // ex: step = 1.5, pivot = 1, fromTop = 2, toTop = 1.2, returns 1.1
      return pivot + (step - pivot) * (toTop - pivot);
    else // ex: step = .1, pivot = 1, fromBot = 0, toBot = .8, returns .805
      return toBot + step * (pivot - toBot);
  }
};
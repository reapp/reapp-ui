var {
  symmetrical,
  decreaseOnExit,
  increaseOnEnter,
  decreaseOnEnter
} = require('ui/lib/animate/helpers');

var Animations = module.exports = {
  viewParallax(index, step, props) {
    var width = props.width;
    var translateX = (index - step) * width;
    if (index < step) translateX = translateX / 2;

    return {
      translate: { x: translateX },
      'box-shadow': `0 0 15px rgba(0,0,0,${increaseOnEnter(index, step) / 2})`
    };
  },

  viewSideBySide(index, step, props) {
    var width = props.width;
    var translateX = (index - step) * width;

    return {
      translate: { x: translateX }
    };
  },

  fadeLeft(index, step, props) {
    return {
      translate: { x: - (step - index) * (props.width/2.5) },
      opacity: symmetrical(index, step)
    };
  },

  fadeDown(index, step) {
    return {
      opacity: symmetrical(index, step),
      height: symmetrical(index, step) * 100 + '%'
    };
  },

  moveToRight(index, step, props) {
    return {
      translate: { x: (step - index) * (props.width/2.5) }
    };
  },

  card(index, step) {
    return {
      translate: { y: step * index + symmetrical(step) * 10 }
    };
  },

  fade(index, step) {
    return {
      opacity: symmetrical(index, step)
    };
  },

  fadeOnEnter(index, step) {
    return {
      opacity: symmetrical(index, step) / 2
    };
  },

  scaleDown(index, step) {
    return {
      scale: decreaseOnExit(index, step) * 1.9
    };
  },

  rotate(index, step) {
    return {
      rotate: step * 360
    };
  }
};
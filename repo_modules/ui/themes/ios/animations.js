var { linearExit, linearEnter, symmetrical } = require('ui/lib/animate/helpers');

var Animations = module.exports = {
  viewParallax(index, step) {
    var width = this.props.width;
    var translateX = (index - step) * width;
    if (index < step) translateX = translateX / 2;

    return {
      translate: { x: translateX },
      boxShadow: `0 0 15px rgba(0,0,0,${linearEnter(step,index) / 2})`
    };
  },

  viewSideBySide(index, step) {
    var width = this.props.width;
    var translateX = (index - step) * width;

    return {
      translate: { x: translateX }
    };
  },

  fadeLeft(index, step) {
    return {
      translate: { x: - (step - index) * (WINDOWWIDTH/2.5) },
      opacity: symmetrical(step, index)
    };
  },

  moveToRight(index, step) {
    return {
      translate: { x: (step - index) * (WINDOWWIDTH/2.5) }
    };
  },

  card(index, step) {
    return {
      translate: { y: step * index + symmetrical(step) * 10 }
    };
  },

  fade(index, step) {
    return {
      opacity: symmetrical(step, index)
    };
  },

  scaleDown(index, step) {
    return {
      scale: linearExit(step, index) * 1.9
    };
  },

  rotate(index, step) {
    return {
      rotate: step * 360
    };
  }
};
var {
  symmetrical,
  decreaseOnExit,
  increaseOnEnter,
  decreaseOnEnter
} = require('ui/lib/animate/helpers');

var EasingFunction = require('ui/lib/animate/EasingFunctions');

var Animations = module.exports = {
  viewParallax({ index, step, width }) {
    var translateX = (index - step) * width;

    if (index < step)
      translateX = translateX / 2;

    return {
      translate: { x: translateX },
      BoxShadow: `0 0 15px rgba(0,0,0,${increaseOnEnter(index, step) / 2})`
    };
  },

  viewSideBySide({ index, step, width }) {
    var translateX = (index - step) * width;

    return {
      translate: { x: translateX }
    };
  },

  fadeToLeft({ index, step, width }) {
    return {
      translate: { x: - (step - index) * (width/2.5) },
      opacity: symmetrical(index, step)
    };
  },

  down({ index, step }) {
    return {
      opacity: symmetrical(index, step),
      height: symmetrical(index, step) * 100 + '%'
    };
  },

  moveToRight({ index, step, width }) {
    return {
      translate: { x: (step - index) * (width/2.5) }
    };
  },

  card({ index, step }) {
    return {
      translate: { y: step * index + symmetrical(step) * 10 }
    };
  },

  fade({ index, step }) {
    return {
      opacity: symmetrical(index, step)
    };
  },

  fadeOnEnter({ index, step }) {
    return {
      opacity: symmetrical(index, step) / 2
    };
  },

  scaleDown({ index, step }) {
    return {
      scale: decreaseOnExit(index, step)
    };
  },

  rotate({ index, step }) {
    return {
      rotate: step * 360
    };
  }
};
var {
  symmetrical,
  decreaseOnExit,
  increaseOnEnter,
  decreaseOnEnter,
  scaleBetween
} = require('../../lib/AnimationHelpers');

module.exports = {
  viewParallax({ index, step, width }) {
    var translateX = (index - step) * width;

    if (index < step)
      translateX = translateX / 2;

    return {
      translate: { x: translateX }
    };
  },

  viewDrawer({ index, step, height }) {
    var translate;
    var strength = index - step;

    // animating out
    if (index < step)
      return {
        scale: scaleBetween(decreaseOnExit(index, step), 2, 0, 1.1, 0.9)
      };
    else
      return {
        translate: { y: strength * height + (index > 0 ? 44 : 0) }
      };
  },

  viewSideBySide: ({ index, step, width }) => {
    return {
      translate: { x: (index - step) * width }
    };
  },

  fadeToLeft: ({ index, step, width }) => ({
    translate: { x: - (step - index) * (width/2.5) },
    opacity: symmetrical(index, step)
  }),

  down: ({ index, step }) => ({
    opacity: symmetrical(index, step),
    height: symmetrical(index, step) * 100 + '%'
  }),

  iconTitleBar: ({ index, step, width }) => {
    return {
      translate: { x: (step - index) * (width/2.5) }
    }
  },

  moveToLeft: ({ index, step, width }) => ({
    translate: { x: - (step - index) * width }
  }),

  card: ({ index, step }) => ({
    translate: { y: step * index + symmetrical(step) * 10 }
  }),

  fade: ({ index, step }) => ({
    opacity: symmetrical(index, step)
  }),

  fadeOnEnter: ({ index, step }) => ({
    opacity: symmetrical(index, step) / 2
  }),

  nestedViewOverlay: ({ index, step }) => ({
    opacity: symmetrical(index, step) / 4
  }),

  scaleDown: ({ index, step }) => ({
    scale: scaleBetween(decreaseOnExit(index, step), 2, 0, 1.2, 0.8)
  }),

  rotate: ({ index, step }) => ({
    rotate: step * 360
  })
};
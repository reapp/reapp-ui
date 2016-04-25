var {
  symmetrical,
  decreaseOnExit,
  increaseOnEnter,
  decreaseOnEnter,
  scaleBetween
} = require('../../lib/AnimationHelpers');

module.exports = {
  
  easeOutFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
  
  easeInOutFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',

  easeOut(duration, property, delay, easeFunction) {
    easeFunction = easeFunction || this.easeOutFunction;

    if (property && Object.prototype.toString.call(property) === '[object Array]') {
      let transitions = '';
      for (let i = 0; i < property.length; i++) {
        if (transitions) transitions += ',';
        transitions += this.create(duration, property[i], delay, easeFunction);
      }

      return transitions;
    } else {
      return this.create(duration, property, delay, easeFunction);
    }
  },

  create(duration, property, delay, easeFunction) {
    duration = duration || '450ms';
    property = property || 'all';
    delay = delay || '0ms';
    easeFunction = easeFunction || 'linear';

    return `${property} ${duration} ${easeFunction} ${delay}`;
  },

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

  titleBarIOS: ({ index, step, width }) => ({
    translate: { x: - (step - index) * (width/2.5) },
    opacity: symmetrical(index, step, 'easeInCubic')
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

  moveUp: ({ index, step, height }) => ({
    translate: { y: - (step - index) * height }
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
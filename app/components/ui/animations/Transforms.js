var Transforms = {};

// Step is passed to any transform
// Step is 0.0 to 1.0
//     0.0: off
//     1.0: on

// Transforms return an object with properties:
// transition: { x:_, y:_, z:_ }
// rotate: { x:_, y:_, z:_ }
// opacity: _
// scale: _

function transformElement(el, index, step, transform) {
  var transforms = '';
  var strength = strengthForStep(index, step);
  var { scale, rotate, translate, opacity } = transform(strength);

  if (defined(scale))
    transforms += `scale(${scale}) `;

  if (defined(rotate))
    transforms += `rotate3d(${rotate.x || 0},${rotate.y || 0},${rotate.z || 0}) `;

  if (defined(translate))
    transforms += `translate3d(${translate.x || 0}px, ${translate.y || 0}px, ${translate.z || 0}px)`;

  if (defined(opacity))
    el.style.opacity = opacity;

  console.log('transforms', index, transforms);
  el.style.WebkitTransform = transforms;
}

function strengthForStep(index, step) {
  if (step - index > 1) return 0;
  return step - index + 1;
}

function defined(variable) {
  return typeof variable !== 'undefined';
}

Transforms.FADE_TO_LEFT = function(el, index, step) {
  transformElement(el, index, step, strength => ({
    translate: {
      x: - strength * 100
    },
    opacity: strength
  }));
};

Transforms.MOVE_TO_RIGHT = function(el, index, step) {
  transformElement(el, index, step, strength => ({
    translate: {
      x: (1 - strength) * -100
    }
  }));
};

module.exports = Transforms;
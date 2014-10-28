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

function transformString(el, index, step, transform) {
  var transforms = '';
  var strength = strengthForStep(index, step);
  var { scale, rotate, translate, opacity } = transform(strength);

  if (scale)
    transforms += `scale(${scale})`;

  if (rotate)
    transforms += `rotate3d(${rotate.x},${rotate.y},${rotate.z})`;

  if (translate)
    transforms += `translate3d(${translate.x}px, ${translate.y}px, ${translate.z}px)`;

  if (opacity)
    el.style.opacity = opacity;

  el.style.WebkitTransform = transforms;
}

function strengthForStep(index, step) {
  return Math.max(0, Math.min(1, index - step));
}

Transforms.FADE_TO_LEFT = function(el, index, step) {
  transformElement(el, index, step, strength => ({
    translate: {
      x: - strength * 10
    },
    opacity: strength
  }));
};

Transforms.MOVE_TO_RIGHT = function(el, index, step) {
  transformElement(el, index, step, strength => ({
    translate: {
      x: strength * 10
    }
  }));
};
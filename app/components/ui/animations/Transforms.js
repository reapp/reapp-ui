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

  el.style.WebkitTransform = transforms;
}

// Strength goes from 0 -> 1 (in) -> 2
function strengthForStep(index, step) {
  var strength = step - index + 1;
  console.log('index', index,'step',step,'str',strength);
  return strength;
}

function defined(variable) {
  return typeof variable !== 'undefined';
}

// Ignores strength direction, goes from 0 -> 1 -> 0
function symmetrical(strength) {
  if (strength == 2) return 0;
  return (strength > 1) ? (1 - strength % 1) : strength;
}

Transforms.FADE_TO_LEFT = function(el, index, step) {
  transformElement(el, index, step, strength => ({
    translate: {
      x: - strength * 100
    },
    opacity: symmetrical(strength)
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
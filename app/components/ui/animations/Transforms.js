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

Transforms.step = function(index, step) {
  return Math.max(0, Math.min(1, index - step));
};

Transforms.FADE_TO_LEFT = function(step) {
  return {
    transition: {
      x: - step * 10
    },
    opacity: step
  };
};

Transforms.MOVE_TO_RIGHT = function(step) {
  return {
    transition: {
      x: step * 10
    }
  };
};
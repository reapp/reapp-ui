var Animations = {};
var WINDOW_WIDTH = window.innerWidth;
var WINDOW_HEIGHT = window.innerHeight;

// Increase strength on enter
//  0 -> 1 (in) -> 1
function linearEnter(step, index) {
  return Math.min(1, step - index + 1);
}

// Decrease strength on exit
//  1 -> 1 (in) -> 0
function linearExit(step, index) {
  return Math.max(0, 1 - (step - index) );
}

// Linear increasing then decreasing strength
//  0 -> 1 (in) -> 0
function symmetrical(step, index) {
  return (step <= index) ?
    linearEnter(step, index) :
    linearExit(step, index);
}

Animations.VIEW_PARALLAX = function(index, step) {
  var width = this.props.width;
  var translateX = (index - step) * width;
  if (index < step) translateX = translateX / 2;

  return {
    translate: { x: translateX },
    boxShadow: `0 0 15px rgba(0,0,0,${linearEnter(step,index) / 2})`
  };
};

Animations.VIEW_SIDE_BY_SIDE = function(index, step) {
  var width = this.props.width;
  var translateX = (index - step) * width;

  return {
    translate: { x: translateX }
  };
};

Animations.FADE_LEFT = function(index, step) {
  return {
    translate: { x: - (step - index) * (WINDOW_WIDTH/2.5) },
    opacity: symmetrical(step, index)
  };
};

Animations.MOVE_TO_RIGHT = function(index, step) {
  return {
    translate: { x: (step - index) * (WINDOW_WIDTH/2.5) }
  };
};

Animations.CARD = function(index, step) {
  return {
    translate: { y: step * index + symmetrical(step) * 10 }
  };
};

Animations.FADE = function(index, step) {
  return {
    opacity: symmetrical(step, index)
  };
};

Animations.SCALE_DOWN = function(index, step) {
  return {
    scale: linearExit(step, index) * 1.9
  };
};

Animations.ROTATE = function(index, step) {
  return {
    rotate: step * 360
  };
};

module.exports = Animations;
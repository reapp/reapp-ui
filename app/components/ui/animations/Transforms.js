var Transforms = {};
var WINDOW_WIDTH = window.innerWidth;
var WINDOW_HEIGHT = window.innerHeight;

Transforms.Mixin = {
  componentDidMount() {
    var node = this.getDOMNode();
    if (!node) return;

    this._totalTransforms = (
      node.querySelectorAll('[data-transform]').length +
      Number(node.hasAttribute('data-transform'))
    );

    this._getElementsWithTransforms([], node, this.props.index, nodes => {
      this._transforms = nodes;
      this._doTransforms(0);
    });
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.step)
      this._doTransforms(nextProps.step);
  },

  _getElementsWithTransforms(nodes, node, index, cb) {
    if (node.hasAttribute('data-transform')) {
      this._totalTransforms = this._totalTransforms - 1;
      nodes.push({
        el: node,
        name: node.getAttribute('data-transform'),
        index: node.getAttribute('data-transform-index') || index
      });
    }

    if (this._totalTransforms === 0)
      cb(nodes);
    else {
      var children = Array.prototype.slice.call(node.children);
      children.forEach(child => {
        this._getElementsWithTransforms(nodes, child, node.getAttribute('data-transform-index') || index, cb);
      });
    }
  },

  _doTransforms(step) {
    if (!this._transforms) return;
    this._transforms.forEach(transform => transformElement(transform, step));
  }
};

function transformElement(transform, step) {
  var transforms = '';
  var { el, index, name } = transform;
  var strength = strengthForStep(index, step);
  var { scale, rotate, translate, opacity } = Transforms[name](strength, transform);

  if (name === 'FADE_LEFT' && index == 2)
    console.log(name, index, step, strength);

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

Transforms.PARALLAX_FADE = function(strength, transform) {
  return {
    translate: {
      x: (1 - strength) * (WINDOW_WIDTH/2.5)
    },
    opacity: symmetrical(strength)
  };
};

Transforms.FADE_LEFT = function(strength) {
  return {
    translate: {
      x: (1 - strength) * (WINDOW_WIDTH/2.5)
    },
    opacity: symmetrical(strength)
  };
};

Transforms.MOVE_TO_RIGHT = function(strength) {
  return {
    translate: {
      x: (1 - strength) * - (WINDOW_WIDTH/2.5)
    }
  };
};

module.exports = Transforms;
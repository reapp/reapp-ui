var animateStore = require('../stores/AnimateStore');

module.exports = function waitForAnimation(name, cb) {
  var animating = () => animateStore(name).step % 1 !== 0;
  var doneAnimating = () => !animating() ?
      cb() : setTimeout(doneAnimating.bind(null, cb), 50);
}
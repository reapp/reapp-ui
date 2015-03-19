// todo reimplement
function animateStore(){
  return { step: 1 };
};

module.exports = function waitForAnimation(name, cb) {
  var animating = () =>
    !!animateStore(name) && animateStore(name).step % 1 !== 0;

  var doneAnimating = () =>
    !animating() ?
      cb() :
      setTimeout(doneAnimating, 50);

  doneAnimating();
}
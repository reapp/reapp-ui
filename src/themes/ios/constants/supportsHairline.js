module.exports = function supportsHairline() {
  var support = false;

  if (window.devicePixelRatio && devicePixelRatio >= 2) {
    var testElem = document.createElement('div');
    testElem.style.border = '.5px solid transparent';
    document.body.appendChild(testElem);

    if (testElem.offsetHeight == 1)
      support = true;

    document.body.removeChild(testElem);
  }

  return support;
}
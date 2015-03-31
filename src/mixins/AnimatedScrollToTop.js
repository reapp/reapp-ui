// adapted from http://stackoverflow.com/questions/21474678/scrolltop-animation-without-jquery
// no license on original source

module.exports = {
  animatedScrollToTop(node, scrollDuration, offset) {
    offset = offset || 0;
    var scrollHeight = node.scrollTop;
    var scrollStep = Math.PI / (scrollDuration / 15);
    var cosParameter = scrollHeight / 2;
    var scrollCount = 0;
    var scrollMargin;

    // prevent scrolling and store previous values
    var prevOverflowScrolling = node.style.WebkitOverflowScrolling;
    var prevOverflowY = node.style.overflowY;
    node.style.WebkitOverflowScrolling = 'none';
    node.style.overflowY = 'none';

    window.requestAnimationFrame(step);
    function step () {
      if (node.scrollTop > offset) {
        window.requestAnimationFrame(step);
        scrollCount = scrollCount + 1;
        scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
        node.scrollTop = Math.max(offset, scrollHeight - scrollMargin);
      }
      else {
        // return to previous overflows
        node.style.WebkitOverflowScrolling = prevOverflowScrolling;
        node.style.overflowY = prevOverflowY;
      }
    }
  }
};
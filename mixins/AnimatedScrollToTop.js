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

    window.requestAnimationFrame(step);
    function step () {
      setTimeout(function() {
        if (node.scrollTop > offset) {
          window.requestAnimationFrame(step);
          scrollCount = scrollCount + 1;
          scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
          node.scrollTop = Math.max(offset, scrollHeight - scrollMargin);
        }
      }, 15);
    }
  }
};
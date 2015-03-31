module.exports = {
  multiTap(total, cb, timeout) {
    var tapCount = 0;
    var tapTimeout;

    return {
      onTouchStart: function(e) {
        clearTimeout(tapTimeout);
        tapCount++;

        if (tapCount == total) {
          tapCount = 0;
          cb(e);
        }
        else {
          tapTimeout = setTimeout(function() {
            tapCount = 0;
          }, timeout || 500);
        }
      }
    };
  }
};
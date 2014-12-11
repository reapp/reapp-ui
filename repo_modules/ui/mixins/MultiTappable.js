module.exports = {
  multiTap(total, cb, timeout) {
    var tapCount = 0;
    var tapTimeout;

    return {
      onClick: function(e) {
        clearTimeout(tapTimeout);
        tapCount++;

        if (tapCount == total)
          cb(e);
        else
          tapTimeout = setTimeout(function() {
            tapCount = 0;
          }, timeout || 300);
      }
    };
  }
};
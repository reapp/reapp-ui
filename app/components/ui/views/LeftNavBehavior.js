var LeftNavBehavior = {
  ALL_PARALLAX_FADE: {
    side: {
      translate: function(sideWidth, scrollLeft) {
        return {
          x: sideWidth - .5 * scrollLeft
        };
      },
      rotate: function() {
        return null;
      },
      opacity: function(sideWidth, scrollLeft) {
        return .5 + .5 * (1 - scrollLeft / sideWidth);
      }
    },
    content: {
      translate: function(sideWidth, scrollLeft) {
        return {x: sideWidth - scrollLeft};
      },
      rotate: function() {
        return null;
      },
      opacity: function() {
        return null;
      }
    }
  },
  NORMAL: {
    side: {
      translate: function(sideWidth, scrollLeft) {
        return {
          x: sideWidth - scrollLeft
        };
      },
      rotate: function() {
        return null;
      },
      opacity: function() {
        return null;
      }
    }
  }
};

module.exports = LeftNavBehavior;
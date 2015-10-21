var LeftNavBehavior = {
  ALL_PARALLAX_FADE: {
    parent: {
      translate: function(parentWidth, scrollLeft) {
        return {
          x: parentWidth - .5 * scrollLeft
        };
      },
      rotate: function() {
        return null;
      },
      opacity: function(parentWidth, scrollLeft) {
        return .5 + .5 * (1 - scrollLeft / parentWidth);
      }
    },
    child: {
      translate: function(parentWidth, scrollLeft) {
        return {x: parentWidth - scrollLeft};
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
    parent: {
      translate: function(parentWidth, scrollLeft) {
        return {
          x: parentWidth - scrollLeft
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
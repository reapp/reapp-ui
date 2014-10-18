var DraggableViewBehavior = {
  translate: function(left) {
    return {
      x: -left
    };
  }
};

module.exports = DraggableViewBehavior;
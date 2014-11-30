module.exports = {
  getZIndexFor(layer) {
    return layer * 1000;
  },

  getZIndexForLayer() {
    return this.context.layer * 1000;
  },

  getZIndexForNextLayer() {
    return this.getZIndexFor(this.context.layer + 1);
  },

  getZIndexForPrevLayer() {
    return this.getZIndexFor(this.context.layer - 1);
  }
}
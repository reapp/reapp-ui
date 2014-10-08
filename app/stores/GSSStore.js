var GSSStore = (function() {

  return {
    add(rule) {
      console.log('adding', this, rule);
    },

    init() {
      console.log('compiling', GSSStore);
    }
  }

})();

module.exports = GSSStore;
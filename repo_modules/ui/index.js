module.exports = {
  // key = component name
  // value = array of ReactStyle objects
  theme: {},

  addTheme: function(theme) {
    Object.keys(theme).forEach(key => {
      if (this.theme[key])
        this.theme[key].push(theme[key]);
      else
        this.theme[key] = [theme[key]];
    });
  },

  getTheme: function() {
    return this.theme;
  }
};
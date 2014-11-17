var UI = require('./index');

module.exports = function(name) {
  return {
    componentWillMount() {
      var theme = UI.getTheme();
      var styles = {};
      var propStyles = this.props.styles;

      Object.keys(theme[name]).forEach(key => {
        styles[key] = [theme[name][key]]
      });

      propStyles &&
        Object.keys(propStyles).forEach(key => {
          styles[key] = (styles[key] || []).concat(propStyles[key])
        });

      this.styles = styles;
    },

    assignStyles(name, styles) {
      this.styles[name].push(styles);
    },

    getStyles(name, extras) {
      name = name || 'self';
      return [].concat(this.styles[name], extras);
    },
  };
}
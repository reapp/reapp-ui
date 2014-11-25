var UI = require('./index');
var ReactStyle = require('react-style');

module.exports = function(name) {
  return {
    componentWillUpdate(nextProps) {
      this.makeStyles(nextProps.styles);
    },

    componentWillMount() {
      this.makeStyles(this.props.styles);
    },

    makeStyles(propStyles) {
      this.styles = {};
      var addStyle = (key, style) => {
        this.styles[key] = (this.styles[key] || []).concat(
          this.makeReactStyle(style)
        );
      };

      var componentThemes = UI.getTheme()[name];
      if (componentThemes)
        componentThemes.forEach(theme => (
          Object.keys(theme).forEach(key => addStyle(key, theme[key]))
        ));

      if (propStyles) {
        if (this.isReactStyle(propStyles))
          addStyle('self', propStyles);
        else
          Object.keys(propStyles).forEach(key => {
            addStyle(key, this.makeReactStyle(propStyles[key]));
          });
      }

      return this.styles;
    },

    makeReactStyle(obj) {
      return this.isReactStyle(obj) ? obj : ReactStyle(obj);
    },

    isReactStyle(obj) {
      // todo: checking for array is dirty,
      // just used for now because we turn everything into array
      return Array.isArray(obj) || !!obj.style;
    },

    getStyles(elName, index) {
      elName = elName === name ? 'self' : elName || 'self';

      if (elName === 'self' && this.props.index === 0 || index === 0) {
        var firstChildKey = elName === 'self' ? 'firstChild' : elName + 'FirstChild';

        if (this.styles[firstChildKey]) {
          return this.styles[elName].concat(this.styles[firstChildKey]);
        }
      }

      return this.styles[elName];
    },

    addStyles(elName, styles) {
      // if no elName given, use "self"
      if (typeof elName === 'object' && !styles) {
        styles = elName;
        elName = 'self';
      }

      if (!styles) return;

      styles = this.makeReactStyle(styles);

      if (elName === name)
        elName = 'self';

      this.styles[elName] = [].concat(this.getStyles(elName), styles);
    },

    getStyleVal(elName, prop) {
      // if no elName given, we just use "self"
      if (typeof prop === 'undefined') {
        prop = elName;
        elName = 'self';
      }

      var styles = this.getStyles(elName);
      if (!styles) return null;

      var stylesForProp = styles
        .map(style => style.style[prop])
        .filter(x => typeof x !== 'undefined');

      return stylesForProp[stylesForProp.length - 1];
    },

    getStylesForComponent(componentName, prop) {
      if (!prop) prop = 'self';
      var theme = UI.getTheme();
      debugger;
      return theme[componentName][prop];
    }
  };
};
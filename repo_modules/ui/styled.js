var UI = require('./index');
var ReactStyle = require('react-style');

module.exports = function(name) {
  return {
    componentWillUpdate(nextProps) {
      this.makeStyles(nextProps);
    },

    componentWillMount() {
      this.makeStyles(this.props);
    },

    componentWillUnmount() {
      this.styles = null;
    },

    makeStyles(props) {
      var theme = UI.getTheme();
      var styles = {};
      var propStyles = props.styles;

      Object.keys(theme[name] || {}).forEach(key => {
        styles[key] = [theme[name][key]];
      });

      function addStyle(key, style) {
        styles[key] = (styles[key] || []).concat(style);
      }

      if (propStyles) {
        if (this.isReactStyle(propStyles))
          addStyle('self', propStyles);
        else
          Object.keys(propStyles).forEach(key => {
            addStyle(key, this.makeReactStyle(propStyles[key]));
          });
      }

      this.styles = styles;
    },

    makeReactStyle(obj) {
      return this.isReactStyle(obj) ? obj : ReactStyle(obj);
    },

    isReactStyle(obj) {
      // todo: checking for array is dirty,
      // just used for now because we turn everything into array
      return Array.isArray(obj) || !!obj.style;
    },

    getStyles(elName, extras) {
      elName = elName === name ? 'self' : elName || 'self';

      if (this.props.index === 0 && this.styles.firstChild) {
        extras = (extras || []).concat(this.styles.firstChild);
      }

      return (!extras) ?
        this.styles[elName] :
        [].concat(this.styles[elName], extras);
    },

    addStyles(elName, styles) {
      // if no elName given, use "self"
      if (!styles) {
        styles = elName;
        elName = 'self';
      }

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
    }
  };
};
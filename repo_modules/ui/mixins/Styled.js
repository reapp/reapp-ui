var UI = require('../index');
var ReactStyle = require('react-style');

module.exports = function(name) {
  return {
    componentWillUpdate(nextProps) {
      this.makeStyles(nextProps.styles);
    },

    componentWillMount() {
      this.makeStyles(this.props.styles);
    },

    getConstant(name) {
      return UI.getConstants()[name];
    },

    // note: we track two styles
    // this.styles = styles that are added by the component itself
    // this.propStyles = styles passed in by props
    // getStyles will return propStyles after regular styles, so users can
    // override styles set within a component
    makeStyles(propStyles) {
      this.styles = {};
      this.mediaStyles = {};
      this.propStyles = {};

      var addStyle = (obj, key, style) => {
        if (key.charAt(0) == '@')
          addMediaQueryStyles(key, style);
        else
          obj[key] = (obj[key] || []).concat(this.makeReactStyle(style));
      };

      var addMediaQueryStyles = (mediaQuery, styles) => {
        console.log('adding media query style', mediaQuery, styles);
        Object.keys(styles).forEach(key => {
          this.mediaStyles[mediaQuery] = {};
          addStyle(this.mediaStyles[mediaQuery], key, styles[key]);
        });
      };

      var componentStyles = UI.getStyles(name);
      if (componentStyles)
        componentStyles.forEach(styles => (
          Object.keys(styles).forEach(key => addStyle(this.styles, key, styles[key]))
        ));

      if (propStyles) {
        if (this.isReactStyle(propStyles))
          addStyle(this.propStyles, 'self', propStyles);
        else
          Object.keys(propStyles).forEach(key => {
            addStyle(this.propStyles, key, this.makeReactStyle(propStyles[key]));
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

      return this.styles[elName] ?
        this.styles[elName].concat(this.propStyles[elName] || []) :
        this.propStyles[elName];
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

      var curStyles = this.styles[elName];

      if (curStyles && curStyles.length) {
        if (Array.isArray(styles))
          styles.map(style => curStyles.push(style));
        else
          this.styles[elName][curStyles.length] = styles;
      }
      else {
        if (Array.isArray(styles))
          this.styles[elName] = styles;
        else
          this.styles[elName] = [styles];
      }
    },

    getStyleVal(elName, prop) {
      // if no elName given, we just use "self"
      if (typeof prop === 'undefined') {
        prop = elName;
        elName = 'self';
      }

      var styles = this.getStyles(elName);
      return this._findDominantVal(styles, prop);
    },

    getStylesForComponent(componentName, elName) {
      if (!elName) elName = 'self';

      return UI.getStyles(componentName)
        .map(styles => styles[elName])
        .filter(x => typeof x !== 'undefined')
        .map(this.makeReactStyle);
    },

    getStyleValForComponent(componentName, elName, prop) {
      if (!prop) {
        prop = elName;
        elName = 'self';
      }

      return this._findDominantVal(
        this.getStylesForComponent(componentName, elName),
        prop
      );
    },

    _findDominantVal(styles, prop) {
      if (!styles) return null;

      var stylesForProp = styles
        .map(style => style.style[prop])
        .filter(x => typeof x !== 'undefined');

      return stylesForProp[stylesForProp.length - 1];
    }
  };
};
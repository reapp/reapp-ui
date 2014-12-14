var UI = require('../../index');
var ReactStyle = require('react-style');

// Styled helps components with styling

// It provides a pure way of adding and mixins styles
// working with UI loaded styles

// It tracks four types of styles (or it will eventually)
// and combines the styles in order of precedence:
//   1. styles: runtime loaded styles
//   2. addedStyles: styles added in component
//   3. mediaStyles: @media styles
//   4. propStyles: styles passed in with props

module.exports = function(name) {
  return {
    componentWillUpdate(nextProps) {
      this.makeStyles(nextProps.styles);
    },

    componentWillMount() {
      this.makeStyles(this.props.styles);
    },

    componentWillUnmount() {
      delete this.styles;
      delete this.mediaStyles;
      delete this.propStyles;
    },

    getConstant(name) {
      return UI.getConstants(name);
    },

    // note: we track three styles
    // this.styles = styles that are added by the component itself
    // this.propStyles = styles passed in by props
    // this.mediaStyles = styles for media queries
    // getStyles will return propStyles after regular styles, so users can
    // override styles set within a component
    makeStyles(propStyles) {
      this.styles = UI.getStyles(name) || {};
      this.addedStyles = {};
      this.mediaStyles = {};
      this.propStyles = {};

      if (propStyles)
        this.addPropStyles(propStyles);

      return this.styles;
    },

    addPropStyles(propStyles) {
      if (this.isReactStyle(propStyles))
        this.addStyleTo(this.propStyles, 'self', propStyles);
      else
        Object.keys(propStyles).forEach(key => {
          this.addStyleTo(this.propStyles, key, this.makeReactStyle(propStyles[key]));
        });
    },

    addStyleTo(obj, key, style) {
      if (key.charAt(0) == '@')
        this.addMediaQueryStyles(key, style);
      else
        obj[key] = (obj[key] || []).concat(style);
    },

    addMediaQueryStyles(mediaQuery, styles) {
      Object.keys(styles).forEach(key => {
        this.mediaStyles[mediaQuery] = {};
        this.addStyleTo(this.mediaStyles[mediaQuery], key, styles[key]);
      });
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
      elName = elName || 'self';

      return (
        this.styles[elName] || []
      ).concat(
        this.addedStyles[elName] || []
      ).concat(
        this.getConditionalStyles(elName, index)
      ).concat(
        this.propStyles[elName] || []
      );
    },

    // styles for things like 'firstChild', 'lastItem'
    getConditionalStyles(elName, index) {
      var conditionalStyles = [];

      if (elName === 'self' && this.props.index === 0 || index === 0) {
        var firstChildKey = elName === 'self' ?
          'firstChild' :
          elName + 'FirstChild';

        if (this.styles[firstChildKey])
          conditionalStyles = this.styles[firstChildKey];
      }

      return conditionalStyles;
    },

    // supports adding an object directly (ie this.styles.somestyle)
    // or a string or an array of strings
    addStyles(elName, styles) {
      if (Array.isArray(styles))
        styles.forEach(this._addStyle.bind(this, elName));
      else
        this._addStyle(elName, styles);
    },

    // adds styles onto a ref
    _addStyle(elName, styles) {
      // if given just an object, add as the styles object for 'self'
      if (!styles && typeof elName === 'object') {
        styles = elName;
        elName = 'self';
      }

      // if given just a string, add as the styles object reference for 'self'
      if (!styles && typeof elName === 'string') {
        styles = elName;
        elName = 'self';
      }

      if (typeof styles === 'string')
        styles = this.styles[styles];

      if (!styles)
        return;

      styles = this.makeReactStyle(styles);

      var curStyles = this.addedStyles[elName];

      if (curStyles && curStyles.length) {
        if (Array.isArray(styles))
          styles.map(style => curStyles.push(style));
        else
          this.addedStyles[elName][curStyles.length] = styles;
      }
      else {
        if (Array.isArray(styles))
          this.addedStyles[elName] = styles;
        else
          this.addedStyles[elName] = [styles];
      }
    },

    // get a style value
    getStyleVal(elName, prop) {
      // if no elName given, we just use "self"
      if (typeof prop === 'undefined') {
        prop = elName;
        elName = 'self';
      }

      var styles = this.getStyles(elName);
      return this._findDominantVal(styles, prop);
    },

    // get another components styles
    getStylesForComponent(componentName, elName) {
      if (!elName) elName = 'self';

      return UI.getStyles(componentName)
        .map(styles => styles.style[elName])
        .filter(x => typeof x !== 'undefined');
    },

    // get another components style value
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
      if (!styles)
        return null;

      var stylesForProp = styles
        .map(style => style.style[prop])
        .filter(x => typeof x !== 'undefined');

      return stylesForProp[stylesForProp.length - 1];
    }
  };
};
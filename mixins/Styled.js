var UI = require('../index');
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
      this.setupStyles(nextProps);
    },

    componentWillMount() {
      this.setupStyles(this.props);
      this.styles = UI.getStyles(name) || {};
    },

    setupStyles(props) {
      this.addedStyles = {};

      if (props.styles) {
        this.addedStyles = {};
        this.propStyles = props.styles;
        delete props.styles; // bad, i know
      }
    },

    getConstant(name) {
      return UI.getConstants(name);
    },

    getPropStyles(ref) {
      if (!this.propStyles)
        return;

      return (ref === 'self' && this.isReactStyle(this.propStyles)) ?
        this.propStyles :
        Object.keys(this.propStyles).filter(key => key === ref).map(key => (
          this.makeReactStyle(this.propStyles[key])
        ));
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

    // todo: better way to do this
    isReactStyle(obj) {
      return Array.isArray(obj) || !!obj.style;
    },

    getStyles(ref, index) {
      ref = ref || 'self';

      return (
        this.styles[ref] || []
      ).concat(
        this.addedStyles[ref] || []
      ).concat(
        this.getConditionalStyles(ref, index)
      ).concat(
        this.getPropStyles(ref) || []
      );
    },

    // styles for things like 'firstChild', 'lastItem'
    getConditionalStyles(ref, index) {
      var conditionalStyles = [];

      if (ref === 'self' && this.props.index === 0 || index === 0) {
        var firstChildKey = ref === 'self' ?
          'firstChild' :
          ref + 'FirstChild';

        if (this.styles[firstChildKey])
          conditionalStyles = this.styles[firstChildKey];
      }

      return conditionalStyles;
    },

    // supports adding an object directly (ie this.styles.somestyle)
    // or a string or an array of strings
    addStyles(ref, styles) {
      if (Array.isArray(styles))
        styles.forEach(this._addStyle.bind(this, ref));
      else
        this._addStyle(ref, styles);
    },

    // adds styles onto a ref
    _addStyle(ref, styles) {
      // if given just an object or string, add as the styles object for 'self'
      if (!styles && (typeof ref === 'object' || typeof ref === 'string')) {
        styles = ref;
        ref = 'self';
      }

      // allows using string to lookup styles
      if (typeof styles === 'string')
        styles = this.styles[styles];

      // return if no styles found
      if (!styles)
        return;

      // ensure we have well formatted styles
      styles = this.makeReactStyle(styles);

      // merge onto our addedStyles object
      this.mergeStyles(this.addedStyles, ref, styles);
    },

    // merge styles onto obj for ref
    mergeStyles(obj, ref, styles) {
      var curStyles = obj[ref];

      // if we have styles already on the object
      if (curStyles && curStyles.length) {
        if (Array.isArray(styles))
          obj[ref] = curStyles.concat(styles);
        else
          obj[ref][curStyles.length] = styles;
      }
      else {
        if (Array.isArray(styles))
          obj[ref] = styles;
        else
          obj[ref] = [styles];
      }
    },

    // handles checking for shorthand styling, for use with components
    // that pass down style properties to their children dynamically
    mergeStylesProps(...stylesProps) {
      var result = {};

      stylesProps.forEach(prop => {
        // convert shorthand to proper
        if (Array.isArray(prop))
          prop = { self: prop };

        Object.keys(prop).forEach(key => {
          this.mergeStyles(result, key, this.makeReactStyle(prop[key]));
        });
      });

      return result;
    },

    // get a style value
    getStyleVal(ref, prop) {
      // if no ref given, we just use "self"
      if (typeof prop === 'undefined') {
        prop = ref;
        ref = 'self';
      }

      var styles = this.getStyles(ref);
      return this._findDominantVal(styles, prop);
    },

    // get another components styles
    getStylesForComponent(componentName, ref) {
      if (!ref) ref = 'self';

      return UI.getStyles(componentName)
        .map(styles => styles.style[ref])
        .filter(x => typeof x !== 'undefined');
    },

    // get another components style value
    getStyleValForComponent(componentName, ref, prop) {
      if (!prop) {
        prop = ref;
        ref = 'self';
      }

      return this._findDominantVal(
        this.getStylesForComponent(componentName, ref),
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
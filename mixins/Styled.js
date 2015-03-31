// Styled - helps with this.context.theme.styles

// It tracks four types of styles:
//   1. styles: runtime loaded styles
//   2. addedStyles: imperative styles added in component
//   3. propStyles: styles passed in with props
//   4. conditionalStyles: firstChild, lastChild

module.exports = {
  componentWillUpdate(nextProps) {
    this.setupStyles(nextProps);
  },

  componentWillMount() {
    this.setupStyles(this.props);

    if (this.context.theme)
      this.styles = this.context.theme.styles[this.name] || {};
  },

  setupStyles(props) {
    this.addedStyles = {};

    if (props.styles) {
      this.propStyles = props.styles;
      delete props.styles;
    }
  },

  getPropStyles(ref) {
    return ref === 'self' && Array.isArray(this.propStyles) ?
      this.propStyles :
      this.propStyles && this.propStyles[ref];
  },

  addStyleTo(obj, key, style) {
    obj[key] = (obj[key] || []).concat(style);
  },

  getStyles(ref, index) {
    ref = ref || 'self';

    return (
      (this.styles[ref] &&
        Array.isArray(this.styles[ref]) ? this.styles[ref] : [this.styles[ref]]
      ) || []
    ).concat(
      this.addedStyles[ref] || []
    ).concat(
      this.getConditionalStyles(ref, index)
    ).concat(
      this.getPropStyles(ref) || []
    );
  },

  keys: {
    firstChild: 'firstChild',
    lastChild: 'lastChild'
  },

  // styles for things like 'firstChild', 'lastItem'
  // todo: mediaStyles
  getConditionalStyles(ref, index) {
    var conditionalStyles = [];

    if (this.props.index === 0 || index === 0) {
      var key = ref === 'self' ?
        this.keys.firstChild : `${ref}FirstChild`;

      if (this.styles[key])
        conditionalStyles = this.styles[key];
    }

    if (this.props.total && this.props.index === this.props.total - 1) {
      var key = ref === 'self' ?
        this.keys.lastChild : `${ref}LastChild`;

      if (this.styles[key])
        conditionalStyles.push(this.styles[key]);
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
      styles = this.getStyles(styles);

    // return if no styles found
    if (!styles)
      return;

    // merge onto our addedStyles object
    this.mergeStyles(this.addedStyles, ref, styles);
  },

  // merge styles onto obj for ref
  // needs to be reasonably performant (thus the verbosity)
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
      if (!prop)
        return;

      // convert shorthand to proper
      if (Array.isArray(prop))
        prop = { self: prop };

      Object.keys(prop).forEach(key => {
        this.mergeStyles(result, key, prop[key]);
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
    ref = ref || 'self';

    return getStyles(componentName)
      .map(styles => styles[ref])
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
      .map(style => style[prop])
      .filter(x => typeof x !== 'undefined');

    return stylesForProp[stylesForProp.length - 1];
  }
};
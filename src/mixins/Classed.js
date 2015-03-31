var classnames = require('classnames');

// uses this.name as base

module.exports = {
  componentWillMount() {
    this._classSets = {};
    this._classRefs = {};
    this.setClasses(this.props);
  },

  componentDidUpdate(nextProps) {
    this.setClasses(nextProps);
  },

  setClasses() {
    this._classSets = {};

    if (this.props.className)
      this.addClass('self', this.props.className);
  },

  getClasses(ref) {
    var refClassSet = this._classSets[ref];
    refClassSet = refClassSet || {};
    refClassSet[this.getClassName(ref)] = true;
    return refClassSet;
  },

  getClassSet(ref) {
    return classnames(this.getClasses(ref));
  },

  addClass(ref, className, conditional) {
    // shorthands
    if (typeof className === 'boolean' && !!className)
      className = ref;
    else if (!className) {
      className = ref;
      ref = 'self';
    }

    this._classSets[ref] = this._classSets[ref] || {};
    this._classSets[ref][className] = true;
  },

  removeClass(ref, className) {
    ref = ref || 'self';
    this._classSets[ref][className] = false;
  },

  getClassName(ref) {
    if (this._classRefs[ref])
      return this._classRefs[ref];

    this._classRefs[ref] = ref === 'self' ? this.name : `${this.name}--${ref}`;
    return this._classRefs[ref];
  },

  getSelector(key) {
    return '.' + this.getClassName(key);
  }
};
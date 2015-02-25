var React = require('react/addons');
var cx = React.addons.classSet;

module.exports = function(name) {
  return {
    className: name,

    componentWillMount() {
      this._classSets = {};
      this._classRefs = {};
      this.setClasses(this.props);
    },

    componentWillReceiveProps(nextProps) {
      this.setClasses(nextProps);
    },

    setClasses() {
      this._classSets[name] = {};
      this._classSets[name][this.className] = true;

      if (this.props.className)
        this._classSets[name][this.props.className] = true;
    },

    getClasses(ref) {
      ref = ref || 'self';
      var refClassSet = this._classSets[ref];

      refClassSet = refClassSet || {};
      refClassSet[this.getClassName(ref)] = true;

      return cx(refClassSet);
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

      this._classRefs[ref] = !ref ? this.className : `${this.className}--${ref}`;
      return this._classRefs[ref];
    },

    getSelector(key) {
      return '.' + this.getClassName(key);
    }
  };
};
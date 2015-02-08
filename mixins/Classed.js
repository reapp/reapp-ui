var React = require('react/addons');
var cx = React.addons.classSet;

module.exports = function(name) {
  return {
    className: name,

    componentWillMount() {
      this._classSets = {};
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

    getClasses(key) {
      var classSet = this._classSets[key || name];

      if (key) {
        classSet = classSet || {};
        classSet[this.getClassName(key)] = true;
      }

      return cx(classSet);
    },

    addClass(name, conditional) {
      if (typeof conditional === 'undefined' || !!conditional)
        this._classSets[name] = true;
    },

    removeClass(name) {
      this._classSets[name] = false;
    },

    getClassName(key) {
      return !key ? this.className : `${this.className}--${key}`;
    },

    getSelector(key) {
      return '.' + this.getClassName(key);
    }
  };
};
var React = require('react/addons');
var cx = React.addons.classSet;

function capitalize(str) {
  return str.substring(0,1).toUpperCase() + str.substring(1,str.length);
}

module.exports = function(name) {
  return {
    componentWillMount() {
      this.classes = {};
      this.setClasses(this.props);
    },

    componentWillReceiveProps(nextProps) {
      this.setClasses(nextProps);
    },

    className: capitalize(name),

    setClasses() {
      this.classes[name] = {};
      this.classes[name][this.className] = true;
      this.classes[name][this.props.className] = !!this.props.className;
    },

    getClasses(key) {
      var classSet = this.classes[key || name];

      if (key) {
        classSet = classSet || {};
        classSet[`${this.className}--${key}`] = true;
      }

      return cx(classSet);
    },

    addClass(key, val) {
      // allow shorthand
      if (!val) {
        val = key;
        key = name;
      }

      this.classes[val] = true;
    }
  };
};
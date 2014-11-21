var React = require('react/addons');
var cx = React.addons.classSet;

function capitalize(str) {
  return str.substring(0,1).toUpperCase() + str.substring(1,str.length);
}

module.exports = function(name) {
  return {
    componentWillMount() {
      var className = capitalize(name);
      var classes = {};
      classes[className] = true;
      classes[this.props.className] = !!this.props.className;
      this.classes = classes;
    },

    componentWillUnmount() {
      this.classes = null;
    },

    getClassSet() {
      return cx(this.classes);
    },

    addClass(name) {
      this.classes[name] = true;
    }
  };
};
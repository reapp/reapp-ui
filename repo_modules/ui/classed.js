var React = require('react/addons');
var cx = React.addons.classSet;

function capitalize(str) {
  return str.substring(0,1).toUpperCase() + str.substring(1,str.length);
}

module.exports = function(name) {
  return {
    componentWillMount() {
      this.setClasses(this.props);
    },

    componentWillReceiveProps(nextProps) {
      this.setClasses(nextProps);
    },

    componentWillUnmount() {
      this.classes = null;
    },

    setClasses() {
      this.classes = {};
      this.classes[capitalize(name)] = true;
      this.classes[this.props.className] = !!this.props.className;
    },

    getClasses() {
      return cx(this.classes);
    },

    addClass(name) {
      this.classes[name] = true;
    }
  };
};
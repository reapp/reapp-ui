var Omniscient = require('omniscient');
var React = require('react');
var ImmstructPropsMixin = require('./ImmstructPropsMixin');

// Integrates omniscient with react-router

function Component(struct) {
  // react style
  if (typeof struct === 'object' && struct.render) {
    var { name, mixins, render } = struct;
    var args = [name, mixins, render].filter(x => x !== undefined);
    return Omniscient.apply(this, args);
  }
  // omniscient style
  else {
    return Omniscient.apply(this, arguments);
  }
}

function Page(name, mixins, { fetchData, statics, onSwap, render, ...restOfStruct }) {
  var Immstructable = ImmstructPropsMixin({
    props: [name],
    onSwap(key, newStruct, oldStruct) {
      onSwap(key, newStruct, oldStruct);
    }
  });

  return React.createClass({
    displayName: name,
    mixins: [].concat(Immstructable, mixins, restOfStruct),
    statics: { fetchData, ...statics },
    render() {
      var props = Object.keys(this.structures).reduce((acc, key) => {
        acc[key] = this.structures[key].cursor();
      }, {});

      console.log('render', this.structures, this.props, props);

      return render(props);
    }
  });
}

module.exports = { Page, Component };
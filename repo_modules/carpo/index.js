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

function Page(name, mixins, { cursors, fetchData, statics, onDataChange, render, ...restOfStruct }) {
  var Immstructable = ImmstructPropsMixin({
    props: [].concat(cursors),

    onSwap(key, newStruct, oldStruct) {
      onDataChange(key, newStruct, oldStruct);
    }
  });

  return React.createClass({
    displayName: name,
    mixins: [].concat(Immstructable, mixins, restOfStruct),
    statics: Object.assign({ fetchData }, statics),
    render() {
      var props = Object.keys(this.structures).reduce((acc, key) => {
        acc[key] = this.structures[key].cursor();
        return acc;
      }, {});

      // todo this is rendering twice

      return render.call(this, props);
    }
  });
}

module.exports = { Page, Component };
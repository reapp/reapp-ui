var Immstruct = require('immstruct');

module.exports = function(propKeys, onSwap) {
  return {
    componentWillMount() {
      this.structures = {};
      this.makeStructures(this.props);
    },

    componentWillReceiveProps(nextProps) {
      this.makeStructures(nextProps);
    },

    makeStructures(props) {
      propKeys.forEach(key => {
        var prop = props[key];
        if (!prop) return;

        this.structures[key] = (prop instanceof Immstruct) ?
          prop :
          Immstruct(key, prop);

        this.structures[key].on('next-animation-frame', (newStruct, oldStruct) => {
          this.forceUpdate();
          if (onSwap) onSwap(key, newStruct, oldStruct);
        });
      });
    },

    getImmutableProps() {
      return Object.keys(this.structures).reduce((acc, key) => {
        acc[key] = this.structures[key].cursor();
        return acc;
      }, {});
    }
  };
};
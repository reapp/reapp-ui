var Immstruct = require('immstruct');

module.exports = function({ props: propKeys, onSwap }) {
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
          onSwap(key, newStruct, oldStruct);
        });
      })
    }
  };
}
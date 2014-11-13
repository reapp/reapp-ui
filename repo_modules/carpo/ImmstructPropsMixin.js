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
        var data = props.data[key];
        if (!data) return;

        Object.keys(data).forEach(key => {
          var curProp = data[key];

          this.structures[key] = (curProp instanceof Immstruct) ?
            curProp :
            Immstruct(key, curProp);

          this.structures[key].on('next-animation-frame', (newStruct, oldStruct) => {
            this.forceUpdate();
            onSwap(key, newStruct, oldStruct);
          });
        });
      })
    }
  };
}
var Immstruct = require('immstruct');

module.exports = function(...dataKeys) {
  return {
    componentWillMount() {
      this.structures = {};
      this.makeStructures(this.props);
    },

    componentWillReceiveProps(nextProps) {
      this.makeStructures(nextProps);
    },

    makeStructures(props) {
      dataKeys.forEach(key => {
        if (!props.data[key]) return;

        this.structures[key] = Immstruct(key, props.data[key]);
        this.structures[key].on('next-animation-frame', () => {
          this.forceUpdate();
        });
      })
    }
  };
}
var Brawndo = require('brawndo');
var Immutable = require('immutable');

var StoreMixins = module.exports = {
  Immutable: Brawndo.createMixin({
    name: 'Immutable',

    initialize() {
      this.setState({ data: this.immute(this.state.data) });
    },

    expose: {
      immutable: Immutable,
      immute: data => Immutable.fromJS(data),

      immutePayload() {
        return this.setPayload(this.immute(this.payload));
      },

      setImmutableData(data) {
        return this.setState({ data: this.immute(data) });
      }
    }
  })
};
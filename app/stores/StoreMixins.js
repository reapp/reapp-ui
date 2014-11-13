var Brawndo = require('brawndo');
var Immutable = require('immutable');

var StoreMixins = module.exports = {
  Immutable: Brawndo.createMixin({
    name: 'Immutable',

    initialize() {
      this.state.data = this.immute(this.state.data);
    },

    expose: {
      immutable: Immutable,
      immute: data => Immutable.fromJS(data),

      // todo, override setState and add warning for changing data (or automate)

      setData(key, val) {
        this.state.data = this.state.data.set(key, this.immute(val));
      },

      immutePayload() {
        return this.setPayload(this.immute(this.payload));
      },

      setImmutableData(data) {
        return this.setState({ data: this.immute(data) });
      }
    }
  })
};
var Brawndo = require('brawndo');
var Immutable = require('immutable');

module.exports = Brawndo.createMixin({
  name: 'Immutable',

  initialize() {
    this.state.data = this.immute(this.state.data);
  },

  expose: {
    immutable: Immutable,

    isImmutable: data => (
      data instanceof Immutable.Seq ||
      data instanceof Immutable.Map
    ),

    immute(data) {
      return this.isImmutable(data) ?
        data :
        Immutable.fromJS(data);
    },

    setData(key, val) {
      this.state.data = this.state.data.set(key, this.immute(val));
    },

    immutePayload() {
      return this.setPayload(this.immute(this.payload));
    },

    setImmutableData(data) {
      return this.setState({ data: this.immute(data) });
    }

    // todo, override setState and add warning for changing data (or automate)
  }
});
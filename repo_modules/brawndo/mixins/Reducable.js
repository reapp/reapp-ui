var createMixin = require('../lib/createMixin');

var id = 0;

function uniqueId() {
  return id++;
}

var Reducable = module.exports = createMixin({
  name: 'Reducable',
  expose: {
    reduce(data) {
      return [].concat(data).reduce((acc, item) => {
        var clientId = uniqueId();
        acc[clientId] = { id: clientId, data: item, status: 'OK' };
        return acc;
      }, {});
    },

    reducePayload() {
      return this.setPayload(this.reduce(this.payload));
    }
  }
});

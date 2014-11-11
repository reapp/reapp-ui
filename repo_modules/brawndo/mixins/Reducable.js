var createMixin = require('../lib/createMixin');

var id = 0;

function uniqueId() {
  return id++;
}

var Reducable = module.exports = createMixin({
  name: 'Reducable',
  expose: {
    reducePayload: res => res.setState({
      data: [].concat(res.payload).reduce((acc, item) => {
        var clientId = uniqueId();
        acc[clientId] = { id: clientId, data: item, status: 'OK' };
        return acc;
      }, {})
    })
  }
});

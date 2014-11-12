var Brawndo = require('brawndo');
var Immstruct = require('immstruct');

var StoreMixins = module.exports = {
  Immutable: Brawndo.createMixin({
    name: 'Immutable',
    expose: {
      immute: data => {
        return new Immstruct(data);
      },

      immutePayload: res => {
        return res.setPayload(res.immute(res.payload));
      }
    }
  })
};
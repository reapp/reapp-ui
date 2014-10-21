var chai = require('chai');
var jsdom = require('jsdom');
var React  = require("react/addons"), ReactTestUtils = React.addons.TestUtils;

var should = chai.should();

var { Flux, FluxMixin, GetStores } = require('../app/bootstrap');

describe('GetStores', function () {

  describe('arguments', function () {

    it('should take displayName', function (done) {
      // GetStores(null, ['articles']);
    });

  });

  beforeEach(function () {
    global.document = jsdom.jsdom('<html><body></body></html>');
    global.window = global.document.parentWindow;
  });

  afterEach(function () {
    delete global.document;
    delete global.window;
  });
});

function noop () {}

function render (component) {
  ReactTestUtils.renderIntoDocument(component);
}

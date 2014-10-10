var Store = require('../stores/GSSStore');
var invariant = require('react/lib/invariant');

// TODO: Logic to detemine whether to update/change constraints

var StyleSheet;

var GSSMixin = {
  componentDidMount() {
    this.setupGSS();
    var node = this.getDOMNode();
    var id = '#' + (node.id || (node.id = this._rootNodeID));

    var constraints = typeof this.layout == 'function' ?
      this.layout(id) :
      this.layout;

    constraints = constraints.replace(/\_\[/g, id + '[');
    console.log(constraints);
    StyleSheet.addRules(GSS.compile(constraints));
  },

  componentWillUnmount() {
    // StyleSheet.destroy();
  },

  setupGSS() {
    if (StyleSheet) return;
    var engine = this.getGSSEngine();
    StyleSheet = new GSS.StyleSheet({engine: engine, engineId: engine.id});
  },

  getGSSEngine() {
    invariant(typeof GSS !== 'undefined', 'GSS not set up on the page');
    var engine = GSS.engines[0];
    invariant(engine, 'GSS is not ready yet. Did you forget GSS.once(\'afterLoaded\', ...) ?');
    invariant(!GSS.config.observe, 'You cannot use GSS in observe mode. Did you set observe: false in GSS_CONFIG?');
    return engine;
  }
};

module.exports = GSSMixin;

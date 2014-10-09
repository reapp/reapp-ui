var Store = require('../stores/GSSStore');
var invariant = require('react/lib/invariant');

// Global GSS stylesheet
var StyleSheet;

var GSSMixin = {
  checkGSS() {
    if (StyleSheet) return;
    invariant(typeof GSS !== 'undefined', 'GSS not set up on the page');
    var engine = GSS.engines[0];
    invariant(engine, 'GSS is not ready yet. Did you forget GSS.once(\'afterLoaded\', ...) ?');
    invariant(!GSS.config.observe, 'You cannot use GSS in observe mode. Did you set observe: false in GSS_CONFIG?');
    StyleSheet = new GSS.StyleSheet({engine: engine, engineId: engine.id});
  },

  componentDidMount() {
    this.checkGSS();
    var node = this.getDOMNode();
    var id = node.id || (node.id = this._rootNodeID);
    var constraints = typeof this.layout == 'function' ?
      this.layout('#' + id) :
      this.layout;

    StyleSheet.addRules(GSS.compile(constraints));
  }
};

module.exports = GSSMixin;

var Store = require('../stores/GSSStore');
var invariant = require('react/lib/invariant');
var StyleSheet, engine;

invariant(typeof GSS !== 'undefined', 'GSS not set up on the page');

var rules = [];

GSS.once('afterLoaded', function() {
  engine = GSS.engines[0];
  StyleSheet = new GSS.StyleSheet({engine: engine, engineId: engine.id});
  addRules(rules);
});

function addRules(constraints) {
  if (typeof constraints == 'array') {
    constraints.forEach(addRules);
  }
  else {
    if (StyleSheet) StyleSheet.addRules(GSS.compile(constraints));
    else rules.push(constraints);
  }
}

var GSSMixin = {
  componentDidMount() {
    var node = this.getDOMNode();
    var id = '#' + (node.id || (node.id = this._rootNodeID));

    var constraints = typeof this.layout == 'function' ?
      this.layout(id) :
      this.layout;

    constraints = constraints.replace(/\_\[/g, id + '[');
    addRules(constraints);
  },

  componentWillUnmount() {
    // StyleSheet.destroy();
  },
};

module.exports = GSSMixin;

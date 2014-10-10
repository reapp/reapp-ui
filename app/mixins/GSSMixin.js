var Store = require('../stores/GSSStore');
var invariant = require('react/lib/invariant');
var StyleSheet;
var rules = [];
var stage = 0;

GSS.once('afterLoaded', nextStage);

function nextStage() {
  if (++stage == 2) startUp();
}

function startUp() {
  var engine = GSS.engines[0];
  StyleSheet = new GSS.StyleSheet({engine: engine, engineId: engine.id});
  addRules(rules);
}

invariant(typeof GSS !== 'undefined', 'GSS not set up on the page');

function addRules(constraints) {
  if (typeof constraints == 'array') {
    constraints.forEach(addRules);
  }
  else {
    if (StyleSheet) {
      var compiledConstraints = GSS.compile(constraints);
      console.log('adding constraints', compiledConstraints);
      StyleSheet.addRules(compiledConstraints);
    }
    else {
      rules.push(constraints);
    }
  }
}

var GSSMixin = {
  _start() {
    console.log('_start')
    nextStage();
  },

  componentDidMount() {
    var node = this.getDOMNode();
    var id = '#' + (node.id || (node.id = this._rootNodeID));

    var constraints = typeof this.layout == 'function' ?
      this.layout(id) :
      this.layout;

    constraints = constraints.replace(/\_\[/g, id + '[').trim();
    addRules(constraints);
  },

  componentWillUnmount() {
    // StyleSheet.destroy();
  },
};

module.exports = GSSMixin;

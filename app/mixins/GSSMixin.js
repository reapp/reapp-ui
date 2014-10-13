var invariant = require('react/lib/invariant');
var _ = require('lodash');
var StyleSheet;
var rulesQueue = [];
var stage = 0;

GSS.once('afterLoaded', nextStage);

function nextStage() {
  if (++stage == 2) startUp();
}

function startUp() {
  var engine = GSS.engines[0];
  StyleSheet = new GSS.StyleSheet({engine: engine, engineId: engine.id} );
  addRules(rulesQueue);
}

invariant(typeof GSS !== 'undefined', 'GSS not set up on the page');

function addRules(constraints) {
  if (this.constraintsAdded) return;
  if (_.isArray(constraints))
    constraints.forEach(addRules);
  else {
    rulesQueue.push(constraints);
    if (StyleSheet) {
      StyleSheet.addRules(GSS.compile(constraints));
      this.constraintsAdded = true;
    }
  }
}

var GSSMixin = {
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
    // GSS.unobserveElement(this.getDOMNode())
    // StyleSheet.destroy();
  },

  reloadGSS() {
    // this sucks, for now
    // GSS.styleSheets[0].destroy();
    // var engine = GSS.engines[0];
    // StyleSheet = new GSS.StyleSheet({engine: engine, engineId: engine.id} );
    // rulesQueue.forEach((rule) => StyleSheet.addRules(GSS.compile(rule)));
  },

  _start() {
    nextStage();
  }
};

module.exports = GSSMixin;

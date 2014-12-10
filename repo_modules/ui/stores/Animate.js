var AnimateActions = require('../actions/Animate');
var store = {};

AnimateActions.listen(props => {
  Object.assign(store, props);
});

module.exports = () => store;
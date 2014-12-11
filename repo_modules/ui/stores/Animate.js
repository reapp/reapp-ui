var AnimateActions = require('../actions/Animate');

// format of this store:
// var store = {
//   'viewList': [{depth:1, ...props}, {depth:2, ...props}]
// };

var store = {};

AnimateActions.listen(action => {
  console.log('setting animate store', action);

  if (action.type === 'remove')
    removeFromStore(actions.source, action.depth);
  else
    addToStore(action);
});

function removeFromStore(source, depth) {
  Object.keys(store).forEach(key => {
    store[key] = store[key].filter(
      animation => animation.source === source && animation.depth === depth);
  });
}

// two cases, ADD or UPDATE
function addToStore(action) {
  var actionStore = store[action.source];

  // NOT EXISTS YET
  if (!actionStore || !actionStore.length) {
    store[action.source] = [action];
    return;
  }

  // UPDATE
  var updated = false;
  actionStore.forEach(animation => {
    if (animation.source == action.source && animation.depth === action.depth) {
      animation = {};
      updated = true;
    }
  });

  if (updated)
    return

  // ADD
  store[action.source].push(action);

  // UPDATE
  else {
    store[actions.source]
  }
}

module.exports = () => store;
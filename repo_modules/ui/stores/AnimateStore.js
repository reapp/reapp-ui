var AnimateActions = require('../actions/AnimateActions');

// This store is used for synchronizing animations.
// It allows Animators to store props for their animations
// and Animateds to fetch the right props based on their
// source and mountdepth

// Was using contexts, but I found they were inconsistent
// When accepting input from both props and context
// there were times when context was one step behind props

// Also, this store *should* be able to be faster than context
// just because it is singly-focused. But, one day it could be
// switched to context once that spec is finalized.

// var store = {
//   'animationSourceName': [
//     {
//       id: this._animateID,
//       depth: this._mountDepth,
//       props: propsObject
//     }
//   ]
// };

var store = {};

AnimateActions.listen(action => {
  if (action.type === 'remove')
    removeFromStore(action.id);
  else
    addToStore(action);
});

function removeFromStore(id) {
  Object.keys(store).forEach(key => {
    store[key] = store[key].filter(animation => animation.id === id);
  });
}

var animationMatches = (animation, source) => {
  return animation.source == source.source && animation.depth === source.depth;
};

// two cases, ADD or UPDATE
function addToStore(action) {
  var actionStore = store[action.source];
  action.timestamp = new Date();

  // NOT EXISTS YET
  if (!actionStore || !actionStore.length) {
    store[action.source] = [action];
    return;
  }

  // UPDATE
  var updated = false;
  var i, len = actionStore.length;
  for (i = 0; i < len; i++) {
    if (animationMatches(actionStore[i], action)) {
      actionStore[i] = action;
      return;
    }
  }

  // ADD
  store[action.source].push(action);
}

function getAnimation(animation, depth) {
  var animations = store[animation.source];

  if (!animations || !animations.length)
    return;

  var strategy = FetchStrategies[animation.strategy || 'newestShallowest'];
  var result = strategy.call(this, animations).props;
  return result;
}

// strategies for resolving how to determine which animation to choose
// only relevant when you have multiple animations from the same source
// ie: nested viewLists, you may want to get the animation from the deepest,
// shallowest, or most recent.

var FetchStrategies = {
  newestShallowest: animations => reduceAnimations(animations,
     (best, current) => {
      var curTime = current.timestamp.valueOf();
      var bestTime = best.timestamp.valueOf();

      if (curTime === bestTime)
        return current.depth <= best.depth;
      else
        return curTime > bestTime;
    }),

  deepest: animations => reduceAnimations(animations,
      (best, current) => current.depth >= best.depth),

  shallowest: animations => reduceAnimations(animations,
      (best, current) => current.depth <= best.depth),

  strongest: animations => reduceAnimations(animations,
      (best, current) => current.strength <= best.strength),

  newest: animations => reduceAnimations(animations,
      (best, current) => current.timestamp.valueOf() > best.timestamp.valueOf())
};

function reduceAnimations(animations, cb) {
  var i, len = animations.length;
  var best = animations[0];

  for (i = 1; i < len; i++)
    if (cb(best, animations[i]))
      best = animations[i];

  return best;
}

window.a = store;
window.g = getAnimation;

module.exports = getAnimation;
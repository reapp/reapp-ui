var AnimateActions = require('../actions/Animate');

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

var getAnimation = (source, depth) => {
  var animations = store[source];
  if (!animations) return;
  var i, len = animations.length;
  var deepestAnimation = { depth: -1 };
  for (i = 0; i < len; i++) {
    if (animations[i].depth <= depth && animations[i].depth >= deepestAnimation.depth) {
      deepestAnimation = animations[i];
    }
  }
  return deepestAnimation.props;
};

module.exports = getAnimation;
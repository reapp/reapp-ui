var AnimateActions = require('../actions/AnimateActions');

// This store is used for synchronizing animations.
// It allows Animators to store props for their animations
// and Animateds to fetch the right props based on their source

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
    delete store[action.source];
  else
    store[action.source] = action;
});

function getAnimation(animation) {
  return store[animation.source] && store[animation.source].props;
}

window.a = store;
window.g = getAnimation;

module.exports = getAnimation;
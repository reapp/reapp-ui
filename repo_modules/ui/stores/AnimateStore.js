// This store is used for synchronizing animations.
// It allows Animators to store state for their animations
// and Animateds to fetch the right state based on their source

// Waiting on contexts support in React to remove this

var store = {};

module.exports = function(source, state) {
  if (state)
    store[source] = state;
  else
    return store[source];
};
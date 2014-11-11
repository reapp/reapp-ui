module.exports = function({ name, state, actions }) {
  return storeActions => ({ name, state, actions, storeActions });
};
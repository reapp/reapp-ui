module.exports = function({ name, initialize, state, actions, expose }) {
  return storeActions => ({ name, initialize, state, actions, expose, storeActions });
};
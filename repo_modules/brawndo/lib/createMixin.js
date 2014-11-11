module.exports = function({ name, state, actions, expose }) {
  return storeActions => ({ name, state, actions, expose, storeActions });
};
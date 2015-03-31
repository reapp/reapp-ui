module.exports = {
  getConstant(name) {
    return this.context.theme.constants[name];
  }
};
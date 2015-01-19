var i = 0;
var uniqueID = () => i++ % Number.MAX_VALUE;

module.exports = {
  componentWillMount() {
    this._uniqueID = `ui-${uniqueID()}`;
  }
};
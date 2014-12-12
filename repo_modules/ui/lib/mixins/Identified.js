var i = 0;
var uniqueID = () => i++ % 1000000;

module.exports = {
  componentWillMount() {
    this._uniqueID = `ui-${uniqueID()}`;
  }
};
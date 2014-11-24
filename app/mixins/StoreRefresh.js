module.exports = function(name) {
  var Store = require(`stores/${name}Store`);

  return {
    componentWillMount() {
      this.forceUpdater = () => {
        this.forceUpdate();
      };

      Store.listen(this.forceUpdater);
    },

    componentWillUnmount() {
      Store.unlisten(this.forceUpdater);
    }
  };
};
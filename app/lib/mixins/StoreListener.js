module.exports = function(stores) {
  stores = [].concat(stores);

  return {
    componentWillMount() {
      this.forceUpdater = () => {
        this.forceUpdate();
      };

      stores.forEach(store => {
        store.listen(this.forceUpdater);
      });
    },

    componentWillUnmount() {
      stores.forEach(store => {
        store.unlisten(this.forceUpdater);
      });
    }
  };
};
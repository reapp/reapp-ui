module.exports = {
  componentWillMount() {
    this.forceUpdater = () => {
      this.forceUpdate();
    };

    this.stores.forEach(store => {
      // this.context.stores[store].listen(this.forceUpdater);
    });
  },

  componentWillUnmount() {
    this.stores.forEach(store => {
      // this.context.stores[store].unlisten(this.forceUpdater);
    });
  }
};
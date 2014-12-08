var Actions = require('../actions/Actions');

module.exports = {
  componentWillMount() {
    this.setState({ modalProps: null });

    this._modalUnlisten = Actions.listen(action => {
      var { modalProps } = action;
      if (!modalProps) return;

      modalProps.handleClose = () => {
        this.setState({ modalProps: null });
      };

      this.setState({ modalProps });
    });
  },

  componentWillUnmount() {
    this._modalUnlisten();
  }
};
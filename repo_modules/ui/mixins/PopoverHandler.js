var Actions = require('ui/actions/Actions');

module.exports = {
  componentWillMount() {
    this.setState({ popoverProps: null });

    this._popoverUnlisten = Actions.listen(action => {
      var { popoverProps } = action;
      if (!popoverProps) return;

      popoverProps.handleClose = () => {
        this.setState({ popoverProps: null });
      };

      this.setState({ popoverProps });
    });
  },

  componentWillUnmount() {
    this._popoverUnlisten();
  }
};
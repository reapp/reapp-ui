var Actions = require('../actions/Actions');

module.exports = {
  componentWillMount() {
    this._popoverUnlisten = Actions.listen(action => {
      var { popover } = action;
      if (!popover) return;

      popover.handleClose = () => {
        this.setState({ popoverProps: null });
      };

      this.setState({
        popoverProps: popover
      });
    });
  },

  componentWillUnmount() {
    this._popoverUnlisten();
  }
};
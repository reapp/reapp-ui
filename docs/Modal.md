### Menu
An alert that allows user to confirm, or be prompted for options.

- `type` of 'alert' (just shows ok), `prompt` or `confirm` (ok, cancel).
- `animationDuration` ms for animation to run

Props:
```
propTypes: {
  type: React.PropTypes.string,
  animationDuration: React.PropTypes.number,
  animations: React.PropTypes.object,
  handleConfirm: React.PropTypes.func,
  handleCancel: React.PropTypes.func,
  handleClose: React.PropTypes.func
}
```
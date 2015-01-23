### Drawer

A panel that slides in from the side of the screen, and can be dragged
back out.

- `from` which side it comes from.
- `closed` toggle open or closed.
- `touchableProps` will be passed down to it's internal touchableArea
(useful for disabling or changing the area).
- `onClose` calls a callback when closed by used.


Props:
```
propTypes: {
  behavior: React.PropTypes.object,
  from: React.PropTypes.oneOf([
    'left', 'right', 'top', 'bottom'
  ]),
  closed: React.PropTypes.bool,
  touchableProps: React.PropTypes.object,
  onClose: React.PropTypes.func
}
```
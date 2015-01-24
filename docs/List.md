### List
Parent of ListItem, will automatically wrap an array with ListItem
elements. Also accepts title for auto-adding Title components before.

- `type` so far, just 'inset' is an option
- `nowrap` don't wrap ListItem around components automatically


Props:
```
propTypes: {
  type: React.PropTypes.string,
  liProps: React.PropTypes.object,
  title: React.PropTypes.node,
  nowrap: React.PropTypes.bool,
  nopad: React.PropTypes.bool
}
```
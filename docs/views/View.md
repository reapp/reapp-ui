### View

The base View class. Give it a `title` property to automatically had a titlebar.
When used inside a ViewList, it will be animated automatically.

Props:
```
propTypes: {
  title: React.PropTypes.node,
  index: React.PropTypes.number,
  width: React.PropTypes.number,
  height: React.PropTypes.number,

  // add animations in view list
  isInViewList: React.PropTypes.bool,

  // offset of inner scroll area from top
  offsetTop: React.PropTypes.number,

  // offset of inner scroll area from bottom
  offsetBottom: React.PropTypes.number,

  animations: React.PropTypes.object,

  // pass inner div props (scrollable content)
  innerProps: React.PropTypes.object,

  // pass titlebar props
  titleBarProps: React.PropTypes.object,

  // pass overlay div props
  overlayProps: React.PropTypes.object,

  // place a node outside the inner pane
  after: React.PropTypes.node,

  // disable pointer events
  inactive: React.PropTypes.bool,

  // make the StaticContainer inside fullscreen
  fullscreen: React.PropTypes.bool,

  // see scrollTopable
  scrollTop: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
}
```
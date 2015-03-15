### TitleBar
A special type of bar that is used within views as the title.
Handles a variety of use cases for positioning content and animations.

- `width` automatically set to window by default
- `height` adjust height from default

One of:
- `left` content on the left, handles icon animations for you
- `right` content on the right, handles icon animations for you
- `children` content in the middle.

or just use `children` with a three-arity array.

Props:
```
propTypes: {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  animations: React.PropTypes.object,

  // either this, with children node
  left: React.PropTypes.node,
  right: React.PropTypes.node,

  transparent: React.PropTypes.bool
}
```
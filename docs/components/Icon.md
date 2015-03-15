### Icon
We've taken the [flaticon](http://www.flaticon.com/packs/ios7-set-lined-1)
set of icons and normalized their names and styling. SVG gives you
crisp edges in your interface. But, you can also use your own icon set.

Be sure to include proper CC3 attribution when using these.

- `size` number for width and height.
- `path` path to icon, defaults to the svg kit
- `isInTitleBar` used internally
- `svgProps` to pass to the svg

Props:
```
propTypes: {
  size: React.PropTypes.number,
  path: React.PropTypes.string,
  name: React.PropTypes.string,
  color: React.PropTypes.string,
  stroke: React.PropTypes.number,
  isInTitleBar: React.PropTypes.bool,
  shapeRendering: React.PropTypes.string,
  svgProps: React.PropTypes.object
}
```
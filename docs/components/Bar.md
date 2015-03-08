### Bar

Bars attach to an edge of the screen, as given by position.
Bars contain icons and text, usually as a header and navigation.
See TitleBar for a specific usage of a bar designed for View titles.

A bar will automatically wrap it's children with BarItem, but you can
manually use BarItem if you'd like to customize them.

Props:
```
propTypes: {
  barItemProps: React.PropTypes.object,
  position: React.PropTypes.string,
  activeIndexIndex: React.PropTypes.number,
  nowrap: React.PropTypes.bool
}
```
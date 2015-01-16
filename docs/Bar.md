### Bar

Bars attach to an edge of the screen, as given by position.
Bars contain icons and text, usually as a header and navigation.

See TitleBar for a specific usage of a bar designed for View titles.

A bar expects a BarItem as it's child, otherwise it will wrap them.

Props:
 - position: one of: top, bottom
 - barItemProps: An object of props to pass to BarItem children

Usage:

```
  <Bar>1</Bar>
```
## Alert

Show an alert banner at the top of the View.

```
propTypes: {
  children: React.PropTypes.node
}
```

## Badge

A badge is used on lists or over icons and bars for notifications of numbers usually.

```
propTypes: {
  children: React.PropTypes.node
}
```
## Bar

Bars attach to an edge of the screen, as given by position.
Bars contain icons and text, usually as a header and navigation.
See TitleBar for a specific usage of a bar designed for View titles.

A bar will automatically wrap it's children with BarItem, but you can
manually use BarItem if you'd like to customize them.

```
propTypes: {
  // one of text, icon, icon-text, icon-text-right
  display: React.PropTypes.string,

  // props to pass to each BarItem child
  barItemProps: React.PropTypes.object,

  // attach to which side of screen
  position: React.PropTypes.string,

  // which BarItem to pass active prop
  activeIndex: React.PropTypes.number,

  // automatically wrap children with BarItem
  wrap: React.PropTypes.bool
},
```

## BarItem

An item in the Bar. Can be accessed as Bar.Item

- `children` used for text
- `icon` string or element
- `display`:
  - text: Text only
  - icon: Icon only
  - icon-text: Icon above text
  - icon-text-right: Icon left of text

```
propTypes: {
  icon: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]),
  iconProps: React.PropTypes.object,
  children: React.PropTypes.node,
  display: React.PropTypes.oneOf([
    'text', 'icon', 'icon-text', 'icon-text-right'
  ]),
  active: React.PropTypes.bool
}
```

## Button

Buttons are buttons! Can be placed in a ButtonGroup.
Use onTap to add tap events.

```
propTypes: {
  // pass properties to Icon
  iconProps: React.PropTypes.object,

  // SVG icon
  icon: React.PropTypes.element,

  // no visual chrome added
  chromeless: React.PropTypes.bool,

  // Extend to fit screen when inside View
  fullscreen: React.PropTypes.bool,

  // Fully rounded corners
  rounded: React.PropTypes.bool,

  // Filled type button (no borders)
  filled: React.PropTypes.bool,

  // Color of button
  color: React.PropTypes.string,

  // Text color
  textColor: React.PropTypes.string,

  // Disabled look / no tap
  inactive: React.PropTypes.bool,

  // Props used for special display
  isInTitleBar: React.PropTypes.bool,
  isInViewList: React.PropTypes.bool,
}
```


## ButtonGroup

Also accessible as Button.Group

A button group manages a list of buttons. Places them together.
It can pass properties down to the children buttons as well to avoid
code duplication.

```
propTypes: {
  children: React.PropTypes.node,
  buttonProps: React.PropTypes.object
}
```
## Card

Simple Card element.

```
propTypes: {
  title: React.PropTypes.string,
  children: React.PropTypes.node
}
```
## Chat

Contains a list of ChatItems for use in messaging interfaces.

```
propTypes: {
  // pass props to ChatItem
  itemProps: React.PropTypes.object,

  // auto wrap children with ChatItem
  wrap: React.PropTypes.bool
},
```

## ChatItem

Also accessible as Chat.Item.  A chat bubble for use in messaging interfaces.

```
propTypes: {
  // Text name for chat bubble
  name: React.PropTypes.string,

  // Date on chat bubble
  date: React.PropTypes.string,

  // Image for chat bubble
  image: React.PropTypes.node,

  // Belongs to user (shown on right side)
  own: React.PropTypes.bool,

  // No decoration on chat bubble
  plain: React.PropTypes.bool
}
```

## Checkbox

Checkbox is used in forms, passes it's props on to an `<input type="checkbox" />`.

```
propTypes: {
  onChange: React.PropTypes.func,
  checked: React.PropTypes.bool
}
```

## Container

A row in a flexbox Grid.

```
propTypes: {
  pad: React.PropTypes.bool,
  col: React.PropTypes.bool,

  // wrap in Block automatically
  wrap: React.PropTypes.bool
}
```

## Dots

Dots are the equivalent of those used in the homescreen in iOS.
Used to track location within a list of views.

```
propTypes: {
  // Total dots
  total: React.PropTypes.number.isRequired,

  // Index of active dot
  active: React.PropTypes.number.isRequired
}
```

## Drawer

A panel that slides in from the side of the screen, and can be dragged back out.

- `from` which side it comes from.
- `translate` pass in an object with { x: (number: 0-100) }
- `behavior` pass in object with translate objects for all the from props
- `closed` toggle open or closed.
- `touchableProps` will be passed down to it's internal touchableArea
(useful for disabling or changing the area).
- `onClose` calls a callback when closed by used.


```
propTypes: {
  behavior: React.PropTypes.object,
  translate: React.PropTypes.object,
  from: React.PropTypes.oneOf([
    'left', 'right', 'top', 'bottom'
  ]),
  touchableProps: React.PropTypes.object,
  onClose: React.PropTypes.func,
  open: React.PropTypes.bool,
  dragger: React.PropTypes.bool,
  draggerWidth: React.PropTypes.number,
  width: React.PropTypes.number,
  height: React.PropTypes.number
}
```

## Gallery

Displays images in a swipeable gallery.

```
propTypes: {
  images: React.PropTypes.array.isRequired,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  onClose: React.PropTypes.func,
  animationDuration: React.PropTypes.number,
  animations: React.PropTypes.object
}
```

## Grid

Allows you to easily access Container and Block through Grid.Container and
Grid.Block.

## Icon
We've taken the [flaticon](http://www.flaticon.com/packs/ios7-set-lined-1)
set of icons and normalized their names and styling. SVG gives you
crisp edges in your interface. But, you can also use your own icon set.

Be sure to include proper CC3 attribution when using these.

- `size` number for width and height.
- `path` path to icon, defaults to the svg kit
- `isInTitleBar` used internally
- `svgProps` to pass to the svg

```
propTypes: {
  // width x height in pixels
  size: React.PropTypes.number,

  // an SVG file
  file: React.PropTypes.string,

  // props passed to svg
  stroke: React.PropTypes.number,
  shapeRendering: React.PropTypes.string,
  viewBox: React.PropTypes.string,
  crisp: React.PropTypes.bool,

  // internal props used for special styles
  isInTitleBar: React.PropTypes.bool,
  isInViewList: React.PropTypes.bool
}
```

## Input

An input, much like HTML input.

## Label

For use in forms.

```
propTypes: {
  title: React.PropTypes.string
}

```

## List

Parent for use with ListItem.
Also accepts title for auto-adding Title components before.

- `type` so far, just 'inset' is an option
- `nowrap` don't wrap ListItem around components automatically


```
propTypes: {
  // pass props to List.Item
  itemProps: React.PropTypes.object,

  // List title
  title: React.PropTypes.node,

  // Automatically wrap children with List.Item
  wrap: React.PropTypes.bool,

  // Don't add padding
  nopad: React.PropTypes.bool
}
```

## ListItem

Accessible as List.Item.
Takes a variety of properties for constructing lists.

```
propTypes: {
  // displayed in bold at the top
  title: React.PropTypes.node,

  // aligns to the right of title, for badges, time, etc
  titleAfter: React.PropTypes.node,

  // lighter sub title
  titleSub: React.PropTypes.node,

  // place an icon or element before the item
  before: React.PropTypes.node,

  // place an icon or element after the item
  after: React.PropTypes.node,

  // wrap an element around the item, good for links
  wrapper: React.PropTypes.node,

  // show an icon indicating it's linked
  icon: React.PropTypes.bool,

  // don't add padding
  nopad: React.PropTypes.bool
}
```

## Menu
An alert that allows user to confirm, or be prompted for options.

- `type` of 'alert' (just shows ok), `prompt` or `confirm` (ok, cancel).
- `animationDuration` ms for animation to run

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

## Modal

Displays a modal above current content.

```
propTypes: {
  open: React.PropTypes.bool,
  type: React.PropTypes.oneOf([
    'alert', // OK
    'confirm' // Cancel | OK
  ]),
  animationDuration: React.PropTypes.number,
  animations: React.PropTypes.object,
  onConfirm: React.PropTypes.func,
  onCancel: React.PropTypes.func,
  onClose: React.PropTypes.func
}
```


## Popover
A menu that appears over content, accepts an array of children to
be used as the menu items.


```
propTypes: {
  // element the popover is pointing towards
  target: React.PropTypes.object.isRequired,

  // show it as open
  open: React.PropTypes.bool,

  // pad in px towards edge of strings
  edgePadding: React.PropTypes.number,

  // size of arrow
  arrowSize: React.PropTypes.number,

  // after close event
  onClose: React.PropTypes.func,
  animationDuration: React.PropTypes.number,
  animations: React.PropTypes.object
}
```

## Radio

A standard form radio button.

## SearchBar

A bar that will automatically appear under TitleBars when in a view.
Contains an input that you can pass props to directly.

## TextArea

A form textarea.

## Title

Accepts children, renders as a title for groups of content in views.

## TitleBar

A special type of bar that is used within views as the title.
Handles a variety of use cases for positioning content and animations.

- `width` automatically set to window by default
- `height` adjust height from default

One of:
- `left` content on the left, handles icon animations for you
- `right` content on the right, handles icon animations for you
- `children` content in the middle.

or just use `children` with a ternary array.

```
propTypes: {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  left: React.PropTypes.node,
  right: React.PropTypes.node,
  transparent: React.PropTypes.bool,

  isInViewList: React.PropTypes.bool,

  // attach to side of screen
  attach: React.PropTypes.string
}
```

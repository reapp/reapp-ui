## reapp-ui

*This is an alpha release: seeking feedback, expect missing pieces, laughable mistakes, big changes*

reapp-ui is a set of React components for building app UI's. It has a few goals

- Allow pick-and-choose usage
- Work well together
- Lightweight code with few dependencies
- Themeable
- Adaptable to many platforms

Near-term goals are to finish out all the components in the toolkit,
get and implement feedback from the community, fix any glaring performance
and visual issues, and then create an Android theme.

It includes quite a few things that may end up in their own repo's, once the code
has settled out a bit into something more coherent.

### Principles

- Aim for performance and consistency.
- Keep the repo structure as flat as possible.
- Decouple components. Allow selective usage of these components.

### Todo

See TODO.md for more high level stuff.

- More fully implement constants use in styles, make more consistant
- Move iOS theme to it's own repo, make Android theme

- Components:
  - Alerts
  - Form elments: Slider
  - Map
  - Popover that slides up from bottom
  - Photo viewer

- Actions
  - Notifications
  - Pull-to-refresh
  - Slideable & Sortable ListItem actions

### Structure

```
  /actions
    Internal: for components to communicate
  /assets
    Icons, etc
  /behaviors
    (!) Used within components, can be passed in to override
  /components
    The UI components
  /helpers
    Components which don't map directly to user-viewable, helper components
  /lib
    Internally used functions
  /mixins
    All mixins (used internally and externally)
  /stores
    Internal: should be removable once parent-based contexts are implemented in React
  /themes
    Theme files users can require
```

#### index.js

Used to set up reapp-ui.

reapp-ui uses three different things that must be imported at init. These
things are imported so they can be mixed and matched for use with adapating
theme or behavior.

For now it has three relevant methods:

- `addConstants`: constants allow users to customize themes easily. They are used
  in styles (and in the future could be used with animations and more).
  **See /themes/ios/constants/* for examples.**

- `addStyles`: styles objects, keys map to the names of components and values are
  objects that are CSS styles in JS. Values can optionally be a function, that takes
  in the constants as the argument.
  **See /themes/ios/styles/* for examples.**

- `addAnimations`: animations are objects, keys are names, values are functions that
  take an object with `index`, `step` as keys, an optionally extra keys with more info.
  **See /themes/ios/animations.js for examples.**

To see how you'd make a theme, I'd suggest looking at `/themes/ios/theme.js`. You
can require that file to have the entire iOS theme setup for you automatically.

#### component.js

component is a decorator that is used internally by reapp-ui to make components. It
was extracted out and is a nice set of mixins that allow the ui components to avoid
reptitious code.

This is an important file to look at before understanding how this library works,
and from there, the Mixins that are used here make the foundation of the UI kit.

### Credits

Original inspiration was thanks to [Pete Hunt](https://github.com/petehunt)'s [React Mobile Demo](http://petehunt.github.io/react-touch/).
The [Framework7]() Kitchen Sink was used as reference when building the kitchen sink.

SVG Icons included in this repo are originally from [flaticon](http://www.flaticon.com/packs/ios7-set-lined-1)
and are licensed under [Creative Commons 3.0](http://creativecommons.org/licenses/by/3.0/). If you use them with your project, you must
include attribution "in any reasonable manner, but not in any way that suggests the licensor endorses you or your use".

Help throughout was given in the #reactjs freenode channel, and from various great members
of the react community including:
 - [Andrey Popp](https://github.com/andreypopp)
 - [Ryan Florence](https://github.com/rpflorence)
 - [Dan Abramov](http://github.com/gaearon)

and many more.
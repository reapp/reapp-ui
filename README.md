*This is an alpha release: seeking feedback, expect missing pieces, laughable mistakes, big changes*

## reapp-ui

reapp-ui is a set of React components for building app UI's. It has a few goals

- Allow pick-and-choose usage
- Work well together
- Lightweight code with few dependencies
- Themeable
- Adaptable to many platforms

It includes quite a few things that may end up in their own repo's, once the code
has settled out a bit into something more coherent.

For now, I'll write docs based on the code:

### index.js

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

### component.js

component is a decorator that is used internally by reapp-ui to make components. It
was extracted out and is a nice set of mixins that allow the ui components to avoid
reptitious code.
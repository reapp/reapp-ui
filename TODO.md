Compilation of things this repo needs, as I run across them.

### General

- Testing. Need desperately to find a testing strategy and begin testing.
Until now things have been moving quickly and changing so much I've avoided,
but for 1.0 this is a must.

- PropTypes. These are still missing in some components.

- Modularity. Need to be sure to avoid requiring the index.js to load everything
Good example is animations, right now they can only be loaded through
`UI.addAnimations`, but in order to make the Animated.js mixin re-usable by
outside sources, would need to have a "default" way of fetching animations, probably
just looking on the component itself.
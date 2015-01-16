Compilation of things this repo needs, as I run across them.

### General

- Testing... Until now things have been moving quickly and changing, but this is a must.

- Cordova/Crosswalk API integration

- Constant Overriding. See Buttons example in Kitchen Sink. You may want to
just override the constants in a certain component. Say, you want a ButtonGroup
that is green, but the rest of your ButtonGroups stay with your theme. This is
a case where you'd want to pass in something like
`{ constants: { activeColor: XXX } }`. Though, because styles are compiled
with passed in constants once at init time, we'd have to recompute in this case.

- Modularity. Need to be sure to avoid requiring the index.js to load everything
Good example is animations, right now they can only be loaded through
`UI.addAnimations`, but in order to make the Animated.js mixin re-usable by
outside sources, would need to have a "default" way of fetching animations, probably
just looking on the component itself.

- Get react-document-title working again, View's should be able to set it properly
if their step === index when inside a ViewList.
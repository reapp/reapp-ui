Compilation of things this repo needs, as I run across them.

### Near-term

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

- Dead code elimination via webpack? Closure compiler? Right now it's a bit verbose
to require lots of ui components, each one you must do require('reapp-ui/component/${name}').
In `./all.js` I've exported all the components (which is also a bit tedous). A win-win
would be way for people to just require('reapp-ui') and destructure any component, but have
the build system automatically remove any non-used components.
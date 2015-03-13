*These docs are in progress!*

## Themes

Loading themes is easy with Reapp. We wanted a system that allowed complete
flexibility by allowing users to modify any small piece of a theme, as well as swap
entire themes out. Finally, we needed to work with build systems so that you could
load only the pieces you needed.

Here's an example of manually loading the default iOS theme:

```js
var UI = require('reapp-ui');
var iOS = require('reapp-ui/themes/ios');

require('reapp-ui/themes/ios/stylesheets');

UI.addConstants(
  iOS.constants.base,
  iOS.constants.components
);

UI.addStyles(
  iOS.styles
);

UI.addAnimations(
  iOS.animations
);
```

As you can see, there are three things we add into a theme: constants, styles,
and animations. In general, these object serve different purposes:

- Constants: Used in your Styles or in your app. No nested objects, just strings or numbers.
- Styles: One big object that maps Component => StylesObject => ref => styles.
- Animations: Flat object with key => function, where functions return objects describing animations.

Once you've loaded your theme you can do this to see your theme:

```
UI.getConstants(); // get an object of all constants
UI.getConstants('key'); // get a single value

UI.getStyles(); // get an object of all styles
UI.getStyles('Component'); // get an object of all styles for one component

UI.getAnimations(); //get an object of all animations
UI.getAnimations('key'); // get a single animation
```

Let's look at each in more detail.

### Constants
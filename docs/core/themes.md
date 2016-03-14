*These docs are in progress!*

## Themes

Themes are handled through contexts in the latest Reapp UI (0.11). While it's a small
change in code to support, it's a huge enhancement in flexibility.

A theme consists of constants, styles and animations. It looks like this:

```
let theme = {
  constants: {
    borderWidth: 1
  },

  styles: {
    List: {
      self: {
        background: '#eee'
      },
    }
  },

  animations: {
    fadeToLeft({ index, step }) {
      return {
        translate: { x: index - step },
        opacity: index - step
      }
    }
  }
}
```

If you're using reapp-kit, loading a custom theme that extends the iOS one
is as easy as:

```js
import { theme } from 'reapp-kit';
import iOS from 'reapp-kit/themes/ios';

theme({
  constants:  [
    iOS.constants.base,
    iOS.constants.components,
    require('./constants/components')
  ],
  styles: [ iOS.styles, require('./styles') ],
  animations: [ iOS.animations ]
});
```

When you import reapp-ui, you are given a helper that lets you construct these objects
more easily.

Here's an example of manually loading the iOS theme with reapp-ui:

```js
import UI from 'reapp-ui';
import iOS from 'reapp-ui/themes/ios';

// import base css styles
import 'reapp-ui/themes/ios/stylesheets';

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

export default UI.makeTheme();
```

One thing to note is that when using the reapp-ui helpers, your styles will have access
to constants if you export a function for each one. So you can use them like so:

```
UI.addConstants({ baseColor: '#fff' });
UI.addStyles({
  List: constants => ({
    self: {
      border: `1px solid ${constants.baseColor}`
    }
  })
});
```

In general:

- Constants: Used to store fundamental properties of your theme. Passed into Styles that are
defined as functions.
- Styles: One big object that maps Component => ref => styles.
- Animations: Flat object with key => function, where functions return objects describing animations.

A final note, notice the `UI.makeTheme()`. This exports a plain JS object like the one we started
out with. Since themes use context, let's learn how to load them into our app.

### Loading a theme

With reapp-kit, you already have your theme loaded. When you build you top-level component,
you just need to wrap it like so:

```js
import { React, Reapp } from 'reapp-kit'

class MyComponent extends React.Component {
  render() {
    // your stuff
  }
}

export default Reapp(MyComponent);
```

Reapp-kit will take care of loading the theme into context.

Without the kit, you can load a theme using our `Theme` helper. After you've made your theme
using `UI.makeTheme` from above, you could load it like so:

```
import theme from './mytheme';
import Theme from 'reapp-ui/helpers/Theme';
import Button from 'reapp-ui/components/Button';

export default React.createClass({
  render() {
    return (
      <Theme {...theme}>
        <Button>Hello world!</Button>
      </Theme>
    )
  }
})
```

The `Theme` helper is a simple component that sets the `this.context.theme` variable
to be the theme object you created.

We'll be expanding documentation on this as we go, but in the future the power of the
themes in contexts will be that you can swap them out. That very same Button could
change the `theme` variable to be an Android theme, and your entire app would change
on the fly!

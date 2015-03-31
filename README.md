## The Reapp User Interface

reapp-ui is a set of React components for building beautiful user interfaces
for all platforms. It has a few goals:

- Powerful interaction and animations
- Easy to use what you want, and leave the rest
- Themeable in every way
- High performance

### Usage

The most simple way of using reapp-ui is to load one of our themes, and
then import the components you want to use. Here's an example of this;

```js
import iOSTheme from 'reapp-ui/themes/ios/theme'
import Theme from 'reapp-ui/helpers/Theme';
import Button from 'reapp-ui/components/Button';
import React from 'react';

export default React.createClass({
  render() {
    return (
      <Theme {...iOSTheme}>
        <Button color="red" />
      </Theme>
    );
  }
});
```

This will bundle every style for every component in the iOS theme. It's
simple and easy to get started with. Reapp themes are very powerful though,
and allow you to customize every piece of them.

Lets see how they work. If you open the `reapp-ui/themes/ios/theme.js` file
you'll see how we load the iOS theme:

```js
import UI from 'reapp-ui';

UI.addConstants(
  require('./constants/base'),
  require('./constants/components')
);

UI.addAnimations(require('./animations'));
UI.addStyles(require('./styles'));

export default UI.makeTheme();
```

As you can see, we're basically loading three different pieces: constants,
styles, and animations. We're also loading the stylesheets file, which
includes our base.css styles that are used to normalize everything.

You could easily override each of these steps by adding in new constants,
styles, or animations, or overwriting the ones we use!

### Using Reapp

The rest of the docs here describe the internals of reapp-ui. If you want to learn
more on how Reapp works, check out:

- [Components](http://reapp.io/components.html) & [Views](http://reapp.io/views.html): The building blocks of reapp-ui
- [Packages](http://reapp.io/packages.html): Information on the other packages that come with reapp
- [Animations](http://reapp.io/docs-animations.html): How to make custom animations
- [Themes](http://reapp.io/docs-themes.html): Themes in depth
- [Building & Cordova](http://reapp.io/docs-builds.html): How to build your app for the web, ios, or any other platforms


### Demos

You can add these demos to your homescreen or emulate mobile on your browser:

- [kitchen.reapp.io](http://kitchen.reapp.io)
- [hn.reapp.io](http://hn.reapp.io)

### Internal Documentation

#### Structure

```
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
    Internal: should be removable once parent-based contexts are in React
  /themes
    Theme files users can require
```

**index.js**

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

**component.js**

component is a decorator that is used internally by reapp-ui to make components. It
was extracted out and is a nice set of mixins that allow the ui components to avoid
reptitious code.

This is an important file to look at before understanding how this library works,
and from there, the Mixins that are used here make the foundation of the UI kit.

#### Contributing

Because Reapp has split itself into a number of modules, you'll probably need to do a little
more work than usual to contribute. For the UI, the best setup is to do the following:

1. Create a `reapp` folder
2. Clone the [kitchen sink](https://github.com/reapp/kitchen-sink) repository
3. Clone this repository
4. Run `sudo npm link` inside this repository
5. **Important:** Run `rm -r node_modules/react` in reapp-ui and be sure react isn't duplicated in Webpack build
6. Run `npm watch` in this directory to start babel compiler
7. Be sure to edit in `./src` directory only.
8. Run `sudo npm link reapp-ui` inside the kitchen sink repository

This will link your reapp-ui module into your kitchen sink repo. Now you can:

9. Run `reapp run -d` inside kitchen sink
10. Go to [localhost:3010](http://localhost:3010)
11. Make edits inside reapp-ui and they will automatically compile into the kitchen sink.

**Warning:** When running locally you may run into some unique bugs. Because `npm link`
runs an `npm install`, it will often install multiple versions of React into your
modules folders, causing Webpack to bundle multiple versions of it into your app. This
can cause a variety of errors. If you see stuff that warns about `Mount, Link, Context`,
it is most likely because of this. Delete the react folder inside reapp-ui and any other
sub-modules and re-run Webpack.

### Credits

Original inspiration was thanks to [Pete Hunt](https://github.com/petehunt)'s [React Mobile Demo](http://petehunt.github.io/react-touch/).
The [Framework7]() Kitchen Sink was used as reference when building the kitchen sink.

SVG Icons included in this repo are originally from [flaticon](http://www.flaticon.com/packs/ios7-set-lined-1)
and are licensed under [Creative Commons 3.0](http://creativecommons.org/licenses/by/3.0/). If you use them with your project, you must
include attribution "in any reasonable manner, but not in any way that suggests the licensor endorses you or your use".

A big part of [react-tappable](https://github.com/JedWatson/react-tappable) was imported for use as a mixin, and will be sent
back as a pull request soon!

Help throughout was given in the #reactjs freenode channel, and from various great members
of the react community including:
 - [Andrey Popp](https://github.com/andreypopp)
 - [Ryan Florence](https://github.com/rpflorence)
 - [Dan Abramov](http://github.com/gaearon)

and many more.

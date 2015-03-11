## Animations

Animations in Reapp are powered by our [Animated mixin](https://github.com/reapp/reapp-ui/blob/master/mixins/Animated.js).

You can load animations into your [Theme](https://reapp.io/themes.html) using the following
syntax:

```js
import UI from 'reapp-ui';

UI.addAnimations({
  slideLeft({ index, step }) {
    return {
      translate: {
        x: index - step * 100
      }
    }
  }
})
```

All animations take in two properties: index and step.

- index: The position of the item within the scope of items.
- step: The current position of the animation.

You could imagine a list of items like this:

```
<Parent>
  <Child index={0} />
  <Child index={1} />
  <Child index={2} />
</Parent>
```

Now, let's animate through the list of Child elements. First we'll set up
the Parent class to do a tween.

In your Parent class import the [react-tween-state](https://github.com/chenglou/react-tween-state),
and set up a tween from 0 to 2 that lasts a second:

```js
import Animated from 'reapp-ui/mixins/Animated';
import tweenState from 'react-tween-state';

var Parent = React.createClass({
  getInitialState() {
    return {
      step: 0
    };
  },

  componentDidMount() {
    this.tweenState('step', {
      easing: tweenState.easingTypes.easeInOutQuad,
      duration: 1000,
      endValue: 2
    });
  },

  render() {
    return React.children.map(this.props.children, (child, i) =>
      React.cloneElement(child, {
        index: i,
        step: this.state.step
      })
    ));
  }
});
```

Notice we clone the children elements and pass down the index and step to them.
Let's make our Child elements:

```
<Child animations={{ self: 'slideLeft' }}>
```


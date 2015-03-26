*These docs are in progress!*

## Animations

Animations in Reapp are powered by our [Animated mixin](https://github.com/reapp/reapp-ui/blob/master/mixins/Animated.js). This mixin provides an API that allows you to easily animate React elements.

Animations are defined in a specific format. When you pass props to a component, you use `animations` as the key. The value is an object that describes the animations you want:

```
var animations = {
  self: ['fade', 'moveLeft'],
  button: 'moveRight'
};

<Component animations={animations}>
```

In the above example we are definining a more complex animation, where the component is being told to animate it's outermost div (`self`) with two animations: 'fade' and 'moveLeft'. Meanwhile, we assign the 'moveRight' animation to it's button.

In reapp-ui, we have a helper that automatically handles these props. The keys in the animation object merely map to DOM nodes within the component. We expose a function `componentProps()` that returns props for our components in a structured way. For example, within our above Component we would write:

**Note: The componentsProps helper is only used internally within reapp-ui to enforce consistency and save writing code, but you can still use animations by just using a "ref" on your props. We'll explain this more below**

```
Component({
  name: 'MyButton',

  render() {
    return
      <div {...componentProps()}>
        <button {...componentProps('button')} />
      </div>
  }
})
```

The componentProps would end up apply attributes on those nodes like this:

```
<div ref="self" className="MyButton">
  <button ref="button" className="MyButton-button" />
</div>
```

The `ref` attribute is the same as the string we pass to componentProps, but it defaults to 'self', which we use for all top DOM nodes.

Now, going back to how we defined our animation props we can see how they apply. The `<div ref="self">` gets 'fade' and 'moveLeft', while the `<button ref="button">` gets 'moveRight'.

### Animated Mixin

A simple mixin to run animations through context or within a component.

#### Core concepts

The Animated mixin uses the `this.context.theme.animations : object`
to search for animations. Animations are function that take an object,
like so: `{ index, state, ...extraProps }` and return an object with
the following options:

```
  {
    transform: { x: num, y: num, z: num },
    rotate: num,
    rotate3d: { x: num, y: num, z: num },
    scale: num,
    (opacity, or any other prop): any
  }
```

Extra props can be passed down from a parent Animator by defining
`this.animationContext (func : object) -> object` on their class.
The object returned by animationContext is merged into extraProps.

Within an animated component you can get the current animation state
with `this.getAnimationState() -> object` or the current animation
styles with `this.getAnimationStyle() -> object`.

#### Context animations (Parent to Children)

In a parent component you define a "step" (props or state), which is
the current position of the animation. Then on children, you define
an "index" (property). This mixin then allows you to run
`this.getAnimationStyle()` on the children, which will use the state
set in the parents.

Parents pass down context through `this.context.animations : object`.
This object should contain a key (the name/source of the animation)
to the value (an object with at least { step }).

To ease setting this context, check out the Animator mixin.

### Animated Mixin API

### getAnimationState(source : string) : object

Animation state consists always of two things: `index` and `step`.
You can also add extra information to you animation state by defining
`animationContext` on your class, which can be an object, or function:

```
animationContext: {
  extra: 'values',
  go: 'here'
}

// or...

animationContext() {
  return {
    width: this.state.width
  };
}
```

The getAnimationState function will do a search through your component
in the following order to find these properties:

1. this.state (index or step)
2. this.props (index or step)
3. this.context (index or step)

The return value is an object with at least index and step, and potentially extra
information as passed down through `this.animationContext`.

### disableAnimation()

Call this to disable animations on the current component.

### enableAnimation()

Call this to enable animations on the current component.

### animationsDisabled() : bool

Returns if the animations are currently disabled.

### isAnimating(source : string): bool

Check if an animation is running. This uses `getAnimationState` and then checks if the step isn't a whole number.

### hasAnimations(ref : string) : bool

Checks if a given ref has animations set.

### getAnimations(ref : string)

Because we can either pass in our `animations` object through props, or define it in state, this is a helper function that checks both props and state for active animations.

### getAnimationStyle(ref : string, source : string) : object

Given a ref and optionally a source, returns an object of styles at the current animation state.

If no source is given, it will check the current components `this.props.animationSource` value.

You can define transforms using our syntax, such that transforms will return a string that handles:

 - scale
 - rotate3d
   - x
   - y
   - z
 - rotate
 - translate
   - x
   - y
   - z

### Example

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
var animations = { self: 'slideLeft' };
<Child animations={animations}>
```


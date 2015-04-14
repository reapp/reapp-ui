import React from 'react';
import Observable from 'observable-state';

const defined = attr => typeof attr !== 'undefined';

export default function(name, props) {
  return {
    childContextTypes: {
      animations: React.PropTypes.object
    },

    getChildContext() {
      const hasStep = this.state && defined(this.state.step);

      // optimization, just return context during animations
      if (hasStep && this.state.step % 1 !== 0)
        return this.context;

      // pass through parent animations
      let parentState;
      if (this.context.animations && this.context.animations[name])
        parentState = this.context.animations[name];

      // clone parent to child
      const childState = Object.assign({}, parentState);

      if (hasStep) {
        this.stepper = this.stepper || Observable(this.state.step);

        childState.stepper = this.stepper;
      }

      if (props)
        props.forEach(prop => childState[prop] = this.props[prop]);

      // overwrite animations context for this namespace
      return {
        animations: Object.assign(
          {},
          this.context.animations,
          { [name]: childState }
        )
      };
    },
  }
};
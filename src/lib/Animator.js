import React from 'react';
import Observable from 'observable-state';

const pickNum = (a, b) => typeof a === 'number' ? a : b;

export default function(name, props) {
  return {
    childContextTypes: {
      animations: React.PropTypes.object
    },

    getChildContext() {
      let parentState;

      // get parent state
      if (this.context.animations && this.context.animations[name])
        parentState = this.context.animations[name].get();

      // create updated state
      const childState = parentState || {};

      if (this.state && typeof this.state.step === 'number')
        childState.step = this.state.step;

      if (props)
        props.forEach(prop => childState[prop] = this.props[prop]);

      // create new animation observable
      if (this.animator)
        this.animator.set(childState);
      else
        this.animator = Observable(childState);

      // overwrite animations context for this namespace
      return {
        animations: Object.assign(
          this.context.animations || {},
          { [name]: this.animator }
        )
      };
    },
  }
};
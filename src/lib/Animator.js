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
      if (this.context.animations && this.context.animations[name]) {
        parentState = this.context.animations[name];
      }

      // create updated state
      const childState = parentState || {};

      if (this.state && typeof this.state.step === 'number') {
        if (!this.animateStep)
          this.animateStep = Observable(this.state.step);

        childState.stepper = this.animateStep;
      }

      if (props)
        props.forEach(prop => childState[prop] = this.props[prop]);

      // overwrite animations context for this namespace
      return {
        animations: Object.assign(this.context.animations || {},
          { [name]: childState }
        )
      };
    },
  }
};
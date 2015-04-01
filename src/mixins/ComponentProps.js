import applyStyles from 'react-style/lib/applyStyles';

// Uses a combination of all the internal mixins to provide
// a consistent set of props for each component

// ref, className, styles, and any animation styles

module.exports = {
  componentProps(ref) {
    ref = ref || 'self';

    var props = {
      ref,
      className: this.getClassSet(ref),
      style: this.hasAnimations(ref) && !this.animationsDisabled() ? this.getAnimationStyle(ref) : null
    };

    applyStyles(props, this.getStyles(ref), 0);
    console.log('props', props);

    return props;
  }
}
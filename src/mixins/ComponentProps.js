// Uses a combination of all the internal mixins to provide
// a consistent set of props for each component

// ref, className, styles, and any animation styles

module.exports = {
  componentProps(ref) {
    ref = ref || 'self';

    var props = {
      ref,
      className: this.getClassSet(ref),
      styles: this.getStyles(ref)
    };

    if (this.hasAnimations(ref) && !this.animationsDisabled())
      props.style = this.getAnimationStyle(ref);

    return props;
  }
}
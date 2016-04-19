// Uses a combination of all the internal mixins to provide
// a consistent set of props for each component

// ref, className, styles, and any animation styles

module.exports = {
  componentProps(ref) {
    ref = ref || 'self';

    var props = {
      ref,
      className: this.getClassSet(ref),
      style: this.getStyles(ref).filter(function (x) {
        return !!x;
      })
    };

    //this.isAnimating() &&
    if (this.hasAnimations(ref) && !this.animationsDisabled())
      props.style.push(this.getAnimationStyle(ref));

    return props;
  }
}

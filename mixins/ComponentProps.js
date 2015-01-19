// Uses a combination of all the internal mixins to provide
// a consistent set of props for each component

// ref, id, className, styles, and any animation styles

module.exports = {
  componentProps(componentName) {
    // 'self' is used for the top level ref
    var ref = componentName || 'self';

    var props = {
      ref,
      id: componentName ? this._uniqueID + componentName : this._uniqueID,
      className: this.getClasses(componentName),
      styles: this.getStyles(componentName)
    };

    if (this.hasAnimations(ref) && !this.animationsDisabled())
      props.style = this.getAnimationStyle(ref);

    return props;
  }
}
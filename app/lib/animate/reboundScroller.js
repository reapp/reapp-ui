var rebound = require('rebound');

var springSystem = new rebound.SpringSystem();
var mainSpring = springSystem.createSpring();

var lastX = 0;
var panVelocity = 0;
var isDragging = false;

setupMainSpring = function() {
  mainSpring.setSpringConfig(rebound.SpringConfig.fromQcTensionAndFriction(4.5, 5.7));

  mainSpring.addListener({
    onSpringUpdate: function (spring) {
      // Progress from 0 to n
      var progress = spring.getCurrentValue();

      // Slide the tabs over
      var xTranslation = transitionForProgressInSteps(progress,navOffsets);

      // Pixel snap when the spring is nearing rest on non-retina displays
      if (Math.abs(spring.getVelocity()) < 0.05 && window.devicePixelRatio < 1.1)
        xTranslation = Math.floor(xTranslation);

      nav.style['webkitTransform'] = 'translate3d(' + xTranslation + 'px, 0, 0)';
      nav.style['MozTransform'] = 'translate3d(' + xTranslation + 'px, 0, 0)';

      // Other transitions
      $("#slides li").each(function(i, val) {
        var slideProgress = 1 - Math.abs(progress - i);

        // Slide and scale the images
        if (slideProgress > 0) { // Only bother if the slide is visible
          // Slide and scale
          var x = (i * viewportWidth) - (progress * viewportWidth);
          var scale = transitionForProgressInRange(slideProgress,0.6,1.0);
          val.style['webkitTransform'] = 'translate3d(' + x + 'px, 0, 0) scale(' + scale +')';
          val.style['MozTransform'] = 'translate3d(' + x + 'px, 0, 0) scale(' + scale +')';

          // Fade in the caption when nearing rest
          if (i < captions.length) {
            var captionOpacity = transitionForProgressInRange(slideProgress,-8.0,1.0);
            captions[i].style['opacity'] = captionOpacity;
          }
        }

        // Hide the off-screen images so they don't reveal themselves if you resize the browser
        val.style['opacity'] = (slideProgress > 0) ? 1.0 : 0.0;

        // Show the current tab as black, others grey
        var tabOpacity = transitionForProgressInRange(clampedProgress(slideProgress),0.2,1,0);
        tabs[i].style['opacity'] = tabOpacity;
      });
    }
  });
};

transitionForProgressInRange = function(progress, startValue, endValue) {
  return startValue + (progress * (endValue - startValue));
};

// Progress: Float value from 0 - # of steps
// Steps: Array of step values
//
// Example:
// Progress: 1.5, Steps: 100, 200, 250, Result: 225

transitionForProgressInSteps = function(progress, steps) {
  var transition = -1;
  var normalizedProgress;

  // Bail if there's fewer than two steps
  if (steps.length < 2) { return transition };

  // If the progress is before the beginning of the range, extrapolate from the first and second steps.
  if (progress < 0) {
    transition = transitionForProgressInRange(progress, steps[0], steps[1]);
  }

  // If the progress is after the end of the range, extrapolate from the second last and last steps.
  else if (progress > (steps.length - 1)) {
    normalizedProgress = progressForValueInRange(progress, Math.floor(progress), Math.floor(progress)+1);
    normalizedProgress = normalizedProgress + 1;
    transition = transitionForProgressInRange(normalizedProgress, steps[(steps.length - 2)], steps[(steps.length - 1)]);
  }

  // Supress potential NaNs
  else if (progress == (steps.length - 1) || progress == 0) {
    transition = steps[progress];
  }

  // Otherwise interpolate between steps
  else {
    normalizedProgress = progressForValueInRange(progress, Math.floor(progress), Math.floor(progress)+1);
    transition = transitionForProgressInRange(normalizedProgress, steps[Math.floor(progress)], steps[Math.floor(progress)+1]);
  }

  return transition;
};

var Scroller = function(scrollHandler, options) {



}

module.exports = Scroller;
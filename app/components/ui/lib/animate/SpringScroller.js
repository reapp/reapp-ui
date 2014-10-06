var rebound = require('rebound');

var tabWidths = [];
var tabWidthRunningSum = [];
var navOffsets = [];
var tabs = [];
var slides = [];
var captions = [];
var downIndex = 0;
var endValue = 0;
var viewportWidth = 0;
var viewportHeight = 0;
var nav;
var imageWidths = [968,2400,800,2600,968,968,2400,2400];
var imageHeights = [1864,1536,1220,2600,1864,1864,1536,1536];

var springSystem = new rebound.SpringSystem();
var mainSpring = springSystem.createSpring();
var downSpring = springSystem.createSpring();

var lastX = 0;
var panVelocity = 0;
var isDragging = false;

$(document).ready(function($) {
  viewportWidth = $("#wrapper").innerWidth();
  viewportHeight = $("#slides li").innerHeight();

  var totalWidth = calculateTabWidths();

  nav = document.getElementById('nav');

  layoutCaptions();

  $(window).on('resize', function(){
    layoutCaptions();
  });

  // Size the container to fit
  $("#nav").width(totalWidth);

  $("#nav li").each(function(i, val) {
    navOffsets[i] = navOffsetForIndex(i);
    tabs[i] = val;
  });

  setupMainSpring();
  setupPanSupport();
  setupTabPressedStates();
  setupArrowKeys();

  $("#slides li").each(function(i, val) {
    val.style['webkitTransform'] = 'translate3d(' + viewportWidth * i + 'px, 0, 0)';
    val.style['MozTransform'] = 'translate3d(' + viewportWidth * i + 'px, 0, 0)';
    slides[i] = val;
  });

  // Select the first tab
  selectTabIndex(0, false);

  // Behavior when the tabs are clicked
  var down = [];

  $("#nav li").each(function(i, val) {
    $(val).click(function() {
      selectTabIndex(i, true);
    });

    $(val).mousedown(function() {
      down[i] = true;
      pressDownOnTabIndex(i);
    });

    $(val).mouseup(function() {
      down[i] = false;
      releaseDownOnTabIndex(i);
    });

    $(val).mouseleave(function() {
      if (down[i] === true)
        releaseDownOnTabIndex(i);
    });

    $(val).mouseenter(function() {
      if (down[i] === true)
        pressDownOnTabIndex(i);
    });
  });

  $("#wrapper").mouseup(function() {
    down = [];
  });
});

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
}

setupPanSupport = function() {
  var item = document.getElementById('slides');
  item.addEventListener('touchstart', function(e) {
    var touch = e.touches[0];
    startDragging(touch.pageX);
  }, false);

  item.addEventListener('touchmove', function(e) {
      e.preventDefault(); // Stop vertical rubberbanding on iOS

    var touch = e.touches[0];
    continueDragging(touch.pageX);
  }, false);

  item.addEventListener('touchend', function(e) {
    endDragging();
  }, false);

  item.addEventListener('touchcancel', function(e) {
    endDragging();
  }, false);

  item.addEventListener('mousedown', function(e) {
    startDragging(e.clientX);
  }, false);

  item.addEventListener('mousemove', function(e) {
    if (isDragging)
      continueDragging(e.clientX);
  }, false);

  item.addEventListener('mouseup', function(e) {
    endDragging();
  }, false);

  item.addEventListener('mouseleave', function(e) {
    if (isDragging)
      endDragging();
  }, false);
}

startDragging = function(x) {
  lastX = x;
  isDragging = true;
  viewportWidth = $("#wrapper").innerWidth();
  mainSpring.setAtRest();
}

continueDragging = function(x) {
  panVelocity = x - lastX;
  lastX = x;

    var progress = progressForValueInRange(panVelocity,0,-viewportWidth);

    var currentValue = mainSpring.getCurrentValue();

    // Rubberband when beyond the scroll boundaries
    if ((currentValue + progress) < 0 || (currentValue + progress) > tabs.length - 1)
      progress *= 0.5;

    mainSpring.setCurrentValue(currentValue + progress);
  mainSpring.setAtRest();
}

endDragging = function() {
  var currentPosition = mainSpring.getCurrentValue();
  var restPosition = endValue;

  var passedVelocityTolerance = (Math.abs(panVelocity) > 3);
  var passedDistanceTolerance = Math.abs(currentPosition - restPosition) > 0.3;
  var shouldAdvance = passedDistanceTolerance || passedVelocityTolerance;
  var advanceForward = (panVelocity <= 0);

  if (shouldAdvance) {
    var targetIndex = advanceForward ? restPosition + 1 : restPosition - 1;
    selectTabIndex(targetIndex, true);
  } else {
    selectTabIndex(restPosition, true);
  }

  var normalizedVelocity = progressForValueInRange(panVelocity,0,-viewportWidth);
  mainSpring.setVelocity(normalizedVelocity * 30);
  panVelocity = 0;
  isDragging = false;
}

layoutCaptions = function() {
  // Distance between the center of the image and its optical right edge in the coordinate system of the native image resolution
  var rightEdges = [374,812,268,652,374,374,812,812];

  var bottomEdges = [580,545,390,642,580,580,545,545];

  // Padding added to the bottom in the coordinate system of the slide divs
  var applyBottomPadding = [false,true,false,false,false,false,true,true];

  var slideItems = $("#slides li");
  viewportWidth = slideItems.innerWidth();
  viewportHeight = slideItems.innerHeight();

  $(".caption").each(function(i, val) {
    captions[i] = val;

    var scale = calculateContentScaleForIndex(i);

    var x = (viewportWidth / 2.0) + rightEdges[i] * scale;
    var y = ((viewportHeight / 2.0) - (bottomEdges[i] * scale)) * -1;

    var leftPadding = parseInt($(val).css("padding-left"), 10);

    if (applyBottomPadding[i]) {
      y -= leftPadding;
    }

    x = Math.round(x);
    y = Math.round(y);

    val.style['webkitTransform'] = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
    val.style['MozTransform'] = 'translate3d(' + x + 'px, ' + y + 'px, 0)';

    captions[i].style.visibility = "visible";
  });
}

setupTabPressedStates = function() {
  downSpring.setSpringConfig(rebound.SpringConfig.fromQcTensionAndFriction(100, 5.5));

  downSpring.addListener({
    onSpringUpdate: function (spring) {
      var progress = spring.getCurrentValue();
      var scale = transitionForProgressInRange(progress,1.0,0.92);
      tabs[downIndex].style['webkitTransform'] = 'scale('+scale+')';
      tabs[downIndex].style['MozTransform'] = 'scale('+scale+')';
    }
  });
}

pressDownOnTabIndex = function(index) {
  downIndex = index;

  $("#nav li").each(function(i, val) {
    if (i === index) {
      downSpring.setEndValue(1);
    }
  });
}

releaseDownOnTabIndex = function(index) {
  $("#nav li").each(function(i, val) {
    if (i === index) {
      downSpring.setEndValue(0);
    }
  });
}

selectTabIndex = function(i, animated) {
  if (i < 0)
    i = 0;
  else if (i > tabs.length - 1)
    i = tabs.length - 1;

  if (animated) {
    viewportWidth = $("#wrapper").innerWidth();
    endValue = i;
    mainSpring.setEndValue(i);
  } else {
    mainSpring.setCurrentValue(i);
  }
}

navOffsetForIndex = function(i) {
  if (i > 0) {
    var offset = (tabWidthRunningSum[i-1] + (tabWidths[i] / 2.0)) * -1;
  } else {
    var offset = ((tabWidths[i] / 2.0)) * -1;
  }
  return offset;
}

calculateTabWidths = function() {
  var totalWidth = 0;

  $("#nav li").each(function(i, val) {
      tabWidths[i] = $(val).innerWidth();
      tabWidthRunningSum[i] = tabWidths[i];

      if (i > 0) {
        tabWidthRunningSum[i] = tabWidthRunningSum[i] + tabWidthRunningSum[i-1];
      }

      totalWidth += tabWidths[i];
  });

  return totalWidth;
}

calculateContentScaleForIndex = function(i) {
  var contentWidth = imageWidths[i];
  var contentHeight = imageHeights[i];

  var scale = ((viewportWidth / viewportHeight) > (contentWidth / contentHeight)) ? (viewportHeight / contentHeight) : (viewportWidth / contentWidth);
  return scale;
}

setupArrowKeys = function() {
  var initialPress = true;
  var isRubberbanding = false;

  $(document).keydown(function(e){
    var currentIndex = endValue;
    var positionTolerance = 0.001;
    var maxRubberbandDistance = 0.03; // Normalized

      if (e.keyCode == 37) { // Left arrow key
        var inRubberbandableRegion = mainSpring.getCurrentValue() < positionTolerance;

        if (inRubberbandableRegion && initialPress) {
          isRubberbanding = true;
          mainSpring.setEndValue(mainSpring.getCurrentValue() - maxRubberbandDistance);
        }
        else if (!inRubberbandableRegion) {
          isRubberbanding = false;
          selectTabIndex(currentIndex - 1, true);
        }
      }

      else if (e.keyCode == 39) { // Right arrow key
        var inRubberbandableRegion = mainSpring.getCurrentValue() > ((tabs.length - 1) - positionTolerance);

      if (inRubberbandableRegion && initialPress) {
        isRubberbanding = true;
        mainSpring.setEndValue(mainSpring.getCurrentValue() + maxRubberbandDistance);
      }
      else if (!inRubberbandableRegion) {
        isRubberbanding = false;
        selectTabIndex(currentIndex + 1, true);
      }
      }

      initialPress = false;
  });

  // When rubberbanding, snap back to the correct rest value on key up
  $(document).keyup(function(e){
    var currentIndex = endValue;

    if (e.keyCode == 37 && isRubberbanding) { // Left arrow key
      selectTabIndex(currentIndex - 1, true);
    }
    else if (e.keyCode == 39 && isRubberbanding) { // Right arrow key
      selectTabIndex(currentIndex + 1, true);
    }

    isRubberBanding = false;
    initialPress = true;
  });
}

// Utilities

progressForValueInRange = function(value, startValue, endValue) {
  return (value - startValue) / (endValue - startValue);
}

transitionForProgressInRange = function(progress, startValue, endValue) {
  return startValue + (progress * (endValue - startValue));
}

clampedProgress = function(progress) {
  if (progress < 0)
    progress = 0;
  else if (progress > 1)
    progress = 1;

  return progress;
}

// Progress: Float value from 0 - # of steps
// Steps: Array of step values
//
// Example:
// Progress: 1.5, Steps: 100, 200, 250, Result: 225

transitionForProgressInSteps = function(progress, steps) {
  var transition = -1;

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
}
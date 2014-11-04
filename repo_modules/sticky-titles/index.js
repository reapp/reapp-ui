var getComputedStyle = window.getComputedStyle;
var getStyle = getComputedStyle ?
  function( elem ) {
    return getComputedStyle( elem, null );
  } :
  function( elem ) {
    return elem.currentStyle;
  };

window.getStyleProperty = getStyleProperty;
window.getSize = defineGetSize( window.getStyleProperty );
var transformProp = getStyleProperty('transform');

// -------------------------- StickyTitle -------------------------- //

// singular class for each title

function StickyTitle( elem ) {
  this.element = elem;
  this._create();
}

StickyTitle.prototype._create = function() {
  this.element.style.position = 'relative';

  // space takes space before
  this.spacer = document.createElement('div');
  this.spacer.className = 'sticky-title-spacer';
  this.element.parentNode.insertBefore( this.spacer, this.element );
};

// measure top position and outerHeight
StickyTitle.prototype.measure = function() {
  var size = this.size = getSize( this.element );
  this.top = this.element.getBoundingClientRect().top - size.marginTop;
  this.outerHeight = size.outerHeight;
  this.bottom = this.top + size.outerHeight;
};

StickyTitle.prototype.stick = function() {
  this.element.style.position = 'fixed';
  this.element.style.top = 0;
  // this.element.style.zIndex = 10;

  this.spacer.style.height = this.size.height + 'px';
  this.spacer.style.marginTop = this.size.marginTop + 'px';
  this.spacer.style.marginBottom = this.size.marginBottom + 'px';
};

StickyTitle.prototype.unstick = function() {
  // return element to relative positioning
  this.element.style.position = 'relative';
  this.element.style.top = '';
  if ( transformProp ) {
    this.element.style[ transformProp ] = '';
  }
  this.spacer.style.height = 0;
};

StickyTitle.prototype.offset = function( nextTitle ) {
  var gap = nextTitle.top - window.scrollY;
  var offset = this.size.height - gap;
  offset = Math.max( offset, 0 );
  if ( offset === this._offset ) {
    return;
  }

  if ( transformProp ) {
    this.element.style[ transformProp ] = 'translateY(' +  -offset + 'px)';
  } else {
    this.element.style.top = -offset + 'px';
  }

  this._offset = offset;
};

var prefixes = 'Webkit Moz ms Ms O'.split(' ');

function getStyleProperty( propName ) {
  var docElemStyle = document.documentElement.style;
  if ( !propName ) {
    return;
  }

  // test standard property first
  if ( typeof docElemStyle[ propName ] === 'string' ) {
    return propName;
  }

  // capitalize
  propName = propName.charAt(0).toUpperCase() + propName.slice(1);

  // test vendor specific properties
  var prefixed;
  for ( var i=0, len = prefixes.length; i < len; i++ ) {
    prefixed = prefixes[i] + propName;
    if ( typeof docElemStyle[ prefixed ] === 'string' ) {
      return prefixed;
    }
  }
}

// getSize

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') === -1 && !isNaN( num );
  return isValid && num;
}

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0, len = measurements.length; i < len; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}



function defineGetSize( getStyleProperty ) {

  // -------------------------- box sizing -------------------------- //

  var boxSizingProp = getStyleProperty('boxSizing');
  var isBoxSizeOuter;

  /**
   * WebKit measures the outer-width on style.width on border-box elems
   * IE & Firefox measures the inner-width
   */
  ( function() {
    if ( !boxSizingProp ) {
      return;
    }

    var div = document.createElement('div');
    div.style.width = '200px';
    div.style.padding = '1px 2px 3px 4px';
    div.style.borderStyle = 'solid';
    div.style.borderWidth = '1px 2px 3px 4px';
    div.style[ boxSizingProp ] = 'border-box';

    var body = document.body || document.documentElement;
    body.appendChild( div );
    var style = getStyle( div );

    isBoxSizeOuter = getStyleSize( style.width ) === 200;
    body.removeChild( div );
  })();


  // -------------------------- getSize -------------------------- //

  function getSize( elem ) {
    // use querySeletor if elem is string
    if ( typeof elem === 'string' ) {
      elem = document.querySelector( elem );
    }

    // do not proceed on non-objects
    if ( !elem || typeof elem !== 'object' || !elem.nodeType ) {
      return;
    }

    var style = getStyle( elem );

    // if hidden, everything is 0
    if ( style.display === 'none' ) {
      return getZeroSize();
    }

    var size = {};
    size.width = elem.offsetWidth;
    size.height = elem.offsetHeight;

    var isBorderBox = size.isBorderBox = !!( boxSizingProp &&
      style[ boxSizingProp ] && style[ boxSizingProp ] === 'border-box' );

    // get all measurements
    for ( var i=0, len = measurements.length; i < len; i++ ) {
      var measurement = measurements[i];
      var value = style[ measurement ];
      value = mungeNonPixel( elem, value );
      var num = parseFloat( value );
      // any 'auto', 'medium' value will be 0
      size[ measurement ] = !isNaN( num ) ? num : 0;
    }

    var paddingWidth = size.paddingLeft + size.paddingRight;
    var paddingHeight = size.paddingTop + size.paddingBottom;
    var marginWidth = size.marginLeft + size.marginRight;
    var marginHeight = size.marginTop + size.marginBottom;
    var borderWidth = size.borderLeftWidth + size.borderRightWidth;
    var borderHeight = size.borderTopWidth + size.borderBottomWidth;

    var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

    // overwrite width and height if we can get it from style
    var styleWidth = getStyleSize( style.width );
    if ( styleWidth !== false ) {
      size.width = styleWidth +
        // add padding and border unless it's already including it
        ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
    }

    var styleHeight = getStyleSize( style.height );
    if ( styleHeight !== false ) {
      size.height = styleHeight +
        // add padding and border unless it's already including it
        ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
    }

    size.innerWidth = size.width - ( paddingWidth + borderWidth );
    size.innerHeight = size.height - ( paddingHeight + borderHeight );

    size.outerWidth = size.width + marginWidth;
    size.outerHeight = size.height + marginHeight;

    return size;
  }

  // IE8 returns percent values, not pixels
  // taken from jQuery's curCSS
  function mungeNonPixel( elem, value ) {
    // IE8 and has percent value
    if ( getComputedStyle || value.indexOf('%') === -1 ) {
      return value;
    }
    var style = elem.style;
    // Remember the original values
    var left = style.left;
    var rs = elem.runtimeStyle;
    var rsLeft = rs && rs.left;

    // Put in the new values to get a computed value out
    if ( rsLeft ) {
      rs.left = elem.currentStyle.left;
    }
    style.left = value;
    value = style.pixelLeft;

    // Revert the changed values
    style.left = left;
    if ( rsLeft ) {
      rs.left = rsLeft;
    }

    return value;
  }

  return getSize;
}

// turn element or nodeList into an array
function makeArray( obj ) {
  var ary = [];
  if ( typeof obj.length === 'number' ) {
    // convert nodeList to array
    for ( var i=0, len = obj.length; i < len; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
}


// -------------------------- StickyTitles -------------------------- //

// class for titles collection

function StickyTitles( elems ) {
  this.titles = [];
  this.add( elems );
  this._create();
}

StickyTitles.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

StickyTitles.prototype._create = function() {
  this.measure();
  window.addEventListener( 'scroll', this, false );
};

StickyTitles.prototype.add = function( elems ) {
  if ( !elems ) {
    return;
  }
  elems = makeArray( elems );
  var titles = [];
  for ( var i=0, len = elems.length; i < len; i++ ) {
    var elem = elems[i];
    var title = new StickyTitle( elem );
    titles.push( title );
  }
  this.titles.push.apply( this.titles, titles );
};

StickyTitles.prototype.measure = function() {
  for ( var i=0, len = this.titles.length; i < len; i++ ) {
    var title = this.titles[i];
    title.measure();
  }
};

StickyTitles.prototype.stickTitle = function( title ) {
  // don't stick if the same
  if ( title === this.stuckTitle ) {
    return;
  }
  this.unstickTitle();
  title.stick();
  this.stuckTitle = title;
};

StickyTitles.prototype.unstickTitle = function() {
  if ( !this.stuckTitle ) {
    return;
  }
  this.stuckTitle.unstick();
  delete this.stuckTitle;
};

// -------------------------- events -------------------------- //

StickyTitles.prototype.onscroll = function() {
  // console.log( window.scrollY );
  var scrollY = window.scrollY;

  var firstTitle = this.titles[0];
  var isFirstTitleStuck = firstTitle && this.stuckTitle === firstTitle;
  if ( isFirstTitleStuck && scrollY < firstTitle.top ) {
    this.unstickTitle( firstTitle );
    return;
  }

  for ( var i=0, len = this.titles.length; i < len; i++ ) {
    var title = this.titles[i];
    // var previousTitle = i  && this.titles[ i - 1 ];
    var nextTitle = i < len - 1 && this.titles[ i + 1 ];
    if ( scrollY >= title.top && scrollY <= nextTitle.top ) {
      this.stickTitle( title );
      title.offset( nextTitle );
      // var gap = nextTitle.top - scrollY;
      // title.offset( nextTitle.top - scrollY );
      break;
    }
  }
};

StickyTitles.Title = StickyTitle;

module.exports = StickyTitles;
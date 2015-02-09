// takes in constants (c) loaded before it

// todo: probably want to make this more flexible
// e.g. people may want to specify buttonColor not based on activeColor

module.exports = (c) => ({
  // Bar
  barBG: c.brandBG,
  barColor: c.brandColorInactive,
  barColorActive: c.brandColor,
  barHeight: '49px',
  barLineHeight: '49px',
  barBorderColor: c.lightGray,

  // Button
  buttonBorderColor: c.activeBG,
  buttonColor: c.activeBG,
  buttonColorTitleBar: c.activeBG,
  buttonActiveBG: c.activeBG,
  buttonActiveColor: c.activeColor,

  // Dots
  dotBG: '#000',

  // List
  listTitleColor: '#f7f7f7',
  listBG: '#fff',

  // ListItem
  listItemBorderColor: c.midGray,

  // Popover
  popoverArrowSize: 26,
  popoverBG: '#fff',
  popoverItemBorder: '1px solid #ccc',
  popoverOverlayBG: 'rgba(0,0,0,0.3)',

  // SearchBar
  searchBarHeight: 44,

  // TitleBar
  titleBarHeight: 44,
  titleBarBG: c.brandBG,
  titleBarColor: c.brandColor,
  titleBarBorderColor: c.lightGray,
  titleBarFontSize: '16px',

  // View
  viewBGColor: c.lightGray,
  viewPad: '10px'
});
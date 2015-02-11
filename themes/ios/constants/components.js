// takes in constants (c) loaded before it

// todo: probably want to make this more flexible
// e.g. people may want to specify buttonColor not based on activeColor

module.exports = (c) => ({
  // Bar
  barBG: '#f6f6f6',
  barColor: c.brandColorInactive,
  barColorActive: c.brandColor,
  barHeight: '49px',
  barLineHeight: '49px',
  barBorderColor: c.lightGray,

  // Button
  buttonBorderColor: c.activeBG,
  buttonColor: c.activeBG,
  buttonActiveBG: c.activeBG,
  buttonActiveColor: c.activeColor,
  buttonColorTitleBar: c.activeBG,

  // Dots
  dotBG: '#000',

  // Icon
  iconColorTitleBar: c.activeBG,

  // List
  listTitleColor: '#f7f7f7',
  listBG: '#fff',

  // ListItem
  listItemBorderColor: c.hairline ? '#bcbbc1' : '#dadbe3',
  listItemArrowColor: '#b7b8bd',
  listItemContentColor: '#000',
  listItemAfterColor: '#7b7b7b',
  listItemTitleAfterColor: '#7b7b7b',

  // Popover
  popoverArrowSize: 26,
  popoverBG: '#fff',
  popoverItemBorder: '1px solid #ccc',
  popoverOverlayBG: 'rgba(0,0,0,0.3)',

  // SearchBar
  searchBarHeight: 44,
  searchBarBG: '#bdbdc3',
  searchBarBorderColor: '#a6a6a6',

  // TitleBar
  titleBarHeight: 44,
  titleBarColor: c.black,
  titleBarBorderColor: c.lightGray,
  titleBarFontSize: '16px',

  // View
  viewBGColor: '#f6f6f6',
  viewPad: '10px'
});
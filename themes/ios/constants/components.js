// takes in constants loaded before it

module.exports = (constants) => ({
  // Button
  buttonBorderColor: constants.activeBG,
  buttonColor: constants.activeBG,
  buttonActiveBG: constants.activeBG,
  buttonActiveColor: constants.activeColor,

  // Dots
  dotBG: '#000',

  // List
  listTitleColor: '#f7f7f7',

  // ListItem
  listItemBorderColor: constants.midGray,

  // Popover
  popoverArrowSize: 26,
  popoverBG: 'rgba(255,255,255,0.95)',
  popoverItemBorder: '1px solid #ccc',
  popoverOverlayBG: 'rgba(0,0,0,0.3)',

  // SearchBar
  searchBarHeight: 44,

  // Tabs
  tabsBG: constants.brandBG,
  tabsHeight: '49px',
  tabsLineHeight: '49px',
  tabsBorderColor: constants.midGray,

  // TitleBar
  titleBarHeight: 44,
  titleBarBG: constants.brandBG,
  titleBarColor: constants.brandColor,
  titleBarBorderColor: constants.midGray,
  titleBarFontSize: '16px',

  // View
  viewBGColor: constants.lightGray,
  viewPad: '10px'
});
// takes in constants (c) loaded before it

// todo: probably want to make this more flexible
// e.g. people may want to specify buttonColor not based on activeColor

export default c => ({
  // Alert
  alertBG: c.brandColor,
  alertColor: '#fff',

  // Badge
  badgeBG: c.mid,
  badgeColor: '#fff',

  // Bar
  barBG: '#f6f6f6',
  barColor: c.brandColorInactive,
  barColorActive: c.brandColor,
  barHeight: '49px',
  barLineHeight: '49px',
  barBorderColor: c.light,

  // Button
  buttonBorderColor: c.activeBG,
  buttonColor: c.black,
  buttonFilledBG: c.activeBG,
  buttonFilledColor: c.activeColor,
  buttonTapActiveBG: 'rgba(0,0,0,0.1)',
  buttonColorTitleBar: c.brandColor,

  // Chat
  chatItemBG: '#999',
  chatItemColor: '#fff',
  chatItemOwnBG: c.brandColor,

  // Dots
  dotBG: '#000',

  // Icon
  iconColor: c.activeBG,
  iconColorTitleBar: c.brandColor,

  // Input
  inputColor: c.black,
  inputBG: c.white,

  // List
  listBorder: 'solid 1px #d9d9d9',
  listTitleColor: '#f7f7f7',
  listBG: '#fff',

  // ListItem
  listItemColor: '#000',
  listItemChildrenColor: '#888',
  listItemBorderColor: c.hairline ? '#bbb' : '#ddd',
  listItemArrowColor: '#b7b8bd',
  listItemContentColor: '#000',
  listItemAfterColor: '#7b7b7b',
  listItemTitleAfterColor: '#7b7b7b',

  // Modal
  modalBorderColor: c.hairline ? '#bbb' : '#ddd',
  modalBG: c.white,
  modalBackgroundBG: 'rgba(0,0,0,0.45)',

  // Popover
  popoverArrowSize: 26,
  popoverBG: '#fff',
  popoverItemBorder: '1px solid #ccc',
  popoverOverlayBG: 'rgba(0,0,0,0.3)',

  // SearchBar
  searchBarHeight: 44,
  searchBarBG: '#bdbdc3',
  searchBarBorderColor: '#a6a6a6',

  // Textarea
  textareaColor: c.black,
  textareaBG: c.white,

  // TitleBar
  titleBarHeight: 64,
  titleBarColor: c.white,
  titleBarBorderColor: c.light,
  titleBarFontSize: '24px',
  titleBarBG: '#00bcd4',

  // View
  viewBG: '#f4f4f4',
  viewPad: '10px'
});
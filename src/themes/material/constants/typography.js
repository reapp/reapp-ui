import {
fullBlack,
darkBlack,
lightBlack,
minBlack,
fullWhite,
darkWhite,
lightWhite,
} from './colors';

class Typography {

  constructor() {
    this.typography = {
      // text colors
      textFullBlack: fullBlack,
      textDarkBlack: darkBlack,
      textLightBlack: lightBlack,
      textMinBlack: minBlack,
      textFullWhite: fullWhite,
      textDarkWhite: darkWhite,
      textLightWhite: lightWhite,
      // font weight
      fontWeightLight: 300,
      fontWeightNormal: 400,
      fontWeightMedium: 500,
      // font size
      fontStyleButtonFontSize: 14
    };
  }
}

export default new Typography();

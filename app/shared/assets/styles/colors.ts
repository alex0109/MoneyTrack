const commonColors = {
  themeWhite: '#f3f3f1',
  white: '#FCFCFA',
  gray: '#B8BFC2',
  red: '#FA3D16',
  success: '#38CA35',
  warning: '#FABD16',
  info: '#0F6DED',
  themeBlack: '#161719',
  black: '#26282C',
  contrast: '#19191c',
};

const light = {
  colors: {
    themeColor: commonColors.themeWhite,
    contrastColor: commonColors.white,
    textColor: commonColors.black,
    ...commonColors,
  },
};

const dark = {
  colors: {
    themeColor: commonColors.themeBlack,
    contrastColor: commonColors.black,
    textColor: commonColors.white,
    ...commonColors,
  },
};

export default { dark, light };
export type LightTheme = typeof light;
export type DarkTheme = typeof dark;

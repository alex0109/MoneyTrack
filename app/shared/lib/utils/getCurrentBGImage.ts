/* eslint-disable @typescript-eslint/no-unsafe-return */
export const getCurrentBGImage = (theme: string, image: string) => {
  if (theme == 'light' && image == 'anim') {
    return require('../../assets/images/animlt.png');
  }
  if (theme == 'light' && image == 'dn') {
    return require('../../assets/images/dnlt.png');
  }
  if (theme == 'light' && image == 'dudes') {
    return require('../../assets/images/dudeslt.png');
  }
  if (theme == 'light' && image == 'leaf') {
    return require('../../assets/images/leaflt.png');
  }
  if (theme == 'dark' && image == 'anim') {
    return require('../../assets/images/animdr.png');
  }
  if (theme == 'dark' && image == 'dn') {
    return require('../../assets/images/dndr.png');
  }
  if (theme == 'dark' && image == 'dudes') {
    return require('../../assets/images/dudesdr.png');
  }
  if (theme == 'dark' && image == 'leaf') {
    return require('../../assets/images/leafdr.png');
  }
};

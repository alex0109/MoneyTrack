import {Dimensions} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export function getCoordinatesForIndex(index: number, length: number) {
  const radius = (SCREEN_WIDTH * 0.8) / 2;
  const angleBetweenItems = 360 / length;
  const angle = angleBetweenItems * index;
  const x = Math.round(radius * Math.cos((angle * Math.PI) / 180));
  const y = Math.round(radius * Math.sin((angle * Math.PI) / -180));
  return {x, y};
}

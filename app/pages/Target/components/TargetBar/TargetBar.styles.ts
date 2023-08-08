import { StyleSheet, Dimensions } from 'react-native';

import Colors from '../../../../shared/assets/styles/colors';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: windowWidth / 1.2,
    borderRadius: 0.1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderRightWidth: 3,
    borderRightColor: Colors.light.colors.red,
    backgroundColor: 'rgba(228, 229, 231, 0.2)',
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    paddingLeft: 10,
  },
  subTitle: {
    paddingLeft: 10,
    color: Colors.light.colors.success,
    fontSize: 18,
  },
});

import { StyleSheet, Dimensions } from 'react-native';

import Colors from '../../../../shared/assets/styles/colors';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxHeight: 50,
    height: '100%',
    width: windowWidth / 1.2,
    marginBottom: 30,
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
    width: '100%',
    height: '100%',
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: 10,
  },
  subTitle: {
    paddingLeft: 10,
    color: Colors.light.colors.success,
    fontSize: 18,
  },
});

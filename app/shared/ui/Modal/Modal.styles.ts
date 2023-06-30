import { Dimensions, StyleSheet } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: SCREEN_HEIGHT / 3,
    width: SCREEN_WIDTH / 1.5,
    borderRadius: 20,
    padding: 15,
  },
});

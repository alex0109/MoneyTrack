import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalCountText: {
    textAlign: 'center',
    minWidth: '40%',
    marginBottom: 25,
    fontSize: 20,
    borderBottomWidth: 1,
  },
  modalPopUpButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalPopUpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalPopUpContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalPopUpButton: {
    fontSize: 16,
  },
});

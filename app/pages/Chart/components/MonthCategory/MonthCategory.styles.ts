import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 2,
  },
  header: {
    flex: 1,
    marginTop: 40,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  chart: {
    position: 'relative',
    flex: 2,
  },
  buttonWrap: {
    marginTop: 20,
  },
  categoriesCircle: {
    position: 'absolute',
    left: '19%',
    top: '16%',
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: 45,
    width: 45,
    borderRadius: 40,
  },
  addItemCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: 45,
    width: 45,
    borderRadius: 40,
    borderStyle: 'dashed',
    borderWidth: 2,
  },
});

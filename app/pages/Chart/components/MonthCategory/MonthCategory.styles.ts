import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 2,
  },
  header: {
    marginTop: 40,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  chart: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrap: {
    marginTop: 20,
  },
  categoriesCircle: {
    alignItems: 'center',
    position: 'absolute',
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
    height: 45,
    width: 45,
    borderRadius: 40,
    borderStyle: 'dashed',
    borderWidth: 2,
  },
});

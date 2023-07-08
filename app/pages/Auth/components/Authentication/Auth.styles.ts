import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputsContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputsBlock: {
    width: '80%',
    paddingVertical: 30,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputMain: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  input: {
    width: '90%',
    padding: 0,
    paddingLeft: 5,
  },
  inputButtonsContainer: {
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  inputButton: {
    fontWeight: '500',
  },
  socialLog: {
    width: '80%',
  },
  socialLogText: {
    fontSize: 18,
    fontWeight: '500',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
    textAlign: 'center',
  },
});

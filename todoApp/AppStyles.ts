import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    marginLeft: 10,
    marginRight: 10,
  },
  containerTask: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#121212',
    height: 40,
  },
  buttonAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#121212',
    paddingLeft: 14,
    paddingRight: 14,
    marginLeft: 5,
  },
  buttonText: {
    fontSize: 23,
    color: '#FFF',
  }
});

export default styles;
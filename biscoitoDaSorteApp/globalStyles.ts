import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#232323',
  },
  img: {
    width:250,
    height:250,
  },
  textoFrase: {
    fontSize: 25,
    color: '#dd7b22',
    margin: 30,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  botao: {
    width: 230,
    height: 50,
    borderWidth: 2,
    borderColor: '#dd7b22',
    backgroundColor: '#dd7b22',
    borderRadius: 25,
    justifyContent: 'center',
  },
  btnTexto: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
    fontSize: 18,
  },

});

export default styles;
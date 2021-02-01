import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  conteudo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00aeef",
  },
  conteudoImg: {
    alignItems: "center"
  },
  img: {
    alignSelf: "center",
  },
  timer: {
    marginTop:-160,
    color: '#FFF',
    fontSize: 65,
    fontWeight: 'bold',
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: 100,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 40,
    margin: 17,
    borderRadius: 9,
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef',
  },
  areaUltimoNumero: {
    marginTop: 40,
  },
  textoUltimoNumero: {
    fontSize: 25,
    fontStyle: 'italic',
    color: '#FFF'
  }
});

export default style;
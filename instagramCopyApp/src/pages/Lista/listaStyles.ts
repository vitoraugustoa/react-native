import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  areaFeed: {

  },
  viewPerfil: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  fotoPerfil: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  nomeUsuario: {
    fontSize: 22,
    textAlign: 'left',
    color: '#000',
    marginLeft: 15,
  },
  fotoPublicacao: {
    flex: 1,
    height: 400,
    alignItems: 'center',
  },
  areaBtn: {
    flexDirection: 'row',
    padding: 5,
  },
  iconeLike: {
    width: 33,
    height: 33,
  },
  btnSend: {
    paddingLeft: 15,
  },
  viewRodape: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  descRodape: {
    paddingLeft: 10,
    fontSize: 15,
    color: '#000',
  },
  nomeRodape: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    paddingLeft: 5,
  },
  likes: {
    fontWeight: 'bold',
    marginLeft: 5,
  }
});

export default style;
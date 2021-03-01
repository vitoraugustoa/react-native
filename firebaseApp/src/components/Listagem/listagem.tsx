import React from 'react';
import { View, Text } from 'react-native';
import { Usuario } from '../../models/usuario';

import styles from './listagemStyle';

interface ListagemProps {
  data: Usuario;
}

const Listagem: React.FC<ListagemProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.data.nome}</Text>
      <Text style={styles.text}>{props.data.cargo}</Text>
    </View>
  );
}

export default Listagem;
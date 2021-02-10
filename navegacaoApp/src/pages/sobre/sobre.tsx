import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RoutesParamsMapping } from '../../routes/routesParamsMapping';

import styles from './sobreStyles';

type ProfileScreenNavigationProp = StackNavigationProp<
  RoutesParamsMapping,
  'Sobre'
>;

export interface SobreParams {
  nome: string;
  idade: number;
}

interface SobreProps {
  route: { params: SobreParams };
  navigation: ProfileScreenNavigationProp
}

const Sobre: React.FC<SobreProps> = (props) => {
  const params = props.route.params;
  const navigation = props.navigation;

  return (
    <View>
      <Text>Sobre</Text>
      <Text>Nome: {params ? params.nome : "Sem nome" } </Text>
      <Text>Idade: {params ? params.idade : "Sem idade"} </Text>
      <Button title="Voltar para Home" onPress={navigation.goBack}/>
      <Button title="Contato" onPress={() => navigation.navigate("Contato")}/>
    </View>
  );
}

export default Sobre;
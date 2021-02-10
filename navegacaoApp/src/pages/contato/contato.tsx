import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RoutesParamsMapping } from '../../routes/routesParamsMapping';

type ProfileScreenNavigationProp = StackNavigationProp<
  RoutesParamsMapping,
  'Sobre'
>;

interface ContatoProps {
  navigation: ProfileScreenNavigationProp
}

const Contato: React.FC<ContatoProps> = (props) => {
  const navigation = props.navigation;

  return (
    <View>
      <Text>Contato</Text>
      <Button title="Voltar para Home" onPress={navigation.popToTop}/>
    </View>
  );
}

export default Contato;
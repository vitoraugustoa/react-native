import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button } from 'react-native';

import styles from './homeStyles';

const home: React.FC = () => {
  const navigation = useNavigation(); 

  function irSobre() {
      navigation.navigate("Sobre", { nome: 'vitin', idade: 23 })
  }

  return (
    <View>
      <Text>Home</Text>
      <Button title="Ir para Sobre" onPress={irSobre} />
    </View>
  );
}

export default home;
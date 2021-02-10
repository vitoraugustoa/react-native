import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation ,DrawerActions } from '@react-navigation/native';

const Chatbot: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Chatbot</Text>
      <Button title="Abrir menu" onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
    </View>
  );
}

export default Chatbot;
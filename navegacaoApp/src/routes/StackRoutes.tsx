import React from 'react';
import { View, Text, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/home/home';
import Sobre from '../pages/sobre/sobre';
import Contato from '../pages/contato/contato';

import { RoutesParamsMapping } from './routesParamsMapping'; 

const Stack = createStackNavigator<RoutesParamsMapping>();

const StackRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{ 
            title: "Inicio",
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#FFF',
            headerShown: false,
            }} />
        <Stack.Screen name="Sobre" component={Sobre} />
        <Stack.Screen name="Contato" component={Contato} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default StackRoutes;

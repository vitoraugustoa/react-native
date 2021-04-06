import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SigIn from '../pages/SignIn/signin';
import SignUp from '../pages/SignUp/signup';

const AuthStack = createStackNavigator();


function AuthRoutes() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SigIn}
        options={{ headerShown: false }} />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerStyle: {
            backgroundColor: '#131313',
            borderBottomWidth: 1,
            borderBottomColor: '#00b94a',
          },
          headerTintColor: '#FFF',
          headerBackTitleVisible: false,
          headerTitle: 'Voltar'
        }} />
    </AuthStack.Navigator>
  );
}

export default AuthRoutes;

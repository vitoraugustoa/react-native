import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native';
import AuthProvider from './src/contexts/auth';
import Routes from './src/routes/routes';
// import { Container } from './styles';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
     <NavigationContainer>
        <AuthProvider>
          <StatusBar
            backgroundColor="#131313"
            barStyle="light-content">
          </StatusBar>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
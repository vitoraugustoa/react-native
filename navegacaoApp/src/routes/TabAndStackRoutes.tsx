import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from '../pages/login/login';
import Feed from '../pages/feed/feed';
import Chatbot from '../pages/chatbot/chatbot';
import Home from '../pages/home/home';
import Sobre from '../pages/sobre/sobre';
import Contato from '../pages/contato/contato';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

enum tabsName {
  Login = "Login",
  Feed = "Feed",
  Chatbot = "Chatbot"
}

function Tabs() {

  function buscarIconeTabSelecionada(routeName: string): string {
    console.log(routeName);

    switch (routeName) {
      case tabsName.Login:
        return "happy";
      case tabsName.Feed:
        return "hammer-sharp";
      case tabsName.Chatbot:
        return "heart-sharp";
      default:
        return "alarm-outline";
    }
  }

  return (
    <Tab.Navigator
      screenOptions={
        ({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const name = buscarIconeTabSelecionada(route.name);
            return <Icon name={name} color={color} size={size} />
          }
        })
      }

      tabBarOptions={{
        style: {
          backgroundColor: '#121212'
        },
        activeBackgroundColor: '#000000',
        activeTintColor: '#ffffff',
        inactiveTintColor: '#585858',
        showLabel: false,
      }}>
      <Tab.Screen name="Feed" component={Home} />
      <Tab.Screen name="Chatbot" component={Chatbot} />
    </Tab.Navigator>
  );
}


const TabAndStackRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Sobre" component={Sobre} />
        <Stack.Screen name="Contato" component={Contato} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default TabAndStackRoutes;
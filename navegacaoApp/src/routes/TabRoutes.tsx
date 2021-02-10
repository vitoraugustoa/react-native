import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../pages/login/login';
import Feed from '../pages/feed/feed';
import Chatbot from '../pages/chatbot/chatbot';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

enum tabsName {
  Login = "Login",
  Feed = "Feed",
  Chatbot = "Chatbot"
}

const TabRoutes: React.FC = () => {

  function buscarIconeTabSelecionada(routeName: string): string {
    switch (routeName) {
      case tabsName.Login:
        return "happy";
        break;
      case tabsName.Feed:
        return "hammer-sharp";
        break;
      case tabsName.Chatbot:
        return "heart-sharp";
        break;
      default:
        return "alarm-outline";
        break;
    }
  }


  return (
    <NavigationContainer>
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
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="Chatbot" component={Chatbot} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default TabRoutes;
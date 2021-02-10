import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import home from '../pages/home/home';
import Feed from '../pages/feed/feed';
import Chatbot from '../pages/chatbot/chatbot';
import CustomDrawer from '../components/customDrawer';

const Drawer = createDrawerNavigator();

const DrawerRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={CustomDrawer}>
        <Drawer.Screen name="Home" component={home} />
        <Drawer.Screen name="Feed" component={Feed} />
        <Drawer.Screen name="Chatbot" component={Chatbot} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerRoutes;
import React from 'react';
import { View, Text, } from 'react-native';
import StackRoutes from './src/routes/StackRoutes';
import TabRoutes from './src/routes/TabRoutes';
import TabAndStackRoutes from './src/routes/TabAndStackRoutes';
import DrawerRoutes from './src/routes/DrawerRoutes';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  return (
    // <StackRoutes />
    // <TabRoutes />
    // <TabAndStackRoutes />
    <DrawerRoutes />
  );
};


export default App;

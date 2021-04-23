import React, { useContext } from 'react';
import { 
  DrawerContentComponentProps, 
  DrawerContentOptions, 
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, } from '@react-navigation/drawer';
import { View, Text, Image } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { UserContext } from '../../models/userContext';

const CustomDrawer: 
React.FC<DrawerContentComponentProps<DrawerContentOptions>> = (props) => {
  const { signOut, nome } = useContext(AuthContext) as UserContext;
  
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
        <Image 
          source={require('../../resources/images/logos/Logo.png')}
          style={{ width:85, height: 85}}
          resizeMode="contain"
        />

        <Text style={{ color: '#FFF', fontSize: 18, marginTop: 5 }}>
          Bem-vindo
        </Text>

        <Text style={{ color: '#FFF', fontSize: 17, fontWeight: 'bold', paddingBottom: 25 }}>
          {nome}
        </Text>
      </View>

      <DrawerItemList {...props} />

      <DrawerItem  
        {...props}
        inactiveBackgroundColor="#c62c36"
        label="Sair do app"
        onPress={signOut}
        />
    </DrawerContentScrollView>
  );
}

export default CustomDrawer;
import React from 'react';
import { View, Text, Image } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawer: React.FC<DrawerContentComponentProps> = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{
        width: '100%', 
        height: 77, 
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 15,
        }}
        >
          <Image
            source={require('../../perfil.png')}
            style={{ width: 65, height: 65 }}
          />
          <Text 
            style={{color: '#000'}}
          >
            Bem-vindo!
          </Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default CustomDrawer;
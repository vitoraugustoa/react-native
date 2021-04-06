import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Container, ButtonMenu } from './styles';


const Header: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <ButtonMenu onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}>
        <Icon name="menu" color="#FFF" size={35} />
      </ButtonMenu>
    </Container>
  );
}

export default Header;
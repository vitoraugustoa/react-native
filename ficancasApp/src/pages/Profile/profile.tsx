import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
import { UserContext } from '../../models/userContext';
import Header from '../../components/Header/header';

import {
  Container,
  Nome,
  NewLink,
  TextButton,
  Logout,
} from './styles';

const Profile: React.FC = () => {
  const { nome, signOut } = useContext(AuthContext) as UserContext;
  const navigation = useNavigation();

  return (
      <Container>
        <Header />
        <Nome>
          {nome}
        </Nome>

        <NewLink onPress={() => navigation.navigate('Registrar')}>
          <TextButton>Registrar gastos</TextButton>
        </NewLink>

        <Logout onPress={signOut}>
          <TextButton>Sair</TextButton>
        </Logout>
      </Container>
  );
}

export default Profile;
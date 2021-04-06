import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Platform, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../models/userContext';

import { 
    Background, 
    Container, 
    Logo, 
    AreaInput, 
    Input,
    SubmitButton,
    SubmitText,
    Link,
    LinkText, } from './styles';

export default function SignIn() {
  const { signIn, loadingAuth } = useContext(AuthContext) as UserContext;
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleLogin() {
    signIn(email, password);
  }

  return (
    <Background>
      <Container
        behavior={Platform.OS === 'ios' ? "padding" : "height"}
        enabled
        >
        <Logo source={require('../../resources/images/logos/Logo.png')} />
      
        <AreaInput>
          <Input
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
        </AreaInput>

        <AreaInput>
          <Input
            secureTextEntry
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
        </AreaInput>
      
        <SubmitButton onPress={handleLogin}>
          {loadingAuth ? (
              <ActivityIndicator size={20} color="#FFF" />
            ) 
            : (
              <SubmitText>Acessar</SubmitText>
            )}
        </SubmitButton>

        <Link onPress={() => navigation.navigate("SignUp")}>
          <LinkText>Criar uma conta!</LinkText>
        </Link>

      </Container>
    </Background>
  )
}


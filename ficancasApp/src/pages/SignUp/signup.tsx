import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Platform, ActivityIndicator } from 'react-native';
import { UserContext } from '../../models/userContext';
import {
  Background,
  Container,
  Logo,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
} from '../SignIn/styles';


export default function SignUp() {
  const { singUp, loadingAuth } = useContext(AuthContext) as UserContext;
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleSignUp() {
    singUp(email, password, nome);
  }

  return (
    <Background>
      <Container
        behavior={Platform.OS === 'ios' ? "padding" : "height"}
        enabled
      >
        <AreaInput>
          <Input
            placeholder="Nome"
            autoCorrect={false}
            autoCapitalize="none"
            value={nome}
            onChangeText={(value) => setNome(value)}
          />
        </AreaInput>

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

        <SubmitButton onPress={handleSignUp}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#FFF" />
          )
          : (
            <SubmitText>Cadastrar</SubmitText>
          )}
        </SubmitButton>
      </Container>
    </Background>
  )
}


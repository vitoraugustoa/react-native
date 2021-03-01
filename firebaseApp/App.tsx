import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import firebase from './src/database/firebaseConnection';

enum ColorAlert {
  error = '#fa9797',
  success = '#92fd7c'
}

const App = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alert, setAlert] = useState<string>("");
  const [colorAlert, setColorAlert] = useState<ColorAlert>();
  const [usuario, setUsuario] = useState<string | null | undefined>("");

  function cadastrar() {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result: firebase.auth.UserCredential) => {
        mostrarAlerta("Cadastrado com sucesso!", ColorAlert.success);
        setEmail("");
        setPassword("");
      })
      .catch((error: any) => {
        switch (error.code) {
          case 'auth/weak-password':
            mostrarAlerta("Senha incorreta!", ColorAlert.error);
            break;
          case 'auth/invalid-email':
            mostrarAlerta("Email inválido!", ColorAlert.error);
            break;
          default:
            mostrarAlerta("Opss algo deu errado!", ColorAlert.error);
            break;
        }
      });
  }

  function logar(): void {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result: firebase.auth.UserCredential) => {
        mostrarAlerta("logado com sucesso!", ColorAlert.success);
        console.log(result);
        setUsuario(result.user?.email);
        setEmail("");
        setPassword("");
      })
      .catch((error: any) => {
        mostrarAlerta("Login ou senha incorretos!", ColorAlert.error);
      });
  }

  function deslogar(): void {
    firebase.auth().signOut();
    setUsuario("");
    mostrarAlerta("Deslogado com sucesso!", ColorAlert.success);
  }

  function mostrarAlerta(mensagem: string, color: ColorAlert): void {
    setAlert(mensagem);
    setColorAlert(color);
    setTimeout(() => {
      setAlert("");
    }, 2000);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        Email
      </Text>
      <TextInput
        value={email}
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={(value) => setEmail(value)}
      />
      <Text style={styles.texto}>
        Password
      </Text>
      <TextInput
        value={password}
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={(value) => setPassword(value)}
      />
      <Button
        title="Cadastrar"
        onPress={cadastrar}
      />
      <View style={styles.btn}>
        <Button
          title={usuario ? "Deslogar" : "Logar"}
          onPress={usuario ? deslogar : logar} />
      </View>
      { alert ?
        (<View style={[styles.containerAlert, { backgroundColor: colorAlert }]}>
          <Text style={styles.texto}>
            {alert}
          </Text>
        </View>
        ) : null}
      
        <Text style={styles.containerUser}>
          {usuario}
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  texto: {
    fontSize: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#121212',
    height: 40,
    fontSize: 17,
  },
  containerAlert: {
    alignSelf: 'center',
    width: 300,
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    marginTop: 20,
  },
  containerUser: {
    marginTop: 20,
    fontSize: 16,
  }
});

export default App;

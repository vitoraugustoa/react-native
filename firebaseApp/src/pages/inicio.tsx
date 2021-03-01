import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Listagem from '../components/Listagem/listagem';
import firebase from '../database/firebaseConnection';

import { Usuario } from '../models/usuario';

const Inicio = () => {
  const [nome, setNome] = useState<string>("");
  const [cargo, setCargo] = useState<string>("");
  const [idade, setIdade] = useState<number>(0);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    buscarTodosUsuarios();
  }, []);

  function dadosAtualizacaoAutomatica() {
    firebase.database().ref('nome').on('value', (snapshot) => {
      setNome(snapshot.val());
    });
  }

  function dadosBuscadosUmaVez() {
    firebase.database().ref('nome').once('value', (snapshot) => {
      setNome(snapshot.val());
    });
  }

  function buscarUsuarios() {
    // firebase.database().ref('usuarios/1/').once('value', (snapshot) => {
    //   setUsuario(snapshot.val());
    // });
  }

  function criarCliente() {
    firebase.database().ref('tipo').set('Cliente');
  }

  function removerCliente() {
    firebase.database().ref('tipo').remove();
  }

  function adicionarUsuario() {
    firebase.database().ref('usuarios').child('3').set({
      nome: "Vitin",
      idade: 23,
      cargo: 'Programador',
    });
  }

  function atualizarUsuario() {
    firebase.database().ref('usuarios').child('3').update({
      cargo: 'Programador Top',
    });
  }

  function adicionarFuncionario() {
    let chave: any = firebase.database().ref('usuarios').push().key;
    firebase.database().ref('usuarios').child(chave)
      .set({
        nome,
        cargo,
        idade
      });

    setCargo("");
    setNome("");
    setIdade(0);
  }

  function buscarTodosUsuarios() {
    firebase.database().ref('usuarios').on('value', (snapshot) => {
      setUsuarios([]);
      snapshot.forEach((childItem: any) => {
        let usuario: Usuario = {
          key: childItem.key,
          nome: childItem.val().nome,
          cargo: childItem.val().cargo,
          idade: childItem.val().idade,
        };

        setUsuarios(oldArray => [...oldArray, usuario].reverse());
      });

      setLoading(false);
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        Nome
      </Text>
      <TextInput
        value={nome}
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={(value) => setNome(value)}
      />
      <Text style={styles.texto}>
        Cargo
      </Text>
      <TextInput
        value={cargo}
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={(value) => setCargo(value)}
      />
      <Text style={styles.texto}>
        Idade
      </Text>
      <TextInput
        value={String(idade)}
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={(value: any) => setIdade(value)}
      />
      <Button
        title="Novo funcionario"
        onPress={adicionarFuncionario}
      />
      {loading ? (
        <ActivityIndicator color="#000" size={45} />
      ) : (
          <FlatList
            keyExtractor={item => item.key}
            data={usuarios}
            renderItem={({ item }) => <Listagem data={item} />}
          />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
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
  }
});

export default Inicio;

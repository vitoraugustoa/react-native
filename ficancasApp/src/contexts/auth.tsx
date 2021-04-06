import React, { useState, createContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { UserContext } from '../models/userContext';
import firebase from '../database/firebaseConnection';
import AsyncStorage from '@react-native-community/async-storage';

import { User } from '../models/user';

export const AuthContext = createContext<UserContext>({
  singUp: () => null,
  signIn: () => null,
  signOut: () => null,
});

const Contexts: React.FC = ({ children }) => {
  const [user, setUser] = useState({
    signed: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);

  useEffect(() => {
    getStorageUser();
  }, []);

  function signIn(email: string, password: string) {
    setLoadingAuth(true);
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((value) => {
        let id: any = value.user?.uid;
        firebase.database().ref('users').child(id).once('value')
          .then((snapshot) => {
            let data = {
              id: id,
              nome: snapshot.val().nome,
              email: value.user?.email,
              signed: true,
            }

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
          });
      })
      .catch((error) => {
        setUser({
          signed: false,
        });
        Alert.alert("Erro no login");
        setLoadingAuth(false);
      });
  }

  function signUp(email: string, password: string, nome: string): void {
    setLoadingAuth(true);
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((value) => {
        let id: any = value.user?.uid;

        firebase.database().ref('users').child(id).set({
          saldo: 0,
          nome: nome,
        }).then(() => {
          let data = {
            id: id,
            nome: nome,
            email: value.user?.email,
            signed: true,
          }

          setUser(data);
          storageUser(data);
          setLoadingAuth(false);
        })
          .catch(() => {
            Alert.alert("Erro no cadastro");
            setLoadingAuth(false);
          });
      })
  }

  async function signOut() {
    await firebase.auth().signOut();
    AsyncStorage.clear().then(() => {
      setUser({
        signed: false,
      });
    })
  }

  async function storageUser(data: object) {
    await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
  }

  async function getStorageUser() {
    let data = await AsyncStorage.getItem('Auth_user');

    if (data) {
      setUser(JSON.parse(data));
    }

    setIsLoading(false);
  }

  return (
    <AuthContext.Provider value={
      {
        ...user,
        isLoading,
        loadingAuth,
        singUp: signUp,
        signIn: signIn,
        signOut: signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export default Contexts;
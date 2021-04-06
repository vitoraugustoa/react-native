import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Keyboard, TouchableWithoutFeedback, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format } from 'date-fns';
import firebase from '../../database/firebaseConnection';

import Header from '../../components/Header/header';
import PickerAndroid from '../../components/Picker/picker.android';
import PickerIos from '../../components/Picker/picker.ios';
import { AuthContext }  from '../../contexts/auth';
import { UserContext } from '../../models/userContext';

import {
  Background,
  Input,
  SubmitButton,
  SubmitText
} from './styles';

const New: React.FC = () => {
  const userContext = useContext(AuthContext) as UserContext;
  const navigation = useNavigation();
  const [valor, setValor] = useState<string>('');
  const [tipo, setTipo] = useState<string>("receita");

  function handleSubmit() {
    Keyboard.dismiss();

    if(isNaN(parseFloat(valor)) || tipo === null) {
      Alert.alert("Preencha todos os campos!");
    }
    else {
      Alert.alert(
        'Confirmando dados',
        `Tipo ${tipo} - Valor: ${parseFloat(valor)}`,
        [{
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: handleAdd
        }]
      )
    }
  }

  function handleAdd() {
    let uid: any = userContext.id;
    let key: any = firebase.database().ref('historico').child(uid).push().key;
    
    firebase.database().ref('historico').child(uid).child(key).set({
      tipo: tipo,
      valor: parseFloat(valor),
      date: format(new Date(), 'dd/MM/yy') 
    });

    // Atualizar o saldo
    let user = firebase.database().ref('users').child(uid);
    user.once('value').then((snapshot) => {
      let saldo = parseFloat(snapshot.val().saldo);
      tipo === 'despesa' ? saldo -= parseFloat(valor) : saldo += parseFloat(valor)
      
      user.child('saldo').set(saldo);
    });

    setValor('');
    Keyboard.dismiss();
    navigation.navigate("Home");
  }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Background>
        <Header />
        <SafeAreaView style={{ alignItems: 'center' }}>
          <Input
            placeholder="Valor desejado"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={Keyboard.dismiss}
            value={valor}
            onChangeText={(text) => setValor(text)}
          />

          {Platform.OS === 'ios' ? 
          (<PickerIos onValueChange={setTipo} tipo={tipo} />) 
          : 
          (<PickerAndroid onValueChange={setTipo} tipo={tipo} />)}

          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>

  );
}

export default New;
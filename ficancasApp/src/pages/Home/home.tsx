import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native'; 
import { format, isPast } from 'date-fns';

import Header from '../../components/Header/header';
import HistoryList from '../../components/HistoryList/historyList';

import { formatarValor } from '../../helpers/regexHelpers';
import { AuthContext } from '../../contexts/auth';
import { UserContext } from '../../models/userContext';
import { History } from '../../models/history';
import firebase from '../../database/firebaseConnection';

import {
  Background,
  Container,
  Nome,
  Saldo,
  Title,
  List,
} from './styles';

const Home: React.FC = () => {
  const userContext = useContext(AuthContext) as UserContext;
  const uid: any = userContext && userContext.id;
  const [saldo, setSaldo] = useState<number>(0);
  const [historico, setHistorico] = useState<History[]>([]);

  useEffect(() => {
    carregarDados();
  }, [])

  function carregarDados(): void {
    firebase.database().ref('users')
      .child(uid)
      .on('value', (snapshot) => {
        setSaldo(snapshot.val().saldo);
      });

    firebase.database().ref('historico')
      .child(uid)
      .orderByChild('date')
      .equalTo(format(new Date, 'dd/MM/yy'))
      .limitToLast(10).on('value', (snapshot => {
        setHistorico([]);
        snapshot.forEach((childItem) => {
          let novoHistorico: History = {
            id: childItem.key as string,
            tipo: childItem.val().tipo,
            valor: childItem.val().valor,
            date: childItem.val().date,
          }

          setHistorico(oldArray => [...oldArray, novoHistorico].reverse());
        })
      }));
  }

  function handleDeleteItem(history: History) {
    if(isPast(new Date(history.date))) {
      Alert.alert("Você não pode excluir um regitro antigo!");
      return
    }

    Alert.alert(
      "Cuidado atenção",
      `Você deseja excluir a ${history.tipo} - Valor: ${history.valor} ?`,
      [
        {
          text: "Cancelar",
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => deleteItem(history)
        }
      ]
    )
  }

  function deleteItem(history: History) {
    firebase.database().ref('historico')
      .child(uid)
      .child(history.id as string)
      .remove()
      .then(() => {
        let saldoAtual = saldo;
        history.tipo === 'despesa' ? 
        saldoAtual += parseFloat(history.valor) 
        : saldoAtual -= parseFloat(history.valor);

        firebase.database().ref('users')
        .child(uid)
        .child('saldo')
        .set(saldoAtual);
      });
  }

  return (
    <Background>
      <Header />

      <Container>
        <Nome>{userContext.nome}</Nome>
        <Saldo>R$ {formatarValor(saldo)}</Saldo>
      </Container>

      <Title>Ultimas movimentações</Title>


      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HistoryList
            data={item}
            onDeleteItem={handleDeleteItem} />
        )}
      />
    </Background>
  );
}

export default Home;
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Platform, TouchableOpacity } from 'react-native';
import { format, isBefore } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '../../components/Header/header';
import HistoryList from '../../components/HistoryList/historyList';
import DatePicker from '../../components/DatePicker/datePicker';

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
  Area,
} from './styles';

const Home: React.FC = () => {
  const userContext = useContext(AuthContext) as UserContext;
  const uid: any = userContext && userContext.id;
  const [saldo, setSaldo] = useState<number>(0);
  const [historico, setHistorico] = useState<History[]>([]);
  const [newDate, setNewDDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    carregarDados();
  }, [])

  useEffect(() => {
    carregarHistorico();
  }, [newDate]);

  function carregarDados(): void {
    firebase.database().ref('users')
      .child(uid)
      .on('value', (snapshot) => {
        setSaldo(snapshot.val().saldo);
      });

    carregarHistorico();
  }

  function carregarHistorico(): void {
    firebase.database().ref('historico')
      .child(uid)
      .orderByChild('date')
      .equalTo(format(newDate, 'dd/MM/yyyy'))
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
    // Pegando data do item
    const [diaItem, mesItem, anoItem] = history.date.split('/');
    const dateItem = new Date(`${anoItem}/${mesItem}/${diaItem}`);
    // Pegando data hoje
    const formatDiaHoje = format(new Date(), 'dd/MM/yyyy');
    const [diaHoje, mesHoje, anoHoje] = formatDiaHoje.split('/');
    const dateHoje = new Date(`${anoHoje}/${mesHoje}/${diaHoje}`);

    if (isBefore(dateItem, dateHoje)) {
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

  function handleShowPicker() {
    setShowDatePicker(true);
  }

  function onChangeDatePicker(data: Date) {
    setShowDatePicker(Platform.OS === "ios");
    setNewDDate(data);
  }

  return (
    <Background>
      <Header />

      <Container>
        <Nome>{userContext.nome}</Nome>
        <Saldo>R$ {formatarValor(saldo)}</Saldo>
      </Container>

      <Area>
        <TouchableOpacity onPress={handleShowPicker}>
          <Icon name="event" color="#FFF" size={30} />
        </TouchableOpacity>
        <Title>Ultimas movimentações</Title>
      </Area>


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

      {showDatePicker && (
        <DatePicker
          onChange={onChangeDatePicker}
          onClose={() => { setShowDatePicker(false) }}
        />
      )}

    </Background>
  );
}

export default Home;
import React, { useState, useEffect, useRef } from 'react';
import { TextInput, View, Text, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import firebase from './src/database/firebaseConnection';
import Icon from 'react-native-vector-icons/Feather';

import TaskList from './src/components/TaskList/taskList';

import { Task } from './src/models/taks';


import styles from './AppStyles';

const App: React.FC = () => {
  const inputRef = useRef(null);
  const [valorTask, setValorTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [key, setKey] = useState<string | null>();

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    firebase.database().ref('tarefas').on('value', (snapshot) => {
      setTasks([]);

      snapshot.forEach((childItem) => {
        let data: Task = {
          key: childItem.key,
          value: childItem.val().nome
        }

        setTasks(oldArray => [...oldArray, data]);
      });
    });
  }

  async function adicionarNovaTask(): Promise<void> {
    if (valorTask) {

      if (key !== null) {
        firebase.database().ref('tarefas').child(key).update({
          nome: valorTask,
        });
      }
      else {
        let tarefas = firebase.database().ref('tarefas');
        let chave: string | null = tarefas.push().key;
        tarefas.child(chave!).set({
          nome: valorTask
        });
      }

      limparFormulario();
    }
  }

  function removerTask(keyTask: string): void {
    firebase.database().ref('tarefas').child(keyTask).remove();
  }

  function editarTask(task: Task) {
    setValorTask(task.value);
    setKey(task.key);
    inputRef.current.focus();
  }

  function limparFormulario() {
    Keyboard.dismiss();
    setValorTask("");
    setKey(null);
  }

  return (
    <View style={styles.container}>

      {key && (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={limparFormulario}>
            <Icon name="x-circle" size={20} color="#FF0000" />
          </TouchableOpacity>
          <Text style={{ marginLeft: 5, marginBottom: 8, color: '#FF0000' }}>
            Você está editando uma tarefa!
        </Text>
        </View>
      )}
      <View style={styles.containerTask}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="O que vai fazer hoje?"
          underlineColorAndroid="transparent"
          onChangeText={(value) => setValorTask(value)}
          value={valorTask}
        />

        <TouchableOpacity
          style={styles.buttonAdd} onPress={adicionarNovaTask}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => String(item.key)}
        renderItem={({ item }) => (
          <TaskList data={item}
            onPressDelete={removerTask}
            onPressTask={editarTask} />
        )}
      />
    </View>
  );
}

export default App;
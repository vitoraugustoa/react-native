import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from 'react-native';

import Lista from './src/pages/Lista/lista';

import styles from './globalStyle';
import { Feed } from './src/models/feed';

const mookFeed: Feed[] = [
  {
    id: '1',
    nome: 'Lucas Silva',
    descricao: 'Mais um dia de muitos bugs :)',
    imgperfil: 'https://sujeitoprogramador.com/instareact/fotoPerfil1.png',
    imgPublicacao: 'https://sujeitoprogramador.com/instareact/foto1.png',
    likeada: false,
    likers: 0
  },
  {
    id: '2',
    nome: 'Matheus',
    descricao: 'Isso sim é ser raiz!!!!!',
    imgperfil: 'https://sujeitoprogramador.com/instareact/fotoPerfil2.png',
    imgPublicacao: 'https://sujeitoprogramador.com/instareact/foto2.png',
    likeada: false,
    likers: 0
  },
  {
    id: '3',
    nome: 'Jose Augusto',
    descricao: 'Bora trabalhar Haha',
    imgperfil: 'https://sujeitoprogramador.com/instareact/fotoPerfil3.png',
    imgPublicacao: 'https://sujeitoprogramador.com/instareact/foto3.png',
    likeada: false,
    likers: 3
  },
  {
    id: '4',
    nome: 'Gustavo Henrique',
    descricao: 'Isso sim que é TI!',
    imgperfil: 'https://sujeitoprogramador.com/instareact/fotoPerfil1.png',
    imgPublicacao: 'https://sujeitoprogramador.com/instareact/foto4.png',
    likeada: false,
    likers: 1
  },
  {
    id: '5',
    nome: 'Guilherme',
    descricao: 'Boa tarde galera do insta...',
    imgperfil: 'https://sujeitoprogramador.com/instareact/fotoPerfil2.png',
    imgPublicacao: 'https://sujeitoprogramador.com/instareact/foto5.png',
    likeada: false,
    likers: 32
  }
]


const App = () => {
  const [feed, setFeed] = useState<Feed[]>(mookFeed);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={require('./resources/images/logo.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('./resources/images/send.png')}
            style={styles.send}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        data={feed}
        renderItem={({ item }) => <Lista data={item} />} />
    </View>
  );
};

export default App;

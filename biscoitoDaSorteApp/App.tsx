import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

import frasesDaSorte from './src/config/frasesDaSorte';

import styles from './globalStyles';

const App = () => {
  const [frases, setFrases] = useState<string[]>(frasesDaSorte);
  const [biscoitoFechado, setBisoitoFechado] = useState<boolean>(true);
  const [numeroAleatorio, setNumeroAleatorio] = useState<number>(-1);


  function gerarNumeroAleatorio(): number {
    return Math.floor(Math.random() * frases.length);
  }

  function quebrarBiscoito(): void {
    setBisoitoFechado(!biscoitoFechado);
    setNumeroAleatorio(gerarNumeroAleatorio());

    setTimeout(() => {
      setBisoitoFechado(true);
      setNumeroAleatorio(-1);
    }, 9000);
  }
  
  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={biscoitoFechado ? require('./assets/images/biscoito.png') : require('./assets/images/biscoitoAberto.png')}
      />

      <Text style={styles.textoFrase}>{ numeroAleatorio >= 0 ? frases[numeroAleatorio] : "Quebre o biscoito." }</Text>

      <TouchableOpacity style={styles.botao} onPress={quebrarBiscoito}>
          <Text style={styles.btnTexto}>Quebrar Biscoito</Text>
      </TouchableOpacity>
    </View>
  );
};


export default App;

import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Pressable,
} from 'react-native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

import styles from './globalStyle';


declare const global: { HermesInternal: null | {} };

const App = () => {
  const [numero, setNumero] = useState<number>(0.0);
  const [ultimoNumero, setUltimoNumero] = useState<number>();
  const [textoBtn, setTextoBtn] = useState<string>("VAI");
  const countRef = useRef<any>(null);

  function iniciarContagem(): void {
    if (countRef.current === null) {
      countRef.current = setInterval(() => {
        setNumero((numero) => numero + 0.1);
      }, 100);
      setTextoBtn("PARAR")
    }
    else {
      clearInterval(countRef.current);
      countRef.current = null;
      setTextoBtn("VAI");
    }
  }

  function finalizarContagem(): void {
    if (countRef.current) {
      setUltimoNumero(numero);
      setNumero(0.0);
      clearInterval(countRef.current);
      countRef.current = null;
      setTextoBtn("VAI");
    }
  }

  return (
    <View style={styles.conteudo}>
      <Pressable onPress={iniciarContagem} style={styles.conteudoImg}>
        <Image
          source={require("./assets/cronometro.png")}
          style={styles.img} />
        <Text style={styles.timer}>{numero.toFixed(1)}</Text>
      </Pressable>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={iniciarContagem}>
          <Text style={styles.btnTexto}>
            {textoBtn}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={finalizarContagem}>
          <Text style={styles.btnTexto}>
            LIMPAR
          </Text>
        </TouchableOpacity>
      </View>

      {ultimoNumero ? 
      (<View style={styles.areaUltimoNumero}>
        <Text style={styles.textoUltimoNumero}>Ultimo tempo: {ultimoNumero.toFixed(2)}</Text>
      </View>)
      : null}
    </View>
  );
};

export default App;

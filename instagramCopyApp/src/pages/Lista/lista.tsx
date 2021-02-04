import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feed } from '../../models/feed';

import styles from './listaStyles';

interface ListaProps {
  data: Feed
}

const Lista: React.FC<ListaProps> = ({ data }) => {
  const [post, setPost] = useState<Feed>(data);

  function onLikePress() {
    if(post.likeada) {
      setPost({
        ...post, 
        likeada: !post.likeada, 
        likers: post.likers - 1
      });
    }
    else {
      setPost({
        ...post, 
        likeada: !post.likeada, 
        likers: post.likers + 1
      });
    }
  }

  function mostrarLikes() {
    if(post.likers <= 0)
      return;

    return (
      <Text style={styles.likes}>
        {post.likers} {post.likers > 1 ? 'curtidas' : 'curtida'}
      </Text>
    )
  }

  return (
    <View style={styles.areaFeed}>
      <View style={styles.viewPerfil}>
        <Image
          source={{uri: data.imgperfil}}
          style={styles.fotoPerfil}
        />

        <Text style={styles.nomeUsuario}>
          {data.nome}
        </Text>
      </View>

      <Image 
        resizeMode="cover"
        source={{uri: data.imgPublicacao}}
        style={styles.fotoPublicacao}
      />

      <View style={styles.areaBtn}>
        <TouchableOpacity onPress={onLikePress}>
          <Image 
            source={post.likeada 
            ? require('../../../resources/images/likeada.png') 
            : require('../../../resources/images/like.png')}
            style={styles.iconeLike}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSend}>
          <Image 
            source={require('../../../resources/images/send.png')}
            style={styles.iconeLike}
          />
        </TouchableOpacity>
      </View>

      {mostrarLikes()}

      <View style={styles.viewRodape}>
        <Text style={styles.nomeRodape}>
          {data.nome}
        </Text>

        <Text style={styles.descRodape}>
          {data.descricao}
        </Text>
      </View>
    </View>
  );
}

export default Lista;
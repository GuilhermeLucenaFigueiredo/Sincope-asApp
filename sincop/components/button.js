import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

export const Botao = ({ onPress, texto, cor}) => {
  return (
    <TouchableOpacity style={[styles.botao, { borderColor: cor }]} onPress={onPress}>
      <Text style={[styles.textoBotao, { color: cor }]}>{texto}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    botao: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#28a745', // Cor verde do Bootstrap
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        width:'80%',
        alignSelf:'center',
      },
      textoBotao: {
        color: '#28a745', 
        fontSize: 16,
        fontWeight: 'bold',
        textAlign:'center',
      },
});


export const BotaoIcon  = ({ onPress, texto, cor, iconSource, botaoStyle}) => {
  return (
    <TouchableOpacity style={[stylesBI.botao, botaoStyle, { borderColor: cor }]} onPress={onPress}>
      {iconSource && <Image source={iconSource} style={stylesBI.icone} />}
      <Text style={[styles.textoBotao, { color: cor }]}>{texto}</Text>
    </TouchableOpacity>
  );
};

const stylesBI = StyleSheet.create({
    botao: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#28a745', // Cor verde do Bootstrap
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        width:'80%',
        alignSelf:'center',
        flexDirection:'row',
      },
      icone: {
        width: 25, 
        height: 25,
        marginRight: 5,
      },
      textoBotao: {
        color: '#28a745', 
        fontSize: 16,
        fontWeight: 'bold',
        textAlign:'center',
      },
});
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Footer from '../components/footer';


const PreProvaScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.preProvaContainer}>
        <Text style={styles.titulo}>Avaliação</Text>
        <Text style={styles.mensagem}>Você gostaria de iniciar sua avaliação agora?</Text>
        <Text style={styles.aviso}>Você terá 40 minutos para realizar a prova. Preste atenção e responda com calma.</Text>
        <View style={styles.botoes}>

          <TouchableOpacity onPress={() => navigation.navigate('quiz')}>
          <Text style={styles.botaoIniciar}>Iniciar Avaliação</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.botaoVoltar}>Voltar</Text>
          </TouchableOpacity>
          
        </View>
      </View>
      <Footer footerStyle={{marginTop: 120}}/>
    </View>
  );
};

export default PreProvaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#fff',
  },
  preProvaContainer: {
    backgroundColor: '#fff',
    maxWidth: '90%',
    margin: '1rem auto',
    padding: 20,
    textAlign: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    marginTop: 150,
    elevation:10,
  },
  titulo: {
    alignSelf:'center',
    fontSize: 24,
    color: '#333',
  },
  mensagem: {
    textAlign:'center',
    alignSelf:'center',
    fontSize: 18,
    marginTop: 20,
  },
  aviso: {
    textAlign:'center',
    alignSelf:'center',
    fontSize: 16,
    marginTop: 10,
    color: '#777',
  },
  botoes: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  botaoIniciar: {
    marginTop: 20,
    fontSize: 18,
    color: '#28a745',
    borderWidth: 1,
    borderColor: '#28a745',
    padding: 10,
    borderRadius: 5,
  },
  botaoVoltar: {
    marginTop: 20,
    fontSize: 18,
    color: '#dc3545',
    borderWidth: 1,
    borderColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
});

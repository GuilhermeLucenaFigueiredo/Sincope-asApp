import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Header from '../components/Header';
import MenuInferior from '../components/menuNav';
import { useNavigation } from '@react-navigation/native';

const AprendaMais = () => {

  const navigation = useNavigation();

  const navigateToConfig = () => {
    navigation.navigate('config');
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />

      <View style={styles.main}>

        <View style={styles.videoContent}>
          <View style={styles.videoTexto}>
            <Text style={styles.titulo}>Parcerias</Text>
            <Text style={styles.texto}>
              Em parceria com o Senac, nossa plataforma oferece cursos sob medida para impulsionar sua carreira.
              Acesse facilmente no seu celular e eleve seu desempenho profissional com a excelência SENAC.
            </Text>
          </View>
          <View style={styles.videoWrapper}>

            <Image style={styles.videoThumbnail} source={{ uri: 'https://i.ytimg.com/vi/Br4xr9BpqSc/hqdefault.jpg' }} />
          </View>
        </View>


        <View style={styles.videoWrapper}>
          <Image style={styles.videoThumbnail} source={{ uri: 'https://i.ytimg.com/vi/7hY7NPvILo8/hqdefault.jpg' }} />
        </View>

      </View>
      <MenuInferior
        Image1={require('../assets/configuracao.png')}
        onPress1={navigateToConfig}
        Image2={require('../assets/casa.png')}
        onPress2={navigateToHome} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom:10,
    fontSize: 28,
    fontFamily: 'Roboto',
  },
  header: {
    marginTop: 20,
  },
  logo: {
    width: 200,
    height: 100,
  },
  menuLink: {
    marginBottom: 10,
    color: 'green',
  },
  main: {
    alignItems: 'center',
    marginTop: 20,
  },
  videoContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  videoTexto: {
    marginBottom: 10,
  },
  texto: {
    textAlign: 'justify',
    marginHorizontal: '10%',
    fontSize:18,
  },
  videoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 225,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});

export default AprendaMais;

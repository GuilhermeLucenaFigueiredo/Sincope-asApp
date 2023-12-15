import React from 'react';
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import { BotaoIcon } from '../components/button';
import Footer from '../components/footer';

const ConfigScreen = () => {
  const navigation = useNavigation();

  const verificarToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.navigate('profile');
      } else {
        Alert.alert('Faça login', 'Você precisa fazer login para acessar esta página.');
        navigation.navigate('login');
      }
    } catch (error) {
      console.error('Erro ao verificar token:', error);
    }
  };

  return (
    <View>
      <Header />
      <View>
        <BotaoIcon
          iconSource={require('../assets/user.png')}
          cor={'#1d568b'}
          texto={'Minha conta'}
          onPress={verificarToken}
        />
        <BotaoIcon
          iconSource={require('../assets/casa.png')}
          cor={'#1d568b'}
          texto={'Voltar ao menu'}
          onPress={() => navigation.navigate('Home')}
        />
      </View>
      <Footer footerStyle={{ marginTop: '140%' }} />
    </View>
  );
};

export default ConfigScreen;

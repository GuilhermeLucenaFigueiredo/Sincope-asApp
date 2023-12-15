//axiosConfig.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://192.168.1.15:3000/api',

});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token'); //pega o token que guardou no storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Dados enviados:', config);
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;

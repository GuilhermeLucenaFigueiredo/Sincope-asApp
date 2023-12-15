import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, TouchableOpacity, Switch } from 'react-native';
import axios from 'axios';
import Header from '../components/Header';
import { Botao } from '../components/button';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export const CadastroScreen = () => {
  const [nome, setNome] = useState('');
  const [CPF, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [CEP, setCEP] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [cargo, setCargo] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);

  const handleSwitchChange = () => {
    setChecked(!isChecked);
  };

  const handleAcceptTerms = () => {
    if (isChecked) {
      // Lógica para aceitar os termos
      console.log('Termos aceitos!');
    } else {
      console.log('Você precisa aceitar os termos para continuar.');
    }
  };

  const handleContinuarPress = async () => {
    try {
      const data = {
        nome,
        CPF,
        email,
        data_nascimento: dataNascimento,
        telefone,
        empresa,
        cargo,
        senha,
        endereco,
        CEP,
        cidade,
        estado,
      };

      const response = await axios.post('http://192.168.1.15:3000/cadastro', data);
      Alert.alert(response.data.message);
      navigation.navigate('login');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header />
      <Text style={styles.titulo}>Cadastro de Usuário</Text>
      <View
        style={{
          flexDirection: 'column',
          margin: 10,
          alignSelf: 'center',
          width: '90%',
          padding: 10,
          elevation: 8,
          borderRadius: 10,
          backgroundColor: '#fff',
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Nome completo *"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="CPF"
          keyboardType="numeric"
          value={CPF}
          onChangeText={setCPF}
        />
        <TextInput
          style={styles.input}
          placeholder="Email *"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Data de nascimento"
          keyboardType="numeric"
          value={dataNascimento}
          onChangeText={setDataNascimento}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
        />
        <TextInput
          style={styles.input}
          placeholder="CEP *"
          keyboardType="numeric"
          value={CEP}
          onChangeText={setCEP}
        />
        <TextInput
          style={styles.input}
          placeholder="Endereço *"
          value={endereco}
          onChangeText={setEndereco}
        />
        <TextInput
          style={styles.input}
          placeholder="Cidade *"
          value={cidade}
          onChangeText={setCidade}
        />
        <TextInput
          style={styles.input}
          placeholder="Estado *"
          value={estado}
          onChangeText={setEstado}
          />
          <TextInput
                style={styles.input}
                placeholder="Empresa"
                value={empresa}
                onChangeText={setEmpresa}
              />
          <TextInput
                style={styles.input}
                placeholder="Cargo"
                value={cargo}
                onChangeText={setCargo}
              />
          <TextInput
                style={styles.input}
                placeholder="Senha *"
                secureTextEntry={true}
                value={senha}
                onChangeText={setSenha}
              />
          <TextInput
                style={styles.input}
                placeholder="Confirmar Senha *"
                secureTextEntry={true}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
              />
              <Text>Por favor, aceite os termos de uso:</Text>
        <View style={styles.switchContainer}>
        <TouchableOpacity onPress={handleAcceptTerms} disabled={!isChecked}>
          <Text style={[styles.button, { opacity: isChecked ? 1 : 0.5 }]}>
            Aceitar Termos
          </Text>
        </TouchableOpacity>
        <Switch
          value={isChecked}
          onValueChange={handleSwitchChange}
        />
        </View> 
          <Botao texto={'Cadastre-se'} onPress={handleContinuarPress} />
          </View>
          </ScrollView>
          );
          };
          
          const styles = StyleSheet.create({
          titulo: {
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 10,
          marginTop: 20,
          fontSize: 20,
          fontFamily: 'Roboto',
          },
          input: {
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
          },
          });

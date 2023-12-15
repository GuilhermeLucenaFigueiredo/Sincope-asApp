import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../api/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
const UserProfileScreen = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            navigation.navigate('login');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    const [userData, setUserData] = useState({
        nome: '',
        email: '',
        idade: '',
    });

    useEffect(() => {
        
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const response = await api.get('/users/perfil');
            const userDataFromApi = response.data;
            console.log('Dados do usuário:', userDataFromApi);
            setUserData({
                nome: userDataFromApi.vendedor.nome, 
                email: userDataFromApi.vendedor.email, 
                idade: userDataFromApi.vendedor.idade.toString(), // idade esta como string -.-
            });
        } catch (error) {
            console.error('Erro ao obter dados do usuário:', error);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const response = await api.put('/users/perfilupdate', {
                nome: userData.nome,
                email: userData.email,
                idade: userData.idade,
            });
    
            // Verifique a resposta e lide com o resultado conforme necessário
            console.log('Resposta da atualização:', response.data);
            Alert.alert('Dados Atualizados!');
        } catch (error) {
            console.error('Erro ao atualizar dados do usuário:', error);
            Alert.alert('erro ao atualizar, tente novamente');
        }
    };
    

    const handleDeleteAccount = async () => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja excluir sua conta?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel', // Botão de cancelamento
                },
                {
                    text: 'Confirmar',
                    onPress: () => confirmDeleteAccount(),
                },
            ],
            { cancelable: true }
        );
    };

    const confirmDeleteAccount = async () => {
        try {
            const response = await api.delete('/users/delete');
            if (response.status === 200) {
                console.log('Conta excluída com sucesso!');
                Alert.alert('Cadastro excluído com sucesso!');
                await AsyncStorage.removeItem('token');
                navigation.navigate('login');
            } else {
                console.error('Erro ao excluir conta do usuário:', response.status);
            }
        } catch (error) {
            console.error('Erro ao excluir conta do usuário:', error);
        }
    };
      
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileContainer}>
                {/* Exiba a foto do usuário aqui */}
            </View>

            <View style={styles.formContainer}>
            <TextInput
    style={styles.input}
    placeholder="Nome"
    value={userData.nome}
    onChangeText={(text) => setUserData({ ...userData, nome: text })}
/>
<TextInput
    style={styles.input}
    placeholder="E-mail"
    value={userData.email}
    onChangeText={(text) => setUserData({ ...userData, email: text })}
/>
<TextInput
    style={styles.input}
    placeholder="Idade"
    value={userData.idade}
    onChangeText={(text) => setUserData({ ...userData, idade: text })}
/>
            </View>

            <TouchableOpacity style={styles.Button} onPress={handleUpdateProfile}>
                <Text style={styles.ButtonText}>Salvar Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.ButtonText}>Voltar ao menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Button} onPress={handleDeleteAccount}>
                <Text style={styles.ButtonText}>Excluir Conta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button} onPress={handleLogout}>
                <Text style={styles.ButtonText}>Sair da conta</Text>
            </TouchableOpacity>
            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 10,
    },
    changePhotoText: {
        color: 'blue',
        fontSize: 16,
    },
    formContainer: {
        width: '100%',
        marginTop: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    Button: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#1d568b',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        width: '80%',
        alignSelf: 'center',
    },
    ButtonText: {
        color: '#1d568b',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default UserProfileScreen;

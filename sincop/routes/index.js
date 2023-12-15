import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const Stack = createNativeStackNavigator()

import Home from '../pages/Home'
import PreProvaScreen from '../pages/preProva'
import AprendaMais from '../pages/aprendaMais'
import LoginScreen from '../pages/login'
import {CadastroScreen, ProximaCadastro}  from '../pages/cadastro'
import {QuizScreen, ResultadoScreen} from '../pages/prova'
import ConfigScreen from '../pages/config'
import UserProfileScreen from '../pages/telaDoUser'


export function AppRoutes(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} options={{headerShown : false}}/>
                <Stack.Screen name="PreProva" component={PreProvaScreen} options={{headerShown : false}}/>
                <Stack.Screen name="aprendaMais" component={AprendaMais} options={{headerShown : false}}/>
                <Stack.Screen name="login" component={LoginScreen} options={{headerShown : false}}/>
                <Stack.Screen name="cadastro" component={CadastroScreen} options={{headerShown : false}}/>
                <Stack.Screen name="quiz" component={QuizScreen} options={{headerShown : false, gestureEnabled: false}}/>
                <Stack.Screen name="resultado" component={ResultadoScreen} options={{headerShown : false}}/>
                <Stack.Screen name="config" component={ConfigScreen} options={{headerShown : false}}/>
                <Stack.Screen name="profile" component={UserProfileScreen} options={{headerShown : false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
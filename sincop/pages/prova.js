//Importações
import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert, Button, TextInput } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import questoes from '../questoes.json';
import { Botao, BotaoIcon } from '../components/button';
import Header from '../components/Header';
import Footer from '../components/footer';
import moment from 'moment';
import { BackHandler } from 'react-native';
import { Linking } from 'react-native';
import qs from 'qs';
import axios from 'axios';
import api from '../api/axiosConfig'


//Todas as funções para a prova funcionar
export const QuizScreen = () => {
  const [questions] = useState(questoes.questoes);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(2400); // 40 minutos em segundos
  
  const navigation = useNavigation();

  
  const enviarNotaAoBackend = async () => {
    try {
      console.log('executando o baugulho');
      const storedResults = await AsyncStorage.getItem('@quizResults');
      if (storedResults) {
        const resultsObject = JSON.parse(storedResults);
        const { correctAnswers: correctAnswersValue } = resultsObject;

        if (correctAnswersValue !== undefined) {
          console.log('Enviando nota ao backend:', correctAnswersValue);
          sendNoteToBackend(correctAnswersValue); // Envia a nota ao backend utilizando a função sendNoteToBackend
        }
      }
    } catch (error) {
      console.error('Erro ao carregar resultados do AsyncStorage:', error);
    }
  };
  const sendNoteToBackend = async (note) => {
    try {
      // Chama o axiosConfig com a nota como parâmetro
      const response = await api.post('/prova', { nota: note });
      console.log('Resposta do backend:', response.data);
      // Faça algo com a resposta do backend, se necessário
    } catch (error) {
      console.error('Erro ao enviar a nota ao backend:', error);
    }
  };

const handleEnviarNotaPress = () => {
enviarNotaAoBackend(); //
};
  //Se o usuário quiser sair da prova antes de finalizar aparece um alerta
  useEffect(() => {
    const handleBackPress = () => {
      if (currentQuestion < questions.length) {
        Alert.alert(
          'Aviso',
          'Você está tentando sair antes de terminar a prova. Se sair, perderá seu progresso.',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Sair',
              onPress: () => {
                navigation.navigate('Home');
              },
            },
          ]
        );
        return true;
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [currentQuestion, navigation, questions.length]);

  
  const resetTimer = () => {
    setTimeRemaining(2400); // 40 minutos em segundos
  };

  //salvando o resultado no localStorage com a data do momento
  useEffect(() => {
    const saveResults = async () => {
      try {
        const currentDate = moment().format('YYYY-MM-DD');
        await AsyncStorage.setItem(
          '@quizResults',
          JSON.stringify({
            correctAnswers,
            totalQuestions: questions.length,
            date: currentDate,
          })
        );
        const nota = calcularNota(correctAnswers, questions.length)
        
      } catch (error) {
        console.error('Error saving results to AsyncStorage:', error);
      }
    };
    const calcularNota = (acertos, totalPerguntas) => {
      const nota = (acertos / totalPerguntas) * 10;
      return nota;
    };
    saveResults();
  }, [correctAnswers, questions.length]);



  const intervalRef = useRef(null);
  //inicia cronÔmetro, se acabar o tempo vai pra página de resultado e reseta o timer
  useEffect(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(intervalRef.current);
            handleTimeUp();
            return 0;
          }
        });
      }, 1000);
    }

    // Limpe o intervalo ao desmontar o componente
    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [timeRemaining]);

  //quando acaba o tempo reseta o cronômetro e vai pra página de resultado
  const handleTimeUp = () => {
    resetTimer();
    navigation.navigate('Resultado', { correctAnswers, totalQuestions: questions.length });
  };

  //função de reiniciar a prova
  const handleRestartQuiz = () => {
    AsyncStorage.removeItem('@quizTime');
    resetTimer();
  };

  //formata o tempo
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  //conta as respostas corretas e  número da pergunta atual
  const handleAnswer = (answer) => {
    if (answer.correct) {
      setCorrectAnswers(correctAnswers + 1);
    }
    if (currentQuestion + 1 >= questions.length) {
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  //Renderizando tela de resultado após prova
  const renderQuiz = () => {
    const enviarNotaAoBackend = async () => {
      try {
        const storedResults = await AsyncStorage.getItem('@quizResults');
        if (storedResults) {
          const resultsObject = JSON.parse(storedResults);
          const { correctAnswers: correctAnswersValue } = resultsObject;
    
          if (correctAnswersValue !== undefined) {
            console.log('Enviando nota ao backend:', correctAnswersValue);
    
            const token = await AsyncStorage.getItem('token');
            const headers = {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            };
    
            const response = await fetch('http://192.168.1.15:3000/prova', {
              method: 'POST',
              headers,
              body: JSON.stringify({ nota: correctAnswersValue }),
            });
    
            const responseData = await response.json();
            console.log('Resposta do backend:', responseData);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar resultados do AsyncStorage:', error);
      }
    };
    
    const handleEnviarNotaPress = () => {
      enviarNotaAoBackend();
    };
    if (currentQuestion >= questions.length) {
      return (
        <View style={styles.container}>
          <Header />
          <View style={styles.quizContainer}>
            <Text style={styles.resultText}>
              <Text style={{ fontWeight: 'bold' }}>
                {`AVALIAÇÃO FINALIZADA \n\n${correctAnswers > 12 ? 'PARABÉNS!!' : ''}`}
              </Text>
              {'\n\nVocê acertou '}
              {correctAnswers} de {questions.length} perguntas.
              {'\n\nGostaria de ir para a tela de resultados?'}
            </Text>

            <Botao
              cor={'#28a745'}
              texto={'Sim'}
              onPress={() => {
                handleEnviarNotaPress();
                handleRestartQuiz();
                navigation.navigate('resultado');
              }}
            />
            <Botao
              cor={'#dc3545'}
              texto={'Não, voltar ao menu'}
              onPress={() => {
                handleEnviarNotaPress();
                handleRestartQuiz();
                navigation.navigate('Home');
              }}
            />
          </View>
          <Footer footerStyle={{ marginTop: '50%' }} />
        </View>
      );
    }
    const currentQues = questions[currentQuestion];

    return (
      <View style={styles.container}>
        <Header />
        <ScrollView contentContainerStyle={styles.quizContainer}>
          <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
          <Text style={styles.questionCount}>{`${currentQuestion + 1}/${questions.length}`}</Text>
          <Text style={styles.questionText}>{currentQues.question}</Text>
          {currentQues.answers.map((answer) => (
            <TouchableOpacity
              key={answer.index}
              onPress={() => handleAnswer(answer)}
              style={styles.answerButton}
            >
              <Text style={styles.textoBotao}>{`${answer.index}. ${answer.option}`}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Footer />
      </View>
    );
  };
  return <View style={styles.container}>{renderQuiz()}</View>;
};


//Tela de resultados
export const ResultadoScreen = () => {
  const navigation = useNavigation();
  const [results, setResults] = useState({ correctAnswers: 0, totalQuestions: 0, date: null });
  const [recipientEmail, setRecipientEmail] = useState('');
  const [notaDoUsuario, setNotaDoUsuario] = useState('');


  // Função para enviar e-mail usando o esquema 'mailto:'
  const sendEmail = async (to, subject, body, options = {}) => {
    const { cc, bcc } = options;

    let url = `mailto:${to}`;

    const query = qs.stringify({
      subject: subject,
      body: body,
      cc: cc,
      bcc: bcc
    });

    if (query.length) {
      url += `?${query}`;
    }

    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
      throw new Error('A URL fornecida não pode ser processada.');
    }

    return Linking.openURL(url);
  };

  //manda um email com o resultado quando apertar o botão
  const handleEmailButtonPress = async () => {
    if (!recipientEmail) {
      Alert.alert('Por favor, insira um endereço de e-mail');
      return;
    }

    const emailSubject = 'Resultado da Avaliação - Sincopeças PE';
    const emailBody = `
  Prezado(a),

  Gostaríamos de informar os resultados da sua recente avaliação realizada no portal Sincopeças PE.

  Data da Avaliação: ${results.date ? moment(results.date).format('DD/MM/YYYY') : 'Data Indisponível'}
  
  Resultados:
  - Número de Perguntas Respondidas Corretamente: ${results.correctAnswers}
  - Total de Perguntas na Avaliação: ${results.totalQuestions}

  Agradecemos pela sua participação e dedicação. Caso tenha alguma dúvida ou necessite de mais informações, não hesite em nos contatar.
`;

    try {
      await sendEmail(recipientEmail, emailSubject, emailBody);
      Alert.alert('Seu e-mail foi enviado com sucesso!');
    } catch (error) {
      Alert.alert('Erro ao enviar e-mail:', error);
    }
  };

  //Pega o resultado pra mostrar na página de resultados
  useEffect(() => {
    const loadResults = async () => {
      try {
        const storedResults = await AsyncStorage.getItem('@quizResults');
        if (storedResults) {
          setResults(JSON.parse(storedResults));
        }
      } catch (error) {
        console.error('Erro ao carregar resultados do AsyncStorage:', error);
      }
    };

    loadResults();
  }, []);
  const pegarnota = async () => {
    try {
      const response = await api.get('/users/nota');
      const { nota } = response.data.nota; // Obtém a propriedade nota do objeto
      setNotaDoUsuario(nota); // Define a nota do usuário no estado
      console.log('Nota do Usuário:', nota); // Mostra no console a nota do usuário
    } catch (error) {
      console.error('Erro ao buscar a nota do usuário:', error);
    }
  };

  useEffect(() => {
    pegarnota();
  }, []);
  
  //visualização da página
  return (
    <ScrollView style={styles.container}>
      <Header />
      <Text style={styles.titulo}>RESULTADOS</Text>
      <View style={styles.card}>
        <Text style={styles.resultadoText}>Avaliação</Text>
        <Text style={styles.resultadoText}>{`Realizada em: ${results.date ? moment(results.date).format('DD/MM/YYYY') : 'Data indisponível'}`}</Text>
        <Text style={styles.resultadoText}>{`\nVocê acertou ${notaDoUsuario} de ${results.totalQuestions} perguntas.`}</Text>
      </View>
      <BotaoIcon
        iconSource={require('../assets/casa.png')}
        cor={'#1d568b'}
        texto={'Voltar ao menu'}
        onPress={() => navigation.navigate('Home')}
      />
      <Text style={styles.email}>Gostaria de receber o resultado por email?</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira o endereço de e-mail"
        value={recipientEmail}
        onChangeText={(text) => setRecipientEmail(text)}
      />
      <Botao texto="Enviar Email" cor={'#1d568b'} onPress={handleEmailButtonPress} />
      <Footer footerStyle={{ marginTop: '95%' }} />
    </ScrollView>
  );
};

//Estilo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    width: '100%',
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: '80%',
    alignSelf: 'center',
    padding: 10,
    borderColor: '#1d568b',
    borderRadius: 4,
    marginTop: 10,
  },
  email: {
    width: '80%',
    alignSelf: 'center',
    fontSize: 18,
    marginTop: 15,
  },
  quizContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  questionCount: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  questionText: {
    fontFamily: 'Roboto',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    margin: 20,
    textAlign: 'justify',
  },
  answerButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#1d568b',
    padding: 10,
    borderRadius: 5,
    alignItems: 'flex-start',
    marginTop: 10,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 10,
    textAlign: 'justify',
  },
  textoBotao: {
    color: '#1d568b',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: '30%',
    textAlign: 'center',
  },
  timerText: {
    position: 'relative',
    alignSelf: 'flex-start',
    top: 10,
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1d568b',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderColor: '#1d568b',
    borderRadius: 8,
    borderWidth: 2,
    marginBottom: 16,
    width: '80%',
    alignItems: 'center',
    elevation: 3,
    alignSelf: 'center',
  },
  resultadoText: {
    fontSize: 18,
    textAlign: 'center',
  },
  titulo: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
    fontSize: 20,
    fontFamily: 'Roboto',
  },
});

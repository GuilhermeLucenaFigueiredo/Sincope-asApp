import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CaixaTexto = ({ label, style, keyboardType, placeholder }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        keyboardType={keyboardType || 'default'}
        placeholder={placeholder || ''}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    label: {
      fontFamily: 'Roboto',
      marginTop:5,
      marginBottom: 8,
      fontWeight: 'bold',
      width: '100%',
      fontSize: 16,
    },
    input: {
      width: '100%',
      height: 45,
      padding: 10,
      marginBottom: 20,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
    },
    submitButton: {
      backgroundColor: '#5aa52d',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    submitButtonText: {
      color: '#fff',
      fontFamily: 'Roboto',
    },
  });
  
  export default CaixaTexto;
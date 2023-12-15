import React from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomButton = ({ onPress, source, label }) => (
  <TouchableOpacity onPress={onPress} style={{ alignItems: 'center' } }>
    <Image source={source} style={{ width: 42, height: 42, resizeMode: 'contain', marginTop:'50%'}} />
    <Text>{label}</Text>
  </TouchableOpacity>
);

const MenuInferior = ({ Image1, Image2, onPress1, onPress2 }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <CustomButton
        onPress={onPress1 || (() => navigation.navigate('resultado'))}
        source={Image1}
      />

      <CustomButton
        onPress={onPress2 || (() => navigation.navigate('aprendaMais'))}
        source={Image2}
      />
    </View>
  );
};

export default MenuInferior;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    height: 60, 
    backgroundColor: '#fff', 
    width:'100%', 
    elevation: 20,
    shadowColor: '#000',  
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, 
    shadowRadius: 4, 
  },
})

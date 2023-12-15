import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={Headerstyles.container}>
      <Image
        source={require('../assets/logo.jpg')}
        style={ Headerstyles.logoImage}
        resizeMode="contain"
      />
    </View>
  );
};

export default Header;

const Headerstyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: 90,
    padding: 5,
    marginBottom: 10,
    elevation: 20, 
    shadowColor: '#000',  
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, 
    shadowRadius: 4, 
  },
  logoImage: {
    display: 'flex',
    height: '120%',
    width: '60%',
    maxWidth: '100%',
    alignSelf: 'center',
    marginBottom: 10,
  },
});


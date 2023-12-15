import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const ImgBlock = ({ imageSource, containerStyle, text }) => {

  return (
    <View style={[styles.container, containerStyle]}>
         <Image
        source={imageSource}
        style={styles.Image}
        resizeMode="cover"
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default ImgBlock;

const styles = StyleSheet.create({
  container: {
  display: 'flex',
  width: '60%',
  height: '32%',
  alignSelf: 'center',
  padding: 30,

  },
  Image: {
    height: '100%',
    maxWidth: '100%',
    padding: 80,
  },
  text: {
    fontSize: 22,
    color: 'black',
    fontWeight:'bold',
    alignSelf: 'center'
  }
});
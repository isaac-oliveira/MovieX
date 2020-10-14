import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import MaskedView from '@react-native-community/masked-view';

import star from '../assets/star.png';

const { width, height } = Dimensions.get('window');

const WIDTH = width * 0.28;
const HEIGHT = height * 0.04;

const Rating = ({ vote }) => {
  const x = (WIDTH * vote) / 10;

  const maskElement = (
    <View style={styles.maskedElement}>
      <Image source={star} />
      <Image source={star} />
      <Image source={star} />
      <Image source={star} />
      <Image source={star} />
    </View>
  );
  return (
    <View style={styles.container}>
      <MaskedView style={styles.maskedContainer} maskElement={maskElement}>
        <View style={[styles.masked, { width: x }]} />
      </MaskedView>
      <Text style={styles.vote}>{vote}/10</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  maskedContainer: {
    height: HEIGHT,
    width: WIDTH,
    alignSelf: 'center',
  },
  maskedElement: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  masked: {
    height: HEIGHT,
    backgroundColor: '#E26D00',
  },
  vote: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Rating;

import React from 'react';
import { View, Dimensions, StyleSheet, Animated } from 'react-native';

import apiConfig from '../configs/apiConfig';

const { width, height } = Dimensions.get('screen');

const Backdrop = ({ movies = [], scrollX }) => {
  return (
    <View style={styles.container}>
      {movies.map((item, index) => {
        const inputRange = [
          (index - 1) * width * 0.45,
          index * width * 0.45,
          (index + 1) * width * 0.45,
        ];
        const outputRange = [0, 1, 0];

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange,
        });
        return (
          <Animated.Image
            key={String(item.id)}
            blurRadius={1}
            style={[styles.image, { opacity }]}
            source={{ uri: apiConfig.imageURL + item.backdrop_path }}
          />
        );
      })}
      <View style={styles.shadow} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  image: {
    position: 'absolute',
    width,
    height,
  },
  shadow: {
    position: 'absolute',
    width,
    height,
    backgroundColor: 'rgba(0, 0,0, .4)',
  },
});

export default Backdrop;

import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';

import { getPopular } from '../services/api';
import apiConfig from '../configs/apiConfig';
import Backdrop from '../components/Backdrop';
import { AppLoading } from 'expo';

const { width, height } = Dimensions.get('screen');

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity,
);

export default function MovieList() {
  const [loading, setLoading] = useState(true);
  const [popular, setPopular] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    getPopular().then((results) => {
      setPopular(results);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <AppLoading />;
  }

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * width * 0.45,
      index * width * 0.45,
      (index + 1) * width * 0.45,
    ];

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [0, -width * 0.2, 0],
    });
    const opacity = scrollX.interpolate({ inputRange, outputRange: [0, 1, 0] });

    const goMovieDetails = () => {
      navigation.navigate('MovieDetails', { item });
    };

    return (
      <View style={styles.card}>
        <AnimatedTouchableOpacity
          style={[
            styles.icon,
            {
              transform: [
                {
                  translateY,
                },
              ],
            },
          ]}
          delayPressIn={0}
          activeOpacity={0.7}
          onPress={goMovieDetails}
        >
          <SharedElement id={`item.${item.id}.photo`}>
            <Image
              style={styles.icon}
              source={{ uri: apiConfig.imageURL + item.poster_path }}
              resizeMode="cover"
            />
          </SharedElement>
        </AnimatedTouchableOpacity>
        <Animated.Text
          style={[
            styles.title,
            {
              opacity,
            },
          ]}
          numberOfLines={1}
        >
          {item.title}
        </Animated.Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Backdrop movies={popular} scrollX={scrollX} />
      <Animated.FlatList
        style={styles.list}
        contentContainerStyle={{
          paddingHorizontal: (width - width * 0.45) / 2,
        }}
        data={popular}
        horizontal
        snapToInterval={width * 0.45}
        bounces={false}
        decelerationRate={0}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { x: scrollX } },
            },
          ],
          { useNativeDriver: true },
        )}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
      />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width,
    height,
  },
  list: {
    position: 'absolute',
    bottom: 10,
  },
  card: {
    padding: 10,
    width: width * 0.45,
    height: width * 0.9,
    justifyContent: 'flex-end',
  },
  icon: {
    width: width * 0.4,
    height: width * 0.65,
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 10,
    zIndex: 3,
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    width: width * 0.35,
    height: width * 0.2,
    paddingTop: 10,
  },
});

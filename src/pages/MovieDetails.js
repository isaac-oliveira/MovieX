import React, { useRef } from 'react';
import { Image, Text, View, Dimensions, StyleSheet } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { useRoute } from '@react-navigation/native';
import Animated from 'react-native-reanimated';

import apiConfig from '../configs/apiConfig';
import GenreList from '../components/GenreList';
import Rating from '../components/Rating';

const { height, width } = Dimensions.get('window');

const HEADER_HEIGTH_EXPANDED = height * 0.4;
const HEADER_HEIGTH_COLLAPSED = height * 0.13;

const MovieDetails = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const route = useRoute();

  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        style={styles.scrollView}
        nestedScrollEnabled={true}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.overview}>
            {item.overview || 'Nenhuma sinopse encontrada'}
          </Text>
          <Text style={styles.release_date}>
            <Text style={styles.release_date_label}>Lançamento: </Text>
            {item.release_date.split('-').reverse().join('/')}
          </Text>
          <GenreList data={item.genres} />
          <Rating vote={item.vote_average} />
        </View>
      </Animated.ScrollView>
      <Animated.View
        style={[
          styles.header,
          {
            height: scrollY.interpolate({
              inputRange: [0, HEADER_HEIGTH_EXPANDED - HEADER_HEIGTH_COLLAPSED],
              outputRange: [HEADER_HEIGTH_EXPANDED, HEADER_HEIGTH_COLLAPSED],
              extrapolate: 'clamp',
            }),
          },
        ]}
      >
        <SharedElement id={`item.${item.id}.photo`}>
          <Image
            style={styles.header}
            source={{ uri: apiConfig.imageURL + item.poster_path }}
            resizeMode="cover"
          />
        </SharedElement>
        <Animated.View
          style={[
            styles.headerShadow,
            {
              opacity: scrollY.interpolate({
                inputRange: [
                  0,
                  HEADER_HEIGTH_EXPANDED - HEADER_HEIGTH_COLLAPSED,
                ],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              }),
            },
          ]}
        />
        <Animated.Text
          style={[
            styles.headerTitle,
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [
                      HEADER_HEIGTH_EXPANDED - HEADER_HEIGTH_COLLAPSED,
                      HEADER_HEIGTH_EXPANDED - HEADER_HEIGTH_COLLAPSED + 60,
                    ],
                    outputRange: [60, 0],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
          numberOfLines={1}
        >
          {item.title}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width,
  },
  scrollViewContent: {
    paddingTop: HEADER_HEIGTH_EXPANDED,
  },
  content: {
    minHeight: height,
    backgroundColor: '#fff',
  },
  header: {
    height: HEADER_HEIGTH_EXPANDED,
    width,
    overflow: 'hidden',
  },
  headerShadow: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },
  headerTitle: {
    height: 60,
    width: width * 0.6,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
    letterSpacing: 2,
    color: '#fff',
    position: 'absolute',
    bottom: 0,
  },
  title: {
    minHeight: 60,
    width: width * 0.8,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
    letterSpacing: 2,
  },
  overview: {
    fontSize: 20,
    textAlign: 'justify',
    alignSelf: 'center',
    paddingTop: 10,
    lineHeight: 36,
    letterSpacing: 1,
    marginHorizontal: 30,
  },
  release_date: {
    paddingTop: 20,
    alignSelf: 'center',
    fontSize: 20,
  },
  release_date_label: {
    fontWeight: 'bold',
  },
});

export default MovieDetails;

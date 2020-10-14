import { Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

const imgWidth = width - (width % 100);

const apiConfig = {
  baseURL: 'https://api.themoviedb.org/3',
  imageURL: `http://image.tmdb.org/t/p/w${imgWidth}`,
  apiKey: 'be7e03e3e290c817f26dc947fa2ec892',
  lang: 'pt-BR',
};

export default apiConfig;

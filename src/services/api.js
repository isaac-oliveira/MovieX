import { create } from 'apisauce';

import apiConfig from '../configs/apiConfig';

const api = create({
  baseURL: apiConfig.baseURL,
});

api.addAsyncRequestTransform(async (request) => {
  request.url = `${request.url}&api_key=${apiConfig.apiKey}&language=${apiConfig.lang}`;
});

const getGenres = async (page = 1) => {
  const response = await api.get(`/genre/movie/list?page=${page}`);

  return response.data.genres;
};

export const getPopular = async (page = 1) => {
  const genreResults = await getGenres();
  const response = await api.get(`/movie/popular?page=${page}`);

  const serializedGenres = response.data.results.map((item) => {
    const { genre_ids, ...rest } = item;

    const genres = genre_ids.map((genreId) => {
      const { id, name } = genreResults.find((genre) => genre.id === genreId);

      return {
        id,
        name,
      };
    });

    return {
      ...rest,
      genres,
    };
  });

  return serializedGenres;
};

export default api;

import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import MovieList from '../pages/MovieList';
import MovieDetails from '../pages/MovieDetails';

const { Navigator, Screen } = createSharedElementStackNavigator();

const StackRouter = () => {
  return (
    <Navigator initialRouteName="MovieList" headerMode="none">
      <Screen name="MovieList" component={MovieList} />
      <Screen
        name="MovieDetails"
        component={MovieDetails}
        options={{
          cardStyle: {
            backgroundColor: 'transparent',
          },
        }}
        sharedElementsConfig={(route) => {
          const { item } = route.params;

          return [`item.${item.id}.photo`, `item.${item.id}.title`];
        }}
      />
    </Navigator>
  );
};

export default StackRouter;

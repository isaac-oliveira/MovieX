import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const GenreList = ({ data }) => {
  const renderItem = (item) => {
    return (
      <Text key={String(item.id)} style={styles.item}>
        {item.name}
      </Text>
    );
  };
  return <View style={styles.content}>{data.map(renderItem)}</View>;
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '55%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 20,
  },
  item: {
    fontSize: 16,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#000',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginVertical: 10,
  },
});

export default GenreList;

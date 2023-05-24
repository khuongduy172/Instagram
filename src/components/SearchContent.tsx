import React from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const searchData = [
  {
    id: 0,
    images: [
      require('../constants/storage/images/h1.jpg'),
      require('../constants/storage/images/h2.jpg'),
      require('../constants/storage/images/h3.jpg'),
      require('../constants/storage/images/h4.jpg'),
      require('../constants/storage/images/h5.jpg'),
      require('../constants/storage/images/h6.jpg'),
    ],
  },
  {
    id: 1,
    images: [
      require('../constants/storage/images/h7.jpg'),
      require('../constants/storage/images/h8.jpg'),
      require('../constants/storage/images/h9.jpg'),
      require('../constants/storage/images/h10.jpg'),
      require('../constants/storage/images/h11.jpg'),
      require('../constants/storage/images/h12.jpg'),
    ],
  },
  {
    id: 2,
    images: [
      require('../constants/storage/images/h12.jpg'),
      require('../constants/storage/images/h13.jpg'),
      require('../constants/storage/images/h14.jpg'),
      require('../constants/storage/images/h15.jpg'),
    ],
  },
  {
    id: 3,
    images: [
      require('../constants/storage/images/h1.jpg'),
      require('../constants/storage/images/h2.jpg'),
      require('../constants/storage/images/h3.jpg'),
      require('../constants/storage/images/h4.jpg'),
      require('../constants/storage/images/h5.jpg'),
      require('../constants/storage/images/h6.jpg'),
    ],
  },
  {
    id: 4,
    images: [
      require('../constants/storage/images/h7.jpg'),
      require('../constants/storage/images/h8.jpg'),
      require('../constants/storage/images/h9.jpg'),
      require('../constants/storage/images/h10.jpg'),
      require('../constants/storage/images/h11.jpg'),
      require('../constants/storage/images/h12.jpg'),
    ],
  },
  {
    id: 5,
    images: [
      require('../constants/storage/images/h12.jpg'),
      require('../constants/storage/images/h13.jpg'),
      require('../constants/storage/images/h14.jpg'),
      require('../constants/storage/images/h15.jpg'),
    ],
  },
];

const Item = ({ item, data }) => {
  // Determine the alignment based on the item's index
  const alignRight = item.id % 2 === 0;

  return (
    <View style={styles.itemContainer}>
      {/* Render 4 images on the left */}
      {!alignRight && (
        <>
          <View style={styles.rightImageContainer2}>
            <TouchableOpacity
              onLongPress={() => data(item.images[item.images.length - 1])}
              onPressOut={() => data(null)}>
              <Image
                source={item.images[item.images.length - 1]}
                style={styles.bigImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.leftImagesContainer}>
            {item.images.slice(0, 4).map((image, index) => (
              <TouchableOpacity
                key={index}
                style={styles.touchableImage}
                onLongPress={() => data(image)}
                onPressOut={() => data(null)}>
                <View style={styles.imageContainer}>
                  <Image source={image} style={styles.smallImage} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {/* For even indices, render 4 images on the right */}
      {alignRight && (
        <>
          {/* Render 1 big image covering two rows on the right */}
          <View style={styles.leftImagesContainer}>
            {item.images.slice(0, 4).map((image, index) => (
              <TouchableOpacity
                key={index}
                style={styles.touchableImage}
                onLongPress={() => data(image)}
                onPressOut={() => data(null)}>
                <View style={styles.imageContainer}>
                  <Image source={image} style={styles.smallImage} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
          {/* Render 1 big image covering two rows on the right */}
          <View style={styles.rightImageContainer}>
            <TouchableOpacity
              onLongPress={() => data(item.images[item.images.length - 1])}
              onPressOut={() => data(null)}>
              <Image
                source={item.images[item.images.length - 1]}
                style={styles.bigImage}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const SearchContent = props => {
  return (
    <View style={styles.container}>
      <FlatList
        data={searchData}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Item item={item} data={props.data} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  imageContainer: {
    flex: 1,
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  alignLeft: {
    alignItems: 'flex-start',
  },

  itemContainer: {
    flexDirection: 'row',
  },
  rightImageContainer: {
    flex: 2,
  },
  rightImageContainer2: {
    flex: 2,
    marginRight: 2,
  },
  rightImagesContainer: {
    flex: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  bigImage: {
    width: '100%',
    height: 240,
  },
  leftImagesContainer: {
    flex: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  smallImage: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
  },
  touchableImage: {
    width: '49%',
    aspectRatio: 1,
    marginRight: 2,
    marginBottom: 5,
  },
});

export default SearchContent;

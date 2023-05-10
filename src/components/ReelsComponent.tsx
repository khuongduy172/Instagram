import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { videoData } from '../constants/Video';
import SingleReel from './SingleReel';

const ReelsComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChangeIndexValue = ({ index }) => {
    setCurrentIndex(index);
  };
  return (
    <SwiperFlatList
      data={videoData}
      onChangeIndex={handleChangeIndexValue}
      vertical={true}
      renderItem={({ item, index }) => (
        <SingleReel
          item={item}
          index={index}
          currentIndex={currentIndex}
          key={index}
        />
      )}
      decelerationRate={'normal'}
      keyExtractor={(item, index) => index}
    />
  );
};

export default ReelsComponent;

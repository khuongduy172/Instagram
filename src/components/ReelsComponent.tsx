import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { videoData } from '../constants/Video';
import SingleReel from './SingleReel';
import { getReels } from '../apis/reelApi';
import { useQuery } from 'react-query';

const ReelsComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChangeIndexValue = ({ index }) => {
    setCurrentIndex(index);
  };

  const { data: ReelData, isLoading, isError } = useQuery('reels', getReels);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (isError) {
    return <Text>Error</Text>;
  }

  return (
    <SwiperFlatList
      data={ReelData}
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
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default ReelsComponent;

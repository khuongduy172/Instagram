import { Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import SingleReel from './SingleReel';
import { getReels } from '../apis/reelApi';
import { useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';

const ReelsComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChangeIndexValue = ({ index }) => {
    setCurrentIndex(index);
  };

  const [reelsData, setReelsData] = useState([]);

  const { data: ReelData, isLoading, isError } = useQuery('reels', getReels);

  useEffect(() => {
    if (ReelData) {
      setReelsData(ReelData);

      // Store the reels data in AsyncStorage
      console.log('ReelData', ReelData);

      ReelData.forEach(async reel => {
        try {
          const videoFileName = reel.id.toString() + '.mp4';
          const videoPath = `${RNFS.DocumentDirectoryPath}/${videoFileName}`;

          // Check if the video file already exists in the cache
          const fileExists = await RNFS.exists(videoPath);
          if (!fileExists) {
            // Video file does not exist, download and save it
            await RNFS.downloadFile({
              fromUrl: reel.url,
              toFile: videoPath,
            }).promise;
          }

          reel.localUrl = videoPath;
          console.log('reel', reel);
        } catch (error) {
          console.error('Error downloading video:', error);
        }
      });
    }
  }, [ReelData]);

  console.log('afterChange', ReelData);

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
          videoUrl={'file://' + item.localUrl}
        />
      )}
      decelerationRate={'normal'}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default ReelsComponent;

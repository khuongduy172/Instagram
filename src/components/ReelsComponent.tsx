import { Text, RefreshControl, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import SingleReel from './SingleReel';
import { getReels } from '../apis/reelApi';
import { useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import useCustomTheme from '../theme/CustomTheme';

const ReelsComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useCustomTheme();

  const handleChangeIndexValue = ({ index }) => {
    setCurrentIndex(index);
  };

  const [ReelData, setReelsData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    await getReels()
      .then(response => {
        setReelsData(response);
        setRefreshing(false);
      })
      .catch(error => {
        console.error(error);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchData().catch(error => console.error(error));
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setReelsData([]);
    fetchData().catch(error => console.error(error));
  };

  const [loading, setLoading] = useState(false);

  const fetchMoreData = async () => {
    if (!loading) {
      setLoading(true);
      await getReels()
        .then(response => {
          setReelsData(prevData => [...prevData, ...response]);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    }
  };

  const renderSpinner = () => {
    return <ActivityIndicator size="large" color="white" />;
  };

  //   if (ReelData && ReelData.length > 0) {
  //     // Store the reels data in AsyncStorage
  //     console.log('ReelData', ReelData);

  //     const downloadPromises = ReelData.map(async reel => {
  //       try {
  //         const videoFileName = reel.id.toString() + '.mp4';
  //         const videoPath = `${RNFS.DocumentDirectoryPath}/${videoFileName}`;

  //         // Check if the video file already exists in the cache
  //         const fileExists = await RNFS.exists(videoPath);
  //         if (!fileExists) {
  //           // Video file does not exist, download and save it
  //           await RNFS.downloadFile({
  //             fromUrl: reel.url,
  //             toFile: videoPath,
  //           }).promise;
  //         }

  //         reel.localUrl = videoPath;
  //       } catch (error) {
  //         console.error('Error downloading video:', error);
  //       }
  //     });

  //     Promise.all(downloadPromises).then(() => {
  //       setReelsData([...ReelData]);
  //     });
  //   }
  // }, [ReelData]);

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
          key={item.id.toString() + '-' + index}
        />
      )}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={['#000']}
          progressBackgroundColor="#ffffff"
        />
      }
      ListFooterComponent={loading ? renderSpinner : null}
      onEndReached={fetchMoreData}
      onEndReachedThreshold={0}
      decelerationRate={'normal'}
      keyExtractor={(item, index) => item.id.toString() + index.toString()}
    />
  );
};

export default ReelsComponent;

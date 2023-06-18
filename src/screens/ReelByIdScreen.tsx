import { Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { ReelByIdProps } from '../navigation/RootNavigationProps';
import SwiperFlatList from 'react-native-swiper-flatlist';
import SingleReel from '../components/SingleReel';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useCustomTheme from '../theme/CustomTheme';
import { useQuery } from 'react-query';
import { getUserReels } from '../apis/reelApi';

const ReelByIdScreen = ({ route, navigation }: ReelByIdProps) => {
  const { reel } = route.params;
  const theme = useCustomTheme();
  const { data, isLoading } = useQuery(`user-reel-${reel.ownerId}`, () =>
    getUserReels(reel.ownerId),
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const playerRef: any = useRef();
  const handleChangeIndexValue = ({ index }: any) => {
    setCurrentIndex(index);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      playerRef?.current?.pauseVideo();
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 10,
          position: 'absolute',
          width: '100%',
          top: 0,
          left: 0,
          zIndex: 1,
          backgroundColor: '#000',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color={theme.backButton} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.text,
            paddingHorizontal: 30,
          }}>
          Reel
        </Text>
      </View>
      {isLoading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        <SwiperFlatList
          data={data}
          onChangeIndex={handleChangeIndexValue}
          vertical={true}
          renderItem={({ item, index }) => (
            <SingleReel
              playerRef={playerRef}
              item={item}
              index={index}
              currentIndex={currentIndex}
              key={item.id.toString() + '-' + index}
            />
          )}
          decelerationRate={'normal'}
          keyExtractor={(item, index) => item.id.toString() + index.toString()}
        />
      )}
    </View>
  );
};

export default ReelByIdScreen;

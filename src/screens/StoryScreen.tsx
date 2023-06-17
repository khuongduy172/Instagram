import {
  View,
  Text,
  Dimensions,
  Image,
  Animated,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useRef } from 'react';
import useCustomTheme from '../theme/CustomTheme';
import Feather from 'react-native-vector-icons/Feather';
import Avatar from '../components/Avatar';
import moment from 'moment-timezone';
import {
  GestureHandlerRootView,
  LongPressGestureHandler,
  State,
} from 'react-native-gesture-handler';

const StoryScreen = ({ route, navigation }: any) => {
  const { data, storyList } = route.params;
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [current, setCurrent] = useState(data);

  const theme = useCustomTheme();

  const progress = useRef(new Animated.Value(0)).current;
  const start = () => {
    Animated.timing(progress, {
      toValue: (width - 30) / current.stories.length,
      duration: 3000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        next();
      }
    });
  };

  const next = () => {
    if (currentIndex < current.stories.length - 1) {
      progress.setValue(0);
      setCurrentIndex(currentIndex + 1);
    } else {
      if (storyList.length > 1) {
        const nextIndex = storyList.findIndex(
          (item: any) => item.user_id === current.user_id,
        );
        if (nextIndex !== -1 && nextIndex < storyList.length - 1) {
          setCurrent(storyList[nextIndex + 1]);
          setCurrentIndex(0);
          progress.setValue(0);
        } else {
          navigation.goBack();
        }
      } else {
        navigation.goBack();
      }
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      if (currentIndex == 0) {
        if (storyList.length > 1) {
          const nextIndex = storyList.findIndex(
            (item: any) => item.user_id === current.user_id,
          );
          if (nextIndex !== -1 && nextIndex > 0) {
            setCurrent(storyList[nextIndex - 1]);
            setCurrentIndex(0);
            progress.setValue(0);
          } else {
            navigation.goBack();
          }
        } else {
          navigation.goBack();
        }
      }
    }
  };

  const onLongPress = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      progress.stopAnimation();
    }
  };

  return (
    <GestureHandlerRootView>
      <View
        style={{
          backgroundColor: theme.storyBackground,
          width: '100%',
          height: '100%',
          position: 'relative',
        }}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <View style={{ flexDirection: 'row', width: '100%' }}>
          {current.stories.map((item: any, index: number) => (
            <View
              key={item.story_id}
              style={{
                height: 2,
                backgroundColor: '#bbbbbb',
                flex: 1,
                top: 10,
                marginHorizontal: 4,
              }}>
              {currentIndex === index && (
                <Animated.Text
                  style={{
                    backgroundColor: 'white',
                    width: progress,
                  }}></Animated.Text>
              )}
            </View>
          ))}
        </View>

        <View
          style={{
            padding: 15,
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            top: 8,
            left: 0,
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderRadius: 100,
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Avatar
                uri={current.user_image}
                disabled={true}
                style={{
                  borderRadius: 100,
                  backgroundColor: 'orange',
                  resizeMode: 'cover',
                  width: 30,
                  height: 30,
                }}
              />
            </View>
            <Text
              style={{
                color: 'white',
                paddingHorizontal: 10,
                fontWeight: 'bold',
              }}>
              {current.user_name}
            </Text>
            <Text style={{ color: '#fafafa' }}>
              {moment
                .utc(current.stories[currentIndex].createdAt)
                .tz('Asia/Ho_Chi_Minh')
                .fromNow()}
            </Text>
          </View>
          <Feather name="more-vertical" color="white" size={20} />
        </View>
        <LongPressGestureHandler
          onHandlerStateChange={onLongPress}
          onEnded={() => {
            start();
          }}
          minDurationMs={10}>
          <Image
            source={{ uri: current.stories[currentIndex].story_image }}
            onLoadEnd={() => {
              progress.setValue(0);
              start();
            }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: -1,
            }}
          />
        </LongPressGestureHandler>
        <TouchableOpacity
          onPress={prev}
          style={{
            position: 'absolute',
            width: width / 2,
            height: height * 0.9,
            bottom: 0,
          }}></TouchableOpacity>
        <TouchableOpacity
          onPress={next}
          style={{
            position: 'absolute',
            width: width / 2,
            height: height * 0.9,
            bottom: 0,
            right: 0,
          }}></TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

export default StoryScreen;

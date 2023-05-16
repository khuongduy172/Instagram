import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, { useState, useRef, useCallback } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import useCustomTheme from '../theme/CustomTheme';
import moment from 'moment';
import { useQuery } from 'react-query';
import { getStatus } from '../apis/postApi';
import { useFocusEffect } from '@react-navigation/native';
import PostLoader from './loader/posts';
import PaginationDot from 'react-native-animated-pagination-dot';
import {
  TapGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

export const useRefetchOnFocus = (refetch: () => void) => {
  useFocusEffect(() => {
    refetch();
  });
};

const AnimatedImage = Animated.createAnimatedComponent(Image);

const PostInterface = () => {
  const theme = useCustomTheme();
  const width = Dimensions.get('window').width;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const onViewableItemsChanged = useRef((item: any) => {
    const index = item.viewableItems[0].index;
    setCurrentSlideIndex(index);
  });

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });
  const [like, setLike] = useState(false);

  const doubleTapRef = useRef();
  const scale = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value, 0) }],
  }));

  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, isFinished => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
    setLike(prevState => !prevState);
  }, []);

  const { data, isLoading, error, refetch } = useQuery('getPosts', getStatus);

  useRefetchOnFocus(refetch);
  if (isLoading) {
    return <PostLoader />;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <>
      {data.data.map((newData, key) => {
        return (
          <View
            key={key}
            style={{
              paddingBottom: 10,
              borderBottomColor: 'gray',
              borderBottomWidth: 0.1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={{ uri: newData.owner.avatar }}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 100,
                  }}
                />
                <View style={{ paddingLeft: 5 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: theme.text,
                      paddingLeft: 7,
                    }}>
                    {newData.owner.username}
                  </Text>
                </View>
              </View>
              <Feather
                name="more-vertical"
                style={{ fontSize: 20 }}
                color={theme.text}
              />
            </View>
            <View
              style={{
                position: 'relative',
              }}>
              {newData.statusImages.length > 1 && (
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderRadius: 20,
                    backgroundColor: 'rgba(52, 52, 52, 0.8)',
                    position: 'absolute',
                    zIndex: 10,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    right: 0,
                    margin: 15,
                  }}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    {currentSlideIndex + 1}/{newData.statusImages.length}
                  </Text>
                </View>
              )}

              <FlatList
                data={newData.statusImages}
                horizontal
                pagingEnabled
                keyExtractor={item => item.name}
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={viewabilityConfig.current}
                renderItem={({ item, index }) => {
                  return (
                    <GestureHandlerRootView>
                      <TapGestureHandler
                        maxDelayMs={250}
                        ref={doubleTapRef}
                        numberOfTaps={2}
                        onActivated={onDoubleTap}>
                        <Animated.View>
                          <ImageBackground
                            source={{ uri: item.url }}
                            style={{
                              width: width,
                              height: 400,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <AnimatedImage
                              source={require('../assets/images/heart.png')}
                              resizeMode="center"
                              style={[
                                {
                                  width: width,
                                  height: 80,
                                  shadowOffset: { width: 0, height: 20 },
                                  shadowOpacity: 0.3,
                                  shadowRadius: 35,
                                },
                                rStyle,
                              ]}
                            />
                          </ImageBackground>
                        </Animated.View>
                      </TapGestureHandler>
                    </GestureHandlerRootView>
                  );
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingTop: 15,
                paddingBottom: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => setLike(!like)}>
                  <AntDesign
                    name={like ? 'heart' : 'hearto'}
                    style={{
                      fontSize: 20,
                      color: like ? 'red' : theme.text,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingHorizontal: 20 }}>
                  <Ionic
                    name="ios-chatbubble-outline"
                    style={{
                      fontSize: 20,
                    }}
                    color={theme.text}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingRight: 50 }}>
                  <Feather
                    name="send"
                    style={{
                      fontSize: 20,
                    }}
                    color={theme.text}
                  />
                </TouchableOpacity>
                {newData.statusImages.length > 1 && (
                  <PaginationDot
                    activeDotColor={'#1891f6'}
                    curPage={currentSlideIndex}
                    maxPage={newData.statusImages.length}
                  />
                )}
              </View>
              <FontAwesome name="bookmark-o" size={20} color={theme.text} />
            </View>
            <View style={{ paddingHorizontal: 15 }}>
              <Text style={{ color: theme.text, fontWeight: 'bold' }}>
                Liked by {like ? 'you and ' : ''}
                {like ? newData.isReacted : !newData.isReacted}12.136 others
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: theme.text,
                  }}>
                  {newData.owner.username}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    paddingVertical: 2,
                    color: theme.text,
                    paddingLeft: 5,
                  }}>
                  {newData.content}
                </Text>
              </View>
              <Text style={{ opacity: 0.4, paddingVertical: 2 }}>
                View all comments
              </Text>
              <View></View>
              <Text style={{ fontSize: 10 }}>
                {moment(newData.createdAt).fromNow()}
              </Text>
            </View>
          </View>
        );
      })}
    </>
  );
};

export default PostInterface;
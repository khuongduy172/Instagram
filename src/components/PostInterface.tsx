import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useRef, useCallback } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import useCustomTheme from '../theme/CustomTheme';
import moment from 'moment-timezone';
import { useMutation } from 'react-query';
import { getStatus, deleteStatus } from '../apis/postApi';
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
import { viewStatus } from '../apis/postApi';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { postReact } from '../apis/reactApi';
import ShareIcon from '../assets/images/instagram-share-icon.svg';
import Avatar from './Avatar';

export const useRefetchOnFocus = (refetch: () => void) => {
  useFocusEffect(() => {
    refetch();
  });
};

const AnimatedImage = Animated.createAnimatedComponent(Image);

const PostInterface = ({ data, isLoading, renderSpinner, loading }) => {
  const theme = useCustomTheme();
  const width = Dimensions.get('window').width;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const onViewableItemsChanged = useRef((item: any) => {
    const index = item.viewableItems[0].index;
    setCurrentSlideIndex(index);
  });

  const previousViewedItems = useRef([]);
  const processedIds = useRef([]);

  const _onViewableItemsChanged = useRef(({ viewableItems }) => {
    const newViewedItems = viewableItems.filter(
      item => !previousViewedItems.current.includes(item.item.id),
    );

    newViewedItems.forEach(item => {
      const id = item.item.id;
      if (!processedIds.current.includes(id)) {
        viewStatus(id);
        processedIds.current.push(id);
      }
    });

    previousViewedItems.current = viewableItems.map(item => item.item.id);
  });

  const _viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 60,
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
    postReact(data[currentSlideIndex].id);
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const navigation: any = useNavigation();

  const { mutate, isLoading: deleteReelLoading } = useMutation(deleteStatus, {
    onSuccess: data => {
      if (data) {
        ToastAndroid.show('Deleted successfully', ToastAndroid.SHORT);
        navigation.navigate('Home');
      } else {
        ToastAndroid.show('Deleted failed', ToastAndroid.SHORT);
      }
    },
  });

  // useRefetchOnFocus(refetch);
  if (isLoading) {
    return <PostLoader />;
  }

  return (
    <>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={_onViewableItemsChanged.current}
        keyExtractor={(item, index) => index.toString()}
        viewabilityConfig={_viewabilityConfig.current}
        ListFooterComponent={loading ? renderSpinner : null}
        renderItem={({ item }) => (
          <View
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
                <Avatar
                  uri={item.owner.avatar}
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
                    {item.owner.username}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={toggleModal}>
                <Feather
                  name="more-vertical"
                  style={{ fontSize: 20 }}
                  color={theme.text}
                />
              </TouchableOpacity>

              <Modal
                isVisible={isModalVisible}
                swipeDirection="down"
                onSwipeComplete={toggleModal}
                useNativeDriver={true}
                style={{
                  justifyContent: 'flex-end',
                  marginTop: 380,
                  marginBottom: 0,
                  marginHorizontal: 0,
                  backgroundColor: theme.backgroundColor,
                }}>
                <TouchableOpacity
                  onPressOut={toggleModal}
                  activeOpacity={1}
                  style={{ height: '150%' }}>
                  <View
                    style={{
                      height: '72%',
                      marginTop: 'auto',
                      backgroundColor: theme.background,
                      borderTopLeftRadius: 15,
                      borderTopRightRadius: 15,
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 30,
                        height: 5,
                        borderRadius: 20,
                        backgroundColor: theme.textSecond,
                        alignSelf: 'center',
                        marginTop: 5,
                      }}></View>
                    <View
                      style={{
                        paddingHorizontal: 20,
                        paddingTop: 15,
                        paddingBottom: 10,
                      }}>
                      <TouchableOpacity>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 20,
                            justifyContent: 'space-between',
                            marginHorizontal: 50,
                          }}>
                          <View
                            style={{
                              flexDirection: 'column',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                width: 60,
                                height: 60,
                                borderWidth: 1,
                                borderRadius: 100,
                                borderColor: theme.text,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Feather
                                name="bookmark"
                                color={theme.text}
                                size={25}
                              />
                            </View>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                color: theme.text,
                                marginTop: 10,
                              }}>
                              Save
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'column',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                width: 60,
                                height: 60,
                                borderWidth: 1,
                                borderRadius: 100,
                                borderColor: theme.text,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Feather
                                name="rotate-ccw"
                                color={theme.text}
                                size={25}
                              />
                            </View>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                color: theme.text,
                                marginTop: 10,
                              }}>
                              Remix
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#efefef',
                        marginVertical: 3,
                      }}></View>
                    <TouchableOpacity
                      style={{
                        paddingTop: 20,
                        paddingHorizontal: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <FontAwesome
                        name="eye-slash"
                        size={30}
                        color={theme.text}
                      />
                      <Text
                        style={{
                          color: theme.text,
                          marginLeft: 15,
                          fontSize: 17,
                        }}>
                        Not interested
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        padding: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        mutate(item.id);
                        toggleModal();
                      }}>
                      <MaterialCommunityIcons
                        name="delete-alert-outline"
                        size={30}
                        color="#b03347"
                      />
                      <Text
                        style={{
                          color: '#b03347',
                          marginLeft: 15,
                          fontSize: 17,
                        }}>
                        Delete...
                      </Text>
                    </TouchableOpacity>

                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#efefef',
                        marginVertical: 3,
                      }}></View>
                    <TouchableOpacity
                      style={{
                        padding: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <MaterialCommunityIcons
                        name="drag-horizontal-variant"
                        size={30}
                        color={theme.text}
                      />
                      <Text
                        style={{
                          color: theme.text,
                          marginLeft: 15,
                          fontSize: 17,
                        }}>
                        Manage suggested content
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>
            <View
              style={{
                position: 'relative',
              }}>
              {item.statusImages.length > 1 && (
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
                    {currentSlideIndex + 1}/{item.statusImages.length}
                  </Text>
                </View>
              )}

              <FlatList
                data={item.statusImages}
                horizontal
                pagingEnabled
                keyExtractor={(image, index) => index.toString()}
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={viewabilityConfig.current}
                renderItem={({ item: image }) => {
                  return (
                    <GestureHandlerRootView>
                      <TapGestureHandler
                        maxDelayMs={250}
                        ref={doubleTapRef}
                        numberOfTaps={2}
                        onActivated={onDoubleTap}>
                        <Animated.View>
                          <ImageBackground
                            source={{ uri: image.url }}
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
                <TouchableOpacity
                  onPress={() => {
                    setLike(!like);
                    postReact(item.id);
                  }}>
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
                  <ShareIcon width={20} height={20} fill={theme.text} />
                </TouchableOpacity>
                {item.statusImages.length > 1 && (
                  <PaginationDot
                    activeDotColor={'#1891f6'}
                    curPage={currentSlideIndex}
                    maxPage={item.statusImages.length}
                  />
                )}
              </View>
              <FontAwesome name="bookmark-o" size={20} color={theme.text} />
            </View>
            <View style={{ paddingHorizontal: 15 }}>
              {like ? (
                <Text style={{ color: theme.text, fontWeight: 'bold' }}>
                  Liked by {like ? 'you and ' : ''}
                  {like ? item.isReacted : !item.isReacted}
                  {item.reactCount} others
                </Text>
              ) : (
                <Text style={{ color: theme.text, fontWeight: 'bold' }}>
                  {item.reactCount} likes
                </Text>
              )}

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: theme.text,
                  }}>
                  {item.owner.username}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    paddingVertical: 2,
                    color: theme.text,
                    paddingLeft: 5,
                  }}>
                  {item.content}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.push('Comment', {
                    avatar: item.owner.avatar,
                    username: item.owner.username,
                    createdAt: item.createdAt,
                    content: item.content,
                  })
                }>
                <Text style={{ opacity: 0.4, paddingVertical: 2 }}>
                  View all comments
                </Text>
              </TouchableOpacity>

              <Text style={{ fontSize: 10 }}>
                {moment.utc(item.createdAt).tz('Asia/Ho_Chi_Minh').fromNow()}
              </Text>
            </View>
          </View>
        )}
      />
    </>
  );
};

export default PostInterface;

const styles = StyleSheet.create({
  refreshControl: {
    backgroundColor: '#fff',
  },
});

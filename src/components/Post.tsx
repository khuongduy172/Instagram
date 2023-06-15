import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Dimensions,
  Image,
  ToastAndroid,
} from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import Avatar from './Avatar';
import useCustomTheme from '../theme/CustomTheme';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PaginationDot from 'react-native-animated-pagination-dot';
import { useNavigation } from '@react-navigation/native';
import { postReact } from '../apis/reactApi';
import ShareIcon from '../assets/images/instagram-share-icon.svg';
import Ionic from 'react-native-vector-icons/Ionicons';
import moment from 'moment-timezone';
import { deleteStatus } from '../apis/postApi';
import { useMutation } from 'react-query';

const AnimatedImage = Animated.createAnimatedComponent(Image);

interface PostProps {
  item: any;
}

const Post = ({ item }: PostProps) => {
  const theme = useCustomTheme();
  const navigation: any = useNavigation();
  const width = Dimensions.get('window').width;

  const [like, setLike] = useState(item.isReacted);
  const [reactCount, setReactCount] = useState(item.reactCount);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
  }, []);

  const onViewableItemsChanged = useRef((item: any) => {
    const index = item.viewableItems[0].index;
    setCurrentSlideIndex(index);
  });

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });

  const { mutate } = useMutation(deleteStatus, {
    onSuccess: data => {
      if (data) {
        ToastAndroid.show('Deleted successfully', ToastAndroid.SHORT);
        navigation.navigate('Home');
      } else {
        ToastAndroid.show('Deleted failed', ToastAndroid.SHORT);
      }
    },
  });

  const handleReact = (item: any) => {
    postReact(item.id).catch(err => console.log(err));
    setReactCount(like ? reactCount - 1 : reactCount + 1);
    setLike(!like);
  };

  return (
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
            userId={item.owner.id}
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
                        <Feather name="bookmark" color={theme.text} size={25} />
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
                <FontAwesome name="eye-slash" size={30} color={theme.text} />
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
                  onActivated={() => {
                    onDoubleTap();
                    handleReact(item);
                  }}>
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
              handleReact(item);
            }}>
            <AntDesign
              name={like ? 'heart' : 'hearto'}
              style={{
                fontSize: 20,
                color: like ? 'red' : theme.text,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.push('Comment', {
                avatar: item.owner.avatar,
                username: item.owner.username,
                createdAt: item.createdAt,
                content: item.content,
                id: item.id,
              })
            }
            style={{ paddingHorizontal: 20 }}>
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
        {(like || reactCount > 0) &&
          (like ? (
            <Text style={{ color: theme.text, fontWeight: 'bold' }}>
              Liked by you
              {reactCount > 1 &&
                (reactCount == 2
                  ? ` and 1 other`
                  : ` and ${reactCount - 1} others`)}
            </Text>
          ) : (
            <Text style={{ color: theme.text, fontWeight: 'bold' }}>
              {reactCount} likes
            </Text>
          ))}

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
        {item.commentCount > 0 && (
          <TouchableOpacity
            onPress={() =>
              navigation.push('Comment', {
                avatar: item.owner.avatar,
                username: item.owner.username,
                createdAt: item.createdAt,
                content: item.content,
                id: item.id,
              })
            }>
            <Text style={{ opacity: 0.4, paddingVertical: 2 }}>
              View all {item.commentCount} comments
            </Text>
          </TouchableOpacity>
        )}

        <Text style={{ fontSize: 10 }}>
          {moment.utc(item.createdAt).tz('Asia/Ho_Chi_Minh').fromNow()}
        </Text>
      </View>
    </View>
  );
};

export default Post;

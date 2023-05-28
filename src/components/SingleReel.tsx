import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
  useColorScheme,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Video from 'react-native-video';
import { useFocusEffect } from '@react-navigation/native';
import { viewReels, deleteReel } from '../apis/reelApi';
import Modal from 'react-native-modal';
import useCustomTheme from '../theme/CustomTheme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useMutation } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import PostLoader from './loader/posts';
import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native';

const SingleReel = React.memo(({ item, index, currentIndex }) => {
  const navigation = useNavigation();
  const scheme = useColorScheme();
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const theme = useCustomTheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleDeleteModal = () => {
    setModalVisible2(!isModalVisible2);
  };

  const videoRef = useRef(null);
  const [videoDuration, setVideoDuration] = useState(0);
  let isViewed = false;

  const onBuffer = buffer => {
    // console.log(buffer);
  };

  const onError = error => {
    console.log('error', error);
  };

  const onLoad = (data: any) => {
    setVideoDuration(data.duration);
  };

  const onProgress = async (data: any) => {
    if (
      (data.currentTime >= 5 || data.currentTime >= videoDuration / 2) &&
      !isViewed
    ) {
      isViewed = true;
      await viewReels(item.id);
    }
  };

  const { mutate, isLoading: deleteReelLoading } = useMutation(deleteReel, {
    onSuccess: data => {
      if (data) {
        ToastAndroid.show('Deleted successfully', ToastAndroid.SHORT);
        navigation.navigate('Home');
      } else {
        ToastAndroid.show('Deleted failed', ToastAndroid.SHORT);
      }
    },
  });

  const handleDelete = () => {
    mutate(item.id);
  };

  const [mute, setMute] = useState(false);

  const [like, setLike] = useState(item.isReacted);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#000000');
      return () => {
        StatusBar.setBarStyle(
          scheme === 'dark' ? 'light-content' : 'dark-content',
        );
        StatusBar.setBackgroundColor(scheme === 'dark' ? '#000' : '#fff');
      };
    }, []),
  );

  const [localUrl, setLocalUrl] = useState(null);
  useEffect(() => {
    const downloadVideo = async () => {
      try {
        const videoFileName = item.id.toString() + '.mp4';
        const videoPath = `${RNFS.DocumentDirectoryPath}/${videoFileName}`;

        // Check if the video file already exists in the cache
        const fileExists = await RNFS.exists(videoPath);
        if (!fileExists) {
          // Video file does not exist, download and save it
          await RNFS.downloadFile({
            fromUrl: item.url,
            toFile: videoPath,
          }).promise;
        }

        setLocalUrl(videoPath);
      } catch (error) {
        console.error('Error downloading video:', error);
      }
    };

    if (index === currentIndex) {
      downloadVideo();
    }
  }, [index, currentIndex]);

  if (!localUrl) {
    return (
      <View
        style={{
          width: windowWidth,
          height: windowHeight,
          position: 'relative',
        }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setMute(!mute)}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#fff" />
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            width: windowWidth * 0.9,
            zIndex: 1,
            bottom: windowHeight * 0.075,
            padding: 10,
          }}>
          <View>
            <ContentLoader
              speed={2}
              width={400}
              height={160}
              viewBox="0 0 400 160"
              backgroundColor="#ffffff"
              foregroundColor="#ffffff">
              <Circle cx="20" cy="20" r="20" />
              <Rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
              <Rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
              <Rect x="0" y="88" rx="3" ry="3" width="300" height="6" />
              <Rect x="0" y="104" rx="3" ry="3" width="300" height="6" />
              <Rect x="0" y="120" rx="3" ry="3" width="300" height="6" />
            </ContentLoader>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        position: 'relative',
      }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setMute(!mute)}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}>
        {localUrl ? (
          <Video
            ref={videoRef}
            onBuffer={onBuffer}
            onError={onError}
            repeat={true}
            resizeMode="cover"
            paused={currentIndex === index ? false : true}
            source={{
              uri: 'file://' + localUrl,
            }}
            onLoad={onLoad}
            onProgress={onProgress}
            muted={mute}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
            }}
            hideShutterView={true}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </TouchableOpacity>
      <Ionic
        name="volume-mute"
        style={{
          color: 'white',
          fontSize: mute ? 20 : 0,
          position: 'absolute',
          top: windowHeight / 2.3,
          left: windowWidth / 2.3,
          backgroundColor: 'rgba(52,52,52,0.6)',
          borderRadius: 100,
          padding: mute ? 20 : 0,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: windowWidth * 0.9,
          zIndex: 1,
          bottom: windowHeight * 0.075,
          padding: 10,
        }}>
        <View>
          <TouchableOpacity style={{ width: 150 }}>
            <View
              style={{
                width: 150,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 100,
                  backgroundColor: 'white',
                  margin: 10,
                }}>
                <Image
                  key={index}
                  source={{
                    uri: item.owner.avatar
                      ? item.owner.avatar
                      : 'https://cdn-icons-png.flaticon.com/512/860/860733.png',
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                    borderRadius: 100,
                  }}
                />
              </View>
              <Text
                style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                {item.owner.username}
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 14, marginHorizontal: 10 }}>
            {item.caption}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 5,
              paddingVertical: 3,
              alignItems: 'center',
              borderRadius: 30,
              backgroundColor: 'rgba(27, 27, 27, 0.5)',
              width: '50%',
              margin: 10,
            }}>
            <Ionic
              name="musical-notes-sharp"
              style={{ color: 'white', fontSize: 12, opacity: 1 }}
            />
            <Text
              style={{ color: 'white', paddingHorizontal: 10, fontSize: 12 }}>
              Original Audio
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: windowHeight * 0.1,
          right: 0,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{ padding: 10, alignItems: 'center' }}
          onPress={() => setLike(!like)}>
          <AntDesign
            name={like ? 'heart' : 'hearto'}
            size={25}
            color={like ? 'red' : 'white'}
          />
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {item.reactCount}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10, alignItems: 'center' }}>
          <Ionic name="ios-chatbubble-outline" size={25} color="white" />
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {item.commentCount}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10, alignItems: 'center' }}>
          <Ionic name="paper-plane-outline" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 10, alignItems: 'center' }}
          onPress={toggleModal}>
          <Feather name="more-vertical" size={25} color="white" />
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
                      style={{ flexDirection: 'column', alignItems: 'center' }}>
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
                      style={{ flexDirection: 'column', alignItems: 'center' }}>
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
                  style={{ color: theme.text, marginLeft: 15, fontSize: 17 }}>
                  Not interested
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={toggleDeleteModal}>
                <MaterialCommunityIcons
                  name="delete-alert-outline"
                  size={30}
                  color="#b03347"
                />
                <Text
                  style={{ color: '#b03347', marginLeft: 15, fontSize: 17 }}>
                  Delete...
                </Text>
              </TouchableOpacity>
              <Modal isVisible={isModalVisible2}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      borderRadius: 20,
                      width: 250,
                      height: 235,
                      backgroundColor: theme.backgroundColor,
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        paddingVertical: 25,
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          color: theme.text,
                        }}>
                        Are you sure?
                      </Text>
                      <Text
                        style={{
                          color: theme.textSecond,
                          paddingHorizontal: 20,
                          fontSize: 13,
                          paddingTop: 15,
                          textAlign: 'center',
                          width: 200,
                          lineHeight: 20,
                        }}>
                        If you delete now, you will lose this video.
                      </Text>
                    </View>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#efefef',
                      }}></View>
                    <TouchableOpacity
                      onPress={handleDelete}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 15,
                      }}>
                      {deleteReelLoading ? (
                        <ActivityIndicator size="small" color="#b03347" />
                      ) : (
                        <Text
                          style={{
                            paddingHorizontal: 15,
                            color: '#b03347',
                          }}>
                          Delete
                        </Text>
                      )}
                    </TouchableOpacity>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#efefef',
                      }}></View>
                    <TouchableOpacity
                      onPress={toggleDeleteModal}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 15,
                      }}>
                      <Text
                        style={{
                          paddingHorizontal: 15,
                          color: theme.text,
                        }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
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
                  style={{ color: theme.text, marginLeft: 15, fontSize: 17 }}>
                  Manage suggested content
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: 'white',
            marginTop: 20,
          }}>
          <Image
            key={index}
            source={{
              uri: item.owner.avatar
                ? item.owner.avatar
                : 'https://cdn-icons-png.flaticon.com/512/860/860733.png',
            }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 10,
            }}
            resizeMode="cover"
          />
        </View>
      </View>
    </View>
  );
});

export default SingleReel;

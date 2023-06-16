import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  Linking,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useCameraDevices, Camera } from 'react-native-vision-camera';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import useCustomTheme from '../theme/CustomTheme';
import { launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { postStory } from '../apis/storyApi';
import { useMutation } from 'react-query';

const CreateStoryScreen = ({ navigation }) => {
  const [photoImage, setPhotoImage] = useState([]);
  const [secondPhotoImage, setSecondPhotoImage] = useState([]);
  const [loading, setLoading] = useState(null);
  const [flashToggle, setFlashToggle] = useState(false);
  const cameraRef = useRef(Camera);
  const [camView, setCamView] = useState('back');
  const [torch, setTorch] = useState('off');
  const devices = useCameraDevices();
  const device = camView == 'back' ? devices.back : devices.front;
  const isFocused = useIsFocused();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const theme = useCustomTheme();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const cameraPermission = useCallback(async () => {
    const permission =
      (await Camera.requestCameraPermission()) &&
      (await Camera.requestMicrophonePermission());
    if (permission === 'denied') {
      await Linking.openSettings();
    }
    setLoading(devices);
  }, [devices]);

  useEffect(() => {
    cameraPermission();
  }, [cameraPermission, devices]);

  const recordVideo = async () => {
    setLoading(true);
    try {
      if (cameraRef.current == null) {
        throw new Error('Camera Ref is null');
      }
      console.log('Recording...');
      const video = await cameraRef.current.startRecording({
        qualityPrioritization: 'quality',
        flash: `${torch}`,
        enableAutoRedEyeReduction: true,
        onRecordingFinished: async video => {
          setPhotoImage([...photoImage, video.path]);
        },
        onRecordingError: error => console.error(error),
      });
      setIsRecording(true);
      setIsPaused(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current == null) {
      throw new Error('Vision Ref is null');
    }
    console.log('Stopping Recording...');
    const stoppedVideo = await cameraRef.current.stopRecording();
    console.log(stoppedVideo);
    setIsRecording(false);
    setIsPaused(true);
  };

  const ImagePickerLaunch = () => {
    ImagePicker.openPicker({
      multiple: true, // To support multiple image selection
      quality: 1.0,
    }).then(image => {
      setSecondPhotoImage(...secondPhotoImage, image);
      setIsPaused(true);
    });
  };

  console.log('test', secondPhotoImage);

  const { mutate, isLoading: postNewStory } = useMutation(postStory, {
    onSuccess: data => {
      if (data) {
        ToastAndroid.show('Posted successfully', ToastAndroid.SHORT);
        navigation.navigate('Home', { isRefresh: true });
      } else {
        ToastAndroid.show('Posted failed', ToastAndroid.SHORT);
      }
    },
    onError: error => {
      console.log('error', error);
    },
  });

  const handlePostStory = async () => {
    let formData = new FormData();

    photoImage && photoImage.length > 0
      ? formData.append('File', {
          name: 'reels.mp4',
          uri: photoImage[photoImage.length - 1],
          type: 'video/mp4',
        })
      : secondPhotoImage &&
        secondPhotoImage.length > 0 &&
        secondPhotoImage.forEach((item: any, index: any) => {
          formData.append('File', {
            uri: item.path,
            type: 'image/jpeg',
            name: `image${index}.jpg`,
          });
        });

    console.log('check', formData);

    mutate(formData);
  };

  if (device == null) {
    return <ActivityIndicator style={{ flex: 1 }} size={50} color="red" />;
  }

  return (
    <>
      {isFocused ? (
        !isPaused ? (
          <View style={{ backgroundColor: '#000' }}>
            <View
              style={{
                width: '100%',
                height: '100%',
                bottom: 90,
                borderRadius: 15,
                overflow: 'hidden',
              }}>
              <Camera
                ref={cameraRef}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                device={device}
                video={true}
                audio={true}
                isActive={true}
              />
            </View>

            <View style={styles.shutterContainerTop}>
              <TouchableOpacity>
                <AntDesign name="setting" color="white" size={30} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setFlashToggle(!flashToggle);
                  torch == 'off' ? setTorch('on') : setTorch('off');
                }}>
                {torch == 'on' ? (
                  <Ionic name="flash" color="white" size={30} />
                ) : (
                  <Ionic name="flash-off" color="white" size={30} />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="close" color="white" size={30} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: 90,
                width: '100%',
                height: 100,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {isRecording ? (
                <TouchableOpacity
                  onPress={() => {
                    stopRecording();
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 70,
                      height: 70,
                      borderWidth: 3,
                      borderColor: 'red',
                      borderRadius: 50,
                      padding: 10,
                    }}>
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 40,
                        backgroundColor: 'red',
                      }}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    recordVideo();
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 70,
                      height: 70,
                      borderWidth: 3,
                      borderColor: '#fff',
                      borderRadius: 50,
                      padding: 10,
                    }}>
                    <View style={styles.shutterBtn} />
                  </View>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.shutterContainer}>
              <View>
                <TouchableOpacity
                  onPress={ImagePickerLaunch}
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 10,
                    borderColor: 'white',
                    borderWidth: 2,
                    overflow: 'hidden',
                  }}>
                  {secondPhotoImage && secondPhotoImage.length > 0 && (
                    <View style={{ width: 30, height: 30 }}>
                      <Image
                        style={{ width: 30, height: 30, borderRadius: 10 }}
                        source={{
                          uri: secondPhotoImage[secondPhotoImage.length - 1]
                            .path,
                        }}
                      />
                    </View>
                  )}
                </TouchableOpacity>
                <View
                  style={{
                    position: 'absolute',
                    top: 20,
                    right: -5,
                    zIndex: 100,
                    width: 20,
                    height: 20,
                    borderRadius: 100,
                    borderWidth: 2,
                    borderColor: '#fff',
                    backgroundColor: '#048ADB',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign
                    name="plus"
                    style={{
                      fontSize: 10,
                      color: 'white',
                      borderRadius: 100,
                    }}
                  />
                </View>
              </View>
              <View>
                <Text
                  style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                  Story
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  camView == 'back' ? setCamView('front') : setCamView('back');
                }}>
                <MaterialCommunityIcons
                  name="camera-flip"
                  color="white"
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ backgroundColor: '#000' }}>
            <View
              style={{
                width: '100%',
                height: '100%',
                bottom: 80,
                overflow: 'hidden',
                borderRadius: 15,
              }}>
              {photoImage && photoImage.length > 0 ? (
                <Video
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={{
                    uri: photoImage[photoImage.length - 1],
                  }}
                  repeat={true}
                  muted={false}
                />
              ) : (
                secondPhotoImage &&
                secondPhotoImage.length > 0 && (
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    source={{
                      uri: secondPhotoImage[secondPhotoImage.length - 1].path,
                    }}
                  />
                )
              )}
            </View>

            <View style={styles.shutterContainerTop}>
              <TouchableOpacity onPress={() => setIsPaused(false)}>
                <AntDesign name="close" color="white" size={30} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setFlashToggle(!flashToggle);
                  torch == 'off' ? setTorch('on') : setTorch('off');
                }}>
                {torch == 'on' ? (
                  <Ionic name="flash" color="white" size={30} />
                ) : (
                  <Ionic name="flash-off" color="white" size={30} />
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: 'space-evenly',
                alignItems: 'center',
                bottom: 105,
                position: 'absolute',
                width: '100%',
                flexDirection: 'row',
                marginLeft: 15,
              }}>
              <TouchableOpacity
                onPress={toggleModal}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  backgroundColor: 'rgba(52, 52, 52, 0.5)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Feather name="delete" color="white" size={20} />
              </TouchableOpacity>
              <Modal isVisible={isModalVisible}>
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
                      height: 280,
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
                        Start over?
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
                        If you go back now, you will lose this draft.
                      </Text>
                    </View>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#efefef',
                      }}></View>
                    <TouchableOpacity
                      onPress={() => {
                        setIsPaused(false);
                        setSecondPhotoImage([]);
                        setPhotoImage([]);
                        setModalVisible(false);
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 15,
                      }}>
                      <Text
                        style={{
                          paddingHorizontal: 15,
                          color: '#9d1927',
                          fontWeight: 'bold',
                        }}>
                        Start again
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#efefef',
                      }}></View>
                    <TouchableOpacity
                      onPress={toggleModal}
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
                        Continue editing
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#efefef',
                      }}></View>
                    <TouchableOpacity
                      onPress={() => setIsPaused(false)}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: 15,
                      }}>
                      <Text
                        style={{
                          paddingHorizontal: 15,
                          color: theme.text,
                        }}>
                        Save draft
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <TouchableOpacity
                onPress={() => {
                  recordVideo();
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 70,
                    height: 70,
                    borderWidth: 3,
                    borderColor: '#fff',
                    borderRadius: 50,
                    padding: 10,
                  }}>
                  <View style={styles.shutterBtn} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handlePostStory}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                  flexDirection: 'row',
                }}>
                {postNewStory ? (
                  <ActivityIndicator
                    size="small"
                    color={theme.mainButtonColor}
                  />
                ) : (
                  <Text style={{ fontSize: 15, color: 'black' }}>Next</Text>
                )}

                <MaterialIcons
                  name="keyboard-arrow-right"
                  color="black"
                  size={20}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.shutterContainer}>
              <View>
                <TouchableOpacity
                  onPress={toggleModal}
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 10,
                    borderColor: 'white',
                    borderWidth: 2,
                    overflow: 'hidden',
                  }}>
                  {secondPhotoImage && secondPhotoImage.length > 0 && (
                    <View style={{ width: 30, height: 30 }}>
                      <Image
                        style={{ width: 30, height: 30, borderRadius: 10 }}
                        source={{
                          uri: secondPhotoImage[secondPhotoImage.length - 1]
                            .path,
                        }}
                      />
                    </View>
                  )}
                </TouchableOpacity>
                <View
                  style={{
                    position: 'absolute',
                    top: 20,
                    right: -5,
                    zIndex: 100,
                    width: 20,
                    height: 20,
                    borderRadius: 100,
                    borderWidth: 2,
                    borderColor: '#fff',
                    backgroundColor: '#048ADB',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign
                    name="plus"
                    style={{
                      fontSize: 10,
                      color: 'white',
                      borderRadius: 100,
                    }}
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  camView == 'back' ? setCamView('front') : setCamView('back');
                }}>
                <MaterialCommunityIcons
                  name="camera-flip"
                  color="white"
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </View>
        )
      ) : null}
    </>
  );
};

export default CreateStoryScreen;

const styles = StyleSheet.create({
  shutterContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  shutterContainerTop: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  shutterBtn: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: '#fff',
  },
});

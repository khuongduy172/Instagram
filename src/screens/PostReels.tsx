import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Switch,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import useCustomTheme from '../theme/CustomTheme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Video from 'react-native-video';
import ReelsIcon from '../assets/images/instagram-reels-icon.svg';
import TagIcon from '../assets/images/instagram-tag-icon.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { postReels } from '../apis/reelApi';
import { useMutation } from 'react-query';

const PostReels = ({ navigation, route }: any) => {
  const { photoImage } = route.params;
  const ScreenWidth = Dimensions.get('window').width;
  const theme = useCustomTheme();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [caption, setCaption] = useState('');

  console.log(photoImage[photoImage.length - 1]);

  const { mutate, isLoading: postNewReels } = useMutation(postReels, {
    onSuccess: data => {
      if (data) {
        ToastAndroid.show('Posted successfully', ToastAndroid.SHORT);
        navigation.navigate('Reels');
      } else {
        ToastAndroid.show('Posted failed', ToastAndroid.SHORT);
      }
    },
  });

  const handlePostReels = async () => {
    let formData = new FormData();

    formData.append('Caption', caption);
    formData.append('Video', {
      name: 'reels.mp4',
      uri: photoImage[photoImage.length - 1],
      type: 'video/mp4',
    });

    mutate(formData);
  };
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: theme.background,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
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
          New footage
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={true} horizontal={false}>
        <Video
          source={{
            uri: photoImage[photoImage.length - 1],
          }}
          resizeMode="cover"
          style={{
            height: 330,
            width: ScreenWidth * 0.5,
            zIndex: -1,
            borderRadius: 20,
            alignSelf: 'center',
            marginTop: 20,
          }}
          paused={true}
          muted={true}
        />
        <TextInput
          placeholder="Write caption..."
          style={{
            paddingLeft: 15,
            color: theme.text,
            marginTop: 10,
            marginBottom: 40,
          }}
          onChangeText={text => setCaption(text)}
        />
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: '#efefef',
          }}></View>
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ReelsIcon width={25} height={25} fill={theme.text} />
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                paddingLeft: 15,
                color: theme.text,
              }}>
              Share to Reels
            </Text>
          </View>
          <Text style={{ paddingVertical: 15, color: theme.textSecond }}>
            Your videos can show up in Reels and the Reels tab on your profile.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text>Share to the Feed </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#9bcaf5' }}
              thumbColor={isEnabled ? '#3999f0' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: '#efefef',
          }}></View>
        <View style={{ padding: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TagIcon width={25} height={25} fill={theme.text} />
              <Text
                style={{
                  fontSize: 16,
                  color: theme.text,
                  paddingHorizontal: 10,
                }}>
                Tag someone else
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              color={theme.textSecond}
              size={16}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 30,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="tag" color={theme.text} size={25} />
              <Text
                style={{
                  fontSize: 16,
                  color: theme.text,
                  paddingHorizontal: 10,
                }}>
                More topics
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              color={theme.textSecond}
              size={16}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 30,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons
                name="surround-sound"
                color={theme.text}
                size={25}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: theme.text,
                  paddingHorizontal: 10,
                }}>
                Change sound name
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              color={theme.textSecond}
              size={16}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 30,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="location-on" color={theme.text} size={25} />
              <Text
                style={{
                  fontSize: 16,
                  color: theme.text,
                  paddingHorizontal: 10,
                }}>
                Add location
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              color={theme.textSecond}
              size={16}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 30,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="facebook" color={theme.text} size={25} />
              <Text
                style={{
                  fontSize: 16,
                  color: theme.text,
                  paddingHorizontal: 10,
                }}>
                Share to Facebook
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              color={theme.textSecond}
              size={16}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 30,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AntDesign name="setting" color={theme.text} size={25} />
              <Text
                style={{
                  fontSize: 16,
                  color: theme.text,
                  paddingHorizontal: 10,
                }}>
                Advanced settings
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              color={theme.textSecond}
              size={16}
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          borderTopWidth: 1,
          borderColor: '#efefef',
          backgroundColor: theme.background,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 20,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: theme.background,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderColor: theme.textSecond,
            width: '48%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: theme.text, fontWeight: 'bold' }}>
            Save draft
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePostReels}
          style={{
            borderRadius: 10,
            backgroundColor: theme.mainButtonColor,
            paddingVertical: 10,
            paddingHorizontal: 20,
            width: '48%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {postNewReels ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={{ color: theme.background, fontWeight: 'bold' }}>
              Next
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostReels;

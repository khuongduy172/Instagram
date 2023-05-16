import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
  useColorScheme,
} from 'react-native';
import React, { useRef, useState } from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Video from 'react-native-video';
import { useFocusEffect } from '@react-navigation/native';

const SingleReel = ({ item, index, currentIndex }) => {
  const scheme = useColorScheme();
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  const videoRef = useRef(null);

  const onBuffer = buffer => {
    // console.log(buffer);
  };

  const onError = error => {
    console.log('error', error);
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
        <Video
          ref={videoRef}
          onBuffer={onBuffer}
          onError={onError}
          repeat={true}
          resizeMode="cover"
          paused={currentIndex === index ? false : true}
          source={{
            uri: 'https://s3-hcm-r1.longvan.net/19420200-instagram/v4.mp4',
          }}
          muted={mute}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
          hideShutterView={true}
        />
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
          width: windowWidth,
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
                  source={{ uri: item.owner.avatar }}
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
          {/* <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {item.shares}
          </Text> */}
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <Feather name="more-vertical" size={25} color="white" />
        </TouchableOpacity>
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
            source={{ uri: item.owner.avatar }}
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
};

export default SingleReel;

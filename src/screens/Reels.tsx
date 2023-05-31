import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import ReelsComponent from '../components/ReelsComponent';
import { useNavigation } from '@react-navigation/native';

const Reels = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [audiostatus, setAudioStatus] = useState(true);

  const playerRef: any = useRef();

  const navigation: any = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setAudioStatus(false);

      playerRef.current.pauseVideo();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        position: 'relative',
        backgroundColor: 'black',
      }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          zIndex: 1,
          padding: 10,
        }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
          Reels
        </Text>
        <TouchableOpacity onPress={() => navigation.push('CreateReels')}>
          <Feather name="camera" style={{ fontSize: 25, color: 'white' }} />
        </TouchableOpacity>
      </View>
      <ReelsComponent playerRef={playerRef} />
    </View>
  );
};

export default Reels;

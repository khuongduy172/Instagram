import {
  View,
  Text,
  Dimensions,
  Image,
  Animated,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import useCustomTheme from '../theme/CustomTheme';
import Feather from 'react-native-vector-icons/Feather';

const StoryScreen = ({ route, navigation }: any) => {
  const { name, image } = route.params;
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;
  const [current, setCurrent] = useState({ data: image[0], index: 0 });

  const theme = useCustomTheme();

  useEffect(() => {
    let timer = setTimeout(() => {
      if (current.index === image.length - 1) {
        navigation.goBack();
      }
      setCurrent({
        ...current,
        index: current.index + 1,
        data: image[current.index + 1],
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [current]);

  const ProgressView = () => {
    const progressAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(progressAnim, {
        toValue: (width - 30) / image.length,
        duration: 3000,
        useNativeDriver: false,
      }).start();
    }, [progressAnim]);

    return (
      <Animated.Text
        style={{
          backgroundColor: '#fff',
          width: progressAnim,
        }}></Animated.Text>
    );
  };
  return (
    <View
      style={{
        backgroundColor: theme.storyBackground,
        width: '100%',
        height: '100%',
        position: 'relative',
      }}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={{ flexDirection: 'row', width: '100%' }}>
        {image.map((item: any, index: number) => (
          <View
            key={index}
            style={{
              height: 1.5,
              backgroundColor: '#bbbbbb',
              flex: 1,
              top: 10,
              marginHorizontal: 4,
            }}>
            {current.index === index ? <ProgressView /> : null}
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
            <Image
              source={require('../assets/images/ava.png')}
              style={{
                borderRadius: 100,
                backgroundColor: 'orange',
                resizeMode: 'cover',
                width: '100%',
                height: '100%',
              }}
            />
          </View>
          <Text
            style={{
              color: 'white',
              paddingHorizontal: 10,
              fontWeight: 'bold',
            }}>
            anthony.haidang
          </Text>
          <Text style={{ color: '#fafafa' }}>3hrs ago</Text>
        </View>
        <Feather name="more-vertical" color="white" size={20} />
      </View>

      <Image
        source={current.data}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          if (current.index === 0) {
            return;
          }
          setCurrent({
            ...current,
            index: current.index - 1,
            data: image[current.index - 1],
          });
        }}
        style={{
          position: 'absolute',
          width: width / 2,
          height: height * 0.9,
          bottom: 0,
        }}></TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (current.index === image.length - 1) {
            navigation.goBack();
          }
          setCurrent({
            ...current,
            index: current.index + 1,
            data: image[current.index + 1],
          });
        }}
        style={{
          position: 'absolute',
          width: width / 2,
          height: height * 0.9,
          bottom: 0,
          right: 0,
        }}></TouchableOpacity>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginVertical: 10,
          width: '100%',
        }}>
        <TextInput
          placeholder="Send message"
          placeholderTextColor="white"
          style={{
            borderColor: 'white',
            borderRadius: 25,
            width: '70%',
            height: 50,
            paddingLeft: 20,
            borderWidth: 1,
            fontSize: 15,
            color: 'white',
          }}
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="heart" style={{ fontSize: 30, color: 'white' }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="send" style={{ fontSize: 30, color: 'white' }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StoryScreen;

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
import React, { useEffect, useState } from 'react';
import useCustomTheme from '../theme/CustomTheme';
import Feather from 'react-native-vector-icons/Feather';

const StoryScreen = ({ route, navigation }: any) => {
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  const { name, image } = route.params;
  const theme = useCustomTheme();

  const [progress, setProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    let timer = setTimeout(() => {
      navigation.goBack();
    }, 5000);

    Animated.timing(progress, {
      toValue: 5,
      duration: 5000,
      useNativeDriver: false,
    }).start();
    return () => clearTimeout(timer);
  }, []);

  const progressAnimation = progress.interpolate({
    inputRange: [0, 5],
    outputRange: ['0%', '100%'],
  });
  return (
    <View
      style={{
        backgroundColor: theme.storyBackground,
        width: '100%',
        height: '100%',
        position: 'relative',
      }}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View
        style={{
          height: 1.5,
          width: '95%',
          backgroundColor: 'gray',
          position: 'absolute',
          top: 10,
          left: 8,
        }}>
        <Animated.View
          style={{
            height: '100%',
            backgroundColor: 'white',
            width: progressAnimation,
          }}></Animated.View>
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
        source={image}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      />
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

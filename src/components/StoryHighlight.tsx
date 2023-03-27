import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import useCustomTheme from '../theme/CustomTheme';

const StoryHighlight = () => {
  const navigation: any = useNavigation();
  const theme = useCustomTheme();
  const storyInfo = [
    {
      id: 1,
      name: 'anthony.haidang',
      title: 'sand..',
      imageData: [
        //require image as array
        require('../assets/images/h1.jpg'),
        require('../assets/images/h2.jpg'),
        require('../assets/images/h3.jpg'),
        require('../assets/images/h4.jpg'),
      ],
    },
    {
      id: 0,
      name: 'anthony.haidang',
      title: 'Winter is comming <3',
      imageData: [
        //require image as array
        require('../assets/images/h5.jpg'),
        require('../assets/images/h6.jpg'),
        require('../assets/images/h1.jpg'),
        require('../assets/images/h2.jpg'),
      ],
    },
    {
      id: 0,
      name: 'anthony.haidang',
      title: 'Festival ^^',
      imageData: [
        //require image as array
        require('../assets/images/h3.jpg'),
        require('../assets/images/h4.jpg'),
        require('../assets/images/h5.jpg'),
        require('../assets/images/h6.jpg'),
      ],
    },
    {
      id: 0,
      name: 'anthony.haidang',
      title: 'Raining...',
      imageData: [
        //require image as array
        require('../assets/images/h1.jpg'),
        require('../assets/images/h2.jpg'),
        require('../assets/images/h3.jpg'),
        require('../assets/images/h4.jpg'),
      ],
    },
    {
      id: 0,
      name: 'anthony.haidang',
      title: 'High from sky ^^',
      imageData: [
        //require image as array
        require('../assets/images/h1.jpg'),
        require('../assets/images/h2.jpg'),
        require('../assets/images/h3.jpg'),
        require('../assets/images/h4.jpg'),
      ],
    },
    {
      id: 0,
      name: 'anthony.haidang',
      title: 'Buy myself flowers',
      imageData: [
        //require image as array
        require('../assets/images/h1.jpg'),
        require('../assets/images/h2.jpg'),
        require('../assets/images/h3.jpg'),
        require('../assets/images/h4.jpg'),
      ],
    },
  ];
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {storyInfo.map((data, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.push('StoryScreen', {
                name: data.name,
                image: data.imageData,
              })
            }>
            <View
              style={{
                flexDirection: 'column',
                paddingHorizontal: 10,
                position: 'relative',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 70,
                  height: 70,
                  backgroundColor: theme.background,
                  borderWidth: 0.7,
                  borderRadius: 100,
                  borderColor: theme.borderColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 62,
                    height: 62,
                    backgroundColor: theme.background,
                    borderWidth: 0.7,
                    borderRadius: 100,
                    borderColor: theme.borderColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={data.imageData[0]}
                    style={{
                      resizeMode: 'cover',
                      width: '100%',
                      height: '100%',
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                </View>
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 11,
                  color: theme.text,
                }}>
                {data.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default StoryHighlight;

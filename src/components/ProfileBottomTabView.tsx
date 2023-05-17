import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import useCustomTheme from '../theme/CustomTheme';
import Ionic from 'react-native-vector-icons/Ionicons';
import { SimpleGrid } from 'react-native-super-grid';
import { useQuery } from 'react-query';
import { getUserReels } from '../apis/reelApi';
import Video from 'react-native-video';

const ProfileBottomTabView = (props: any) => {
  const Tab = createMaterialTopTabNavigator();
  const theme = useCustomTheme();
  const postInfo = [
    {
      id: 1,
      name: 'anthony.haidang',
      title: 'sand..',
      image: require('../assets/images/h1.jpg'),
    },
    {
      id: 2,
      name: 'anthony.haidang',
      title: 'Winter is comming <3',
      image: require('../assets/images/h2.jpg'),
    },
    {
      id: 3,
      name: 'anthony.haidang',
      title: 'Festival ^^',
      image: require('../assets/images/h3.jpg'),
    },
    {
      id: 4,
      name: 'anthony.haidang',
      title: 'Raining...',
      image: require('../assets/images/h4.jpg'),
    },
    {
      id: 5,
      name: 'anthony.haidang',
      title: 'High from sky ^^',
      image: require('../assets/images/h5.jpg'),
    },
  ];

  const Post = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', height: '100%' }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: theme.background,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          <SimpleGrid
            itemDimension={100}
            spacing={0}
            data={postInfo}
            renderItem={({ item }) => (
              <Image source={item.image} style={{ width: 120, height: 120 }} />
            )}
            style={{ flex: 1 }}
            listKey={undefined}
          />
        </View>
      </ScrollView>
    );
  };

  const Video = () => {
    const {
      data: ReelData,
      isLoading,
      isError,
    } = useQuery('getReels', getUserReels(props.userId));
    console.log('new', ReelData);
    if (isLoading) {
      return <Text>Loading</Text>;
    }
    if (isError) {
      return <Text>Error</Text>;
    }
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', height: '100%' }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: theme.background,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          <SimpleGrid
            itemDimension={100}
            spacing={0}
            data={ReelData}
            renderItem={({ item }) => {
              return (
                <Video
                  source={{
                    uri: item.url,
                  }}
                  resizeMode="cover"
                  style={{ width: 120, height: 120 }}
                  paused={true}
                  muted={true}
                />
              );
            }}
            style={{ flex: 1 }}
            listKey={undefined}
          />
        </View>
      </ScrollView>
    );
  };

  const Tag = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', height: '100%' }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: theme.background,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          <SimpleGrid
            itemDimension={100}
            spacing={0}
            data={postInfo}
            renderItem={({ item }) => (
              <Image source={item.image} style={{ width: 120, height: 120 }} />
            )}
            style={{ flex: 1 }}
            listKey={undefined}
          />
        </View>
      </ScrollView>
    );
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: theme.background,
          height: 1.5,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName = '';
          if (route.name === 'Posts') {
            iconName = focused ? 'ios-apps-sharp' : 'ios-apps-sharp';
            color = focused ? theme.backButton : theme.disabledIcon;
          } else if (route.name === 'Videos') {
            iconName = focused ? 'ios-play-circle' : 'ios-play-circle-outline';
            color = focused ? theme.backButton : theme.disabledIcon;
          } else if (route.name === 'Tags') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
            color = focused ? theme.backButton : theme.disabledIcon;
          }

          return <Ionic name={iconName} color={color} size={22} />;
        },
      })}>
      <Tab.Screen name="Posts" component={Post} />
      <Tab.Screen name="Videos" component={Video} />
      <Tab.Screen name="Tags" component={Tag} />
    </Tab.Navigator>
  );
};

export default ProfileBottomTabView;

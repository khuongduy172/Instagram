import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import useCustomTheme from '../theme/CustomTheme';
import Ionic from 'react-native-vector-icons/Ionicons';
import { SimpleGrid } from 'react-native-super-grid';
import { useQuery } from 'react-query';
import { getUserReels } from '../apis/reelApi';
import Video from 'react-native-video';
import { useFocusEffect } from '@react-navigation/native';
import { getUserOwner, UserResponse } from '../apis/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ErrorMessage {
  message: string;
}

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

  const { data: UserData } = useQuery<UserResponse, ErrorMessage>(
    'userOwner',
    getUserOwner,
  );

  const [newData, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserReels(UserData?.id);
        const data = await response.data;
        await AsyncStorage.setItem('reels', JSON.stringify(data)); // Stringify the data before storing it

        // Update the component state with the fetched data
      } catch (error) {
        console.error(error);
      }
    };

    if (UserData) {
      fetchData(); // Call the API when the component mounts
    }
  }, [UserData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await AsyncStorage.getItem('reels');
        if (data) {
          data = JSON.parse(data); // Parse the data back to an object
          setData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const Post = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: theme.background,
        }}>
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
    console.log('reelsVid', newData);
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
          {newData && newData.length > 0 ? (
            <SimpleGrid
              itemDimension={100}
              spacing={0}
              data={newData}
              renderItem={({ item }) => {
                return (
                  <Image
                    source={{
                      uri: item.owner.avatar,
                    }}
                    resizeMode="cover"
                    style={{ width: 120, height: 120 }}
                  />
                );
              }}
              style={{ flex: 1 }}
              listKey={undefined}
            />
          ) : (
            <Text>No data available</Text>
          )}
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

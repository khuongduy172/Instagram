import React from 'react';

import {
  HomeScreen,
  SearchScreen,
  CreateScreen,
  Reels,
  ProfileScreen,
} from '../screens';
import { Image, Text, View, useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionic from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import { getUserOwner, UserResponse } from '../apis/userApi';
import { useQuery } from 'react-query';
import ReelsIcon from '../assets/images/instagram-reels-icon.svg';

const Tab = createBottomTabNavigator();

interface ErrorMessage {
  message: string;
}

function TabNavigation() {
  const scheme = useColorScheme();
  const { data, isLoading, error } = useQuery<UserResponse, ErrorMessage>(
    'userOwner',
    getUserOwner,
  );
  if (isLoading) {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarActiveTintColor: scheme === 'dark' ? 'white' : 'black',
          tabBarStyle: {
            height: 50,
          },
          tabBarIcon: ({ focused, size, color }) => {
            let iconName: any;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'ios-search-outline';
            } else if (route.name === 'Camera') {
              iconName = 'plus-square-o';
            } else if (route.name === 'Reels') {
              iconName = 'caret-forward-circle-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }

            if (iconName === 'plus-square-o') {
              return <FontAwesome name={iconName} size={size} color={color} />;
            }

            if (iconName === 'home') {
              return <Foundation name={iconName} size={size} color={color} />;
            }

            if (iconName === 'caret-forward-circle-outline') {
              return <ReelsIcon width={22} height={22} fill={color} />;
            }

            return <Ionic name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Camera" component={CreateScreen} />
        <Tab.Screen name="Reels" component={Reels} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarActiveTintColor: scheme === 'dark' ? 'white' : 'black',
          tabBarStyle: {
            height: 50,
          },
          tabBarIcon: ({ focused, size, color }) => {
            let iconName: any;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Search') {
              iconName = 'ios-search-outline';
            } else if (route.name === 'Camera') {
              iconName = 'plus-square-o';
            } else if (route.name === 'Reels') {
              iconName = 'caret-forward-circle-outline';
            } else if (route.name === 'Profile') {
              iconName =
                data && data.avatar ? data.avatar : 'person-circle-outline';
            }

            if (iconName === 'plus-square-o') {
              return <FontAwesome name={iconName} size={size} color={color} />;
            }

            if (iconName === 'home') {
              return <Foundation name={iconName} size={size} color={color} />;
            }

            if (iconName === 'ios-search-outline') {
              return <Ionic name={iconName} size={size} color={color} />;
            }

            if (iconName === 'caret-forward-circle-outline') {
              return <ReelsIcon width={22} height={22} fill={color} />;
            }

            if (data && data.avatar) {
              return (
                <View
                  style={{
                    borderWidth: 2,
                    width: 28,
                    height: 28,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{ uri: iconName }}
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 100,
                    }}
                  />
                </View>
              );
            }

            return <Ionic name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Camera" component={CreateScreen} />
        <Tab.Screen name="Reels" component={Reels} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </>
  );
}

export default TabNavigation;

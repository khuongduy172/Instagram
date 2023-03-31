import React from 'react';

import {
  HomeScreen,
  SearchScreen,
  CreateScreen,
  NotificationScreen,
  ProfileScreen,
} from '../screens';
import { useColorScheme, Image, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionic from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import { getUserOwner, UserResponse } from '../apis/userApi';
import { useQuery } from 'react-query';

const Tab = createBottomTabNavigator();

interface ErrorMessage {
  message: string;
}

function TabNavigation() {
  const scheme = useColorScheme();
  const tabBarStyle = scheme === 'dark' ? darkTabBarStyle : lightTabBarStyle;
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
          tabBarActiveTintColor: 'black',
          tabBarStyle: {
            height: 50,
          },
          tabBarIcon: ({ focused, size, color }) => {
            let iconName: any;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
              size = focused ? size + 8 : size + 2;
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'ios-search-outline';
            } else if (route.name === 'Camera') {
              iconName = focused ? 'plus-square-o' : 'plus-square-o';
            } else if (route.name === 'Reels') {
              iconName = focused
                ? 'caret-forward-circle'
                : 'caret-forward-circle-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }
            return iconName === 'plus-square-o' ? (
              <FontAwesome name={iconName} size={size} color={color} />
            ) : iconName === 'home' ? (
              <Foundation name={iconName} size={size} color={color} />
            ) : (
              <Ionic name={iconName} size={size} color={color} />
            );
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Camera" component={CreateScreen} />
        <Tab.Screen name="Reels" component={NotificationScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  return (
    <>
      {data ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
            tabBarActiveTintColor: 'black',
            tabBarStyle: {
              height: 50,
            },
            tabBarIcon: ({ focused, size, color }) => {
              let iconName: any;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home';
              } else if (route.name === 'Search') {
                iconName = focused ? 'search' : 'ios-search-outline';
              } else if (route.name === 'Camera') {
                iconName = focused ? 'plus-square-o' : 'plus-square-o';
              } else if (route.name === 'Reels') {
                iconName = focused
                  ? 'caret-forward-circle'
                  : 'caret-forward-circle-outline';
              } else if (route.name === 'Profile') {
                iconName = data.avatar;
              }
              return iconName === 'plus-square-o' ? (
                <FontAwesome name={iconName} size={size} color={color} />
              ) : iconName === 'home' ? (
                <Foundation name={iconName} size={size} color={color} />
              ) : iconName === data.avatar ? (
                <>
                  {focused ? (
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
                  ) : (
                    <Image
                      source={{ uri: iconName }}
                      style={{ width: 25, height: 25, borderRadius: 100 }}
                    />
                  )}
                </>
              ) : (
                <Ionic name={iconName} size={size} color={color} />
              );
            },
          })}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Camera" component={CreateScreen} />
          <Tab.Screen name="Reels" component={NotificationScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
            tabBarActiveTintColor: 'black',
            tabBarStyle: {
              height: 50,
            },
            tabBarIcon: ({ focused, size, color }) => {
              let iconName: any;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home';
              } else if (route.name === 'Search') {
                iconName = focused ? 'search' : 'ios-search-outline';
              } else if (route.name === 'Camera') {
                iconName = focused ? 'plus-square-o' : 'plus-square-o';
              } else if (route.name === 'Reels') {
                iconName = focused
                  ? 'caret-forward-circle'
                  : 'caret-forward-circle-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
              }
              return iconName === 'plus-square-o' ? (
                <FontAwesome name={iconName} size={size} color={color} />
              ) : iconName === 'home' ? (
                <Foundation name={iconName} size={size} color={color} />
              ) : (
                <Ionic name={iconName} size={size} color={color} />
              );
            },
          })}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Camera" component={CreateScreen} />
          <Tab.Screen name="Reels" component={NotificationScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      )}
    </>
  );
}

const darkTabBarStyle = {
  activeTintColor: '#F9F9F9',
};

const lightTabBarStyle = {
  activeTintColor: '#262626',
};

export default TabNavigation;

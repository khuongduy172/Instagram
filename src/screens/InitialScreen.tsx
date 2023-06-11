import React from 'react';

import CreateScreen from './CreateScreen';
import CreateStory from './CreateStoryScreen';
import { Image, Text, View, useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionic from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import { getUserOwner, UserResponse } from '../apis/userApi';
import { useQuery } from 'react-query';
import ReelsIcon from '../assets/images/instagram-reels-icon.svg';
import useCustomTheme from '../theme/CustomTheme';
import { truncate } from 'lodash';

const Tab = createBottomTabNavigator();

function InitialScreen() {
  const scheme = useColorScheme();
  const theme = useCustomTheme();

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          lazy: true,
          swipeEnabled: true,
          tabBarScrollEnabled: true,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            height: 60,
            position: 'absolute',
            bottom: 20,
            borderRadius: 90,
            marginHorizontal: 25,
            backgroundColor: 'rgba(0,0,0,0.8)',
          },
          tabBarIcon: ({ focused, color }) => {
            let textName = '';
            if (route.name === 'Post') {
              textName = 'POST';
              color = focused ? '#fff' : theme.disabledIcon;
            } else if (route.name === 'Story') {
              textName = 'STORY';
              color = focused ? '#fff' : theme.disabledIcon;
            } else if (route.name === 'Footage') {
              textName = 'FOOTAGE';
              color = focused ? '#fff' : theme.disabledIcon;
            } else if (route.name === 'Live') {
              textName = 'LIVE';
              color = focused ? '#fff' : theme.disabledIcon;
            }

            return (
              <Text style={{ color: color, fontWeight: 'bold' }}>
                {textName}
              </Text>
            );
          },
        })}>
        <Tab.Screen name="Post" component={CreateScreen} />
        <Tab.Screen
          name="Story"
          component={CreateStory}
          options={{ tabBarStyle: { display: 'none' } }}
        />
        <Tab.Screen name="Footage" component={CreateScreen} />
        <Tab.Screen name="Live" component={CreateScreen} />
      </Tab.Navigator>
    </View>
  );
}

export default InitialScreen;

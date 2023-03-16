import React from 'react'

import { HomeScreen, SearchScreen, CreateScreen, NotificationScreen, ProfileScreen } from '../screens';
import { useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Octicons from 'react-native-vector-icons/Octicons';

const Tab = createBottomTabNavigator();

function TabNavigation() {
  const scheme = useColorScheme();
  const tabBarStyle = scheme === 'dark' ? darkTabBarStyle : lightTabBarStyle;
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarActiveTintColor: tabBarStyle.activeTintColor }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Octicons name='home' color={color} size={size}/>
          ),
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Octicons name='search' color={color} size={size}/>
          ),
        }}
      />
      <Tab.Screen 
        name="Create" 
        component={CreateScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Octicons name='diff-added' color={color} size={size}/>
          ),
        }}
      />
      <Tab.Screen 
        name="Notification" 
        component={NotificationScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Octicons name='heart' color={color} size={size}/>
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Octicons name='person' color={color} size={size}/>
          ),
        }}
      />
  </Tab.Navigator>
  )
}

const darkTabBarStyle = {
  activeTintColor: '#F9F9F9',
}

const lightTabBarStyle = {
  activeTintColor: '#262626',
}

export default TabNavigation;
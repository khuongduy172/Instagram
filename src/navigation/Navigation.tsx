import React from 'react'

import { NavigationContainer, DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import { HomeScreen, SearchScreen, CreateScreen, NotificationScreen, ProfileScreen } from '../screens';
import { useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Octicons from 'react-native-vector-icons/Octicons';

const Tab = createBottomTabNavigator();

function Navigation() {
  const scheme = useColorScheme();
  const { colors } = useTheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarActiveTintColor: colors.text }}>
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
    </NavigationContainer>
  )
}

export default Navigation;
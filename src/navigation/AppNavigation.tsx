import React, { useEffect } from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { StatusBar, useColorScheme } from 'react-native';
import TabNavigation from './TabNavigation';
import { Provider, useSelector } from 'react-redux';
import store from '../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLoggedIn } from '../redux/authSlice';
import {
  LoginScreen,
  SignUpScreen,
  OnboardingScreen,
  StoryScreen,
  EditProfileScreen,
  SettingScreen,
  EditImageScreen,
} from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AppNavigation = () => {
  const Stack = createNativeStackNavigator();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      store.dispatch(setLoggedIn(true));
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={scheme === 'dark' ? '#000' : '#fff'}
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="TabNavigation" component={TabNavigation} />
            <Stack.Screen name="StoryScreen" component={StoryScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="Setting" component={SettingScreen} />
            <Stack.Screen name="EditImage" component={EditImageScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

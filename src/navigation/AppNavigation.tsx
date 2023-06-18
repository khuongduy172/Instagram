import React, { useEffect } from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { StatusBar, useColorScheme, View } from 'react-native';
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
  NewPost,
  DirectScreen,
  MessageScreen,
  CreateReels,
  PostReels,
  EditorScreen,
  ActivityScreen,
  ProfileScreen,
  CommentScreen,
  SearchMainScreen,
  PostScreen,
} from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getUserOwner } from '../apis/userApi';
import { ActivityIndicator } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import useCustomTheme from '../theme/CustomTheme';
import PushNotification from 'react-native-push-notification';
import useSignalR from '../hooks/useSignalR';
import { navigationRef } from './RootNavigation';

const AppNavigation = () => {
  const Stack = createNativeStackNavigator();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const [isLoading, setIsLoading] = React.useState(true);
  const scheme = useColorScheme();
  const theme = useCustomTheme();

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      let user = await getUserOwner();
      if (user) {
        store.dispatch(setLoggedIn(true));
        setIsLoading(false);
        PushNotification.createChannel(
          {
            channelId: user.id,
            channelName: 'Instagram',
          },
          created =>
            console.log(`createChannel returned '${created}' ${user.id}`),
        );
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkLoginStatus().catch(err => console.error(err));
  }, []);

  const connection = useSignalR();

  useEffect(() => {
    if (connection && connection.state === 'Connected') {
      AsyncStorage.getItem('currentUserId')
        .then(currentUserId => {
          if (currentUserId) {
            console.log('join room: ', currentUserId);
            connection
              .invoke('JoinRoom', currentUserId)
              .catch(err => console.error(err));

            connection.on('Notification', data => {
              console.log(data);
              if (data.typeNoti === 'Follow') {
                PushNotification.localNotification({
                  channelId: currentUserId,
                  message: 'Someone have just followed you!',
                });
              }
              if (data.typeNoti === 'Comment') {
                PushNotification.localNotification({
                  channelId: currentUserId,
                  message: 'Your post have new comment!',
                });
              }
              if (data.typeNoti === 'React') {
                PushNotification.localNotification({
                  channelId: currentUserId,
                  message: 'Someone loved your post!',
                });
              }
            });
          }
        })
        .catch(err => console.error(err));
    }
  }, [connection]);

  if (!isLoading) {
    SplashScreen.hide();
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={scheme === 'dark' ? '#000' : '#fff'}
      />
      {isLoading ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: theme.backgroundColor,
          }}>
          <ActivityIndicator
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            color="#ff7a00"
            size={'large'}
          />
        </View>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <>
              <Stack.Screen name="TabNavigation" component={TabNavigation} />
              <Stack.Screen name="StoryScreen" component={StoryScreen} />
              <Stack.Screen name="EditProfile" component={EditProfileScreen} />
              <Stack.Screen name="Setting" component={SettingScreen} />
              <Stack.Screen name="EditImage" component={EditImageScreen} />
              <Stack.Screen name="NewPost" component={NewPost} />
              <Stack.Screen name="Direct" component={DirectScreen} />
              <Stack.Screen
                name="SearchToSendMessage"
                component={SearchMainScreen}
              />
              <Stack.Screen name="SearchMain" component={SearchMainScreen} />
              <Stack.Screen name="Message" component={MessageScreen} />
              <Stack.Screen name="CreateReels" component={CreateReels} />
              <Stack.Screen name="PostReels" component={PostReels} />
              <Stack.Screen name="Editor" component={EditorScreen} />
              <Stack.Screen name="Activity" component={ActivityScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="ClientProfile" component={ProfileScreen} />
              <Stack.Screen name="Comment" component={CommentScreen} />
              <Stack.Screen name="Post" component={PostScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </>
          )}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigation;

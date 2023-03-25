import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn } from '../redux/authSlice';
import Feather from 'react-native-vector-icons/Feather';
import PostLoader from '../components/loader/posts';
import { useQuery } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import { LoginManager, Profile } from 'react-native-fbsdk-next';
import Entypo from 'react-native-vector-icons/Entypo';

const GetPosts = () => {
  const { isFetching, isError, isSuccess, data } = useQuery(
    'posts',
    async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (res) {
        return res.json();
      }
      throw new Error('Posts error');
    },
  );

  if (isFetching) {
    return <PostLoader />;
  } else if (isError) {
    console.log('error');
  }
  return (
    <>
      {isSuccess &&
        data?.map((post: any, index: number) => (
          <Text key={index}>{post.title}</Text>
        ))}
    </>
  );
};

function HomeScreen(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation: any = useNavigation();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : '#ffffff',
  };

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('AccessToken');
    dispatch(setLoggedIn(false));
    navigation.navigate('Onboarding');
    ToastAndroid.show('Logout successfully', ToastAndroid.SHORT);
  };

  const handleFBSignOut = async () => {
    await LoginManager.logOut();
    dispatch(setLoggedIn(false));
    ToastAndroid.show('Logout successfully', ToastAndroid.SHORT);
    navigation.navigate('Onboarding');
  };

  const currentProfile = Profile.getCurrentProfile().then(function (
    currentProfile,
  ) {
    if (currentProfile) {
      console.log(
        'The current logged user is: ' +
          currentProfile.name +
          '. His profile id is: ' +
          currentProfile.userID,
      );
    }
    return currentProfile;
  });

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {isLoggedIn && (
          <TouchableOpacity onPress={handleSignOut}>
            <Feather name="menu" style={{ fontSize: 25 }} />
          </TouchableOpacity>
        )}
        {isLoggedIn && (
          <TouchableOpacity
            onPress={handleFBSignOut}
            style={{ flexDirection: 'row' }}>
            <Entypo name="facebook" size={20} color="#3797EF" />
            <Text style={styles.facebookText}>Sign Out</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <GetPosts />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  facebookText: {
    color: '#3797EF',
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

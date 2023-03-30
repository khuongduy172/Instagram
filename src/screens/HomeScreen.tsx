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
    await AsyncStorage.removeItem('accessToken');
    dispatch(setLoggedIn(false));
    navigation.navigate('Onboarding');
    ToastAndroid.show('Logout successfully', ToastAndroid.SHORT);
  };

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
      </ScrollView>
      <GetPosts />
    </SafeAreaView>
  );
}

export default HomeScreen;

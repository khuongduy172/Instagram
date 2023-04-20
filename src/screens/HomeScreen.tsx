import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import Feather from 'react-native-vector-icons/Feather';
import PostLoader from '../components/loader/posts';
import { useQuery } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn } from '../redux/authSlice';
import useCustomTheme from '../theme/CustomTheme';
import Ionic from 'react-native-vector-icons/Ionicons';

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

  const theme = useCustomTheme();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : '#ffffff',
    width: '100%',
    height: '100%',
  };

  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('accessToken');
    dispatch(setLoggedIn(false));
    navigation.navigate('Onboarding');
    ToastAndroid.show('Logout successfully', ToastAndroid.SHORT);
  };
  const scheme = useColorScheme();
  const instaLogo =
    scheme === 'dark'
      ? require('../assets/images/insta-dark.png')
      : require('../assets/images/insta.png');

  return (
    <SafeAreaView style={backgroundStyle}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 15,
          alignItems: 'center',
          backgroundColor: theme.background,
        }}>
        <Image
          source={instaLogo}
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <Ionic
              name="ios-heart-outline"
              style={{ fontSize: 24, paddingRight: 20 }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Direct')}>
            <Feather name="send" style={{ fontSize: 24 }} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {isLoggedIn && (
          <TouchableOpacity onPress={handleSignOut}>
            <Text style={{ color: theme.mainButtonColor }}>Log out</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;

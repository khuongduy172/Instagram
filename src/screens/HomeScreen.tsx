import React, {useRef} from 'react';

import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import {useDispatch, useSelector} from 'react-redux';
import {setLoggedIn} from '../redux/authSlice';
import Feather from 'react-native-vector-icons/Feather';
import PostLoader from '../components/loader/posts';
import {useQuery} from 'react-query';
import {postLogin} from '../apis/authApi';
import {useNavigation} from '@react-navigation/native';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const GetPosts = () => {
  const {isFetching, isError, isSuccess, data} = useQuery('posts', async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (res) {
      return res.json();
    }
    throw new Error('Posts error');
  });

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

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {isLoggedIn && (
          <TouchableOpacity onPress={handleSignOut}>
            <Feather name="menu" style={{fontSize: 25}} />
          </TouchableOpacity>
        )}
      </ScrollView>
      <GetPosts />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default HomeScreen;

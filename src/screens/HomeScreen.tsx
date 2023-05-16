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
import HomeStory from '../components/HomeStory';
import PostInterface from '../components/PostInterface';

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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={handleSignOut}>
            <Image
              source={instaLogo}
              style={{
                width: 105,
                height: 60,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>

          <Feather
            name="chevron-down"
            size={15}
            color={theme.text}
            style={{ paddingLeft: 5 }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <Ionic
              name="ios-heart-outline"
              style={{ fontSize: 24, paddingRight: 20 }}
              color={theme.text}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Direct')}>
            <Feather name="send" style={{ fontSize: 24 }} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <HomeStory />
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: '#efefef',
            marginVertical: 3,
          }}></View>
        <PostInterface />
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;

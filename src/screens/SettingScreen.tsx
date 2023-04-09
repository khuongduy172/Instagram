import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ToastAndroid,
} from 'react-native';
import useCustomTheme from '../theme/CustomTheme';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SearchBox from '../components/SearchBox';
import Ionic from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn } from '../redux/authSlice';

const SettingScreen = ({ route, navigation }: any) => {
  const theme = useCustomTheme();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('accessToken');
    dispatch(setLoggedIn(false));
    navigation.navigate('Onboarding');
    ToastAndroid.show('Logout successfully', ToastAndroid.SHORT);
  };
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: theme.background,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back-ios"
            size={30}
            color={theme.backButton}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: theme.text,
            paddingHorizontal: 20,
          }}>
          Settings
        </Text>
      </View>
      <ScrollView>
        <View style={{ paddingVertical: 15 }}>
          <SearchBox />
        </View>
        <View style={{ paddingHorizontal: 15 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 25,
            }}>
            <Ionic name="person-add-outline" color={theme.text} size={25} />
            <Text style={{ paddingHorizontal: 15, color: theme.text }}>
              Follow and invite friends
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 25,
            }}>
            <Ionic name="notifications-outline" color={theme.text} size={25} />
            <Text style={{ paddingHorizontal: 15, color: theme.text }}>
              Notifications
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 25,
            }}>
            <Ionic
              name="ios-lock-closed-outline"
              color={theme.text}
              size={25}
            />
            <Text style={{ paddingHorizontal: 15, color: theme.text }}>
              Privacy
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 25,
            }}>
            <Ionic name="people-outline" color={theme.text} size={25} />
            <Text style={{ paddingHorizontal: 15, color: theme.text }}>
              Monitor
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 25,
            }}>
            <Octicons name="shield-check" color={theme.text} size={25} />
            <Text style={{ paddingHorizontal: 17, color: theme.text }}>
              Security
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 25,
            }}>
            <AntDesign name="notification" color={theme.text} size={25} />
            <Text style={{ paddingHorizontal: 15, color: theme.text }}>
              Advertisement
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 25,
            }}>
            <Ionic name="person-circle-outline" color={theme.text} size={25} />
            <Text style={{ paddingHorizontal: 15, color: theme.text }}>
              Account
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 25,
            }}>
            <Entypo name="lifebuoy" color={theme.text} size={25} />
            <Text style={{ paddingHorizontal: 15, color: theme.text }}>
              Help
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 25,
            }}>
            <Feather name="info" color={theme.text} size={25} />
            <Text style={{ paddingHorizontal: 15, color: theme.text }}>
              Introduction
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 25,
            }}>
            <Ionic
              name="ios-color-palette-outline"
              color={theme.text}
              size={25}
            />
            <Text style={{ paddingHorizontal: 15, color: theme.text }}>
              Theme
            </Text>
          </View>
        </View>

        <View style={{ padding: 20 }}>
          <Image
            source={require('../assets/images/meta.png')}
            style={{ width: 60, height: 60, resizeMode: 'contain' }}
          />
          <Text style={{ color: theme.mainButtonColor, marginBottom: 15 }}>
            Account Center
          </Text>
          <Text style={{ color: theme.textSecond, fontSize: 13 }}>
            Control settings when connecting experiences across Instagram, the
            Facebook app, and Messenger, including sharing stories, posts, and
            signing in.
          </Text>
        </View>
        <View style={{ padding: 20 }}>
          <Text style={{ fontWeight: 'bold', color: theme.text }}>Log in</Text>
        </View>
        <View style={{ padding: 20 }}>
          <Text style={{ color: theme.mainButtonColor }}>Add an account</Text>
        </View>
        <View style={{ padding: 20 }}>
          {isLoggedIn && (
            <TouchableOpacity onPress={handleSignOut}>
              <Text style={{ color: theme.mainButtonColor }}>Log out</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingScreen;

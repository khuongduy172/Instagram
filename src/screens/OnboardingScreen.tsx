import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import useCustomTheme from '../theme/CustomTheme';

const OnboardingScreen = () => {
  const navigation: any = useNavigation();
  const theme = useTheme();
  const themeSecond = useCustomTheme();
  const instaLogo = themeSecond.isDark
    ? require('../assets/images/insta-dark.png')
    : require('../assets/images/insta.png');
  return (
    <View
      style={{
        backgroundColor: themeSecond.background,
        width: '100%',
        height: '100%',
      }}>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 150,
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <Image
          source={instaLogo}
          style={{
            width: 150,
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
        <TouchableOpacity
          style={{
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.primary,
            borderRadius: 5,
            marginTop: 25,
          }}
          onPress={() => navigation.push('Login')}>
          <Text style={{ color: 'white', fontWeight: '700' }}>Log In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <View
          style={{
            borderBottomColor: '#e1e1e1',
            borderBottomWidth: StyleSheet.hairlineWidth,
            alignSelf: 'stretch',
          }}
        />
        <View style={styles.bottomSignUp}>
          <Text style={styles.textBottom}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.push('SignUp')}>
            <Text style={styles.signUp}>Sign Up.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomSignUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 25,
  },
  textBottom: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8e8e8e',
  },
  signUp: {
    color: '#3797EF',
  },
});
